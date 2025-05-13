'use client';

import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, TextField, CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SensorData {
  name: string;
  current: string;
  wattage: string;
  temperature: string;
}

export default function SensorsPage() {
  const theme = useTheme();
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSensors() {
      try {
        const response = await fetch('/api/live');
        const data = await response.json();

        const formattedData: SensorData[] = [
          {
            name: 'Power Sensor 1',
            current: data.sensors.current_sensor_1,
            wattage: data.sensors.wattage_sensor_1,
            temperature: data.sensors.temperature_1
          },
          {
            name: 'Power Sensor 2',
            current: data.sensors.current_sensor_2,
            wattage: data.sensors.wattage_sensor_2,
            temperature: data.sensors.temperature_2
          }
        ];

        setSensors(formattedData);
      } catch (err) {
        console.error('Failed to fetch sensors:', err);
        setError('Failed to load sensor data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchSensors();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Sensors Data
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {sensors.map((sensor, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card elevation={3} sx={{ bgcolor: theme.palette.primary.light }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography variant="h6">{sensor.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        240V {sensor.current} A
                      </Typography>
                      <TextField
                        label="Sensor Name"
                        fullWidth
                        size="small"
                        margin="normal"
                        variant="outlined"
                        value={sensor.name}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="h6" color="primary">
                        {sensor.wattage} W
                      </Typography>
                      <Typography variant="h6" color="error">
                        {sensor.temperature} °C
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
