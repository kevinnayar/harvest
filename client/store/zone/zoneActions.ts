import {
  GET_ZONE_REQUESTED,
  GET_ZONE_SUCCEEDED,
  GET_ZONE_FAILED,
  TypeZoneState,
  TypeZoneDispatch,
} from '../../../types/zoneTypes';
import config from '../../config';
import { apiResponseHandler } from '../../../utils/apiUtils';

export function getZone(zipcode: string) {
  return async (dispatch: (action: TypeZoneDispatch) => void) => {
    dispatch({
      type: GET_ZONE_REQUESTED,
    });

    try {
      const payload: TypeZoneState = await fetch(`${config.apiUrl}/api/plantzones/${zipcode}`)
        .then((res) => res.json())
        .then(apiResponseHandler)
        .then((response) => {
          const zoneState: TypeZoneState = {
            id: parseInt(response.id, 10),
            zipcode: parseInt(response.zipcode, 10),
            zone: response.zone,
            tRange: response.tRange,
          };
          return zoneState;
        })
        .catch((error) => {
          throw error;
        });
      dispatch({
        type: GET_ZONE_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: GET_ZONE_FAILED,
        error,
      });
    }
  };
}



