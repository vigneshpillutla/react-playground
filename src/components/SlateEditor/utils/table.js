import { Transforms } from 'slate'

export const insertTable = (editor)=>{
    const rows = prompt('Enter number of rows ');
    const columns = prompt('Enter number of columns');
    if(!rows || !columns){
        return;
    }
    const cellText = Array.from({ length: rows }, () => Array.from({ length: columns }, () => ""))
    const newTable = createTableNode(cellText);
    Transforms.insertNodes(editor,newTable);
    Transforms.insertNodes(editor,{type:'paragraph',children:[{text:""}]},{mode:'highest'})
}

const createRow = (cellText)=>{
    const newRow = Array.from(cellText,(value)=> createTableCell(value));
    return {
        type:'table-row',
        children:newRow
    };
}

const createTableCell = (text)=>{
    return {
        type:'table-cell',
        children:[ { text } ]
    }
}

const createTableNode = (cellText)=>{
    const tableChildren = Array.from( cellText,(value) => createRow(value))
    let tableNode = {type:'table',children:tableChildren}
    return tableNode;
}

export const insertCells = (editor,tableNode,path,action)=>{
    console.log(tableNode);
    let existingText = Array.from(tableNode.children,(rows) => Array.from(rows.children,(arr) => arr.children[0].text))
    const columns = existingText[0].length;
    if(action === 'row'){
        existingText.push(Array(columns).fill(""));
    }
    else{
        existingText = Array.from(existingText,(item) => {
            item.push("");
            return item
        })
    }
    const newTable = createTableNode(existingText)
    Transforms.insertNodes(editor,newTable,{
        at:path
    })
}