import { createSlice, createAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects';
import Api from './Api';

const initList = createAction('initList');
const download = createAction('download');

export const ListSlice = createSlice({
    name: 'list',
    initialState: {
        data: [],
    },
    reducers: {
        initData: (state, action) => { state.data = action.payload },
    }
})

function* getListData() {
    const data = yield call(Api.getList);
    yield put(initData(data));
}

function* getListDataSaga() {
    yield takeEvery(initList, getListData)
}

function* getDocument(action) {
    const data = yield call(Api.getDocument, action.payload);
    yield put(initData(data));
}

function* downloadDocumentSaga() {
    yield takeEvery(download, getDocument)
}

export default ListSlice.reducer;
export { initList, download };
export const { initData } = ListSlice.actions;
export const selectListData = state => state.list.data;
export { getListDataSaga, downloadDocumentSaga };