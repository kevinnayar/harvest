import { useDispatch, useSelector } from 'react-redux';

import { getZone } from '../../store/zone/zoneActions';
import { TypeAppReducer } from '../../../types/baseTypes';
import { TypeZoneState } from '../../../types/zoneTypes';

function useZone() {
  const zoneState = useSelector<TypeAppReducer, void | TypeZoneState>((state) => state.zone.zoneState);
  const zoneError = useSelector<TypeAppReducer, null | string>((state) => state.zone.getZoneXferStatus.error);
  const dispatch = useDispatch();
  const onZoneSave = (zipcode: string) => dispatch(getZone(zipcode));

  return {
    zoneState,
    zoneError,
    onZoneSave,
  };
}

export default useZone;
