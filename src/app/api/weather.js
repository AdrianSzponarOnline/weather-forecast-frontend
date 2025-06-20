const API_URL = 'https://weather-forecast-backend-5j6t.onrender.com';

export async function fetchForecast(lat, lon) {
  try {
    const res = await fetch(`${API_URL}/api/forecast?lat=${lat}&lon=${lon}`);
    if (!res.ok) throw new Error('Błąd pobierania prognozy');
    return await res.json();
  } catch (error) {
    return { error: error.message };
  }
}

export async function fetchSummary(lat, lon) {
  try {
    const res = await fetch(`${API_URL}/api/forecast/summary?lat=${lat}&lon=${lon}`);
    if (!res.ok) throw new Error('Błąd pobierania podsumowania');
    return await res.json();
  } catch (error) {
    return { error: error.message };
  }
} 