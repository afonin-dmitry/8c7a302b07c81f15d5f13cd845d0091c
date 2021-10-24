import React, { useEffect, useState } from 'react';

const getCaretState = () => {
    const selection = document.getSelection();
    const position = selection.anchorOffset;
    const visible = selection.type === 'Caret';

    return { position, visibility: visible }
}

const useCaret = () => {
    const [ state, setState ] = useState(getCaretState());
    const handleSelectionChange = () => setState(getCaretState());

    useEffect(() => {
        document.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    });

    return state;
}

export default useCaret;