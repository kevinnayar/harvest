import { TypeStatus, TypeEntityPlant } from './entityTypes';
import { TypeBaseDispatch, TypeApiXferStatus } from './baseTypes';

export const PLANT_CREATE_REQUESTED = 'PLANT_CREATE_REQUESTED';
export const PLANT_CREATE_SUCCEEDED = 'PLANT_CREATE_SUCCEEDED';
export const PLANT_CREATE_FAILED = 'PLANT_CREATE_FAILED';

export const PLANT_GET_ALL_REQUESTED = 'PLANT_GET_ALL_REQUESTED';
export const PLANT_GET_ALL_SUCCEEDED = 'PLANT_GET_ALL_SUCCEEDED';
export const PLANT_GET_ALL_FAILED = 'PLANT_GET_ALL_FAILED';

interface IPlantCreateKeys {
  PLANT_CREATE_REQUESTED: 'PLANT_CREATE_REQUESTED';
  PLANT_CREATE_SUCCEEDED: 'PLANT_CREATE_SUCCEEDED';
  PLANT_CREATE_FAILED: 'PLANT_CREATE_FAILED';
};

interface IPlantGetAllKeys {
  PLANT_GET_ALL_REQUESTED: 'PLANT_GET_ALL_REQUESTED';
  PLANT_GET_ALL_SUCCEEDED: 'PLANT_GET_ALL_SUCCEEDED';
  PLANT_GET_ALL_FAILED: 'PLANT_GET_ALL_FAILED';
};

export type TypePlantCreateDispatch = TypeBaseDispatch & {
  type: keyof IPlantCreateKeys;
};

export type TypePlantGetAllDispatch = TypeBaseDispatch & {
  type: keyof IPlantGetAllKeys;
};

export type TypePlantDispatch =
  | TypePlantCreateDispatch
  | TypePlantGetAllDispatch;

export type TypePlantReducer = {
  plantCreateXferStatus: TypeApiXferStatus;
  plantGetAllXferStatus: TypeApiXferStatus;
  plants: TypeEntityPlant[];
};

