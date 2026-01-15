// Vercel Serverless Function для загрузки файлов через GitHub API
// РАБОТАЕТ В PRODUCTION на Vercel

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER || 'YOUR_USERNAME';
    const repoName = process.env.GITHUB_REPO_NAME || 'uzbekistan-info';
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!githubToken) {
      return res.status(500).json({ 
        error: 'GitHub token not configured. Set GITHUB_TOKEN in Vercel environment variables.' 
      });
    }

    // Читаем файл и конвертируем в base64
    const bytes = await file.arrayBuffer();
    const content = Buffer.from(bytes).toString('base64');

    // GitHub API путь: public/{targetPath}
    const githubPath = `public/${targetPath}`;

    // Сначала проверим, существует ли файл (получим SHA для обновления)
    let sha = null;
    try {
      const getResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPath}?ref=${branch}`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (getResponse.ok) {
        const fileData = await getResponse.json();
        sha = fileData.sha; // Нужен для обновления существующего файла
      }
    } catch (err) {
      // Файл не существует, создадим новый
      console.log('File does not exist, creating new one');
    }

    // Создаем или обновляем файл
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Update file: ${targetPath}`,
          content: content,
          branch: branch,
          ...(sha && { sha: sha }), // SHA нужен только для обновления
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API error:', errorData);
      return res.status(response.status).json({ 
        error: errorData.message || 'Failed to upload file to GitHub' 
      });
    }

    const result = await response.json();

    return res.status(200).json({ 
      success: true, 
      message: `File uploaded successfully: ${targetPath}`,
      path: targetPath,
      commit: result.commit
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: error.message });
  }
}

