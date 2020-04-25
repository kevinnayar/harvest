import { apiXferInit, apiXferRequested, apiXferSucceeded, apiXferFailed } from '../../../utils/apiUtils';
import {
  ZONE_GET_BY_ZIPCODE_REQUESTED,
  ZONE_GET_BY_ZIPCODE_SUCCEEDED,
  ZONE_GET_BY_ZIPCODE_FAILED,
  TypeZoneReducer,
  TypeZoneDispatch,
} from '../../../types/zoneTypes';

const initialState: TypeZoneReducer = {
  getZoneXferStatus: apiXferInit(),
  zoneState: undefined,
};

export default function zoneReducer(
  state: TypeZoneReducer = initialState,
  action: TypeZoneDispatch,
): TypeZoneReducer {
  switch (action.type) {
    case ZONE_GET_BY_ZIPCODE_REQUESTED: {
      return {
        ...state,
        getZoneXferStatus: apiXferRequested(),
      };
    }
    case ZONE_GET_BY_ZIPCODE_SUCCEEDED: {
      return {
        ...state,
        getZoneXferStatus: apiXferSucceeded(),
        zoneState: action.payload,
      };
    }
    case ZONE_GET_BY_ZIPCODE_FAILED: {
      return {
        ...state,
        getZoneXferStatus: apiXferFailed(action.error),
        zoneState: undefined,
      };
    }

    default:
      return state;
  }
}
