import { combineReducers, Reducer } from 'redux';
import user from './user/userReducer';
import zone from './zone/zoneReducer';
import { TypeAppReducer, TypeAppDispatch } from '../../types/baseTypes';

const reducers: Reducer<TypeAppReducer, TypeAppDispatch> = combineReducers({
  user,
  zone,
});

export default reducers;
