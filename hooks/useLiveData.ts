import { useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔁 Fallback to multiple options based on the environment
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE ||
          (typeof window !== 'undefined' && window.location.hostname === 'localhost'
            ? 'http://localhost:8000'
            : `http://${window.location.hostname}:8000`);

        const url = `${baseUrl}/api/live`;
        console.log('🌐 Fetching data from:', url);

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Fetch failed with status: ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('🔥 Fetch error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
}
