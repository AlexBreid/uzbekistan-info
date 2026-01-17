// API для обновления конфигураций через GitHub API

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { oldPath, newPath } = req.body;

    if (!oldPath || !newPath) {
      return res.status(400).json({ error: 'oldPath and newPath required' });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER || 'YOUR_USERNAME';
    const repoName = process.env.GITHUB_REPO_NAME || 'uzbekistan-info';
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!githubToken) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }

    const configFiles = ['roulette_premium.json', 'ormbank.json', 'bankuz.json', 'tiktoklikesite.json'];
    const updated = [];

    for (const configFile of configFiles) {
      try {
        const githubPath = `public/config/${configFile}`;
        
        // Получаем текущий файл
        const getResponse = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPath}?ref=${branch}`,
          {
            headers: {
              'Authorization': `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );

        if (!getResponse.ok) continue;

        const fileData = await getResponse.json();
        const content = Buffer.from(fileData.content, 'base64').toString('utf8');
        const config = JSON.parse(content);
        
        // Обновляем конфигурацию
        const wasUpdated = updateInObject(config, oldPath, newPath);
        
        if (wasUpdated) {
          // Сохраняем обновленную конфигурацию
          const updatedContent = JSON.stringify(config, null, 2);
          const updatedBase64 = Buffer.from(updatedContent).toString('base64');
          
          const putResponse = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPath}`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: `Update config: replace ${oldPath} with ${newPath}`,
                content: updatedBase64,
                sha: fileData.sha,
                branch: branch,
              }),
            }
          );

          if (putResponse.ok) {
            updated.push(configFile);
          }
        }
      } catch (err) {
        console.error(`Error updating ${configFile}:`, err);
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

function updateInObject(obj, oldPath, newPath) {
  let updated = false;
  
  for (const key in obj) {
    const value = obj[key];
    
    if (typeof value === 'string') {
      const normalizedOld = oldPath.replace(/^\/docs\//, 'docs/').replace(/^\/img\//, 'img/');
      const normalizedNew = newPath.replace(/^\/docs\//, 'docs/').replace(/^\/img\//, 'img/');
      
      let updatedValue = value;
      
      if (value.includes('uzbekistan-info.vercel.app')) {
        const fileName = oldPath.split('/').pop();
        if (value.includes(fileName)) {
          updatedValue = value.replace(fileName, normalizedNew.split('/').pop());
          updated = true;
        }
      }
      
      if (value.startsWith('./') && value.includes(oldPath.split('/').pop())) {
        updatedValue = `./${normalizedNew}`;
        updated = true;
      }
      
      if (value === normalizedOld || value === oldPath) {
        updatedValue = normalizedNew;
        updated = true;
      }
      
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



