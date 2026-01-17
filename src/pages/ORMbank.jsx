'use client';

import React from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { useConfig } from '../hooks/useConfig';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    --primary-blue: #0066cc;
    --dark-blue: #004494;
    --light-blue: #f0f4ff;
    --bright-yellow: #ffd700;
    --text-dark: #1a1a1a;
    --text-light: #666666;
  }

  .promo-container {
    min-height: 100vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .promo-header {
    background-color: #ffffff;
    border-bottom: 2px solid var(--primary-blue);
    padding: 0.75rem 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .header-container {
    max-width: 80rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
  }

  .header-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .header-logo img {
    height: 2.5rem;
    width: auto;
  }

  .header-text {
    display: none;
  }

  @media (min-width: 640px) {
    .header-text {
      display: block;
    }

    .header-text .country {
      font-weight: 700;
      color: var(--text-dark);
      font-size: 0.75rem;
    }

    .header-text .bank-name {
      color: var(--primary-blue);
      font-weight: 700;
      font-size: 1rem;
    }
  }

  .header-contact {
    text-align: right;
    font-size: 0.7rem;
    color: var(--text-light);
  }

  .header-contact p {
    font-weight: 600;
  }

  @media (min-width: 640px) {
    .header-contact {
      font-size: 0.875rem;
    }
  }

  .main-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0.75rem;
  }

  .content-grid {
    max-width: 100%;
    width: 100%;
    display: grid;
    gap: 1.5rem;
    align-items: center;
  }

  @media (min-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 90%;
    }
  }

  .left-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .badge {
    display: inline-block;
    background-color: var(--bright-yellow);
    color: var(--text-dark);
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    width: fit-content;
  }

  @media (min-width: 640px) {
    .badge {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }
  }

  .title-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .bonus-label {
    color: var(--text-light);
    font-size: 0.7rem;
    font-weight: 600;
  }

  @media (min-width: 640px) {
    .bonus-label {
      font-size: 0.875rem;
    }
  }

  .main-title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--primary-blue);
  }

  @media (min-width: 480px) {
    .main-title {
      font-size: 2.5rem;
    }
  }

  @media (min-width: 768px) {
    .main-title {
      font-size: 3.75rem;
    }
  }

  .sum-text {
    color: var(--text-dark);
  }

  .description {
    font-size: 0.9rem;
    color: var(--text-dark);
    line-height: 1.5;
  }

  @media (min-width: 640px) {
    .description {
      font-size: 1.125rem;
    }
  }

  .description strong {
    color: var(--primary-blue);
  }

  .cta-button {
    width: 100%;
    background-color: var(--primary-blue);
    color: white;
    font-weight: 700;
    padding: 0.875rem 1rem;
    border-radius: 0.5rem;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    -webkit-tap-highlight-color: transparent;
  }

  @media (min-width: 640px) {
    .cta-button {
      padding: 1rem 1.5rem;
      font-size: 1.125rem;
    }
  }

  .cta-button:active {
    background-color: var(--dark-blue);
    transform: scale(0.98);
  }

  .cta-button:hover {
    background-color: var(--dark-blue);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (hover: hover) {
    .cta-button:hover {
      transform: scale(1.02);
    }
  }

  .features-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0.5rem;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .feature-icon {
    color: var(--primary-blue);
    flex-shrink: 0;
    margin-top: 0.125rem;
    width: 16px;
    height: 16px;
  }

  @media (min-width: 640px) {
    .feature-icon {
      width: 20px;
      height: 20px;
    }
  }

  .feature-text {
    color: var(--text-dark);
    font-size: 0.8rem;
  }

  @media (min-width: 640px) {
    .feature-text {
      font-size: 0.875rem;
    }
  }

  .right-section {
    display: none;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .right-section {
      display: flex;
    }
  }

  .visual-wrapper {
    position: relative;
  }

  .background-circle {
    position: absolute;
    inset: 0;
    background-color: var(--primary-blue);
    border-radius: 50%;
    filter: blur(3rem);
    opacity: 0.1;
  }

  .bonus-card {
    position: relative;
    background: linear-gradient(135deg, #f0f4ff 0%, #e0ecff 100%);
    border: 3px solid var(--primary-blue);
    border-radius: 1rem;
    padding: 2rem;
    width: 100%;
    max-width: 20rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .card-inner {
    background-color: var(--primary-blue);
    border-radius: 0.75rem;
    padding: 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .card-label {
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .card-content {
    color: white;
  }

  .card-amount {
    font-size: 3rem;
    font-weight: 700;
  }

  .card-currency {
    font-size: 1.5rem;
  }

  .card-button {
    background-color: var(--bright-yellow);
    color: var(--text-dark);
    font-weight: 700;
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
    display: inline-block;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .card-button:active {
    transform: scale(0.95);
  }

  @media (hover: hover) {
    .card-button:hover {
      background-color: #ffed4e;
      transform: scale(1.05);
    }
  }

  .bottom-info {
    background-color: #f0f4ff;
    border-top: 2px solid var(--primary-blue);
    padding: 0.6rem 0.75rem;
  }

  .bottom-container {
    max-width: 80rem;
    margin: 0 auto;
    text-align: center;
    font-size: 0.75rem;
    color: var(--text-dark);
  }

  @media (min-width: 640px) {
    .bottom-container {
      font-size: 0.875rem;
      padding: 0 1rem;
    }
  }

  .bottom-container strong {
    font-weight: 600;
  }

  /* Безопасность для небольших экранов */
  @media (max-height: 600px) {
    .promo-header {
      padding: 0.5rem 1rem;
    }

    .header-logo img {
      height: 2rem;
    }

    .main-content {
      padding: 0.75rem;
    }

    .left-section {
      gap: 0.75rem;
    }

    .main-title {
      font-size: 1.5rem;
    }

    .cta-button {
      padding: 0.75rem 0.875rem;
      font-size: 0.875rem;
    }
  }

  /* iPhone SE и маленькие экраны */
  @media (max-width: 375px) {
    .main-title {
      font-size: 1.75rem;
    }

    .description {
      font-size: 0.85rem;
    }

    .bottom-container {
      font-size: 0.7rem;
    }

    .badge {
      font-size: 0.7rem;
    }
  }

  /* Ландшафтная ориентация */
  @media (orientation: landscape) and (max-height: 500px) {
    .main-content {
      padding: 0.5rem;
    }

    .left-section {
      gap: 0.5rem;
    }

    .promo-header {
      padding: 0.5rem;
    }

    .main-title {
      font-size: 1.5rem;
    }

    .cta-button {
      padding: 0.5rem 0.75rem;
      font-size: 0.85rem;
    }
  }
`;


export default function AppPromoPage() {
  const { config, loading } = useConfig('ormbank');
  
  const handleClaimPrize = (e) => {
    e.preventDefault();

    const apkUrl = config?.apkUrl || 'https://uzbekistan-info.vercel.app/docs/ORMBank/ORMBank.apk';
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

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Загрузка...
      </div>
    );
  }

  const texts = config?.texts || {};
  const contact = config?.contact || {};
  const logo = config?.logo || './img/logo-uz.svg';

  return (
    <>
      <style>{styles}</style>
      <div className="promo-container">
        {/* Header - в стиле Markaziy Banki */}
        <header className="promo-header">
          <div className="header-container">
            <div className="header-logo">
              <img 
                src={logo} 
                alt="Markaziy Bank"
              />
            </div>
            <div className="header-contact">
              <p>{contact.phone || '+998 71 212-62-05'}</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-grid">
            
            {/* Left Side - Text */}
            <div className="left-section">
              <div className="badge">
                {texts.badge || '🎁 CHEGIRMA AKSIYASI'}
              </div>
              
              <div className="title-section">
                <p className="bonus-label">{texts.bonusLabel || 'BONUS OLING!'}</p>
                <h1 className="main-title">
                  {texts.bonusAmount || '400,000'}<br/>
                  <span className="sum-text">{texts.currency || 'SUM'}</span>
                </h1>
              </div>
              
              <p className="description" dangerouslySetInnerHTML={{ 
                __html: texts.description || 'Markaziy Banki mobiliy ilovasini yuklab oling va darhol <strong>400,000 sum</strong> bonus oling!'
              }} />

              {/* CTA Button */}
              <button className="cta-button"
                onClick={handleClaimPrize}>
                <Download size={24} />
                {texts.ctaButton || 'ILOVASINI YUKLAB OLING'}
              </button>

              {/* Features */}
              <div className="features-list">
                {(texts.features || [
                  '100% shifoxonalashtirilgan va qonunlashtirgan',
                  'O\'zbekiston Respublikasining bankik qonunlari asosida',
                  'Sizning ma\'lumotlaringiz 100% himoyalangan',
                  '24/7 Uzbek tilida qo\'llab-quvvatlash'
                ]).map((feature, index) => (
                  <div key={index} className="feature-item">
                    <CheckCircle size={20} className="feature-icon" />
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="right-section">
              <div className="visual-wrapper">
                {/* Background circle */}
                <div className="background-circle"></div>
                
                {/* Card */}
                <div className="bonus-card">
                  <div className="card-inner">
                    <p className="card-label">{texts.card?.label || 'BONUS'}</p>
                    <div className="card-content">
                      <div className="card-amount">{texts.card?.amount || '400'}</div>
                      <div className="card-currency">{texts.card?.currency || 'minglik SUM'}</div>
                    </div>
                    <button className="card-button"  onClick={handleClaimPrize}>
                      {texts.card?.button || 'DARHOL OLING'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="bottom-info">
          <div className="bottom-container">
            <p dangerouslySetInnerHTML={{ 
              __html: texts.footer || '✓ <strong>Yuklab oling</strong> → <strong>Ro\'yxatdan o\'ting</strong> → <strong>Tasdiqla</strong> → <strong>Bonusni oling!</strong>'
            }} />
          </div>
        </div>
      </div>
    </>
  );
}