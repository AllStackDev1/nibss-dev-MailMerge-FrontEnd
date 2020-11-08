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
            onEditorStateChange={editorState => {
                setEditorState(editorState);
                onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
            }}
            placeholder="Write something"
        />
    );
};

export default Preview;
