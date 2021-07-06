import React, {useRef, useState} from 'react';
import Icon from '../../common/Icon'
import usePopup from '../../utils/usePopup'
import { Transforms } from 'slate';
import { TableUtil } from '../../utils/table.js'
import './Table.css'

const Table = ({editor})=>{
    const tableOptionsRef = useRef();
    const [selection,setSelection] = useState()
    const [showOptions,setShowOptions] = usePopup(tableOptionsRef);
    
    const table = new TableUtil(editor);

    const handleButtonClick = ()=>{
        setSelection(editor.selection);
        setShowOptions(prev => !prev)
    }
    const handleOption = (action) =>{
        selection && Transforms.select(editor,selection)
        switch(action){
            case 'insertTable':
                table.insertTable();
                break;
            case 'insertRow':
                table.insertRow();
                break;
            case 'insertColumn':
                table.insertColumn();
                break;
            case 'removeTable':
                table.removeTable();
                break;
            default:
                return;
        }
        setShowOptions(false)
    }
    return (
        <div ref={tableOptionsRef} className='popup-wrapper'>
            <button  style={{border: showOptions?'1px solid lightgray':'none'}}  title='table' onClick={handleButtonClick}>
                <Icon icon='table'/>
            </button>
            {
                showOptions&&
                <div  className='popup'>
                    <div className='table-option' onClick={()=>handleOption('insertTable')}>
                        <Icon icon='table'/>
                        <span>Insert Table</span>
                    </div>
                    <div className='table-option' onClick={()=>handleOption('insertRow')}>
                        <Icon icon='row'/>
                        <span>Insert Row</span>
                    </div>
                    <div className='table-option' onClick={()=>handleOption('insertColumn')}>
                        <Icon icon='column'/>
                        <span>Insert Column</span>
                    </div>
                    <div className='table-option' onClick={()=>handleOption('removeTable')}>
                        <Icon icon='removeTable'/>
                        <span>Remove Table</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Table;