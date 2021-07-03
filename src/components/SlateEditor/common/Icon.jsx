import React from 'react';
import bold from '../Toolbar/toolbarIcons/bold.png'
import italic from '../Toolbar/toolbarIcons/italic.png'
import strikethrough from '../Toolbar/toolbarIcons/strikethrough.png'
import underline from '../Toolbar/toolbarIcons/underline.png'
import headingOne from '../Toolbar/toolbarIcons/headingOne.svg'
import headingTwo from '../Toolbar/toolbarIcons/headingTwo.svg'
import blockquote from '../Toolbar/toolbarIcons/blockquote.svg'
import superscript from '../Toolbar/toolbarIcons/superscript.svg'
import subscript from '../Toolbar/toolbarIcons/subscript.svg'
import alignLeft from '../Toolbar/toolbarIcons/align-left.svg'
import alignCenter from '../Toolbar/toolbarIcons/align-center.svg'
import alignRight from '../Toolbar/toolbarIcons/align-right.svg'
import orderedList from '../Toolbar/toolbarIcons/orderedList.svg'
import unorderedList from '../Toolbar/toolbarIcons/unorderedList.svg'
import link from '../Toolbar/toolbarIcons/link.svg'
import unlink from '../Toolbar/toolbarIcons/unlink.svg'
import { MdFormatBold, MdFormatItalic, MdStrikethroughS, MdFormatUnderlined, MdFormatQuote, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight, MdFormatListNumbered, MdFormatListBulleted,MdInsertLink} from 'react-icons/md'
import { BsTypeH1, BsTypeH2 } from 'react-icons/bs'
import { FaSuperscript,FaSubscript } from 'react-icons/fa'
const iconList={
    bold:<MdFormatBold size={20}/>,
    italic:<MdFormatItalic size={20}/>,
    strikethrough:<MdStrikethroughS size={20}/>,
    underline:<MdFormatUnderlined size={20}/>,
    headingOne:<BsTypeH1 size={20}/>,
    headingTwo:<BsTypeH2 size={20}/>,
    blockquote:<MdFormatQuote size={20}/>,
    superscript:<FaSuperscript size={15}/>,
    subscript:<FaSubscript size={15}/>,
    alignLeft:<MdFormatAlignLeft size={20}/>,
    alignCenter:<MdFormatAlignCenter size={20}/>,
    alignRight:<MdFormatAlignRight size={20}/>,
    orderedList:<MdFormatListNumbered size={20}/>,
    unorderedList:<MdFormatListBulleted size={20}/>,
    link:<MdInsertLink size={20}/>,
}




const Icon = (props)=>{
    const {icon} = props
    return(
        iconList[icon]
        // <img  src={iconList[icon]} alt="" style={{height:'100%',width:'100%'}} />
    )
}

export default Icon;