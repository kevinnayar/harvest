import { TypeBaseDispatch, TypeApiXferStatus } from './baseTypes';

export const GET_ZONE_REQUESTED = 'GET_ZONE_REQUESTED';
export const GET_ZONE_SUCCEEDED = 'GET_ZONE_SUCCEEDED';
export const GET_ZONE_FAILED = 'GET_ZONE_FAILED';

interface IZoneKeys {
  GET_ZONE_REQUESTED: 'GET_ZONE_REQUESTED',
  GET_ZONE_SUCCEEDED: 'GET_ZONE_SUCCEEDED',
  GET_ZONE_FAILED: 'GET_ZONE_FAILED',
}

export type TypeZoneDispatch = TypeBaseDispatch & {
  type: keyof IZoneKeys;
};

export type TypeZoneState = {
  id: number;
  zipcode: number;
  zone: string;
  tRange: string;
};

export type TypeZoneReducer = {
  getZoneXferStatus: TypeApiXferStatus;
  zoneState: void | TypeZoneState;
};

