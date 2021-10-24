import { createSlice, createAction } from '@reduxjs/toolkit';
import {call, put, takeEvery, delay, debounce, take } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import MicrophoneRecorder from './MicrophoneRecorder';

export const recorderSlice = createSlice({
    name: 'recorder',
    initialState: {
        recording: false,
        init: false,
    },
    reducers: {
        startRecording: state => { state.recording = true },
        stopRecording: state => { state.recording = false },
        initRecorder: state => { state.init = true; console.log('init'); },
    }
})

const uploadChannel = channel();
// import { call, put, takeEvery, delay } from 'redux-saga/effects';
// import { updateEditorState } from '../editorSlice';
//
// function* callSelfOnTimer({ value }) {
//     // Do your work here
//
//     // If still true call yourself in 2 seconds
//     if (value) {
//         yield delay(2000);
//         yield call(callSelfOnTimer, { value });
//     }
// }
function* init() {
    yield call(MicrophoneRecorder.init.bind(MicrophoneRecorder));
}

function* initRecorderSaga() {
    yield takeEvery(initRecorder, init);
}

function* start() {
    yield call(MicrophoneRecorder.start.bind(MicrophoneRecorder), (e) => uploadChannel.put({type: 'UPLOAD', payload: e.data}), 10000);
}

function* startRecordingSaga() {
    yield takeEvery(startRecording, start);
}

function* stop() {
    yield call(MicrophoneRecorder.stop.bind(MicrophoneRecorder));
}

function* stopRecordingSaga() {
    yield takeEvery(stopRecording, stop);
}


function* watchUploadChannelSaga() {
    while (true) {
        const action = yield take(uploadChannel);
        // take payload and send to server
    }
}

export default recorderSlice.reducer;
export const { startRecording, stopRecording, initRecorder } = recorderSlice.actions;
export const selectRecording = state => state.recorder.recording;
export { initRecorderSaga, startRecordingSaga, stopRecordingSaga, watchUploadChannelSaga };










// actions: init, start, pause, stop



// saga: init -> request for permissions, init recorder,
// start -> start recording, push chunks, dispatch only one upload every N ms.
// if upload succeed - remove uploaded chunks?
// pause -> pause recording, dispatch upload chunks
// stop -> stop recording, dispatch all chunks upload

// to stop recording
// recorder.stop();

// on start recording
// start recording, bind dispatch event on chunk

// on stop recording
// stop recording, unbind dispatch event

// start recording dispatches chunks
// on chunks

// upload
// init
