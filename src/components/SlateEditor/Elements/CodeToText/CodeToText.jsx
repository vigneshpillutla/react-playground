import React, { useEffect, useRef, useState } from 'react';
import './CodeToText.css'
import Icon from '../../common/Icon'
import Interweave from 'interweave'
import { Transforms } from 'slate';
import { useSlateStatic } from 'slate-react';
const CodeToText = (props)=>{

    const {html,action,location,handleCodeToText} = props
    const codeToTextRef = useRef();
    const wrapperRef = useRef();

    const editor = useSlateStatic();
    const checkClick = (e)=>{
        const clickedComponent = e.target;
            if(wrapperRef?.current?.contains(clickedComponent)&& !codeToTextRef?.current?.contains(clickedComponent)){
                let partialState = {
                    showInput:false
                }
                if(html){
                    partialState.html = action === 'update' ? '' : html 
                }
                handleCodeToText(partialState);
            }
    }
    useEffect(()=>{
        document.addEventListener('click',checkClick);
        return ()=>{
            document.removeEventListener('click',checkClick);
        }
    },[])

    const codeOnChange = async(e)=>{
        // e.preventDefault();
        handleCodeToText({html:e.target.value});
    }
    const addHtml = ()=>{
        if(html){

            if(action === 'update'){
                Transforms.setNodes(editor,{
                    html,
                },{
                    at:location
                })
                
            }
            else{
                Transforms.insertNodes(editor,{
                    type:'htmlCode',
                    html:html,
                    children:[{text:''}]
                },
                {
                    select:true
                })
                Transforms.insertNodes(editor,{type:'paragraph',children:[{text:''}]})
            }
        }
        handleCodeToText({
            showInput:false,
            html:''
        })
    }
    const clearHtml = ()=>{
        handleCodeToText({html:''});
    }
    return (
      
        <div className='code-wrapper' ref={wrapperRef}>
           <div ref={codeToTextRef} className='codeToTextWrapper'>
                <div className='codeToText'>
                    <textarea name="" id="" value={html} onChange={codeOnChange} placeholder='Write html here...'></textarea>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
                        <Icon icon='arrowRight'/>
                    </div>
                   <div  className='textOutput'>
                        <Interweave content={html}/>
                    </div>
                </div>
                <div>
                    <button onClick={addHtml} className='done'>Done</button>
                    <button className='clear' onClick={clearHtml}>Clear</button>
                </div>
            </div>
        </div>
 
    )
}

export default CodeToText;