import { useDispatch, useSelector } from 'react-redux';
import { getZone } from '../../store/zone/zoneActions';
import { TypeAppReducer, TypeApiXferStatus } from '../../../types/baseTypes';
import { TypeEntityZone } from '../../../types/entityTypes';

function useZone() {
  const zoneState = useSelector<TypeAppReducer, void | TypeEntityZone>((state) => state.zone.zoneState);
  const zoneXferStatus = useSelector<TypeAppReducer, TypeApiXferStatus>((state) => state.zone.getZoneXferStatus);
  
  const dispatch = useDispatch();
  const onZoneSave = (zipcode: string) => dispatch(getZone(zipcode));

  return {
    zoneState,
    zoneXferStatus,
    onZoneSave,
  };
}

export default useZone;
