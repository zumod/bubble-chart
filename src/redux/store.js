import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from "redux-thunk";
//import { createLogger } from 'redux-logger';
//import rootReducer from '../_reducers';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist'
//const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);
