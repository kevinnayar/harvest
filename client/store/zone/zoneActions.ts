import {
  ZONE_GET_BY_ZIPCODE_REQUESTED,
  ZONE_GET_BY_ZIPCODE_SUCCEEDED,
  ZONE_GET_BY_ZIPCODE_FAILED,
  TypeZoneDispatch,
} from '../../../types/zoneTypes';
import { TypeEntityZone } from '../../../types/entityTypes';
import config from '../../config';
import { apiResponseHandler } from '../../../utils/apiUtils';

export function getZone(zipcode: string) {
  return async (dispatch: (action: TypeZoneDispatch) => void) => {
    dispatch({
      type: ZONE_GET_BY_ZIPCODE_REQUESTED,
    });

    try {
      const payload: TypeEntityZone = await fetch(`${config.apiUrl}/api/zones/${zipcode}`)
        .then(apiResponseHandler)
        .then((response) => {
          const zoneState: TypeEntityZone = { ...response };
          return zoneState;
        })
        .catch((error) => {
          throw error;
        });
      dispatch({
        type: ZONE_GET_BY_ZIPCODE_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: ZONE_GET_BY_ZIPCODE_FAILED,
        error,
      });
    }
  };
}



