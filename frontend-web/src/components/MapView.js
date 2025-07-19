import React from 'react';

export default function MapView({ offers }) {
  // Pour la démo, on peut utiliser une image statique ou simuler une carte
  return (
    <div style={{maxWidth: 420, margin: '2rem auto', textAlign: 'center'}}>
      <h2>Carte des offres</h2>
      <img
        src="https://maps.googleapis.com/maps/api/staticmap?center=Dakar,Senegal&zoom=12&size=400x200&markers=color:red%7Clabel:D%7C14.7,-17.45"
        alt="Carte Dakar"
        style={{width: '100%', maxWidth: 400, borderRadius: 8, border: '1px solid #eee'}}
      />
      {/* Pour chaque offre, on pourrait overlay un marker custom ou afficher la liste à côté */}
      <div style={{marginTop:8, fontSize:14}}>
        {offers && offers.length > 0 && (
          <>
            <b>Offres géolocalisées :</b>
            <ul style={{listStyle:'none',padding:0}}>
              {offers.map(o => (
                <li key={o.id}>📍 {o.title} ({o.latitude?.toFixed(3)}, {o.longitude?.toFixed(3)})</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
} 