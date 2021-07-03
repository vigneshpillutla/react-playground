import React from 'react'
import Button from '../common/Button'
import Icon from '../common/Icon'
import { toggleBlock, toggleMark, isMarkActive, addMarkData, isBlockActive,activeMark} from '../utils/SlateUtilityFunctions.js'
import { insertLink, removeLink } from '../utils/link.js'

export const BlockButton = ({format,editor}) =>{
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

export const MarkButton = ({format,editor})=>{
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
