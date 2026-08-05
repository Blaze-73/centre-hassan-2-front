import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export default function useFetch(url, { immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const run = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(url, { params });
      setData(res.data?.data ?? res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (!immediate) return;
    let ignore = false;
    api
      .get(url)
      .then((res) => {
        if (!ignore) setData(res.data?.data ?? res.data);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [url, immediate]);

  return { data, loading, error, run, setData, setLoading };
}
