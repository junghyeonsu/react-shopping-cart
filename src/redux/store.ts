import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { rootReducer, rootSaga } from './root'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancer = applyMiddleware(sagaMiddleware)

const store = createStore(rootReducer, composeEnhancer)

sagaMiddleware.run(rootSaga)

export default store
