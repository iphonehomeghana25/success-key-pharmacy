import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/StaffPortalPage.css';
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

const StaffPortalPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        // --- UPDATED: Redirect to the new Layout route ---
        navigate('/admin/dashboard'); 
      }
    } catch (error) {
      setErrorMsg('Invalid login credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="portal-container">
        <div className="login-card">
          
          <div className="login-header">
            <div className="portal-logo">
              <ShieldCheck size={40} />
            </div>
            <h1>Staff Portal</h1>
            <p>Please log in to access the pharmacy management dashboard.</p>
          </div>

          {errorMsg && (
            <div className="error-banner" style={{ padding: '1rem', background: '#fee2e2', color: '#dc2626', textAlign: 'center', borderBottom: '1px solid #fca5a5' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                <AlertCircle size={18} /> Login Failed
              </div>
              <span style={{ fontSize: '0.9rem' }}>{errorMsg}</span>
            </div>
          )}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input 
                  type="email" 
                  placeholder="admin@successkey.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : (
                <>Access Dashboard <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Restricted Access. Authorized Personnel Only.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StaffPortalPage;
