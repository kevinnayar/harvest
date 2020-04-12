import { combineReducers, Reducer } from 'redux';
import user from './user/userReducer';
import { TypeAppReducer, TypeAppDispatch } from '../../types/baseTypes';

const reducers: Reducer<TypeAppReducer, TypeAppDispatch> = combineReducers({
  user,
});

export default reducers;
