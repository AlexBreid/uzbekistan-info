// Vercel Serverless Function для загрузки файлов
// Сохраняет файлы в public/ директорию

const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ВАЖНО: На Vercel файловая система read-only в production
  // Это решение работает только в development или нужен другой подход
  
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const targetPath = formData.get('path');

    if (!file || !targetPath) {
      return res.status(400).json({ error: 'File and path required' });
    }

    // Проверка безопасности пути
    if (targetPath.includes('..') || targetPath.startsWith('/')) {
      return res.status(400).json({ error: 'Invalid path' });
    }

    // Читаем файл
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Путь к public директории
    const publicPath = path.join(process.cwd(), 'public', targetPath);
    const dirPath = path.dirname(publicPath);

    // Создаем директорию если не существует
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Записываем файл (заменяет существующий)
    fs.writeFileSync(publicPath, buffer);

    return res.status(200).json({ 
      success: true, 
      message: `File uploaded to ${targetPath}`,
      path: targetPath
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// ВАЖНОЕ ПРИМЕЧАНИЕ:
// Vercel имеет read-only файловую систему в production.
// Для production нужно использовать:
// 1. GitHub API для загрузки в репозиторий
// 2. Внешнее хранилище (S3, Cloudflare R2)
// 3. Или другой хостинг с файловой системой

