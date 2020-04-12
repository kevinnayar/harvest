import { TypeUserReducer, TypeUserDispatch, TypeUserEntity } from './userTypes';
import { TypePlantEntity } from './plantTypes';

export type TypeApiXferStatus = {
  requested: boolean;
  succeeded: boolean;
  failed: boolean;
  error: null | string;
};

export type TypeBaseDispatch = {
  payload?: any;
  error?: any;
};

export type TypeAppReducer = {
  user: TypeUserReducer;
};

export type TypeAppDispatch = TypeUserDispatch;

export type TypeEntityTypes = 'TypeUserEntity' | 'TypePlantEntity';

export type TypeEntity = TypeUserEntity | TypePlantEntity;
