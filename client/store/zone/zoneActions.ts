import {
  ZONE_GET_BY_ZIPCODE_REQUESTED,
  ZONE_GET_BY_ZIPCODE_SUCCEEDED,
  ZONE_GET_BY_ZIPCODE_FAILED,
  TypeZoneState,
  TypeZoneDispatch,
} from '../../../types/zoneTypes';
import config from '../../config';
import { apiResponseHandler } from '../../../utils/apiUtils';

export function getZone(zipcode: string) {
  return async (dispatch: (action: TypeZoneDispatch) => void) => {
    dispatch({
      type: ZONE_GET_BY_ZIPCODE_REQUESTED,
    });

    try {
      const payload: TypeZoneState = await fetch(`${config.apiUrl}/api/zones/${zipcode}`)
        .then((res) => res.json())
        .then(apiResponseHandler)
        .then((response) => { 
          const { id, zipcode, zone, tRange, firstFrostDay, firstFrostMonth, lastFrostDay, lastFrostMonth } = response;
          const zoneState: TypeZoneState = {
            id,
            zipcode,
            zone,
            tRange,
            firstFrostDay,
            firstFrostMonth,
            lastFrostDay,
            lastFrostMonth,
          };
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



