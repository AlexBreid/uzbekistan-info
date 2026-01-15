// Vercel Serverless Function для получения списка файлов

const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      // Получаем относительный путь от public/
      const relativePath = path.relative(path.join(process.cwd(), 'public'), filePath);
      arrayOfFiles.push(relativePath.replace(/\\/g, '/'));
    }
  });

  return arrayOfFiles;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const publicPath = path.join(process.cwd(), 'public');
    
    if (!fs.existsSync(publicPath)) {
      return res.status(200).json({ files: [] });
    }

    const files = getAllFiles(publicPath);
    
    // Фильтруем только нужные директории (docs, img)
    const filteredFiles = files.filter(file => 
      file.startsWith('docs/') || 
      file.startsWith('img/') ||
      file.endsWith('.apk') ||
      file.endsWith('.png') ||
      file.endsWith('.jpg') ||
      file.endsWith('.jpeg') ||
      file.endsWith('.svg')
    );

    return res.status(200).json({ files: filteredFiles });

  } catch (error) {
    console.error('List error:', error);
    return res.status(500).json({ error: error.message });
  }
}

