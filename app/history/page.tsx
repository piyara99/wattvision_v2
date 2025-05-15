'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import dayjs, { Dayjs } from 'dayjs';
import DashboardLayout from '@/components/DashboardLayout';
import { useHistoryData } from '@/hooks/useHistoryData';

export default function HistoryPage() {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const initialDateStr = searchParams.get('date') || dayjs().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(initialDateStr));
  const { data, error, loading } = useHistoryData(selectedDate?.format('YYYY-MM-DD') ?? '');

  // Local state to hold client-only formatted date string to avoid hydration mismatch
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setFormattedDate(selectedDate.format('YYYY-MM-DD'));
    }
  }, [selectedDate]);

  const handleDateChange = (value: unknown) => {
    const newDate = value as Dayjs | null;
    if (newDate) {
      setSelectedDate(newDate);
    }
  };

  const timestamps = data.map((entry) => entry.timestamp);
  const wattages = data.map((entry) => entry.wattage);
  const temperatures = data.map((entry) => entry.temperature);

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Use client-only formatted date */}
        <Typography variant="h4" gutterBottom>
          Historical Data ({formattedDate})
        </Typography>

        {/* Wrap DatePicker in LocalizationProvider */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">
            ❌ {error.message || 'Failed to load history data.'}
          </Typography>
        ) : (
          <>
            <Box sx={{ height: 400, mt: 4 }}>
              <LineChart
                xAxis={[
                  {
                    id: 'time',
                    data: timestamps,
                    scaleType: 'point',
                    label: 'Time',
                  },
                ]}
                series={[
                  {
                    id: 'wattage',
                    label: 'Wattage',
                    data: wattages,
                    color: theme.palette.primary.main,
                  },
                  {
                    id: 'temperature',
                    label: 'Temperature',
                    data: temperatures,
                    color: theme.palette.secondary.main,
                  },
                ]}
              >
                <ChartsGrid />
                <ChartsXAxis />
                <ChartsYAxis />
                <ChartsLegend />
                <ChartsTooltip />
              </LineChart>
            </Box>

            <Grid container spacing={4} sx={{ mt: 4 }}>
              {data.map((entry, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  <Card sx={{ bgcolor: theme.palette.background.paper, p: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {new Date(entry.timestamp).toLocaleString()}
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={1}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                            Wattage
                          </Typography>
                          <Typography>{entry.wattage} W</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                            Temperature
                          </Typography>
                          <Typography>{entry.temperature} °C</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </DashboardLayout>
  );
}
