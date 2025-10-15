import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AccountSettings = () => {
  const { user, logout, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    companyName: user?.companyName || '',
    isAgency: user?.isAgency ? 'yes' : 'no'
  });
  const [updateMessage, setUpdateMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const result = await updateProfile(formData);
    
    if (result.success) {
      setIsEditing(false);
      setUpdateMessage('Profile updated successfully!');
      setTimeout(() => setUpdateMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || '',
      phoneNumber: user?.phoneNumber || '',
      companyName: user?.companyName || '',
      isAgency: user?.isAgency ? 'yes' : 'no'
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#374151'
          }}>
            Account Settings
          </h1>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid #dc2626',
              color: '#dc2626',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Logout
          </button>
        </div>
        
        {updateMessage && (
          <div style={{
            background: '#d1fae5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {updateMessage}
          </div>
        )}
        
        <div className="profile-section">
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Profile"
              className="profile-image"
            />
            {user.isVerified && (
              <div className="profile-badge">
                ✓
              </div>
            )}
          </div>
          
          <div className="profile-info">
            <h3>{user.fullName}</h3>
            <p>{user.email}</p>
            {user.companyName && (
              <p style={{ fontSize: '12px', color: '#8b5cf6', marginTop: '4px' }}>
                {user.companyName} {user.isAgency && '(Agency)'}
              </p>
            )}
          </div>
        </div>

        {!isEditing ? (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#374151', marginBottom: '8px' }}>Profile Information</h4>
              <p><strong>Phone:</strong> {user.phoneNumber}</p>
              <p><strong>Company:</strong> {user.companyName || 'Not specified'}</p>
              <p><strong>Account Type:</strong> {user.isAgency ? 'Agency' : 'Individual'}</p>
              <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary"
              style={{ marginTop: '20px' }}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <h4 style={{ color: '#374151', marginBottom: '16px' }}>Edit Profile</h4>
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Account Type</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="edit-agency-yes"
                    name="isAgency"
                    value="yes"
                    checked={formData.isAgency === 'yes'}
                    onChange={handleInputChange}
                    className="radio-input"
                  />
                  <label htmlFor="edit-agency-yes" style={{ color: '#374151', fontSize: '16px' }}>Agency</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="edit-agency-no"
                    name="isAgency"
                    value="no"
                    checked={formData.isAgency === 'no'}
                    onChange={handleInputChange}
                    className="radio-input"
                  />
                  <label htmlFor="edit-agency-no" style={{ color: '#374151', fontSize: '16px' }}>Individual</label>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={handleSave}
                className={`btn-primary ${loading ? 'btn-disabled' : ''}`}
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="nav-buttons" style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <button 
            className="btn-nav btn-nav-previous"
            onClick={handleLogout}
            disabled={loading}
          >
            <span className="arrow-left"></span>
            Logout & Return
          </button>
          <button 
            className="btn-nav btn-nav-next"
            disabled
            style={{ opacity: 0.5 }}
          >
            Account Complete
            <span>✓</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;