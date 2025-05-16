'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  FormControlLabel,
  Switch,
  Button,
  TextField,
  Box,
  Divider,
} from '@mui/material';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [apiBaseUrl, setApiBaseUrl] = useState('http://127.0.0.1:8000');
  const [refreshInterval, setRefreshInterval] = useState(5);

  const handleSave = () => {
    alert('Settings saved (dummy implementation)');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  color="primary"
                />
              }
              label="Dark Mode"
            />

            <Divider />

            <TextField
              label="Backend API Base URL"
              value={apiBaseUrl}
              onChange={(e) => setApiBaseUrl(e.target.value)}
              fullWidth
            />

            <TextField
              label="Data Refresh Interval (seconds)"
              type="number"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              fullWidth
              inputProps={{ min: 1 }}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
