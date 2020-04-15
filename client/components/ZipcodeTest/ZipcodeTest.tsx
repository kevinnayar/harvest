import * as React from 'react';
import { useState } from 'react';
import config from '../../config';

const ZipcodeTest = () => {
  const [zipcode, setZipcode] = useState('');
  const [zone, setZone] = useState(null);
  const [error, setError] = useState(null);

  return (
    <form>
      <h1>zipcode: {zipcode}</h1>
      <input
        type='text'
        value={zipcode}
        onChange={e => setZipcode(e.target.value)}
        required
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (zipcode) {
            fetch(`${config.apiUrl}/api/plantzones/${zipcode}`)
              .then((res) => res.json())
              .then((response) => {
                setError(null);
                setZone(response);
              })
              .catch((error) => setError(error));
          }
        }}
      >
        Submit
      </button>
      <pre>{zone && JSON.stringify(zone, null, 2)}</pre>
      <pre>{error && JSON.stringify(error, null, 2)}</pre>
    </form>
  );
};

export default ZipcodeTest;


