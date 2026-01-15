import { useState, useEffect } from 'react';

/**
 * Хук для загрузки конфигурационных файлов из public/config/
 * @param {string} configName - Имя конфигурационного файла (без расширения .json)
 * @returns {object} - { config, loading, error }
 */
export function useConfig(configName) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Загружаем конфигурацию из public/config/
        const response = await fetch(`/config/${configName}.json`);
        
        if (!response.ok) {
          throw new Error(`Не удалось загрузить конфигурацию: ${response.statusText}`);
        }
        
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        console.error(`Ошибка загрузки конфигурации ${configName}:`, err);
        setError(err.message);
        // Возвращаем пустой объект вместо null, чтобы компонент не сломался
        setConfig({});
      } finally {
        setLoading(false);
      }
    };

    if (configName) {
      loadConfig();
    } else {
      setLoading(false);
    }
  }, [configName]);

  return { config, loading, error };
}

