import { combineReducers } from 'redux';
import { userReducer } from "./user.reducer";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root", 
    storage, 
    whitelist: ["auth"]
}

const rootReducer = combineReducers({
    user: userReducer, 
})

export default persistReducer(persistConfig, rootReducer);