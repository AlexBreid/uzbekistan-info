// Vercel Serverless Function для удаления файлов через GitHub API

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

    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER || 'YOUR_USERNAME';
    const repoName = process.env.GITHUB_REPO_NAME || 'uzbekistan-info';
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!githubToken) {
      return res.status(500).json({ 
        error: 'GitHub token not configured' 
      });
    }

    const githubPath = `public/${filePath}`;

    // Получаем SHA файла (нужен для удаления)
    const getResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPath}?ref=${branch}`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!getResponse.ok) {
      return res.status(404).json({ error: 'File not found' });
    }

    const fileData = await getResponse.json();

    // Удаляем файл
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPath}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete file: ${filePath}`,
          sha: fileData.sha,
          branch: branch,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ 
        error: errorData.message || 'Failed to delete file' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: `File deleted: ${filePath}` 
    });

  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: error.message });
  }
}



