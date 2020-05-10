import { combineReducers, Reducer } from 'redux';
import plant from './plant/plantReducer';
import user from './user/userReducer';
import zone from './zone/zoneReducer';
import { TypeAppReducer, TypeAppDispatch } from '../../types/baseTypes';

const reducers: Reducer<TypeAppReducer, TypeAppDispatch> = combineReducers({
  plant,
  user,
  zone,
});

export default reducers;
