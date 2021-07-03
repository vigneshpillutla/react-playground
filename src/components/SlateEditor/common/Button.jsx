import React from 'react'

const Button =(props)=>{
    const {children,format,active, ...rest} = props
    return(
        <button  className={active?'btnActive':""} title={format} {...rest} style={{width:'30px',height:'20px',margin:'0 2px'}}>
            {props.children}
        </button>
    )
}

export default Button;