import React, { useState } from 'react';
import { register } from '../api';

export default function Register({ onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await register({ email, phone });
      setSuccess(true);
      onRegister(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur d'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: 350, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8}}>
      <h2>Inscription</h2>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <input type="text" placeholder="Téléphone" value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <button type="submit" style={{width:'100%'}}>Créer un compte</button>
      {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
      {success && <div style={{color:'green',marginTop:8}}>Compte créé avec succès !</div>}
      <div style={{fontSize:12, marginTop:12}}>
        Déjà inscrit ? <button type="button" onClick={onSwitchToLogin} style={{background:'none',border:'none',color:'#007bff',cursor:'pointer'}}>Se connecter</button>
      </div>
    </form>
  );
} 