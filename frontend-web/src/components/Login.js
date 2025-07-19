import React, { useState } from 'react';
import { login } from '../api';

export default function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login({ email, phone });
      onLogin(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur de connexion");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: 350, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8}}>
      <h2>Connexion</h2>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <input type="text" placeholder="Téléphone" value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <button type="submit" style={{width:'100%'}}>Connexion</button>
      {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
      <div style={{fontSize:12, marginTop:12}}>
        Pas encore de compte ? <button type="button" onClick={onSwitchToRegister} style={{background:'none',border:'none',color:'#007bff',cursor:'pointer'}}>Créer un compte</button>
      </div>
    </form>
  );
} 