import React, { useState } from 'react';
import { sendWhatsAppCode, verifyWhatsAppCode } from '../api';

export default function AuthWhatsApp({ onAuth }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' ou 'code'
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async e => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    try {
      await sendWhatsAppCode({ phone });
      setStep('code');
      setInfo('Un code a été envoyé sur WhatsApp (toujours 123456 pour la démo)');
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'envoi du code");
    }
    setLoading(false);
  };

  const handleVerifyCode = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await verifyWhatsAppCode({ phone, code });
      onAuth(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Code incorrect");
    }
    setLoading(false);
  };

  return (
    <div style={{maxWidth: 350, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8}}>
      <h2>Connexion via WhatsApp</h2>
      {step === 'phone' && (
        <form onSubmit={handleSendCode}>
          <label>Numéro de téléphone</label>
          <input type="text" placeholder="Ex: 770000000" value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',marginBottom:8}} required />
          <button type="submit" style={{width:'100%'}} disabled={loading}>Recevoir un code WhatsApp</button>
        </form>
      )}
      {step === 'code' && (
        <form onSubmit={handleVerifyCode}>
          <label>Code reçu</label>
          <input type="text" placeholder="Code WhatsApp" value={code} onChange={e=>setCode(e.target.value)} style={{width:'100%',marginBottom:8}} required />
          <button type="submit" style={{width:'100%'}} disabled={loading}>Valider le code</button>
        </form>
      )}
      {info && <div style={{color:'green',marginTop:8}}>{info}</div>}
      {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
    </div>
  );
} 