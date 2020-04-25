import { TypeBaseDispatch, TypeApiXferStatus } from './baseTypes';

export const ZONE_GET_BY_ZIPCODE_REQUESTED = 'ZONE_GET_BY_ZIPCODE_REQUESTED';
export const ZONE_GET_BY_ZIPCODE_SUCCEEDED = 'ZONE_GET_BY_ZIPCODE_SUCCEEDED';
export const ZONE_GET_BY_ZIPCODE_FAILED = 'ZONE_GET_BY_ZIPCODE_FAILED';

interface IZoneKeys {
  ZONE_GET_BY_ZIPCODE_REQUESTED: 'ZONE_GET_BY_ZIPCODE_REQUESTED',
  ZONE_GET_BY_ZIPCODE_SUCCEEDED: 'ZONE_GET_BY_ZIPCODE_SUCCEEDED',
  ZONE_GET_BY_ZIPCODE_FAILED: 'ZONE_GET_BY_ZIPCODE_FAILED',
}

export type TypeZoneDispatch = TypeBaseDispatch & {
  type: keyof IZoneKeys;
};

export type TypeZoneState = {
  id: string;
  zipcode: string;
  zone: string;
  tRange: string;
  firstFrostDay: number;
  firstFrostMonth: number;
  lastFrostDay: number;
  lastFrostMonth: number;
};

export type TypeZoneReducer = {
  getZoneXferStatus: TypeApiXferStatus;
  zoneState: void | TypeZoneState;
};

