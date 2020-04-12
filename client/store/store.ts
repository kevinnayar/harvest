import { applyMiddleware, createStore, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { TypeAppReducer, TypeAppDispatch } from '../../types/baseTypes';

const middleware = [
  applyMiddleware(thunk),
  ...(process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? [(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()]
    : []),
];

const store: Store<TypeAppReducer, TypeAppDispatch> = createStore(reducers, compose(...middleware));

export default store;
