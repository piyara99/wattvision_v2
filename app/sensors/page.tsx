'use client';

import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import DashboardLayout from '@/components/DashboardLayout';
import { useLiveData } from '@/hooks/useLiveData'; // adjust the path if needed

interface SensorData {
  name: string;
  current?: number;
  wattage?: number;
  temperature?: number;
  ambientTemperature?: number;
  humidity?: number;
}

export default function SensorsPage() {
  const theme = useTheme();
  const { data, loading, error } = useLiveData();
  const [sensors, setSensors] = useState<SensorData[]>([]);

  useEffect(() => {
    if (data) {
      const formattedData: SensorData[] = [
        {
          name: 'Power Sensor 1',
          current: data.sensors.current_sensor_1,
          wattage: data.sensors.wattage_sensor_1,
          temperature: data.sensors.temperature_1,
        },
        {
          name: 'Power Sensor 2',
          current: data.sensors.current_sensor_2,
          wattage: data.sensors.wattage_sensor_2,
          temperature: data.sensors.temperature_2,
        },
        {
          name: 'Ambient Conditions',
          ambientTemperature: data.sensors.ambient_temperature,
          humidity: data.sensors.humidity,
        },
      ];
      setSensors(formattedData);
    }
  }, [data]);

  const tempColor = (temp?: number) =>
    temp && temp > 40 ? theme.palette.error.main : theme.palette.text.primary;

  const humidityColor = (hum?: number) =>
    hum && (hum < 30 || hum > 60) ? theme.palette.warning.main : theme.palette.text.primary;

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sensors Data
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Failed to load sensor data. Please try again.</Typography>
        ) : (
          <Grid container spacing={4}>
            {sensors.map((sensor, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card sx={{ bgcolor: theme.palette.primary.light, p: 2 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {sensor.name}
                    </Typography>

                    {(sensor.current !== undefined || sensor.wattage !== undefined) && (
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        {sensor.current !== undefined && (
                          <Box>
                            <Typography variant="subtitle1" color="text.secondary">
                              Current
                            </Typography>
                            <Typography variant="h6">{sensor.current} A</Typography>
                          </Box>
                        )}
                        {sensor.wattage !== undefined && (
                          <Box>
                            <Typography variant="subtitle1" color="text.secondary">
                              Wattage
                            </Typography>
                            <Typography variant="h6">{sensor.wattage} W</Typography>
                          </Box>
                        )}
                        {sensor.temperature !== undefined && (
                          <Box>
                            <Typography variant="subtitle1" color="text.secondary">
                              Temperature
                            </Typography>
                            <Typography variant="h6" sx={{ color: tempColor(sensor.temperature) }}>
                              {sensor.temperature} °C
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}

                    {(sensor.ambientTemperature !== undefined || sensor.humidity !== undefined) && (
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        {sensor.ambientTemperature !== undefined && (
                          <Box>
                            <Typography variant="subtitle1" color="text.secondary">
                              Ambient Temperature
                            </Typography>
                            <Typography variant="h6" sx={{ color: tempColor(sensor.ambientTemperature) }}>
                              {sensor.ambientTemperature} °C
                            </Typography>
                          </Box>
                        )}
                        {sensor.humidity !== undefined && (
                          <Box>
                            <Typography variant="subtitle1" color="text.secondary">
                              Humidity
                            </Typography>
                            <Typography variant="h6" sx={{ color: humidityColor(sensor.humidity) }}>
                              {sensor.humidity} %
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </DashboardLayout>
  );
}
