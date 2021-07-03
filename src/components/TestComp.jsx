import React from 'react'
import { SlateEditor, SlateToolbar, SlateContent } from 'slate-editor'
import { BoldPlugin, BoldButtonBar } from '@slate-editor/bold-plugin'

const plugins = [
  BoldPlugin()
]

const SlateRichTextEditor = () => (
        <SlateEditor plugins={plugins}>
    <SlateToolbar>
      <BoldButtonBar />
    </SlateToolbar>

    <SlateContent />
  </SlateEditor>
    // <div>hey</div>
)

export default SlateRichTextEditor