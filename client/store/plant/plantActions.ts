import {
  PLANT_CREATE_REQUESTED,
  PLANT_CREATE_SUCCEEDED,
  PLANT_CREATE_FAILED,
  PLANT_GET_ALL_REQUESTED,
  PLANT_GET_ALL_SUCCEEDED,
  PLANT_GET_ALL_FAILED,
  TypePlantDispatch,
} from '../../../types/plantTypes';
import { apiResponseHandler, apiAuthenticatedPost } from '../../../utils/apiUtils';
import { TypeEntityPlant } from '../../../types/entityTypes';
import config from '../../config';

export function createPlant(jwtToken: string, userId: string, plantName: string, plantCategory: string, datePlanted: void | number) {
  return async (dispatch: (action: TypePlantDispatch) => void) => {
    dispatch({
      type: PLANT_CREATE_REQUESTED,
    });

    try {
      const query = [
        `plantName=${encodeURIComponent(plantName)}`,
        `plantCategory=${encodeURIComponent(plantCategory)}`,
        ...datePlanted ? [`datePlanted=${encodeURIComponent(datePlanted)}`] : [],
      ];
      const body: BodyInit = query.join('&');
      const url = `${config.apiUrl}/api/users/${userId}/plants`;
      
      const payload: TypeEntityPlant = await apiAuthenticatedPost(jwtToken, url, body)
        .then(apiResponseHandler)
        .then((response) => {
          const plant: TypeEntityPlant = { ...response };
          return plant;
        })
        .catch((error) => {
          throw new Error(error);
        });
      dispatch({
        type: PLANT_CREATE_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: PLANT_CREATE_FAILED,
        error,
      });
    }
  };
}



