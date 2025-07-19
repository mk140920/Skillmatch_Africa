import React, { useState } from 'react';
import { updateProfile, uploadPhoto } from '../api';

const SKILLS_FAKE = [
  "menuiserie", "soudure", "réparation", "plomberie", "peinture", "cuisine"
];

function getRandomSkills() {
  return SKILLS_FAKE.sort(() => 0.5 - Math.random()).slice(0, 3);
}

export default function ProfileForm({ user, profile, onProfileUpdate }) {
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [photo, setPhoto] = useState(null);
  const [skills, setSkills] = useState(profile?.skills || []);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = e => {
    setPhoto(e.target.files[0]);
    // Simule l'analyse IA dès upload
    setSkills(getRandomSkills());
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await updateProfile(profile.id, {
      user: user.user_id,
      first_name: firstName,
      latitude: 14.7 + Math.random() * 0.02,
      longitude: -17.45 + Math.random() * 0.02,
      skills
    });
    if (photo) {
      await uploadPhoto(profile.id, photo);
    }
    setLoading(false);
    onProfileUpdate();
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8}}>
      <h2>Mon profil</h2>
      <input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="Prénom" required style={{width:'100%',marginBottom:8}} />
      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{width:'100%',marginBottom:8}} />
      <div style={{marginBottom:8}}>
        <b>Compétences détectées :</b> {skills.join(', ')}
      </div>
      <button type="submit" disabled={loading} style={{width:'100%'}}>Enregistrer</button>
    </form>
  );
} 