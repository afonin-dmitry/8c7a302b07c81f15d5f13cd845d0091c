import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Player from './player/Player';

import { play, pause, seek, selectPlaying, selectPlayed } from './player/playerSlice';
import { selectEditorState, updateEditorState, initEditorState } from './editorSlice';
import MyEditor from './MyEditor';

const EditorPage = () => {
    const playing = useSelector(selectPlaying);
    const played = useSelector(selectPlayed);
    const dispatch = useDispatch();

    // useEffect(() => dispatch( initRecorder() ), []);

    return (
        <div>
            <MyEditor
                editorState={ useSelector(selectEditorState) }
                onUpdateEditorState={ (payload) => dispatch(updateEditorState(payload)) }
                onLoad={ (payload) => dispatch(initEditorState(payload)) }
            />
            <Player
                played={ played }
                playing={ playing }
                onStart={ () => dispatch(play()) }
                onPause={ () => dispatch(pause()) }
                onProgress={ (payload) => dispatch(seek(payload)) }
            />
        </div>
    );
}

export default EditorPage;