import { TypeUserReducer, TypeUserDispatch } from './userTypes';

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

export type TypeDBConfig = {
  database: string;
  host: string;
  port: number;
  user: string;
};