import React, { useEffect, useState } from 'react';
import { getJobOffers } from '../api';
import { saveToLocal, loadFromLocal } from '../utils';

export default function JobOffersList({ lat, lon }) {
  const [offers, setOffers] = useState(loadFromLocal('offers') || []);
  const [radius, setRadius] = useState(10);

  useEffect(() => {
    getJobOffers(lat, lon, radius).then(res => {
      setOffers(res.data);
      saveToLocal('offers', res.data);
    }).catch(() => {
      // mode offline : on garde les données locales
    });
  }, [lat, lon, radius]);

  return (
    <div style={{maxWidth: 600, margin: '2rem auto'}}>
      <h2>Offres d'emploi</h2>
      <label>Distance max (km) :
        <input type="number" value={radius} onChange={e=>setRadius(e.target.value)} style={{marginLeft:8, width:60}} />
      </label>
      <ul style={{padding:0, listStyle:'none'}}>
        {offers.map(o => (
          <li key={o.id} style={{border:'1px solid #eee', borderRadius:8, margin:'12px 0', padding:12}}>
            <b>{o.title}</b> - {o.description}<br />
            <i>{o.tags.join(', ')}</i>
          </li>
        ))}
      </ul>
    </div>
  );
} 