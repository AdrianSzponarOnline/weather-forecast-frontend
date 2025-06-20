"use client";

import { useEffect, useState } from "react";
import useGeolocation from "./hooks/useGeolocation";
import { fetchForecast, fetchSummary } from "./api/weather";
import ForecastTable from "./components/ForecastTable";
import WeekSummary   from "./components/WeekSummary";
import MapPicker from "./components/MapPicker";

export default function Home() {
  const geo = useGeolocation();
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [summary,  setSummary]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  // przepisz geolokalizację → lat/lon
  useEffect(() => {
    if (geo.lat && geo.lon) {
      setLat(geo.lat);
      setLon(geo.lon);
    }
  }, [geo.lat, geo.lon]);

  // pobierz dane przy każdej zmianie współrzędnych
  useEffect(() => {
    if (!lat || !lon) return;
    setLoading(true);
    setError(null);
    Promise.all([fetchForecast(lat, lon), fetchSummary(lat, lon)])
      .then(([fc, sum]) => {
        setForecast(fc);
        setSummary(sum);
      })
      .catch(() => setError("Błąd pobierania danych z serwera pogody."))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 p-8">
      <h1 className="text-2xl font-bold">Prognoza pogody i produkcja energii</h1>

      {geo.loading && <p>Pobieranie lokalizacji…</p>}
      {geo.error   && <p className="text-red-500">{geo.error}</p>}
      {loading     && <p>Ładowanie danych pogodowych…</p>}
      {error       && <p className="text-red-500">{error}</p>}

      {lat && lon && (
        <MapPicker lat={lat} lon={lon} onPick={({ lat, lon }) => { setLat(lat); setLon(lon); }} />
      )}

      {forecast && (
        <div className="w-full max-w-4xl">
          <ForecastTable forecast={forecast} />
        </div>
      )}

      {summary && (
        <div className="w-full max-w-2xl">
          <WeekSummary summary={summary} />
        </div>
      )}
    </div>
  );
}
