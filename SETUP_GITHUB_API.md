# Настройка GitHub API для File Manager

## Шаг 1: Создайте GitHub Personal Access Token

1. Зайдите на GitHub.com
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Дайте название: `File Manager Token`
5. Выберите scope: **`repo`** (полный доступ к репозиторию)
6. Generate token
7. **СОХРАНИТЕ ТОКЕН** - он показывается только один раз!

## Шаг 2: Добавьте переменные в Vercel

1. Зайдите в ваш проект на Vercel
2. Settings → Environment Variables
3. Добавьте следующие переменные:

```
GITHUB_TOKEN = ваш_токен_из_шага_1
GITHUB_REPO_OWNER = ваш_github_username
GITHUB_REPO_NAME = uzbekistan-info
GITHUB_BRANCH = main (или master, в зависимости от вашей ветки)
```

4. Нажмите "Save" для каждой переменной

## Шаг 3: Измените пароль в FileManager

Откройте `src/pages/FileManager.jsx` и найдите `CHANGE_THIS_PASSWORD_123` - замените на свой пароль.

## Шаг 4: Деплой

После добавления переменных окружения, сделайте новый деплой:
- Либо дождитесь автоматического деплоя при пуше в Git
- Либо зайдите в Vercel → Deployments → три точки → Redeploy

## Готово!

Теперь можно зайти на `/FileManager?password=ВАШ_ПАРОЛЬ` и загружать/заменять файлы.

**Как это работает:**
- Загружаете файл через интерфейс
- Файл сохраняется в GitHub репозиторий
- Vercel автоматически делает новый деплой
- Файл становится доступным на сайте

**Важно:** После загрузки файла через GitHub API может потребоваться несколько секунд (до минуты) пока Vercel пересоберет сайт с новым файлом.



