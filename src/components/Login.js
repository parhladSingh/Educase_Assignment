import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const result = await login(formData);
    
    if (result.success) {
      navigate('/account-settings');
    } else {
      setFormErrors({ submit: result.error });
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#374151',
          marginBottom: '16px'
        }}>
          Signin to your PopX account
        </h1>
        
        <p style={{ 
          color: '#6b7280', 
          fontSize: '16px', 
          lineHeight: '1.5'
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {(error || formErrors.submit) && (
        <div style={{
          background: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {error || formErrors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            className={`form-input ${formErrors.email ? 'error' : ''}`}
          />
          {formErrors.email && (
            <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {formErrors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            className={`form-input ${formErrors.password ? 'error' : ''}`}
          />
          {formErrors.password && (
            <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {formErrors.password}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          className={`btn-primary ${loading || !formData.email || !formData.password ? 'btn-disabled' : ''}`}
          style={{ marginTop: '32px' }}
          disabled={loading || !formData.email || !formData.password}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <div className="nav-buttons">
        <button 
          className="btn-nav btn-nav-previous"
          onClick={() => navigate('/')}
          disabled={loading}
        >
          <span className="arrow-left"></span>
          Back to Welcome
        </button>
        <button 
          className="btn-nav btn-nav-next"
          onClick={() => navigate('/create-account')}
          disabled={loading}
        >
          Create Account
          <span className="arrow-right"></span>
        </button>
      </div>
    </div>
  );
};

export default Login;