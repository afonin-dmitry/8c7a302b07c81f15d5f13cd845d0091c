import EditorJs from "react-editor-js";
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import React, { useRef, useEffect } from 'react';
import useCaret from './useCaret';

const StyledWrapper = styled.div`
    & .ce-toolbar {
        display: none !important;
    }

    & .ce-block__content {
        max-width: none;
        margin: auto 5vw;
    }

    & .codex-editor {
        min-height: 95vh;

        &__redactor {
            min-height: 95vh;
            padding-bottom: 0px !important;
            margin-bottom: 59px;
        }
    }
    & .ce-block:first-of-type {
        padding-top: 50px;
    }
`;

const Editor = ({ onCaretMove, onTextChange }) => {
    const editorInstanceRef = useRef();
    const caret = useCaret();

    useEffect(() => {
        if (caret.visible) {
            const blockIndex = editorInstanceRef.current.blocks.getCurrentBlockIndex();
            const caretIndex = caret.position;

            onCaretMove({ blockIndex, caretIndex });
        }
    }, [ caret ]);

    return (
        <Container maxWidth="lg">
            <Paper sx={{ height: '100%' }} elevation={ 5 }>
                <StyledWrapper>
                    <EditorJs
                        instanceRef={ (instance) => editorInstanceRef.current = instance }
                        placeholder={ 'Let`s tell an awesome story!' }
                        onChange={ (api, data) => onTextChange(data) }
                    />
                </StyledWrapper>
            </Paper>
        </Container>
    )
};

export default Editor;