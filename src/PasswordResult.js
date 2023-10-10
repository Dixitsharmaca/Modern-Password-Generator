import React, { useEffect, useRef } from 'react';
import './passwordResult.css';

function PasswordResult({ password }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = 'auto'; // Reset the width
      inputRef.current.style.width = inputRef.current.scrollWidth + 'px';
    }
  }, [password]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '20px',
  };

  const boxStyle = {
    border: '2px solid black',
    padding: '10px',
    minWidth: '200px',
    transition: 'width 0.3s ease', // Add a smooth transition
  };

  const inputStyle = {
    width: '100%',
    height: '50px',
    fontWeight: 'bold',
    color: '#007BFF',
    fontSize: '24px',
    border: 'none',
    outline: 'none',
    textAlign: 'center',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  return (
    <div className="password-result" style={containerStyle}>
      <label style={labelStyle}>Your Password:</label>
      <div style={boxStyle}>
        <input
          type="text"
          value={password || ''}
          readOnly
          style={inputStyle}
          ref={inputRef}
          className="placeholder-style" // Apply the CSS class here
          placeholder="Password will be displayed here"
        />
      </div>
    </div>
  );
}

export default PasswordResult;
