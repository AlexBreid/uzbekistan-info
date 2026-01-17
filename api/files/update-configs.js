// API для обновления конфигураций при замене файла

const fs = require('fs');
const path = require('path');

function updateInObject(obj, oldPath, newPath) {
  let updated = false;
  
  for (const key in obj) {
    const value = obj[key];
    
    if (typeof value === 'string') {
      // Нормализуем пути
      const normalizedOld = oldPath.replace(/^\/docs\//, 'docs/').replace(/^\/img\//, 'img/');
      const normalizedNew = newPath.replace(/^\/docs\//, 'docs/').replace(/^\/img\//, 'img/');
      
      // Различные форматы путей
      let updatedValue = value;
      
      // Полный URL с доменом
      if (value.includes('uzbekistan-info.vercel.app')) {
        const fileName = oldPath.split('/').pop();
        if (value.includes(fileName)) {
          updatedValue = value.replace(fileName, normalizedNew.split('/').pop());
          updated = true;
        }
      }
      
      // Относительный путь ./docs/file.apk
      if (value.startsWith('./') && value.includes(oldPath.split('/').pop())) {
        updatedValue = `./${normalizedNew}`;
        updated = true;
      }
      
      // Путь docs/file.apk
      if (value === normalizedOld || value === oldPath) {
        updatedValue = normalizedNew;
        updated = true;
      }
      
      // Полный путь /docs/file.apk
      if (value === `/${normalizedOld}` || value === `/${oldPath}`) {
        updatedValue = `/${normalizedNew}`;
        updated = true;
      }
      
      if (updatedValue !== value) {
        obj[key] = updatedValue;
        updated = true;
      }
    } else if (typeof value === 'object' && value !== null) {
      if (updateInObject(value, oldPath, newPath)) {
        updated = true;
      }
    }
  }
  
  return updated;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { oldPath, newPath } = req.body;

    if (!oldPath || !newPath) {
      return res.status(400).json({ error: 'oldPath and newPath required' });
    }

    const configDir = path.join(process.cwd(), 'public', 'config');
    const configFiles = ['roulette_premium.json', 'ormbank.json', 'bankuz.json', 'tiktoklikesite.json'];
    
    const updated = [];

    for (const configFile of configFiles) {
      const configPath = path.join(configDir, configFile);
      
      if (fs.existsSync(configPath)) {
        try {
          const content = fs.readFileSync(configPath, 'utf8');
          const config = JSON.parse(content);
          
          // Обновляем конфигурацию
          const wasUpdated = updateInObject(config, oldPath, newPath);
          
          if (wasUpdated) {
            // Сохраняем обновленную конфигурацию
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
            updated.push(configFile);
          }
        } catch (err) {
          console.error(`Error updating ${configFile}:`, err);
        }
      }
    }

    return res.status(200).json({ 
      success: true,
      updated: updated,
      message: updated.length > 0 
        ? `Updated ${updated.length} config file(s): ${updated.join(', ')}` 
        : 'No config files needed updating'
    });

  } catch (error) {
    console.error('Update configs error:', error);
    return res.status(500).json({ error: error.message });
  }
}



