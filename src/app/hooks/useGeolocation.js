import { useState, useEffect } from 'react';

const DEFAULT_LOCATION = { lat: 52.2297, lon: 21.0122 }; // Warszawa

export default function useGeolocation() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolokalizacja nie jest wspierana przez tę przeglądarkę.');
      setLocation(DEFAULT_LOCATION);
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError('Nie udało się pobrać lokalizacji.');
        setLocation(DEFAULT_LOCATION);
        setLoading(false);
      }
    );
  }, []);

  return { ...location, loading, error };
} 