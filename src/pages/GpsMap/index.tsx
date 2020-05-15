import React, { useState } from 'react';
import { Map } from 'react-amap';
import UIMarker from './UIMarker';

const GpsMap = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
    >
      <Map
        amapkey={'d0d15ea6fa974999d8f532e93e057afd'}
        version={'1.4.15'}
        useAMapUI={true}
      >
        <UIMarker loading={loading} setLoading={setLoading}/>
      </Map>
    </div>
  )
}

export default GpsMap