import React, { useState } from 'react';

/**
 * Админ-панель для загрузки и замены файлов
 * Доступ: /FileManager?password=ВАШ_ПАРОЛЬ
 */
export default function FileManager() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileUsage, setFileUsage] = useState(null);
  const [checkingUsage, setCheckingUsage] = useState(false);

  // Проверка пароля из URL или localStorage
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlPassword = urlParams.get('password');
    const savedPassword = localStorage.getItem('fileManagerPassword');
    
    if (urlPassword) {
      if (urlPassword === 'Qwerty123456') {
        setAuthenticated(true);
        localStorage.setItem('fileManagerPassword', urlPassword);
        loadFiles();
      }
    } else if (savedPassword === 'Qwerty123456') {
      setAuthenticated(true);
      loadFiles();
    }
  }, []);

  const loadFiles = async () => {
    try {
      // Используем GitHub API версию для production
      const apiEndpoint = process.env.NODE_ENV === 'production' 
        ? '/api/files/list-github' 
        : '/api/files/list';
      
      const response = await fetch(apiEndpoint);
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch (err) {
      console.error('Ошибка загрузки списка файлов:', err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Qwerty123456') {
      setAuthenticated(true);
      localStorage.setItem('fileManagerPassword', password);
      loadFiles();
    } else {
      setMessage('Неверный пароль');
    }
  };

  // Проверка использования файла
  const checkFileUsage = async (filePath) => {
    if (!filePath || filePath.trim() === '') {
      setFileUsage(null);
      return;
    }

    setCheckingUsage(true);
    try {
      const apiEndpoint = process.env.NODE_ENV === 'production' 
        ? '/api/files/find-usage-github' 
        : '/api/files/find-usage';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: filePath }),
      });

      if (response.ok) {
        const data = await response.json();
        setFileUsage(data);
      } else {
        setFileUsage(null);
      }
    } catch (err) {
      console.error('Error checking usage:', err);
      setFileUsage(null);
    } finally {
      setCheckingUsage(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get('file');
    const targetPath = formData.get('targetPath');

    if (!file || !targetPath) {
      setMessage('Заполните все поля');
      return;
    }

    setUploading(true);
    setMessage('');
    setFileUsage(null);

    try {
      // Проверяем, существует ли старый файл
      const oldFileExists = files.includes(targetPath);
      
      // 1. Загружаем новый файл
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('path', targetPath);

      const apiEndpoint = process.env.NODE_ENV === 'production' 
        ? '/api/files/upload-github' 
        : '/api/files/upload';
      
      const uploadResponse = await fetch(apiEndpoint, {
        method: 'POST',
        body: uploadFormData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        setMessage(`Ошибка загрузки: ${uploadData.error || 'Не удалось загрузить файл'}`);
        return;
      }

      // 2. Если файл существует, обновляем конфигурации
      if (oldFileExists) {
        const updateConfigEndpoint = process.env.NODE_ENV === 'production' 
          ? '/api/files/update-configs-github' 
          : '/api/files/update-configs';
        
        const updateResponse = await fetch(updateConfigEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            oldPath: targetPath, 
            newPath: targetPath // Тот же путь, но обновляем ссылки
          }),
        });

        const updateData = await updateResponse.json();
        
        if (updateResponse.ok && updateData.updated.length > 0) {
          setMessage(`Файл заменен: ${targetPath}. Обновлены конфигурации: ${updateData.updated.join(', ')}`);
        } else {
          setMessage(`Файл заменен: ${targetPath}`);
        }
      } else {
        setMessage(`Файл успешно загружен: ${targetPath}`);
      }

      // 3. Обновляем список файлов
      await loadFiles();
      
      // 4. Проверяем использование нового файла
      await checkFileUsage(targetPath);
      
      e.target.reset();
    } catch (err) {
      setMessage(`Ошибка: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filePath) => {
    if (!window.confirm(`Удалить файл ${filePath}?`)) return;

    try {
      // Используем GitHub API версию для production
      const apiEndpoint = process.env.NODE_ENV === 'production' 
        ? '/api/files/delete-github' 
        : '/api/files/delete';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: filePath }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Файл удален: ${filePath}`);
        loadFiles();
      } else {
        setMessage(`Ошибка: ${data.error}`);
      }
    } catch (err) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
        fontFamily: 'Arial, sans-serif'
      }}>
        <form onSubmit={handleLogin} style={{
          background: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h2 style={{ marginBottom: '20px' }}>Вход в File Manager</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            required
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Войти
          </button>
          {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>File Manager - Управление файлами</h1>
          <button
            onClick={() => {
              localStorage.removeItem('fileManagerPassword');
              setAuthenticated(false);
            }}
            style={{
              padding: '8px 16px',
              background: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Выйти
          </button>
        </div>

        {message && (
          <div style={{
            padding: '12px',
            background: message.includes('Ошибка') ? '#fee' : '#efe',
            border: `1px solid ${message.includes('Ошибка') ? '#fcc' : '#cfc'}`,
            borderRadius: '4px',
            marginBottom: '20px',
            color: message.includes('Ошибка') ? '#c00' : '#0a0'
          }}>
            {message}
          </div>
        )}

        {/* Форма загрузки */}
        <div style={{ marginBottom: '40px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h2 style={{ marginBottom: '20px' }}>Загрузить/Заменить файл</h2>
          <form onSubmit={handleFileUpload}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Путь файла (например: docs/UzMoney.apk или img/logo.png)
              </label>
              <input
                type="text"
                name="targetPath"
                placeholder="docs/newfile.apk"
                required
                onChange={(e) => {
                  const path = e.target.value;
                  if (path && path.trim() !== '') {
                    checkFileUsage(path);
                  } else {
                    setFileUsage(null);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                Если файл с таким именем существует, он будет заменен. Конфигурации обновятся автоматически.
              </small>
              
              {/* Показываем использование файла */}
              {checkingUsage && (
                <div style={{ marginTop: '10px', padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
                  Проверка использования файла...
                </div>
              )}
              
              {fileUsage && fileUsage.usage && fileUsage.usage.length > 0 && (
                <div style={{ 
                  marginTop: '10px', 
                  padding: '12px', 
                  background: '#e3f2fd', 
                  borderRadius: '4px',
                  border: '1px solid #2196f3'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1976d2' }}>
                    📄 Этот файл используется на страницах:
                  </div>
                  {fileUsage.usage.map((usage, idx) => (
                    <div key={idx} style={{ 
                      marginBottom: '8px', 
                      padding: '8px',
                      background: 'white',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}>
                      <div style={{ fontWeight: 'bold', color: '#1976d2' }}>
                        {usage.pageName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                        Конфиг: {usage.configFile}
                      </div>
                      {usage.matches && usage.matches.length > 0 && (
                        <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                          Найдено {usage.matches.length} совпадение(й)
                        </div>
                      )}
                    </div>
                  ))}
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
                    При загрузке файла эти страницы будут автоматически обновлены
                  </div>
                </div>
              )}
              
              {fileUsage && fileUsage.usage && fileUsage.usage.length === 0 && (
                <div style={{ 
                  marginTop: '10px', 
                  padding: '10px', 
                  background: '#f5f5f5', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  Этот файл не используется ни на одной странице
                </div>
              )}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Выберите файл
              </label>
              <input
                type="file"
                name="file"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              style={{
                padding: '12px 24px',
                background: uploading ? '#999' : '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: uploading ? 'not-allowed' : 'pointer'
              }}
            >
              {uploading ? 'Загрузка...' : 'Загрузить файл'}
            </button>
          </form>
        </div>

        {/* Список файлов */}
        <div>
          <h2 style={{ marginBottom: '20px' }}>Существующие файлы</h2>
          {files.length === 0 ? (
            <p>Нет файлов</p>
          ) : (
            <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
              {files.map((file, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    borderBottom: index < files.length - 1 ? '1px solid #eee' : 'none',
                    background: index % 2 === 0 ? '#fff' : '#f9f9f9'
                  }}
                >
                  <span style={{ fontFamily: 'monospace' }}>{file}</span>
                  <button
                    onClick={() => handleDelete(file)}
                    style={{
                      padding: '6px 12px',
                      background: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

