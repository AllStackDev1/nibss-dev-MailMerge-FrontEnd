import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Preview = ({ onChange }) => {
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={changedEditorState => {
                setEditorState(changedEditorState);
                onChange(draftToHtml(convertToRaw(changedEditorState.getCurrentContent())));
            }}
            placeholder="Write something"
            data-test="preview" />
    );
};

export default Preview;
