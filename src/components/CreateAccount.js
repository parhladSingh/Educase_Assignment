import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateAccount = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'no'
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
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
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
    
    // Convert isAgency to boolean before sending
    const dataToSend = {
      ...formData,
      isAgency: formData.isAgency === 'yes'
    };
    
    const result = await register(dataToSend);
    
    if (result.success) {
      navigate('/account-settings');
    } else {
      setFormErrors({ submit: result.error });
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#374151' 
          }}>
            Create your PopX account
          </h1>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            1
          </div>
        </div>
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
          <label className="form-label">Full Name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`form-input ${formErrors.fullName ? 'error' : ''}`}
            placeholder="Enter your full name"
          />
          {formErrors.fullName && (
            <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {formErrors.fullName}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Phone number*</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={`form-input ${formErrors.phoneNumber ? 'error' : ''}`}
            placeholder="Enter your phone number"
          />
          {formErrors.phoneNumber && (
            <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {formErrors.phoneNumber}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Email address*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`form-input ${formErrors.email ? 'error' : ''}`}
            placeholder="Enter your email address"
          />
          {formErrors.email && (
            <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {formErrors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`form-input ${formErrors.password ? 'error' : ''}`}
            placeholder="Enter your password"
          />
          {formErrors.password && (
            <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {formErrors.password}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Company name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your company name (optional)"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Are you an Agency?*</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="agency-yes"
                name="isAgency"
                value="yes"
                checked={formData.isAgency === 'yes'}
                onChange={handleInputChange}
                className="radio-input"
              />
              <label htmlFor="agency-yes" style={{ color: '#374151', fontSize: '16px' }}>Yes</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="agency-no"
                name="isAgency"
                value="no"
                checked={formData.isAgency === 'no'}
                onChange={handleInputChange}
                className="radio-input"
              />
              <label htmlFor="agency-no" style={{ color: '#374151', fontSize: '16px' }}>No</label>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className={`btn-primary ${loading ? 'btn-disabled' : ''}`}
          style={{ marginTop: '32px' }}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="nav-buttons">
        <button 
          className="btn-nav btn-nav-previous"
          onClick={() => navigate('/')}
          disabled={loading}
        >
          <span className="arrow-left"></span>
          Previous
        </button>
        <button 
          className="btn-nav btn-nav-next"
          onClick={() => navigate('/login')}
          disabled={loading}
        >
          Go to Login
          <span className="arrow-right"></span>
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;