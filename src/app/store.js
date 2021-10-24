import { configureStore } from '@reduxjs/toolkit'

import createSagaMiddleware from 'redux-saga'

import editorReducer, { uploadEditorDataSaga, downloadEditorDataSaga } from '../features/editor/editorSlice'
import playerReducer, { playerSaga } from '../features/editor/player/playerSlice';
import recorderReducer from '../features/editor/recorder/recorderSlice';
import ListReducer, { getListDataSaga, downloadDocumentSaga } from '../features/editor/ListSlice';
import { initRecorderSaga, startRecordingSaga, stopRecordingSaga, watchUploadChannelSaga } from '../features/editor/recorder/recorderSlice';

export const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        editor: editorReducer,
        player: playerReducer,
        recorder: recorderReducer,
        list: ListReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware);
    }
})
export default store;

sagaMiddleware.run(playerSaga);
sagaMiddleware.run(uploadEditorDataSaga);
sagaMiddleware.run(downloadEditorDataSaga);
sagaMiddleware.run(initRecorderSaga);
sagaMiddleware.run(startRecordingSaga);
sagaMiddleware.run(stopRecordingSaga);
sagaMiddleware.run(watchUploadChannelSaga);
sagaMiddleware.run(getListDataSaga);
sagaMiddleware.run(downloadDocumentSaga);
