import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureLow,
  faTemperatureHigh,
  faGaugeHigh,
  faSun,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function WeekSummary({ summary }) {
  if (!summary) return null;

  const items = [
    {
      label: 'Najniższa temperatura',
      value: `${summary.minTemperature}°C`,
      icon: faTemperatureLow,
    },
    {
      label: 'Najwyższa temperatura',
      value: `${summary.maxTemperature}°C`,
      icon: faTemperatureHigh,
    },
    {
      label: 'Średnie ciśnienie',
      value: `${summary.avgPressure.toFixed(1)} hPa`,
      icon: faGaugeHigh,
    },
    {
      label: 'Średni czas nasłonecznienia',
      value: `${summary.avgSunshineHours.toFixed(2)} h`,
      icon: faSun,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="my-10 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 w-full max-w-4xl mx-auto border border-gray-200 dark:border-gray-700"
    >
      {/* Nagłówek */}
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        Podsumowanie tygodnia
      </h2>

      {/* lista statystyk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {items.map(({ label, value, icon }) => (
          <div key={label} className="flex flex-col items-center text-center gap-3">
            <FontAwesomeIcon icon={icon} className="text-yellow-500 dark:text-yellow-300" size="2x" />
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
              {label}
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-50">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* komentarz */}
      <div className="mt-10 flex items-start gap-4 text-base">
        <FontAwesomeIcon icon={faCommentDots} className="text-blue-500 dark:text-blue-300 mt-1" size="lg" />
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          <span className="font-semibold">Komentarz:</span>{' '}
          {summary.weekComment || 'Brak komentarza'}
        </p>
      </div>
    </motion.div>
  );
}
