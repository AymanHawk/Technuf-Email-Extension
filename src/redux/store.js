import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const devTools =  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : () => (noop) => noop;

const middlewares = [
    sagaMiddleware, // Redux-Saga
];

const enhancers = [applyMiddleware(...middlewares), devTools()];

const composedEnhancers = compose(...enhancers);

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, composedEnhancers);

export let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;

