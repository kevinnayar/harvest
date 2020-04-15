import { apiXferInit, apiXferRequested, apiXferSucceeded, apiXferFailed } from '../../../utils/reduxUtils';
import {
  GET_ZONE_REQUESTED,
  GET_ZONE_SUCCEEDED,
  GET_ZONE_FAILED,
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
    case GET_ZONE_REQUESTED: {
      return {
        ...state,
        getZoneXferStatus: apiXferRequested(),
      };
    }
    case GET_ZONE_SUCCEEDED: {
      return {
        ...state,
        getZoneXferStatus: apiXferSucceeded(),
        zoneState: action.payload,
      };
    }
    case GET_ZONE_FAILED: {
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
