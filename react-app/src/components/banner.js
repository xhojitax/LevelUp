import React from 'react';

const Banner = () => {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #1a1f3a 0%, #0a5f4e 100%)',
      padding: '15px 0',
      textAlign: 'center',
      borderBottom: '2px solid #00ffff'
    }}>
      <h2 style={{
        color: '#fff',
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: 0,
        textShadow: '0 0 20px rgba(0,255,255,0.8)'
      }}>
        $365.000
      </h2>
    </div>
  );
};

export default Banner;