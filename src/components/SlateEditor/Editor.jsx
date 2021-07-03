import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Editor,createEditor, Transforms,Text, Mark , Element as SlateElement} from 'slate';
import {Slate, Editable, withReact } from 'slate-react';
import Toolbar from './Toolbar/Toolbar'
import { sizeMap, fontFamilyMap } from './utils/SlateUtilityFunctions.js'
import withLinks from './plugins/withLinks.js'
import withTables from './plugins/withTable.js'
import './Editor.css'
import Link from'./Link/Link'

const ChildrenLeaf = ()=>{
    return (
        <span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">First line of text in Slate JS. </span></span></span>
    )
}
const Table = ({attributes,element,children})=>{
    return(
        <table>
            <tbody {...attributes}>
               {children}
            </tbody>
        </table>
    )
}
const Element = (props) =>{
    // console.log(attributes);
    const {attributes, children, element} = props;
    switch(element.type){
        case 'headingOne':
            return <h1 {...attributes}>{children}</h1>
        case 'headingTwo':
            return <h2 {...attributes}>{children}</h2>
        case 'blockquote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'alignLeft':
            return <p style={{textAlign:'left',listStylePosition:'inside'}} {...attributes}>{children}</p>
        case 'alignCenter':
            return <p style={{textAlign:'center',listStylePosition:'inside'}} {...attributes}>{children}</p>
        case 'alignRight':
            return <p style={{textAlign:'right',listStylePosition:'inside'}} {...attributes}>{children}</p>
        case 'list-item':
            return  <li {...attributes}>{children}</li>
        case 'orderedList':
            return <ol type='1' {...attributes}>{children}</ol>
        case 'unorderedList':
            return <ul {...attributes}>{children}</ul>
        case 'link':
            return <Link {...props}/>
        case 'table':
            return <table >
                <tbody {...attributes}>{children}</tbody>
            </table>
        case 'table-row':
            return <tr {...attributes}>{children}</tr>
        case 'table-cell':
            return <td {...attributes}>{children}</td>
        default :
            return <p {...attributes}>{children}</p>
    }
}
const Leaf = ({ attributes, children, leaf }) => {
    // console.log(attributes);
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
  
    if (leaf.code) {
      children = <code>{children}</code>
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>
    }
    if(leaf.strikethrough){
        children = <span style={{textDecoration:'line-through'}}>{children}</span>
    }
    if (leaf.underline) {
      children = <u>{children}</u>
    }
    if(leaf.superscript){
        children = <sup>{children}</sup>
    }
    if(leaf.subscript){
        children = <sub>{children}</sub>
    }
    if(leaf.color){
        children = <span style={{color:leaf.color}}>{children}</span>
    }
    if(leaf.bgColor){
        children = <span style={{backgroundColor:leaf.bgColor}}>{children}</span>
    }
    if(leaf.fontSize){
        const size = sizeMap[leaf.fontSize]
        children = <span style={{fontSize:size}}>{children}</span>
    }
    if(leaf.fontFamily){
        const family = fontFamilyMap[leaf.fontFamily]
        children = <span style={{fontFamily:family}}>{children}</span>
    }
    return <span {...attributes}>{children}</span>
}
const SlateEditor = ()=>{
    const editor = useMemo(() => withTables(withLinks(withReact(createEditor()))), []);
    
    const [value,setValue] = useState([
        {
            type:'paragaph',
            children:[{text:'First line of text in Slate JS. '}],
        },
    ]);


    const renderElement = useCallback(props => <Element {...props}/>,[])

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    
    return (
            <Slate editor = {editor} value = {value} onChange = {newValue => setValue(newValue)} >
                <Toolbar />
                <div className="editor-wrapper" style={{border:'1px solid #f3f3f3',padding:'0 10px'}}>
                    <Editable
                        placeholder='Write something'
                        renderElement={renderElement} 
                        renderLeaf={renderLeaf}
                    />
                </div>
        </Slate>
        
    )
}

export default SlateEditor