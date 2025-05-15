// hooks/useHistoryData.ts
import { useEffect, useState } from 'react';

export type HistoryData = {
  timestamp: string;
  wattage: number;
  temperature: number;
};

export function useHistoryData(date?: string) {
  const [data, setData] = useState<HistoryData[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE ||
          (typeof window !== 'undefined' && window.location.hostname === 'localhost'
            ? 'http://localhost:8000'
            : `http://${window.location.hostname}:8000`);

        const url = date ? `${baseUrl}/api/history?date=${date}` : `${baseUrl}/api/history`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch history: ${res.status}`);

        const json = await res.json();
        setData(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error('❌ History fetch failed:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [date]);

  return { data, error, loading };
}
