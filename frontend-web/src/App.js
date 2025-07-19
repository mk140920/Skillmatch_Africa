import React, { useState, useEffect } from 'react';
import AuthWhatsApp from './components/AuthWhatsApp';
import ProfileForm from './components/ProfileForm';
import JobOffersList from './components/JobOffersList';
import MapView from './components/MapView';
import { getProfile } from './api';
import { saveToLocal, loadFromLocal } from './utils';

function App() {
  const [user, setUser] = useState(loadFromLocal('user'));
  const [profile, setProfile] = useState(loadFromLocal('profile'));

  useEffect(() => {
    if (user) saveToLocal('user', user);
  }, [user]);
  useEffect(() => {
    if (profile) saveToLocal('profile', profile);
  }, [profile]);

  useEffect(() => {
    if (user && !profile) {
      getProfile(user.user_id).then(res => {
        setProfile(res.data);
      });
    }
  }, [user, profile]);

  // Simule une géoloc autour de Dakar
  const lat = 14.7, lon = -17.45;

  if (!user) {
    return <AuthWhatsApp onAuth={setUser} />;
  }
  if (!profile) return <ProfileForm user={user} profile={{}} onProfileUpdate={() => {
    getProfile(user.user_id).then(res => setProfile(res.data));
  }} />;

  return (
    <div>
      <h1 style={{textAlign:'center'}}>SkillMatch Africa</h1>
      <ProfileForm user={user} profile={profile} onProfileUpdate={() => {
        getProfile(user.user_id).then(res => setProfile(res.data));
      }} />
      <MapView offers={[]} />
      <JobOffersList lat={lat} lon={lon} />
    </div>
  );
}

export default App;
