// pages/dashboard.tsx (or inside your app directory as app/dashboard/page.tsx)

'use client';

import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useLiveData } from '../hooks/useLiveData';
import DashboardLayout from '@/components/DashboardLayout';

const DashboardPage = () => {
  const theme = useTheme();
  const { data, error } = useLiveData();
  const [dailyUsage, setDailyUsage] = useState(0);

  // Hooks must come before conditional returns
  const wattage = data
    ? data.sensors.wattage_sensor_1 + data.sensors.wattage_sensor_2
    : 0;
  const current = data
    ? data.sensors.current_sensor_1 + data.sensors.current_sensor_2
    : 0;
  const voltage = current ? (wattage / current).toFixed(2) : '0';

  useEffect(() => {
    if (wattage) {
      const usage = Number(
        ((wattage / 1000) * new Date().getHours()).toFixed(2)
      );
      setDailyUsage(usage);
    }
  }, [wattage]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const s = data.sensors;

  const chartData = [
    { time: '8:00', power: 20 },
    { time: '10:00', power: 40 },
    { time: '12:00', power: 35 },
    { time: '14:00', power: 60 },
    { time: '16:00', power: 55 }
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, bgcolor: theme.palette.primary.light }}>
              <CardContent>
                <Typography variant="h3">{dailyUsage} kWh</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Used today
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 2,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
              }}
            >
              <CardContent>
                <Typography variant="h3">{wattage} W</Typography>
                <Typography variant="subtitle2">Power being used</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Divider */}
          <Grid item xs={12}>
            <Divider sx={{ borderColor: theme.palette.divider }} />
          </Grid>

          {/* Kitchen Panel */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, bgcolor: theme.palette.primary.light }}>
              <CardContent>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: `4px solid ${theme.palette.primary.main}`,
                    mb: 1
                  }}
                />
                <Typography variant="h4">{s.wattage_sensor_1} W</Typography>
                <Typography variant="body2">
                  {(s.wattage_sensor_1 / s.current_sensor_1).toFixed(2)} V{' '}
                  {s.current_sensor_1} A
                </Typography>
                <Typography variant="subtitle1">Kitchen Power</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Kitchen Chart */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2, bgcolor: theme.palette.primary.light }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Power Usage Over Time
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <XAxis
                      dataKey="time"
                      stroke={theme.palette.text.secondary}
                    />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="power"
                      stroke={theme.palette.primary.main}
                      dot
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Living Room Panel */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, bgcolor: theme.palette.primary.light }}>
              <CardContent>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: `4px solid ${theme.palette.primary.main}`,
                    mb: 1
                  }}
                />
                <Typography variant="h4">{s.wattage_sensor_2} W</Typography>
                <Typography variant="body2">
                  {(s.wattage_sensor_2 / s.current_sensor_2).toFixed(2)} V{' '}
                  {s.current_sensor_2} A
                </Typography>
                <Typography variant="subtitle1">Living Room</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Living Room Chart */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2, bgcolor: theme.palette.primary.light }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Power Usage Over Time
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <XAxis
                      dataKey="time"
                      stroke={theme.palette.text.secondary}
                    />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="power"
                      stroke={theme.palette.primary.main}
                      dot
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default DashboardPage;
