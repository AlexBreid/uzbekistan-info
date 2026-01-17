// Vercel Serverless Function для удаления файлов

const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { path: filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({ error: 'Path required' });
    }

    // Проверка безопасности
    if (filePath.includes('..') || filePath.startsWith('/')) {
      return res.status(400).json({ error: 'Invalid path' });
    }

    const publicPath = path.join(process.cwd(), 'public', filePath);

    if (!fs.existsSync(publicPath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Удаляем файл
    fs.unlinkSync(publicPath);

    return res.status(200).json({ 
      success: true, 
      message: `File deleted: ${filePath}` 
    });

  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: error.message });
  }
}



