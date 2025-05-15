import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const MultiplicationGame = () => {
  const [multiplier, setMultiplier] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [usedAnswers, setUsedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [completionTime, setCompletionTime] = useState(0);
  const [currentDate] = useState(new Date().toLocaleDateString());
  // set timer 
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef(null);
  const certificateRef = useRef(null);
  // format time 
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  };

  // Stop timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  // Generate questions based on difficulty
  const generateQuestions = () => {
    let multiplicandRange;
    switch(difficulty) {
      case 'easy': multiplicandRange = 12; break;
      case 'medium': multiplicandRange = 20; break;
      case 'hard': multiplicandRange = 30; break;
      default: multiplicandRange = 12;
    }

    const newQuestions = [];
    for (let i = 1; i <= multiplicandRange; i++) {
      newQuestions.push({
        multiplier: parseInt(multiplier),
        multiplicand: i,
        answer: parseInt(multiplier) * i
      });
    }
    setQuestions(shuffleArray(newQuestions));
    setUserAnswers(new Array(newQuestions.length).fill(null));
    setUsedAnswers([]);
    setScore(0);
    setShowResults(false);
    setTimeElapsed(0);
    startTimer();
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Generate answers
  const generateAnswers = () => {
    const availableCorrectAnswers = questions.map(q => q.answer)
      .filter(answer => !usedAnswers.includes(answer));

    const wrongAnswerCount = difficulty === 'easy' ? 8 : 
                           difficulty === 'medium' ? 12 : 16;

    const allAnswers = [...availableCorrectAnswers];
    
    for (let i = 0; i < wrongAnswerCount; i++) {
      let wrongAnswer;
      do {
        const offset = Math.floor(Math.random() * 10) + 1;
        const sign = Math.random() > 0.5 ? 1 : -1;
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        wrongAnswer = randomQuestion.answer + (sign * offset);
      } while (wrongAnswer <= 0 || allAnswers.includes(wrongAnswer));
      
      allAnswers.push(wrongAnswer);
    }

    setAnswers(shuffleArray(allAnswers));
  };

  // drag 
  const handleDragStart = (e, answer) => {
    e.dataTransfer.setData('text/plain', answer);
  };

  // drop
  const handleDrop = (e, questionIndex) => {
    e.preventDefault();
    const answer = parseInt(e.dataTransfer.getData('text/plain'));
    const newUsedAnswers = [...usedAnswers];
    if (userAnswers[questionIndex] !== null) {
      const index = newUsedAnswers.indexOf(userAnswers[questionIndex]);
      if (index > -1) {
        newUsedAnswers.splice(index, 1);
      }
    }
    newUsedAnswers.push(answer);
    setUsedAnswers(newUsedAnswers);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = answer;
    setUserAnswers(newUserAnswers);
    generateAnswers();
  };

  const checkAnswers = () => {
    stopTimer();
    let correctCount = 0;
    
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setShowResults(true);
    setCompletionTime(timeElapsed); 
    // if (correctCount === questions.length) {
    //   // Perfect score!
    // }
  };

  // Reset game
  const resetGame = () => {
    setGameStarted(false);
    setShowResults(false);
    setShowCertificate(false);
    setStudentName('');
  };

  // Handle certificate download
  const handleDownload = (type) => {
    if (!certificateRef.current) return;
    
    html2canvas(certificateRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      
      switch(type) {
        case 'png':
          saveAs(imgData, `MultiMaster-Certificate-${studentName}.png`);
          break;
        case 'jpg':
          saveAs(imgData, `MultiMaster-Certificate-${studentName}.jpg`);
          break;
        case 'pdf':
          const pdf = new jsPDF('landscape');
          pdf.addImage(imgData, 'JPEG', 10, 10, 280, 180);
          pdf.save(`MultiMaster-Certificate-${studentName}.pdf`);
          break;
        default:
          break;
      }
    });
  };

  // Generate certificate
  const generateCertificate = () => {
    if (studentName.trim() === '') {
      alert('Please enter your name to generate certificate');
      return;
    }
    setShowCertificate(true);
  };

  useEffect(() => {
    if (questions.length > 0) {
      generateAnswers();
    }
  }, [questions, usedAnswers]);
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="multiplication-game">
      <header className="game-header">
        <h1>MultiMaster</h1>
        <div className="current-date">Date: {currentDate}</div>
      </header>

      {!gameStarted ? (
        <div className="setup-panel">
          <div className="input-group">
            <label htmlFor="multiplier">Choose your multiplication table:</label>
            <input
              type="number"
              id="multiplier"
              min="1"
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value)}
              placeholder="e.g., 2 for 2× table"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="difficulty">Select difficulty level:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
            >
              <option value="">-- Choose --</option>
              <option value="easy">Easy (1-12 tables)</option>
              <option value="medium">Medium (1-20 tables)</option>
              <option value="hard">Hard (1-30 tables)</option>
            </select>
          </div>
          
          <button 
            className="start-btn"
            onClick={() => {
              if (!multiplier || !difficulty) {
                alert('Please fill all fields');
                return;
              }
              setGameStarted(true);
              generateQuestions();
            }}
          >
            Start Practicing!
          </button>
        </div>
      ) : (
        <>
          {!showResults ? (
            <div className="game-area">
              <div className="game-info">
                <div className="timer">Time: {formatTime(timeElapsed)}</div>
                <div className="progress">
                  Progress: {userAnswers.filter(a => a !== null).length}/{questions.length}
                </div>
              </div>
              
              <div className="questions-container">
                {questions.map((question, index) => (
                  <div key={index} className="question-item">
                    <div className="question-text">
                      {question.multiplier}
                      <br />
                      × {question.multiplicand} =
                    </div>
                    <div
                      className={`drop-zone ${userAnswers[index] ? 'filled' : ''}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      {userAnswers[index] || ''}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="answers-container">
                <p>Drag answers here:</p>
                <div className="answers-grid">
                  {answers.map((answer, index) => (
                    <div
                      key={index}
                      className="draggable"
                      draggable
                      onDragStart={(e) => handleDragStart(e, answer)}
                    >
                      {answer}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="check-btn" onClick={checkAnswers}>
                  Check Answers
                </button>
              </div>
            </div>
          ) : (
            <div className="results-panel">
              <h2>Your Results</h2>
              <div className="score-display">
                You scored {score} out of {questions.length}!
              </div>
              <div className={`feedback ${score === questions.length ? 'perfect' : ''}`}>
                {score === questions.length ? (
                  <>
                    <p>Perfect Score! 🎉</p>
                    <div className="certificate-form">
                      <input
                        type="text"
                        placeholder="Enter your name for certificate"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                      />
                      <button onClick={generateCertificate}>Get Diploma Certificate</button>
                    </div>
                  </>
                ) : (
                  <p>Keep practicing to improve!</p>
                )}
              </div>
              
              <div className="action-buttons">
                <button className="practice-again-btn" onClick={() => {
                  setGameStarted(false);
                  setShowResults(false);
                }}>
                  Practice Again
                </button>
                <button className="back-btn" onClick={resetGame}>
                  Back to Start
                </button>
              </div>
            </div>
          )}
        </>
      )}
      {showCertificate && (
        <div className="certificate-modal">
          <div className="certificate-content">
            <div className="certificate" ref={certificateRef}>
              <div className="certificate-header">
                <h2>MultiMaster</h2>
                <h3>Certificate of Achievement</h3>
              </div>
              
              <div className="certificate-body">
                <p>This certificate is awarded to</p>
                <h4>{studentName}</h4>
                <p>for successfully completing the</p>
                <div className="certificate-details">
                  <p><strong>Multiplication Table:</strong> {multiplier}</p>
                  <p><strong>Difficulty Level:</strong> {difficulty}</p>
                  <p><strong>Completion Time:</strong> {formatTime(completionTime)}</p>
                  <p><strong>Date:</strong> {currentDate}</p>
                </div>
              </div>
              
              <div className="certificate-footer">
                <p>Congratulations on your achievement!</p>
              </div>
            </div>
            
            <div className="certificate-actions">
              <button onClick={() => handleDownload('png')}>Download PNG</button>
              <button onClick={() => handleDownload('jpg')}>Download JPG</button>
              <button onClick={() => handleDownload('pdf')}>Download PDF</button>
              <button onClick={() => window.print()}>Print Certificate</button>
              <button onClick={resetGame}>Close</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .multiplication-game {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Comic Neue', cursive;
          background-color: #f7fff7;
          min-height: 100vh;
          position: relative;
        }
        
        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        
        h1 {
          color: #FF6B6B;
          font-size: 2.5rem;
          margin: 0;
          background: linear-gradient(to right, #FF6B6B, #4ECDC4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .current-date {
          font-size: 1.1rem;
          color: #666;
          font-weight: bold;
        }
        
        .setup-panel, .game-area, .results-panel {
          background-color: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          margin-bottom: 25px;
          border: 2px solid rgba(255, 107, 107, 0.2);
        }
        
        .input-group {
          margin-bottom: 20px;
        }
        
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #292F36;
          font-size: 1.1rem;
        }
        
        input, select {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #ddd;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s;
          background-color: #f0f8ff;
        }
        button {
          background-color: #FF6B6B;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 10px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: bold;
          margin: 5px;
          box-shadow: 0 4px 0 rgba(210, 50, 50, 0.3);
        }
        
        button:hover {
          background-color: #ff5252;
          transform: translateY(-2px);
          box-shadow: 0 6px 0 rgba(210, 50, 50, 0.3);
        }
        
        .btn-secondary {
          background-color: #4ECDC4;
          box-shadow: 0 4px 0 rgba(50, 160, 150, 0.3);
        }
        
        .game-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-weight: bold;
        }
        
        .questions-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .question-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 1.3rem;
          background-color: white;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: all 0.3s;
          border: 2px solid rgba(78, 205, 196, 0.3);
        }
        
        .question-text {
          margin-bottom: 10px;
          font-weight: bold;
          color: #FF6B6B;
          text-align: center;
          line-height: 1.4;
        }
        
        .drop-zone {
          width: 80px;
          height: 50px;
          border: 2px dashed #4ECDC4;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          background-color: #f0f8ff;
          transition: all 0.3s;
        }
        
        .drop-zone.filled {
          border-style: solid;
          background-color: #e1f5fe;
        }
        
        .answers-container {
          margin-bottom: 30px;
          min-height: 80px;
          background-color: rgba(255, 255, 255, 0.7);
          padding: 20px;
          border-radius: 15px;
          border: 2px dashed rgba(78, 205, 196, 0.5);
        }
        
        .answers-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          margin-top: 15px;
        }
        
        .draggable {
          min-width: 60px;
          height: 50px;
          background-color: #FFE66D;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          font-weight: bold;
          cursor: grab;
          padding: 0 15px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: all 0.3s;
          user-select: none;
          border: 2px solid rgba(255, 180, 50, 0.5);
        }
        
        .draggable:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
          background-color: #ffdf4d;
        }
        
        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }
        
        .results-panel {
          text-align: center;
        }
        
        .score-display {
          font-size: 1.8rem;
          margin: 20px 0;
          font-weight: bold;
          color: #FF6B6B;
        }
        
        .feedback {
          margin: 20px 0;
          font-size: 1.3rem;
          padding: 15px;
          border-radius: 10px;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .feedback.perfect {
          background-color: #d4edda;
          border: 2px solid #28a745;
          color: #155724;
        }
        
        .certificate-form {
          margin-top: 20px;
        }
        
        .certificate-form input {
          padding: 10px;
          margin-right: 10px;
          width: auto;
        }
        
        .certificate-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .certificate-content {
          background-color: white;
          padding: 30px;
          border-radius: 15px;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .certificate {
          background-color: #fff9e6;
          border: 15px solid #FFE66D;
          padding: 40px;
          text-align: center;
          position: relative;
        }
        
        .certificate-header {
          margin-bottom: 30px;
        }
        
        .certificate-header h2 {
          color: #FF6B6B;
          font-size: 2.5rem;
          margin: 0;
        }
        
        .certificate-header h3 {
          color: #4ECDC4;
          font-size: 1.8rem;
          margin: 10px 0 0;
        }
        
        .certificate-body {
          margin: 30px 0;
        }
        
        .certificate-body h4 {
          font-size: 2rem;
          color: #292F36;
          margin: 15px 0;
          text-decoration: underline;
        }
        
        .certificate-details {
          margin: 30px 0;
          text-align: left;
          display: inline-block;
        }
        
        .certificate-details p {
          margin: 10px 0;
          font-size: 1.1rem;
        }
        
        .certificate-footer {
          margin-top: 30px;
          font-style: italic;
        }
        
        .certificate-actions {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }
        
        @media print {
          .certificate-modal {
            position: static;
            background-color: white;
          }
          
          .certificate-actions {
            display: none;
          }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default MultiplicationGame;