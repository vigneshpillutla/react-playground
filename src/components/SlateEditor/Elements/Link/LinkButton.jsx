
import {useRef, useState} from 'react'
import { insertLink } from '../../utils/link.js'
import Button from '../../common/Button'
import Icon from '../../common/Icon'
import {isBlockActive} from '../../utils/SlateUtilityFunctions.js'
import usePopup  from '../../utils/customHooks/usePopup'
import { Transforms } from 'slate'

const LinkButton = (props)=>{
    const {editor} = props
    const linkInputRef = useRef(null);
    const [showInput,setShowInput] = usePopup(linkInputRef)
    const [url,setUrl] = useState('')
    const [showInNewTab,setShowInNewTab] = useState(false)
    const [selection,setSelection] = useState()
    const handleInsertLink = ()=>{
        Transforms.select(editor,selection);
        insertLink(editor,{url,showInNewTab})
        setUrl('');
        setShowInput(prev => !prev);
        setShowInNewTab(false);
    }
    const toggleLink = ()=>{
        setSelection(editor.selection);
        setShowInput(prev => !prev);
    }
    const handleInputChange = ({target})=>{
        if(target.type === 'checkbox'){
            setShowInNewTab(prev => !prev);
        }
        else{
            setUrl(target.value)
        }
    }
    return (
        <div  ref={linkInputRef} className='popup-wrapper'>
            <Button className={showInput?'clicked':''} active={isBlockActive(editor,'link')} format={'link'} onClick={toggleLink}>
                <Icon icon='link'/>
            </Button>
            {
                showInput &&
                <div className='popup'>
                    <div style={{display:'flex',gap:'4px',margin:'5px 2px'}}>
                        <input type="text" placeholder='https://google.com' value={url} onChange={handleInputChange} />
                        <div onClick={handleInsertLink}><Icon icon='add'/></div>
                    </div>
                    <label>
                        <input type="checkbox" checked={showInNewTab} onChange={handleInputChange}/>
                        <span style={{fontSize:'0.8em'}}>Open in new tab</span>
                    </label>
                </div>
            }
        </div>
    )
}


export default LinkButton;