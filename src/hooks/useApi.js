import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

export function useApi(url, options = {}) {
  const { immediate = true, params = {} } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const paramsRef = useRef(params);

  const paramsKey = JSON.stringify(params);
  paramsRef.current = params;

  const fetchData = useCallback(async (overrideParams) => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url, {
        params: { ...paramsRef.current, ...overrideParams },
        signal: controller.signal,
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      if (err.name === 'CanceledError') return undefined;
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, paramsKey]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  return { data, loading, error, refetch: fetchData };
}
