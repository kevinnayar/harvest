import { TypeBaseDispatch, TypeApiXferStatus } from './baseTypes';
import { TypeEntityZone } from './entityTypes';

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

export type TypeZoneReducer = {
  getZoneXferStatus: TypeApiXferStatus;
  zoneState: void | TypeEntityZone;
};

