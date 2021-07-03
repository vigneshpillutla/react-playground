import React from "react";
import formats from './ToolbarOptions.js'

const renderOptions = (formatData)=>{
    const {className,options} = formatData;
    return (
        <select className = {className}>
            <option selected="selected"></option>
            {
                options.map(value =>{
                    return (
                        <option value={value}></option>
                    )
                })
            }
        </select>
    )
}
const renderSingle = (formatData)=>{
    const {className,value} = formatData;
    return (
        <button className = {className} value = {value}></button>
    )
}
const CustomToolbar = () => (
    <div id="toolbar">
        {
            formats.map(classes => {
                return (
                    <span className = "ql-formats">
                        {
                            classes.map(formatData => {
                                return formatData.options?renderOptions(formatData):renderSingle(formatData)
                            })
                        }
                    </span>
                )
            })
        }
    </div>
  )
  export default CustomToolbar;