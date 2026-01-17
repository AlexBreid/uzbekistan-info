// Vercel Serverless Function для получения списка файлов через GitHub API

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER || 'YOUR_USERNAME';
    const repoName = process.env.GITHUB_REPO_NAME || 'uzbekistan-info';
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!githubToken) {
      return res.status(200).json({ files: [] });
    }

    // Получаем содержимое public/ директории
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/public?ref=${branch}`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      return res.status(200).json({ files: [] });
    }

    const items = await response.json();
    const files = [];

    // Рекурсивно собираем файлы из docs/ и img/
    async function getFilesRecursive(path, items) {
      for (const item of items) {
        if (item.type === 'file') {
          // Убираем public/ из пути
          const relativePath = item.path.replace('public/', '');
          if (
            relativePath.startsWith('docs/') ||
            relativePath.startsWith('img/') ||
            relativePath.endsWith('.apk') ||
            relativePath.match(/\.(png|jpg|jpeg|svg)$/i)
          ) {
            files.push(relativePath);
          }
        } else if (item.type === 'dir' && (item.name === 'docs' || item.name === 'img')) {
          // Получаем содержимое поддиректории
          const dirResponse = await fetch(item.url, {
            headers: {
              'Authorization': `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          });
          if (dirResponse.ok) {
            const dirItems = await dirResponse.json();
            await getFilesRecursive(item.path, dirItems);
          }
        }
      }
    }

    await getFilesRecursive('public', items);

    return res.status(200).json({ files: files.sort() });

  } catch (error) {
    console.error('List error:', error);
    return res.status(200).json({ files: [] }); // Возвращаем пустой массив при ошибке
  }
}



