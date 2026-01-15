# Инструкция по использованию File Manager

## ⚠️ ВАЖНО: Vercel имеет read-only файловую систему в production!

На Vercel файловая система **read-only** в production режиме. Это означает, что загрузка файлов через Serverless Functions **не будет работать** на продакшене.

## Решение для Vercel Production

### Вариант 1: GitHub API (РЕКОМЕНДУЕТСЯ)

Создайте новый файл `api/files/upload-github.js` который будет использовать GitHub API для загрузки файлов напрямую в репозиторий:

```javascript
// api/files/upload-github.js
export default async function handler(req, res) {
  const formData = await req.formData();
  const file = formData.get('file');
  const targetPath = formData.get('path');
  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = process.env.GITHUB_REPO_OWNER; // ваш username
  const repoName = process.env.GITHUB_REPO_NAME; // uzbekistan-info

  const bytes = await file.arrayBuffer();
  const content = Buffer.from(bytes).toString('base64');

  // GitHub API: Create or update file
  const response = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/contents/public/${targetPath}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Update ${targetPath}`,
        content: content,
        branch: 'main', // или 'master'
      }),
    }
  );

  // ...
}
```

**Настройка:**
1. Создайте GitHub Personal Access Token: Settings → Developer settings → Personal access tokens → Generate new token (scope: `repo`)
2. Добавьте в Vercel Environment Variables:
   - `GITHUB_TOKEN` - ваш токен
   - `GITHUB_REPO_OWNER` - ваш GitHub username
   - `GITHUB_REPO_NAME` - uzbekistan-info

### Вариант 2: Cloudflare R2 / AWS S3

Загружать файлы во внешнее хранилище, а в JSON конфигурации хранить только ссылки.

### Вариант 3: Netlify (если перенести проект)

Netlify имеет writable файловую систему и можно использовать простое решение.

## Использование File Manager

1. **Доступ:** Откройте `/FileManager?password=CHANGE_THIS_PASSWORD_123`
2. **Измените пароль:** В файле `src/pages/FileManager.jsx` найдите `CHANGE_THIS_PASSWORD_123` и замените на свой пароль
3. **Загрузка файла:**
   - Укажите путь: `docs/UzMoney.apk` или `img/logo.png`
   - Выберите файл
   - Нажмите "Загрузить файл"
   - Старый файл автоматически заменится новым

## Для локальной разработки

В development режиме (локально) Serverless Functions работают с файловой системой, поэтому можно тестировать загрузку файлов локально.

## Быстрое решение для production

Если нужно прямо сейчас работать в production, используйте GitHub API вариант. Все готово, нужно только:
1. Получить GitHub Token
2. Добавить переменные в Vercel
3. Обновить `api/files/upload.js` на использование GitHub API

