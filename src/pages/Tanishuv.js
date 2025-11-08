import React, { useState, useEffect } from 'react';
// Импортируем иконки как простые SVG-компоненты или заменяем их
// на Unicode/простые символы, чтобы избежать внешней зависимости.
// Для демонстрации используем простые символы или встроенные SVG-пути.

// *** Компоненты-заглушки для иконок ***
const IconWrapper = ({ children, className, style }) => (
  <span className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}>
    {children}
  </span>
);

const Download = () => <IconWrapper style={{ width: '1em', height: '1em' }}>⬇️</IconWrapper>;
const MapPin = () => <IconWrapper style={{ width: '1em', height: '1em' }}>📍</IconWrapper>;
const Video = () => <IconWrapper style={{ width: '1em', height: '1em' }}>📹</IconWrapper>;
const Heart = () => <IconWrapper style={{ width: '1em', height: '1em' }}>❤️</IconWrapper>;
const Star = ({ className, style }) => <IconWrapper className={className} style={{ width: '1em', height: '1em', ...style }}>⭐️</IconWrapper>;
const Sparkles = ({ className, style }) => <IconWrapper className={className} style={{ width: '1em', height: '1em', ...style }}>✨</IconWrapper>;
const Users = () => <IconWrapper style={{ width: '1em', height: '1em' }}>👥</IconWrapper>;
const Clock = () => <IconWrapper style={{ width: '1em', height: '1em' }}>⏰</IconWrapper>;

// *** Основной компонент App ***

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Слайд-шоу
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Эффект параллакса
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'https://uzbekistan-info.vercel.app/docs/Tanishuv.apk';
    link.download = 'Romantika.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const features = [
    { icon: MapPin, text: "Tuman bo'yicha", color: ['#ec4899', '#f43f5e'], bgColor: 'rgba(255, 240, 245, 0.8)' },
    { icon: Video, text: 'Haqiqiy video', color: ['#9333ea', '#ec4899'], bgColor: 'rgba(245, 240, 255, 0.8)' },
    { icon: Heart, text: 'Bepul boshlash', color: ['#f43f5e', '#f97316'], bgColor: 'rgba(255, 245, 240, 0.8)' }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Foydalanuvchilar' },
    { icon: Star, value: '4.9', label: 'Reyting' },
    { icon: Clock, value: '24/7', label: 'Onlayn' }
  ];

  const statStyles = {
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '8px 16px',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'default',
    },
    icon: {
      color: '#db2777', // pink-600
    },
    value: {
      color: '#db2777', // pink-600
      fontSize: '1em',
      fontWeight: '600',
    },
    label: {
      color: '#4b5563', // gray-600
      fontSize: '0.75em',
    }
  };

  // Заменяем Tailwind-классы на встроенные стили и простые классы (которые нужно определить в CSS)
  return (
    <div style={styles.container}>
      {/* Enhanced Animated background */}
      <div style={styles.background.animatedLayer}>
        <div 
          className="blob"
          style={{
            ...styles.background.blob,
            backgroundColor: 'rgba(244, 114, 182, 0.4)', // pink/rose-300
            top: `${20 + mousePosition.y * 0.05}%`,
            left: `${10 + mousePosition.x * 0.05}%`,
            animationDelay: '0s',
          }}
        ></div>
        <div 
          className="blob"
          style={{
            ...styles.background.blob,
            backgroundColor: 'rgba(192, 132, 252, 0.4)', // purple/pink-300
            top: `${40 + mousePosition.y * 0.03}%`,
            right: `${10 + mousePosition.x * 0.03}%`,
            animationDelay: '2s',
          }}
        ></div>
        <div 
          className="blob"
          style={{
            ...styles.background.blob,
            backgroundColor: 'rgba(251, 146, 60, 0.4)', // orange/rose-300
            bottom: `${20 + mousePosition.y * 0.04}%`,
            left: `${50 + mousePosition.x * 0.02}%`,
            animationDelay: '4s',
          }}
        ></div>
      </div>

      {/* Sparkles decoration */}
      <div style={styles.background.sparklesLayer}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="sparkle-pulse"
            style={{
              position: 'absolute',
              color: 'rgba(251, 113, 133, 0.2)', // pink-400/20
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
              pointerEvents: 'none',
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div style={styles.contentWrapper}>
        {/* Flag with animation */}
        <div className="fadeInDown" style={styles.flag.wrapper}>
          <div style={styles.flag.group}>
            <div className="flag-glow" style={styles.flag.glow}></div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg"
              alt="O'zbekiston bayrog'i"
              style={styles.flag.image}
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="fadeInDown delay-200" style={styles.stats.container}>
          {stats.map((stat, i) => (
            <div key={i} style={statStyles.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <stat.icon style={statStyles.icon} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={statStyles.value}>{stat.value}</span>
                  <span style={statStyles.label}>{stat.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content card */}
        <div className="fadeInUp" style={styles.card.container}>
          <div style={styles.card.content}>
            {/* Title with enhanced styling */}
            <div style={{ marginBottom: '32px', position: 'relative' }}>
              <div style={{ display: 'inline-block', marginBottom: '12px' }}>
                <Sparkles style={{ width: '24px', height: '24px', color: '#ec4899' }} className="pulse" />
              </div>
              <h1 className="gradient-text animated-gradient" style={styles.card.title}>
                🎥 Videolaym bilan suhbat!
              </h1>
              <h2 style={styles.card.subtitle}>
                Eng chiroyli qizlarni 
                <span style={{ color: '#db2777', position: 'relative', display: 'inline-block' }}>
                  sizning tumaningizdan
                  {/* Заглушка для подчеркивания с анимацией */}
                </span> toping!
              </h2>
            </div>

            {/* Enhanced Slideshow */}
            <div style={styles.slideshow.wrapper}>
              <div className="pulse-slow" style={styles.slideshow.outerGlow}></div>
              
              <div style={styles.slideshow.imageContainer}>
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Qiz ${index + 1}`}
                    style={{ 
                      ...styles.slideshow.image,
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)',
                      transition: 'all 1s ease-in-out',
                    }}
                  />
                ))}
                
                {/* Live indicator */}
                <div style={styles.slideshow.liveIndicator}>
                  <span className="pulse" style={styles.slideshow.liveDot}></span>
                  <span style={{ color: 'white', fontSize: '0.75rem' }}>ONLAYN</span>
                </div>
                
                {/* Indicators */}
                <div style={styles.slideshow.indicators}>
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      style={{
                        ...styles.slideshow.indicatorButton,
                        width: i === currentSlide ? '40px' : '8px',
                        background: i === currentSlide 
                          ? 'linear-gradient(to right, #ec4899, #f43f5e)' 
                          : 'rgba(255, 255, 255, 0.6)',
                        boxShadow: i === currentSlide ? '0 4px 6px rgba(236, 72, 153, 0.5)' : 'none',
                        transition: 'all 0.5s ease',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Subtitle with icon */}
            <p style={styles.card.paragraph}>
              <span style={{ fontSize: '24px', marginRight: '8px' }}>💬</span>
              <span>Sizning ko'changizdagi eng glamurli qiz — hozir onlayn! Faqat ilovani yuklab oling…</span>
            </p>

            {/* Features */}
            <div style={styles.features.container}>
              {features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.features.item,
                    backgroundColor: feature.bgColor,
                    border: `1px solid ${feature.color[0]}33`,
                  }}
                >
                  <div style={styles.features.content}>
                    <feature.icon style={{ width: '20px', height: '20px', color: feature.color[0] }} />
                    <span style={{ background: `linear-gradient(to right, ${feature.color[0]}, ${feature.color[1]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '0.9em' }}>
                      {feature.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Button */}
            <div style={{ marginBottom: '32px', position: 'relative' }}>
              <div className="button-glow pulse-slow" style={styles.button.glow}></div>
              <button
                onClick={handleDownload}
                style={styles.button.main}
                className="hover-scale"
              >
                <Download style={styles.button.icon} className="bounce" />
                <span style={{ position: 'relative' }}>Ilovani bepul yuklab olish</span>
              </button>
            </div>

            {/* Testimonial */}
            <div style={styles.testimonial.container}>
              <div style={styles.testimonial.quoteIcon}>💕</div>
              <div style={{ position: 'relative', padding: '24px' }}>
                <div style={styles.testimonial.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="star-fill pulse" 
                      style={{ width: '20px', height: '20px', animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p style={styles.testimonial.text}>
                  "Qo'shnim — Chiroyli qiz! 10 daqiqada tanishdik. Hozir do'stman!"
                </p>
                <div style={styles.testimonial.userInfo}>
                  <div style={styles.testimonial.avatar}>J</div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: '#db2777', fontWeight: '600' }}>Jamshid</p>
                    <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>Yunusobod</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="fadeInUp delay-400" style={styles.footer.container}>
          <div style={styles.footer.infoBox}>
            <Sparkles style={{ width: '20px', height: '20px', color: '#ec4899' }} className="pulse" />
            <p style={{ color: '#4b5563' }}>
              1000+ yangi odamlar har kuni qo'shiladi
            </p>
          </div>
          
          <div style={styles.footer.links}>
            <span>🔒 Xavfsiz</span>
            <span>•</span>
            <span>⚡ Tez</span>
            <span>•</span>
            <span>✨ Oson</span>
          </div>
        </div>
      </div>
      
      {/* Встроенные стили для анимаций, заменяющие стили из секции <style jsx> */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        
        .blob { animation: blob 8s infinite; mix-blend-mode: multiply; filter: blur(48px); opacity: 0.7; border-radius: 9999px; }
        .animated-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .bounce { animation: bounce 1s infinite; }
        
        .fadeInDown { animation: fadeInDown 0.8s ease-out forwards; }
        .fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .star-fill { fill: #ec4899; color: #ec4899; }
        
        /* Стили для hover-эффектов, которые нельзя полностью заменить inline-стилями */
        .hover-scale:hover { transform: scale(1.02); }
        .flag-glow:hover { opacity: 0.75; }
        .flag-glow { opacity: 0.25; transition: opacity 0.5s; }

        .gradient-text {
          background: linear-gradient(to right, #db2777, #e11d48, #f97316); /* pink-600, rose-600, orange-600 */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          font-size: 2.25rem; /* text-4xl */
          line-height: 1;
          margin-bottom: 0.75rem;
          font-weight: 800;
        }
      `}</style>
    </div>
  );
}

// *** Объект стилей для чистого React (заменяет Tailwind) ***
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #fff0f5, #fff5f8, #fff8f0)', // from-pink-50 via-rose-50 to-orange-50
    position: 'relative',
    overflow: 'hidden',
    padding: '48px 16px',
  },
  background: {
    animatedLayer: {
      position: 'absolute',
      inset: '0',
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    blob: {
      position: 'absolute',
      width: '600px',
      height: '600px',
      borderRadius: '9999px',
    },
    sparklesLayer: {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
    }
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 96px)', // Учитываем padding
    maxWidth: '100%',
    margin: '0 auto',
  },
  flag: {
    wrapper: {
      marginBottom: '24px',
      opacity: 0, // для анимации
    },
    group: {
      position: 'relative',
    },
    glow: {
      position: 'absolute',
      inset: '-4px',
      background: 'linear-gradient(to right, #f472b6, #fb7185)', // pink-400 to rose-400
      borderRadius: '12px',
      filter: 'blur(16px)',
    },
    image: {
      position: 'relative',
      height: '48px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '2px solid rgba(255, 255, 255, 0.8)',
    }
  },
  stats: {
    container: {
      display: 'flex',
      gap: '16px',
      marginBottom: '24px',
      opacity: 0, // для анимации
    }
  },
  card: {
    container: {
      maxWidth: '512px',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(12px)',
      border: 'none',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      borderRadius: '1rem', // rounded-2xl
      position: 'relative',
      overflow: 'hidden',
    },
    content: {
      position: 'relative',
      padding: '32px',
      textAlign: 'center',
    },
    title: {
      // Стили перенесены в .gradient-text CSS-класс
    },
    subtitle: {
      color: '#4b5563', // gray-700
      lineHeight: '1.5',
      maxWidth: '448px',
      margin: '0 auto',
      fontSize: '1.25rem',
    },
    paragraph: {
      color: '#4b5563',
      marginBottom: '32px',
      lineHeight: '1.6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      maxWidth: '448px',
      margin: '0 auto 32px auto',
    }
  },
  slideshow: {
    wrapper: {
      position: 'relative',
      width: '100%',
      paddingTop: '100%', // aspect-square
      maxWidth: '384px',
      margin: '0 auto 32px auto',
    },
    outerGlow: {
      position: 'absolute',
      inset: '-16px',
      background: 'linear-gradient(to right, #f472b6, #fb7185, #fb923c)', // pink/rose/orange-400
      borderRadius: '9999px',
      opacity: '0.2',
      filter: 'blur(32px)',
    },
    imageContainer: {
      position: 'absolute',
      inset: '0',
      borderRadius: '2rem',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '4px solid rgba(255, 255, 255, 0.5)',
      transition: 'all 0.5s ease',
      transform: 'scale(1)',
    },
    image: {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'opacity 1s, transform 1s',
    },
    liveIndicator: {
      position: 'absolute',
      top: '16px',
      left: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: 'rgba(239, 68, 68, 0.9)', // red-500/90
      backdropFilter: 'blur(4px)',
      padding: '6px 12px',
      borderRadius: '9999px',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
    liveDot: {
      width: '8px',
      height: '8px',
      backgroundColor: 'white',
      borderRadius: '9999px',
    },
    indicators: {
      position: 'absolute',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px',
      zIndex: 10,
    },
    indicatorButton: {
      height: '8px',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      padding: '0',
    }
  },
  features: {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '32px',
    },
    item: {
      borderRadius: '16px',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    content: {
      position: 'relative',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }
  },
  button: {
    glow: {
      position: 'absolute',
      inset: '-4px',
      background: 'linear-gradient(to right, #db2777, #e11d48, #f97316)', // pink/rose/orange-600
      borderRadius: '9999px',
      filter: 'blur(16px)',
      opacity: '0.5',
    },
    main: {
      position: 'relative',
      width: '100%',
      background: 'linear-gradient(to right, #db2777, #e11d48, #f97316)',
      color: 'white',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      padding: '14px 28px',
      borderRadius: '9999px',
      overflow: 'hidden',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.125rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: '20px',
      height: '20px',
      marginRight: '8px',
    }
  },
  testimonial: {
    container: {
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom right, #fff0f5, #fff5f8, #fff8f0)', // from-pink-50 via-rose-50 to-orange-50
      border: '2px solid rgba(251, 207, 232, 0.5)', // pink-200/50
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      borderRadius: '0.5rem', // rounded-xl
      transition: 'all 0.3s ease',
    },
    quoteIcon: {
      position: 'absolute',
      top: '0',
      right: '0',
      fontSize: '4rem',
      color: 'rgba(251, 207, 232, 0.2)', // pink-200/20
      transform: 'rotate(12deg)',
    },
    stars: {
      display: 'flex',
      justifyContent: 'center',
      gap: '4px',
      marginBottom: '12px',
    },
    text: {
      color: '#4b5563',
      fontStyle: 'italic',
      marginBottom: '16px',
      lineHeight: '1.6',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    },
    avatar: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(to bottom right, #f472b6, #fb7185)', // pink-400 to rose-400
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      fontWeight: '600',
    }
  },
  footer: {
    container: {
      marginTop: '32px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      opacity: 0, // для анимации
    },
    infoBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(4px)',
      borderRadius: '9999px',
      padding: '12px 24px',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
    links: {
      display: 'flex',
      gap: '8px',
      fontSize: '0.75rem',
      color: '#6b7280',
    }
  }
};