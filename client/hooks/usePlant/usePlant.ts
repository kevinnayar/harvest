
import { useDispatch, useSelector } from 'react-redux';
import { createPlant } from '../../store/plant/plantActions';
import { TypeAppReducer, TypeApiXferStatus } from '../../../types/baseTypes';
import { TypeEntityPlant } from '../../../types/entityTypes';

function usePlant() {
  const plants = useSelector<TypeAppReducer, TypeEntityPlant[]>(state => state.plant.plants);
  const plantCreateXferStatus = useSelector<TypeAppReducer, TypeApiXferStatus>((state) => state.plant.plantCreateXferStatus);
  const dispatch = useDispatch();
  const onPlantCreate = (
    jwtToken: string,
    userId: string,
    plantName: string,
    plantCategory: string,
    datePlanted: void | number
  ) => dispatch(createPlant(jwtToken, userId, plantName, plantCategory, datePlanted));
  
  return {
    plants,
    plantCreateXferStatus,
    onPlantCreate,
  };
}

export default usePlant;
