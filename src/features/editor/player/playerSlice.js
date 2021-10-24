import { createSlice } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects';
import { updateEditorState } from '../editorSlice'

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        playing: false,
        played: 0,
    },
    reducers: {
        play: state => { state.playing = true },
        pause: state => { state.playing = false },
        seek: (state, action) => { state.played = action.payload },
    },
    extraReducers: builder => {
        builder.addCase(updateEditorState, (state, action) => {
            //debugger;
        })
    }
})

export default playerSlice.reducer;
export const { play, pause, seek } = playerSlice.actions;
export const selectPlaying = state => state.player.playing;
export const selectPlayed = state => state.player.played;

function* sendRecording(action) {
    // yield call(() => { console.log(action) });
    // yield put(seek(0));
}

function* playerSaga() {
    // yield takeEvery(stop, sendRecording);
}

export { playerSaga };


// переместили каретку dispatch => поменяли прогресс
//