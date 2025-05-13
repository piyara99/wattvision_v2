'use client';

import { useEffect, useState } from 'react';


// Define the shape of the data object
// types.ts or inside useLiveData.ts
export interface LiveData {
  timestamp: string;
  sensors: {
    current_sensor_1: number;
    current_sensor_2: number;
    wattage_sensor_1: number;
    wattage_sensor_2: number;
    temperature_1: number;
    temperature_2: number;
    ambient_temperature: number;
    humidity: number;
  };
}


export function useLiveData() {
  const [data, setData] = useState<LiveData | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
        const res = await fetch(`${baseUrl}/api/live`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return { data, error };
}
