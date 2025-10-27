import React, { useEffect } from 'react';

function Work() {
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
        const fileUrl = '/docs/work/Video.apk'; // Пример: PDF с описанием вакансии

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
          backgroundImage: "url('/ed056982-b053-481e-9f6f-6ef735a8dbb1.jpeg')", // Тот же фон
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(5px) brightness(0.9)', // Мягкое размытие и чуть ярче
          zIndex: -1
        }}
      ></div>

      <header
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          padding: '20px',
          textAlign: 'center',
          borderBottom: '2px solid #007a3d', // Цвет из флага Узбекистана
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
          className="title"
          style={{
            fontSize: '2.2rem',
            color: '#007a3d',
            margin: '10px 0',
            textShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          Tashkent jamoasiga taklif
        </h1>
        <h2
          style={{
            fontSize: '1.6rem',
            color: '#000',
            margin: '12px 0',
            fontWeight: 'normal'
          }}
        >
          Biz yana bir qadam oldingdamiz — siz ham keling!
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
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          zIndex: 2,
          border: '1px solid #ccc'
        }}
      >
        <div className="content">
          <div className="text">
            <h2 style={{ color: '#007a3d', marginBottom: '15px', fontSize: '1.6rem' }}>Nima taklif qilyapmiz?</h2>
            <ul style={{ marginBottom: '20px', paddingLeft: '20px', fontSize: '1rem' }}>
              <li>💰 <strong>Konkursli maosh:</strong> Raqobatbardosh darajada, tajriba va qobiliyatga qarab.</li>
              <li>🕐 <strong>Moslanuvchan ish vaqti:</strong> Sizning jadvalingizga mos ravishda.</li>
              <li>🏖️ <strong>To'liq to'lanadigan dam olish:</strong> Har yili minimal 30 kun.</li>
              <li>🏥 <strong>Sog'liqni saqlash:</strong> Barcha tibbiy xarajatlar qoplanadi.</li>
              <li>🚀 <strong>Kelajakni shakllantirish:</strong> O'zbekistonning yangi loyihasi.</li>
              <li>👥 <strong>Barcha qonuniy ijtimoiy kafolatlar:</strong> Barcha qonuniy huquqlar kafolatlanadi.</li>
            </ul>

            <p style={{ fontSize: '1rem' }}>
              Loyiha Toshkentda amalga oshiriladi. Siz kuchli ixtisos, ishonchli va yangi narsalarga ochiq bo'lsangiz — biz sizni kutib qolamiz!
            </p>

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
                  padding: '12px 30px',
                  backgroundColor: '#007a3d',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#005a2d';
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#007a3d';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                }}
              >
                Batafsil ma'lumot →
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .App {
          animation: fadeIn 0.5s ease-out;
        }

        /* Адаптивность */
        @media (max-width: 768px) {
          .title {
            font-size: 1.8rem;
          }

          h2 {
            font-size: 1.4rem;
          }

          h2, h1, ul, p {
            padding: 0 10px;
          }

          main {
            padding: 20px 10px;
          }

          .flag {
            height: 40px; /* Уменьшили флаг */
          }

          button {
            width: 90%; /* Кнопка занимает 90% ширины на мобильных */
            padding: 14px 20px;
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 1.6rem;
          }

          h2 {
            font-size: 1.3rem;
          }

          ul, p {
            font-size: 0.95rem;
          }

          button {
            width: 95%;
            padding: 12px 15px;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Work;