import { combineReducers } from 'redux';
import { detailsReducer } from "./details.reducer";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root", 
    storage, 
    whitelist: ["details"]
}

const rootReducer = combineReducers({
    details: detailsReducer, 
})

export default persistReducer(persistConfig, rootReducer);