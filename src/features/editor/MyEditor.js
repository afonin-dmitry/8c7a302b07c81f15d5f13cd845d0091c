import React, { useEffect } from 'react';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';

import Paper from '@mui/material/Paper';

const MyEditor = ({ editorState, onUpdateEditorState, onLoad }) => {
    useEffect(() => onLoad(), []);

    return (
        <Paper sx={{ height: '100vh', px: '5vw', pt: '50px', mx :'10vw' }} elevation={ 5 }>
            <Editor
                editorState={ editorState }
                onChange={ onUpdateEditorState }
                onFocus={ (e) => console.log(e) }
            />
        </Paper>
    );
};

export default MyEditor;