const toolbarGroups = [
    [
        {
            format:'fontFamily',
            type:'dropdown',
            options:[{text:'Sans Serif',value:'sans'},{text:'Serif',value:'serif'},{text:'MonoSpace',value:'monospace'}]
        },
        {
            format:'fontSize',
            type:'dropdown',
            options:[{text:'Small',value:'small'},{text:'Normal',value:'normal'},{text:'Medium',value:'medium'},{text:'Huge',value:'huge'}]
        }
    ],
    [
        {
            format:'bold',
            type:'mark',
        },
        {
            format:'italic',
            type:'mark',
        },
        {
            format:'underline',
            type:'mark',
        },
        {
            format:'strikethrough',
            type:'mark',
        },
    ],
    // [
    //     {
    //         format:'color',
    //         type:'dropdown',
    //         options:[{text:'black',value:'black'},{text:'white',value:'white'},{text:'green',value:'green'},{text:'red',value:'red'},{text:'blue',value:'blue'},{text:'orange',value:'orange'}]
    //     },
    //     {
    //         format:'bgColor',
    //         type:'dropdown',
    //         options:[{text:'black',value:'black'},{text:'white',value:'white'},{text:'green',value:'green'},{text:'red',value:'red'},{text:'blue',value:'blue'},{text:'orange',value:'orange'}]
    //     }
    // ],
    [
        {
            format:'superscript',
            type:'mark',
        },
        {
            format:'subscript',
            type:'mark',
        },
    ],
    [
        {
            format:'headingOne',
            type:'block',
        },
        {
            format:'headingTwo',
            type:'block',
        },
        {
            format:'blockquote',
            type:'block',
        },
    ],
    [
        {
            format:'orderedList',
            type:'block'
        },
        {
            format:'unorderedList',
            type:'block'
        }
    ],
    [
        {
            format:'alignLeft',
            type:'block'
        },
        {
            format:'alignCenter',
            type:'block'
        },
        {
            format:'alignRight',
            type:'block'
        },
    ],




]

export default toolbarGroups