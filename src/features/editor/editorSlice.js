import { createSlice, createAction } from '@reduxjs/toolkit'
import { EditorState } from 'draft-js';
import { call, put, takeEvery, throttle, race, debounce, takeLatest, all, delay } from 'redux-saga/effects';

const initEditorState = createAction('initEditorState');

export const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        editorState: EditorState.createEmpty(),
        uploaded: true,
    },
    reducers: {
        updateEditorState: (state, action) => { state.editorState = action.payload },
        uploaded: (state, action) => { state.uploaded = action.payload },
        upd: (state, action) => { console.log(action) },
    }
})

function* uploadEditorData(action) {
    yield call(() => { console.log(action) });
    yield put(uploaded(true));
}

function* setUpload() {
    yield put(uploaded(false));
}

function* uploadEditorDataSaga() {
    yield takeEvery(updateEditorState, setUpload);
    yield debounce(1000, updateEditorState, uploadEditorData);
}

function* downloadEditorData(action) {
    yield call(() => { console.log(action) });
    yield put(upd(14));
}

function* downloadEditorDataSaga() {
    yield takeEvery(initEditorState, downloadEditorData)
}

export default editorSlice.reducer;
export const { updateEditorState, upd, uploaded } = editorSlice.actions;
export { initEditorState };
export const selectEditorState = state => state.editor.editorState;
export { uploadEditorDataSaga, downloadEditorDataSaga };