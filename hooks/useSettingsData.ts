import { useEffect, useState } from 'react';
import axios from 'axios';

interface SettingsData {
  autoUpdate: boolean;
  reportingInterval: number;
  tempThreshold: number;
}

export function useSettingsData() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/settings'); // replace with your actual API endpoint
        setData(response.data);
      } catch (err: any) {
        console.error('Error fetching settings:', err);
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { data, loading, error };
}
