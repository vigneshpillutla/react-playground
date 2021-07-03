import React, { useEffect, useRef, useState } from 'react';
import {MdFormatColorText, MdFormatColorFill} from 'react-icons/md'
import './ColorPicker.css'
import {colors} from './defaultColors.js'
import { addMarkData,activeMark } from '../utils/SlateUtilityFunctions.js'
import { Transforms } from 'slate';

const logo = {
    color:<MdFormatColorText size={20}/>,
    bgColor:<MdFormatColorFill size={20}/>,
}
const ColorPicker = ({format,editor}) =>{
    const [showOptions,setShowOptions] = useState(false)
    const [selection,setSelection] = useState()
    const colorPickerRef = useRef();
    
    useEffect(()=>{
        document.addEventListener('click',handleDocumentClick)
        return () =>{

            document.removeEventListener('click',handleDocumentClick);
        }
        
    },[])
    const handleDocumentClick = (e)=>{
        const clickedComponent = e.target;
        if(!colorPickerRef?.current?.contains(clickedComponent)){
            setShowOptions(false);
        }
    }
    const changeColor = (e) =>{
        const clickedColor = e.target.getAttribute("data-value");
        selection && Transforms.select(editor,selection)

        addMarkData(editor,{format,value:clickedColor})
        setShowOptions(false);
    }
    const toggleOption = ()=>{
        setSelection(editor.selection);
        selection && Transforms.select(editor,selection)
        setShowOptions(prev => !prev)
    }
    return (
        <div className='color-picker'ref={colorPickerRef}>
            <button style={{color:showOptions?'black':activeMark(editor,format),opacity:'1'}} className={showOptions?'clicked':''} onClick={toggleOption}>{logo[format]}</button>
            {showOptions &&

            <div className='color-options'>
                {
                    colors.map((color, index) => {
                        return <div key={index} data-value={color} onClick={changeColor} className='option' style={{background:color}}></div>
                    })
                }

            </div>
            }
        </div>
    )
}

export default ColorPicker;
