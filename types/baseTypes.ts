import { TypeUserReducer, TypeUserDispatch } from './userTypes';
import { TypeZoneReducer, TypeZoneDispatch } from './zoneTypes';

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
  zone: TypeZoneReducer;
};

export type TypeAppDispatch = TypeUserDispatch | TypeZoneDispatch;

export type TypeDBConfig = {
  database: string;
  host: string;
  port: number;
  user: string;
};

export type TypeHttpException = {
  status: number;
  statusText: string;
  message: string;
};

export type TypeMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
;

