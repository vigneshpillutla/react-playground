import React, { useState } from 'react';
import {useSlate} from 'slate-react'
import Button from '../common/Button'
import Icon from '../common/Icon'
import { toggleBlock, toggleMark, isMarkActive, addMarkData, isBlockActive,activeMark,} from '../utils/SlateUtilityFunctions.js'
import { insertTable, insertCells } from '../utils/table.js'
import { insertLink, removeLink } from '../utils/link.js'
import toolbarGroups from './toolbarGroups.js'
import './styles.css'
import { Transforms,Element,Range } from 'slate';
import { Editor } from 'slate';
import {MdFormatColorText} from 'react-icons/md'

const Toolbar = ()=>{
    const editor = useSlate();
    const BlockButton = ({format}) =>{
        return (
            <Button active={isBlockActive(editor,format)} format={format} onMouseDown={
                e=>{
                    e.preventDefault();
                    toggleBlock(editor,format)
                }
            }>
                <Icon icon={format}/>
            </Button>
        )
    }
    const MarkButton = ({format})=>{
        return(
            <Button active={isMarkActive(editor,format)} format={format} onMouseDown={
                e=>{
                    e.preventDefault();
                    toggleMark(editor,format)
                }
            }>
                <Icon icon={format}/>
            </Button>
        )
    }
    const Dropdown = ({format,options}) => {
        return (
            <select value={activeMark(editor,format)} onChange = {e => changeMarkData(e,format)}>
                {
                    options.map(item => 
                        <option value={item.value}>{item.text}</option>
                    )
                }
            </select>
        )
    }
    const Link = ()=>{
        return (
            <Button active={isMarkActive(editor,'link')} title={'link'} onMouseDown={
                e=>{
                    e.preventDefault();
                    handleInsertLink();
                }
            }>
                <Icon icon='link'/>
            </Button>
        )
    }
    const changeMarkData = (event,format)=>{
        event.preventDefault();
        const value =event.target.value
        addMarkData(editor,{format,value})
    }
    const handleInsertLink = ()=>{
        const url = prompt('Enter URL');
        insertLink(editor,url)
    }
    const handleInsertTable = ()=>{
        insertTable(editor);
    }
    const handleRemoveTable = ()=>{
        Transforms.removeNodes(editor,{
            match:n=> !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table',
            mode:'highest'
        })
    }
    const handleInsertRow = ()=>{
        const {selection} = editor
        if(!!selection && Range.isCollapsed(selection)){
            const [tableNode] = Editor.nodes(editor,{
                match:n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table'
            })
            if(tableNode){
                const [oldTable,path] = tableNode
                handleRemoveTable();
                insertCells(editor,oldTable,path,'row')
            }
        }
    }
    const handleInsertColumn = ()=>{
        const {selection} = editor
        if(!!selection && Range.isCollapsed(selection)){
            const [tableNode] = Editor.nodes(editor,{
                match:n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table'
            })
            if(tableNode){
                const [oldTable,path] = tableNode
                handleRemoveTable();
                insertCells(editor,oldTable,path,'columns')
            }
        }
    }

    return(
        <div className='toolbar'>
            <div className='color-pick'>
                <button><MdFormatColorText size={20}/></button>
                <div className='color-options'></div>
            </div>
            {
                toolbarGroups.map(group => 
                    <span className='toolbar-grp'>
                        {
                            group.map(element => 
                                {
                                    switch (element.type) {
                                        case 'block' :
                                            return <BlockButton {...element}/>
                                        case 'mark':
                                            return <MarkButton {...element}/>
                                        case 'dropdown':
                                            return <Dropdown {...element} />
                                        case 'link':
                                            return <Link/>
                                        default:
                                            return <button>Invalid Button</button>
                                    }
                                }
                            )
                        }
                    </span>    
                )
            }
            <button onClick={handleInsertTable}>Insert table</button>
            <button onClick={handleRemoveTable}>Remove Table</button>
            <button onClick={handleInsertRow}>Insert row</button>
            <button onClick={handleInsertColumn}>Insert column</button>
            
        </div>
    )
}

export default Toolbar;