import React, { useState } from 'react';
import PasswordResult from './PasswordResult';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Slider,
  Grow,
  Box,
} from '@mui/material';
import zxcvbn from 'zxcvbn';
import './style.css';

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [userText, setUserText] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [timeToCrack, setTimeToCrack] = useState('Unknown');
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);

  const generatePassword = () => {
    const charset = [];
    if (includeUpperCase) charset.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (includeLowerCase) charset.push('abcdefghijklmnopqrstuvwxyz');
    if (includeNumbers) charset.push('0123456789');
    if (includeSymbols) charset.push('!@#$%^&*()_+[]{}|;:,.<>?');

    if (charset.length === 0) {
      alert('Please select at least one character type.');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomCharsetIndex = Math.floor(Math.random() * charset.length);
      const selectedCharset = charset[randomCharsetIndex];
      const randomCharIndex = Math.floor(Math.random() * selectedCharset.length);
      newPassword += selectedCharset[randomCharIndex];
    }

    setPassword(userText + newPassword); // Swap positions of userText and newPassword

    const result = zxcvbn(newPassword);
    setTimeToCrack(result.crack_times_display.offline_slow_hashing_1e4_per_second);
    setPasswordScore(result.score);
    setPasswordFeedback(result.feedback.suggestions.join(', '));
    setShowPasswordInfo(true);
  };

  const clearFields = () => {
    setUserText('');
    setPassword('');
    setPasswordLength(12);
    setIncludeUpperCase(true);
    setIncludeLowerCase(true);
    setIncludeNumbers(true);
    setIncludeSymbols(true);
    setTimeToCrack('Unknown');
    setPasswordScore(0);
    setPasswordFeedback('');
    setShowPasswordInfo(false);
  };

  return (
    <div className="colorful-background">
      <div className="center-content">
        <Container maxWidth="sm" className="mainContainer">
          <Paper elevation={3} style={{ padding: '16px', background: '#f0f0f0' }} className="paper-container"> 
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center', color: '#007BFF' }}>
              Password Generator
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                  label="Add a custom phrase (optional)"
                  fullWidth
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  variant="outlined"
                />

              </Grid>
              <Grid item xs={12}>
                <Typography id="password-length-slider" gutterBottom style={{ color: '#28A745' }}>
                  Password Length: {passwordLength} characters
                </Typography>
                <Slider
                  value={passwordLength}
                  onChange={(e, newValue) => setPasswordLength(newValue)}
                  min={4}
                  max={32}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value} characters`}
                  aria-labelledby="password-length-slider"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeUpperCase}
                      onChange={() => setIncludeUpperCase(!includeUpperCase)}
                    />
                  }
                  label="Use Uppercase"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeLowerCase}
                      onChange={() => setIncludeLowerCase(!includeLowerCase)}
                    />
                  }
                  label="Use Lowercase"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeNumbers}
                      onChange={() => setIncludeNumbers(!includeNumbers)}
                    />
                  }
                  label="Use Numbers"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeSymbols}
                      onChange={() => setIncludeSymbols(!includeSymbols)}
                    />
                  }
                  label="Use Special Characters"
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Button variant="contained" color="primary" onClick={generatePassword} style={{ backgroundColor: '#007BFF' }}>
                    Generate Password
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={clearFields} className="clearButton">
                    Clear
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grow in={showPasswordInfo}>
                  <div>
                    <Typography variant="h6" style={{ color: '#28A745' }}>
                      Estimation time to crack: {timeToCrack}
                    </Typography>
                    {passwordScore && (
                      <Typography variant="h6" style={{ color: '#28A745' }}>
                        Password Score: {passwordScore} / 4
                      </Typography>
                    )}
                    {passwordFeedback && (
                      <Typography variant="body1" style={{ color: '#007BFF' }}>
                        Feedback: {passwordFeedback}
                      </Typography>
                    )}
                  </div>
                </Grow>
              </Grid>
            </Grid>
            <PasswordResult password={password} />
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default PasswordGenerator;
