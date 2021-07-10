import React, { useEffect, useState } from 'react'
import useTable from '../../utils/customHooks/useTable.js';
import Icon from '../../common/Icon'
import './styles.css'
import { TableUtil } from '../../utils/table.js'
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

const TableContextMenu = (props)=>{
    const {editor} = props;
    const [selection,setSelection] = useState()
    const [showMenu,setShowMenu] = useState(false);
    const [menuLocation,setMenuLocation] = useState({
        top:'0px',
        left:'0px'
    });
    const table = new TableUtil(editor);


    const menu = [
        {
            icon:'insertColumnRight',
            text:'Insert Columns to the Right',
            action:{
                type:'insertColumn',
                position:'after'
            }
        },
        {
            icon:'insertColumnLeft',
            text:'Insert Columns to the Left',
            action:{
                type:'insertColumn',
                position:'at'
            }
        },
        {
            icon:'insertRowAbove',
            text:'Insert Row Above',
            action:{
                type:'insertRow',
                positon:'at'
            }
        },
        {
            icon:'insertRowBelow',
            text:'Insert Row Below',
            action:{
                type:'insertRow',
                position:'after'
            }
        },
        {
            icon:'trashCan',
            text:'Remove Table',
            action:{
                type:'remove'
            }
        }
    ]
    const isTable = useTable(editor);

    const handleContextMenu = (e) => {
        if(!isTable) return;
        setSelection(editor.selection);
        e.preventDefault();
        setShowMenu(true);
        // console.log(e);
        const xPos = e.pageX  + "px";
        const yPos = e.pageY  + "px";
        setMenuLocation({
            top:yPos,
            left:xPos
        })
    }
    const handleInsert = ({type,position}) =>{
        Transforms.select(editor,selection)
        switch(type){
            case 'insertRow':
                table.insertRow(position);
                break;
            case 'insertColumn':
                table.insertColumn(position);
                break;
            case 'remove':
                table.removeTable();
                break;
            default:
                return;

        }
        ReactEditor.focus(editor);
    }
    const handleClick = ()=>{
        setShowMenu(false);
    }
    useEffect(()=>{
        document.addEventListener('click',handleClick);
        document.addEventListener('contextmenu',handleContextMenu);

        return ()=>{
            document.removeEventListener('click',handleClick);
            document.removeEventListener('contextmenu',handleContextMenu);
        }
    },[isTable])

    return (
            showMenu && 
            <div className='contextMenu' style={{top:menuLocation.top,left:menuLocation.left}}>
                {
                    menu.map(({icon,text,action},index) => 
                        <div className='menuOption' key={index} onClick={() => handleInsert(action)}>
                            <Icon icon={icon}/>
                            <span>{text}</span>
                        </div>
                    )
                }
            </div> 
    )
}

export default TableContextMenu;