import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ position: 'relative', height: '300px', marginBottom: '40px' }}>
          {/* Animated circles */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            6
          </div>
          
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '40%',
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            1
          </div>
          
          <div style={{
            position: 'absolute',
            top: '140px',
            left: '55%',
            width: '45px',
            height: '45px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            2
          </div>
          
          <div style={{
            position: 'absolute',
            top: '190px',
            left: '65%',
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            3
          </div>
          
          <div style={{
            position: 'absolute',
            top: '230px',
            left: '72%',
            width: '35px',
            height: '35px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            4
          </div>
          
          <div style={{
            position: 'absolute',
            top: '270px',
            left: '78%',
            width: '30px',
            height: '30px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            5
          </div>
        </div>
        
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#374151', 
          marginBottom: '16px' 
        }}>
          Welcome to PopX
        </h1>
        
        <p style={{ 
          color: '#6b7280', 
          fontSize: '16px', 
          lineHeight: '1.5',
          marginBottom: '40px'
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      
      <button 
        className="btn-primary"
        onClick={() => navigate('/create-account')}
      >
        Create Account
      </button>
      
      <button 
        className="btn-secondary"
        onClick={() => navigate('/login')}
      >
        Already Registered? Login
      </button>

      <div className="nav-buttons">
        <button 
          className="btn-nav btn-nav-previous"
          disabled
        >
          <span className="arrow-left"></span>
          Previous
        </button>
        <button 
          className="btn-nav btn-nav-next"
          onClick={() => navigate('/create-account')}
        >
          Next
          <span className="arrow-right"></span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;