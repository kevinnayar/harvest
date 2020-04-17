import * as React from 'react';
import { useState } from 'react';

import useZone from '../../hooks/useZone/useZone';

const ZipcodeTest = () => {
  const [ zipcode, setZipcode ] = useState('');
  const { zoneState, zoneError, onZoneSave } = useZone();

  return (
    <form>
      <h1>zipcode: {zipcode}</h1>
      <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
      <button type="button" onClick={(_e) => onZoneSave(zipcode)}>
        Submit
      </button>
      <pre>{zoneState && JSON.stringify(zoneState, null, 2)}</pre>
      {zoneError && <pre>{zoneError}</pre>}
    </form>
  );
};

export default ZipcodeTest;


