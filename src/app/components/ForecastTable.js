import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSmog,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Mapa kodów open‑meteo → ikon FontAwesome
const weatherCodeToIcon = (code) => {
  if (code === 0 || code === 1) return faSun; // słonecznie
  if (code === 2 || code === 3) return faCloud; // częściowo pochmurno
  if ([45, 48].includes(code)) return faSmog; // mgła
  if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) return faCloudRain; // deszcz
  if ([71, 73, 75, 77, 85, 86].includes(code)) return faSnowflake; // śnieg
  if ([95, 96, 99].includes(code)) return faCloudShowersHeavy; // burza
  return faQuestion; // nieznany kod
};

// Mapa kodów → etykiety PL
const weatherCodeToLabel = (code) => {
  if (code === 0 || code === 1) return 'Słonecznie';
  if (code === 2 || code === 3) return 'Pochmurno';
  if ([45, 48].includes(code)) return 'Mgła';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) return 'Deszcz';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Śnieg';
  if ([95, 96, 99].includes(code)) return 'Burza';
  return 'Nieznana pogoda';
};

/**
 * ForecastTable – z większymi odstępami między kartami.
 *  – `gap-6 md:gap-8` zwiększa przerwy w gridzie.
 *  – Dodano `mb-8` pod gridem, aby legenda nie kleiła się do kart.
 */
export default function ForecastTable({ forecast = [] }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-7 justify-items-center">
        {forecast.map((day) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-40 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col items-center text-center"
          >
            {/* DATA */}
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
              {new Date(day.date).toLocaleDateString('pl-PL', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
              })}
            </div>

            {/* IKONA */}
            <FontAwesomeIcon
              icon={weatherCodeToIcon(day.weatherCode)}
              size="2x"
              className="mt-3 text-yellow-400 dark:text-yellow-300"
              title={weatherCodeToLabel(day.weatherCode)}
            />
            <div className="text-xs sm:text-sm mt-1 text-gray-600 dark:text-gray-300">
              {weatherCodeToLabel(day.weatherCode)}
            </div>

            {/* TEMPERATURA */}
            <div className="mt-3 text-center">
              <span className="block text-xl sm:text-2xl text-blue-700 dark:text-blue-300 font-bold">
                {day.tempMax}°C
              </span>
              <span className="block text-sm sm:text-base text-blue-400 dark:text-blue-200">
                {day.tempMin}°C
              </span>
            </div>

            {/* ENERGIA */}
            <div className="mt-3 text-yellow-600 dark:text-yellow-300 font-semibold text-sm sm:text-base">
              {day.energyKwh.toFixed(2)} kWh
            </div>
          </motion.div>
        ))}
      </div>

      {/* LEGENDA */}
      <div className="mb-8 text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
        Max / Min temperatura · Energia słoneczna (kWh)
      </div>
    </div>
  );
}
