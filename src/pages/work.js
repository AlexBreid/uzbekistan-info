import React, { useEffect } from 'react';

function Work() {
  useEffect(() => {
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

    const downloadButton = document.getElementById('download-file');
    if (downloadButton) {
      const handleClick = function (e) {
        e.preventDefault();
        const fileUrl = 'https://uzbekistan-info.vercel.app/docs/work/JobUZ.apk';
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = "JobUZ.apk";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      downloadButton.addEventListener('click', handleClick);
      return () => downloadButton.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <div className="App">
      {/* Фон */}
      <div
        className="hero"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            "url('/ed056982-b053-481e-9f6f-6ef735a8dbb1.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(5px) brightness(0.9)',
          zIndex: -1
        }}
      ></div>

      {/* Шапка */}
      <header
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          padding: '20px',
          textAlign: 'center',
          borderBottom: '4px solid #007a3d',
          backdropFilter: 'blur(4px)'
        }}
      >
        <img
          src="/img/logo.jpg"
          alt="JobUZ Logo"
          style={{
            width: '100px',
            marginBottom: '10px',
            borderRadius: '15px'
          }}
        />
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
          JOB<span style={{ color: '#007a3d' }}>UZ</span>
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
          <span style={{ color: '#007a3d' }}>90%</span> foydalanuvchilar
          orzularidagi ishni topdi.  
          <br />
          <span style={{ fontWeight: '900', color: '#ff0000' }}>
            Endi navbat SENDА!
          </span>
        </h2>
        <p
          id="current-date"
          style={{
            fontStyle: 'italic',
            color: '#777',
            marginTop: '8px',
            fontSize: '1.1rem'
          }}
        ></p>
      </header>

      {/* Герой блок */}
      <section
        style={{
          position: 'relative',
          textAlign: 'center',
          backgroundImage:
            "url('/hero-jobuz.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 20px',
          color: 'white',
          boxShadow: 'inset 0 0 200px rgba(0, 0, 0, 0.8)'
        }}
      >
        <h2
          style={{
            fontSize: '2.4rem',
            fontWeight: '900',
            textShadow: '0 0 15px rgba(0,0,0,0.8)',
            marginBottom: '10px'
          }}
        >
          ORZULARDAGI ISH SIZNI KUTMOQDA
        </h2>
        <p
          style={{
            fontSize: '1.4rem',
            maxWidth: '800px',
            margin: '0 auto',
            color: '#f5f5f5'
          }}
        >
          Har bir daqiqa yangi imkoniyat.  
          JobUZ yordamida siz orzu qilgan ishingizni bugun toping!
        </p>
      </section>

      {/* Контент */}
      <main
        style={{
          padding: '40px 20px',
          maxWidth: '1000px',
          margin: '20px auto',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
          border: '3px solid #007a3d'
        }}
      >
        <div className="content">
          <h2
            style={{
              color: '#007a3d',
              marginBottom: '20px',
              fontSize: '2rem',
              textAlign: 'center'
            }}
          >
            BIZ NIMA KAFOLATLAYMIZ?
          </h2>
          <ul
            style={{
              marginBottom: '30px',
              paddingLeft: '30px',
              fontSize: '1.2rem',
              listStyleType: 'none'
            }}
          >
            <li
              style={{
                marginBottom: '15px',
                borderLeft: '5px solid #007a3d',
                paddingLeft: '15px'
              }}
            >
              🚀 <b>TEZ O’SISH:</b> Ish haqi va imkoniyatlaringizni 100 baravar oshiring.
            </li>
            <li
              style={{
                marginBottom: '15px',
                borderLeft: '5px solid #007a3d',
                paddingLeft: '15px'
              }}
            >
              🤖 <b>AI TAHLILI:</b> Sun’iy intellekt sizga eng mos ishni tanlaydi.
            </li>
            <li
              style={{
                marginBottom: '15px',
                borderLeft: '5px solid #007a3d',
                paddingLeft: '15px'
              }}
            >
              💼 <b>ISHGA KIRISH SODDA:</b> Rezyume yo‘q, suhbat yo‘q — faqat natija.
            </li>
          </ul>

          <p
            style={{
              fontSize: '1.6rem',
              fontWeight: '900',
              color: '#ff0000',
              textAlign: 'center',
              textTransform: 'uppercase'
            }}
          >
            1. YUKLAB OLING — 2. ISHGA TUSHIRING — 3. PARVOZ QILING
          </p>

          <div
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
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ff0000';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ISHINGIZNI YUKLAB OLING →
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          marginTop: '30px',
          color: 'rgba(255, 255, 255, 0.8)',
          textShadow: '0 0 3px rgba(0, 0, 0, 0.9)'
        }}
      >
        <p style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
          © {new Date().getFullYear()} JobUZ. 90% foydalanuvchilar ish topdi — endi sen ham qadam tashla!
        </p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .App {
          animation: fadeIn 0.8s ease-out;
          min-height: 100vh;
          padding-bottom: 50px;
        }
        @media (max-width: 768px) {
          .title { font-size: 2rem; }
          h2 { font-size: 1.3rem; }
          button { width: 100%; font-size: 1.2rem; }
        }
      `}</style>
    </div>
  );
}

export default Work;