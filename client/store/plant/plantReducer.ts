import { apiXferInit, apiXferRequested, apiXferSucceeded, apiXferFailed } from '../../../utils/apiUtils';
import {
  PLANT_CREATE_REQUESTED,
  PLANT_CREATE_SUCCEEDED,
  PLANT_CREATE_FAILED,
  PLANT_GET_ALL_REQUESTED,
  PLANT_GET_ALL_SUCCEEDED,
  PLANT_GET_ALL_FAILED,
  TypePlantReducer,
  TypePlantDispatch,
} from '../../../types/plantTypes';

const initialState: TypePlantReducer = {
  plantCreateXferStatus: apiXferInit(),
  plantGetAllXferStatus: apiXferInit(),
  plants: [],
};

export default function plantReducer(
  state: TypePlantReducer = initialState,
  action: TypePlantDispatch,
): TypePlantReducer {
  switch (action.type) {
    case PLANT_CREATE_REQUESTED: {
      return {
        ...state,
        plantCreateXferStatus: apiXferRequested(),
      };
    }
    case PLANT_CREATE_SUCCEEDED: {
      return {
        ...state,
        plantCreateXferStatus: apiXferSucceeded(),
        plants: [...state.plants, action.payload],
      };
    }
    case PLANT_CREATE_FAILED: {
      return {
        ...state,
        plantCreateXferStatus: apiXferFailed(action.error),
      };
    }

    case PLANT_GET_ALL_REQUESTED: {
      return {
        ...state,
        plantGetAllXferStatus: apiXferRequested(),
      };
    }
    case PLANT_GET_ALL_SUCCEEDED: {
      return {
        ...state,
        plantGetAllXferStatus: apiXferSucceeded(),
        plants: action.payload,
      };
    }
    case PLANT_GET_ALL_FAILED: {
      return {
        ...state,
        plantGetAllXferStatus: apiXferFailed(action.error),
      };
    }

    default:
      return state;
  }
}

