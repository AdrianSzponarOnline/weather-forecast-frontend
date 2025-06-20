# Weather Forecast Frontend

A modern weather forecast app built with **Next.js**, **Tailwind CSS**, and **Leaflet**.  
Displays a 7-day weather forecast and estimated solar energy production for any location.

## Features

- Automatic geolocation (with manual map selection)
- 7-day weather forecast (date, icon, min/max temp, solar energy)
- Weekly summary (min/max temp, avg pressure, avg sunshine, comment)
- Interactive map (Leaflet) to pick any location
- Responsive, clean UI (Tailwind CSS)
- Integration with external backend API

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

## Configuration

- **Backend API:**  
  The app fetches weather data from a backend (see `.env` or `src/app/api/weather.js` for endpoint).
- **Map marker icons:**  
  Classic Leaflet marker icons are in `public/leaflet/`.

## Project structure

- `src/app/page.js` – main page, fetches data, renders UI
- `src/app/components/ForecastTable.js` – 7-day forecast grid
- `src/app/components/WeekSummary.js` – weekly summary
- `src/app/components/MapPicker.jsx` – interactive map picker (Leaflet)
- `src/app/hooks/useGeolocation.js` – geolocation hook

## Customization

- To use a different marker icon, replace files in `public/leaflet/` or edit `MapPicker.jsx`.
- To change backend API, update the endpoint in `src/app/api/weather.js`.

## Useful scripts

- `npm run dev` – start dev server with hot reload
- `npm run build` – build for production
- `npm start` – run production build

## Deployment

You can deploy this app to [Vercel](https://vercel.com/) or any platform supporting Next.js.

---

**Enjoy!**
