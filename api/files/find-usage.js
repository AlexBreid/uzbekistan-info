// API для поиска использования файла в конфигурациях

const fs = require('fs');
const path = require('path');

function searchInObject(obj, searchPath, results = []) {
  for (const key in obj) {
    const value = obj[key];
    
    if (typeof value === 'string') {
      // Проверяем разные форматы путей
      const normalizedPath = searchPath.replace(/^\/docs\//, 'docs/').replace(/^\/img\//, 'img/');
      const normalizedValue = value.replace(/^\.\//, '').replace(/^\/docs\//, 'docs/').replace(/^\/img\//, 'img/');
      
      // Проверяем полные URL и относительные пути
      if (
        value.includes(searchPath) || 
        value.includes(`docs/${searchPath.split('/').pop()}`) ||
        value.includes(`img/${searchPath.split('/').pop()}`) ||
        normalizedValue === normalizedPath ||
        normalizedValue === searchPath ||
        (value.includes('uzbekistan-info.vercel.app') && value.includes(searchPath.split('/').pop()))
      ) {
        results.push({
          path: key,
          value: value,
          matches: true
        });
      }
    } else if (typeof value === 'object' && value !== null) {
      searchInObject(value, searchPath, results);
    }
  }
  return results;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { path: filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({ error: 'Path required' });
    }

    const configDir = path.join(process.cwd(), 'public', 'config');
    const configFiles = ['roulette_premium.json', 'ormbank.json', 'bankuz.json', 'tiktoklikesite.json'];
    
    const usage = [];

    for (const configFile of configFiles) {
      const configPath = path.join(configDir, configFile);
      
      if (fs.existsSync(configPath)) {
        try {
          const content = fs.readFileSync(configPath, 'utf8');
          const config = JSON.parse(content);
          const pageName = configFile.replace('.json', '');
          
          // Ищем использование файла
          const matches = searchInObject(config, filePath);
          
          if (matches.length > 0) {
            usage.push({
              page: pageName,
              configFile: configFile,
              matches: matches
            });
          }
        } catch (err) {
          console.error(`Error reading ${configFile}:`, err);
        }
      }
    }

    // Определяем название страницы
    const pageNames = {
      roulette_premium: 'Roulette Premium (LARGO SPIN)',
      ormbank: 'ORM Bank',
      bankuz: 'Bank UZ',
      tiktoklikesite: 'TikTok Like Site'
    };

    const formattedUsage = usage.map(u => ({
      pageName: pageNames[u.page] || u.page,
      page: u.page,
      configFile: u.configFile,
      matches: u.matches
    }));

    return res.status(200).json({ 
      filePath: filePath,
      usage: formattedUsage 
    });

  } catch (error) {
    console.error('Find usage error:', error);
    return res.status(500).json({ error: error.message });
  }
}

