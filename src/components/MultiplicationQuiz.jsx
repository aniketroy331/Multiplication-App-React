import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
//ChartJS
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
const QuizSystem = () => {
  const [selectedNumber, setSelectedNumber] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [timerOption, setTimerOption] = useState('1min');
  const [customTime, setCustomTime] = useState(2);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [inputError, setInputError] = useState('');
// time if required 
  const getTimeInSeconds = () => {
    switch (timerOption) {
      case '30sec': return 30;
      case '1min': return 60;
      case '5min': return 300;
      case 'custom': return customTime * 60;
      default: return 0;
    }
  };
  const generateQuestions = () => {
    if (!selectedNumber || isNaN(selectedNumber)) return;
    
    const num = parseInt(selectedNumber);
    const newQuestions = [];
    
    // dificulty level
    const totalQuestions = questionCount;
    const easyCount = Math.max(2, Math.floor(totalQuestions * 0.2)); 
    const mediumCount = Math.max(3, Math.floor(totalQuestions * 0.3));
    const hardCount = totalQuestions - easyCount - mediumCount;
// single digit 
    for (let i = 0; i < easyCount; i++) {
      const multiplier = Math.floor(Math.random() * 9) + 1;
      newQuestions.push(createQuestion(num, multiplier));
    }
// double digit 
    for (let i = 0; i < mediumCount; i++) {
      const multiplier = Math.floor(Math.random() * 90) + 10;
      newQuestions.push(createQuestion(num, multiplier));
    }
// triple digit 
    for (let i = 0; i < hardCount; i++) {
      const multiplier = Math.floor(Math.random() * 900) + 100;
      newQuestions.push(createQuestion(num, multiplier));
    }
    
    setQuestions(newQuestions);
  };
// question 
  const createQuestion = (baseNumber, multiplier) => {
    return {
      question: `${multiplier} × ${baseNumber}`,
      answer: multiplier * baseNumber,
      options: generateOptions(multiplier * baseNumber)
    };
  };

// 4 option 
  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    while (options.length < 4) {
      const magnitude = Math.pow(10, Math.floor(Math.log10(correctAnswer)));
      const randomOffset = Math.floor(Math.random() * magnitude) + 1;
      const wrongAnswer = Math.random() > 0.5 
        ? correctAnswer + randomOffset 
        : Math.max(1, correctAnswer - randomOffset);
      
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    return shuffleArray(options);
  };
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  const validateInputs = () => {
    if (!selectedNumber || isNaN(selectedNumber)) {
      setInputError('Please enter a valid number to practice');
      return false;
    }
    if (questionCount < 5 || questionCount > 50) {
      setInputError('Number of questions must be between 5 and 50');
      return false;
    }
    if (timerOption === 'custom' && (customTime < 1 || customTime > 60)) {
      setInputError('Custom time must be between 1 and 60 minutes');
      return false;
    }
    setInputError('');
    return true;
  };

  const startQuiz = () => {
    if (!validateInputs()) return;
    
    generateQuestions();
    setQuizStarted(true);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(getTimeInSeconds());
  };

  const handleAnswer = (selectedOption) => {
    const isAnswerCorrect = selectedOption === questions[currentQuestion].answer;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = {
      question: questions[currentQuestion].question,
      userAnswer: selectedOption,
      correctAnswer: questions[currentQuestion].answer,
      isCorrect: isAnswerCorrect
    };
    setUserAnswers(newUserAnswers);
    
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
// take 2 sec for nest question
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };
  useEffect(() => {
    if (!quizStarted || timeLeft <= 0 || quizCompleted) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setQuizCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [quizStarted, timeLeft, quizCompleted]);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const calculatePercentage = () => {
    return Math.round((score / questionCount) * 100);
  };
  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
  };
  const pieChartData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [score, questionCount - score],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#EF5350']
      }
    ]
  };

  const barChartData = {
    labels: userAnswers.map((_, index) => `Q${index + 1}`),
    datasets: [
      {
        label: 'Your Answers',
        data: userAnswers.map(answer => answer.userAnswer),
        backgroundColor: userAnswers.map(answer => answer.isCorrect ? '#4CAF50' : '#F44336'),
      },
      {
        label: 'Correct Answers',
        data: userAnswers.map(answer => answer.correctAnswer),
        backgroundColor: '#2196F3',
      }
    ]
  };
const navigate = useNavigate();
  return (
    <div className="quiz-container" style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#3f51b5',
        marginBottom: '30px'
      }}>Multiplication Quiz</h1>
      
      {!quizStarted && !quizCompleted && (
        <div className="quiz-setup" style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 0 5px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#3f51b5' }}>Quiz Settings</h2>
          
          {inputError && (
            <div style={{
              color: '#f44336',
              backgroundColor: '#ffebee',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '15px',
              border: '1px solid #f44336'
            }}>
              {inputError}
            </div>
          )}
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Enter a number to practice:
            </label>
            <input
              type="number"
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(e.target.value)}
              placeholder="Enter any number"
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                width: '100%'
              }}
            />
          </div>     
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Number of questions (5-50):
            </label>
            <input
              type="number"
              min="5"
              max="50"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value) || 10)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                width: '100%'
              }}
            />
          </div> 
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Select timer:
            </label>
            <select
              value={timerOption}
              onChange={(e) => setTimerOption(e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                width: '100%',
                marginBottom: '10px'
              }}
            >
              <option value="none">No timer</option>
              <option value="30sec">30 seconds</option>
              <option value="1min">1 minute</option>
              <option value="5min">5 minutes</option>
              <option value="custom">Custom time</option>
            </select>
            
            {timerOption === 'custom' && (
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Custom time (minutes, 1-60):
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={customTime}
                  onChange={(e) => setCustomTime(parseInt(e.target.value) || 2)}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    width: '100%'
                  }}
                />
              </div>
            )}
          </div>
          
          <button
            onClick={startQuiz}
            style={{
              backgroundColor: '#3f51b5',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              width: '100%',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#303f9f'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3f51b5'}
          >
            Start Quiz
          </button>
        </div>
      )}
      
      {quizStarted && !quizCompleted && questions.length > 0 && (
        <div className="quiz-questions" style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 0 5px rgba(0,0,0,0.1)'
        }}>
          {timerOption !== 'none' && (
            <div style={{ 
              textAlign: 'right', 
              marginBottom: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: timeLeft < 30 ? '#f44336' : '#4CAF50'
            }}>
              Time Left: {formatTime(timeLeft)}
            </div>
          )}
          
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '20px',
            fontSize: '18px'
          }}>
            Question {currentQuestion + 1} of {questionCount}
          </div>
          
          {showFeedback ? (
            <div style={{ 
              textAlign: 'center',
              padding: '20px',
              backgroundColor: isCorrect ? '#E8F5E9' : '#FFEBEE',
              borderRadius: '8px',
              marginBottom: '20px',
              border: `2px solid ${isCorrect ? '#4CAF50' : '#F44336'}`,
              fontSize: '24px',
              fontWeight: 'bold',
              color: isCorrect ? '#2E7D32' : '#C62828'
            }}>
              {isCorrect ? 'Correct! 🎉' : 'Incorrect! 😢'}
              <div style={{ marginTop: '10px', fontSize: '16px' }}>
                Correct answer: {questions[currentQuestion].answer}
              </div>
            </div>
          ) : (
            <>
              <div style={{ 
                textAlign: 'center', 
                fontSize: '32px',
                fontWeight: 'bold',
                margin: '30px 0',
                color: '#3f51b5'
              }}>
                {questions[currentQuestion]?.question} = ?
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '10px'
              }}>
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    style={{
                      padding: '15px',
                      fontSize: '18px',
                      color: 'black',
                      backgroundColor: '#f5f5f5',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {/* check completed quiz  */}
      {quizCompleted && (
        <div className="quiz-results" style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 0 5px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#3f51b5',
            marginBottom: '20px'
          }}>
            Quiz Completed!
          </h2>
          
          <div style={{ 
            textAlign: 'center', 
            fontSize: '24px',
            marginBottom: '20px'
          }}>
            Your score: {score} out of {questionCount} ({calculatePercentage()}%)
          </div>
          
          {calculatePercentage() >= 80 && (
            <div style={{
              backgroundColor: '#E8F5E9',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center',
              border: '2px solid #4CAF50'
            }}>
              🎉 Great job! You scored 80% or higher! 🎉
            </div>
          )}
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#3f51b5' }}>Performance Summary</h3>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginTop: '20px'
            }}>
              <div>
                <h4 style={{ textAlign: 'center' }}>Correct vs Incorrect</h4>
                <Pie data={pieChartData} />
              </div>
              <div>
                <h4 style={{ textAlign: 'center' }}>Question Details</h4>
                <Bar data={barChartData} options={{
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }} />
              </div>
            </div>
          </div>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '20px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={restartQuiz}
              style={{
                backgroundColor: '#3f51b5',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                minWidth: '150px'
              }}
            >
              Restart Quiz
            </button>
            {calculatePercentage() >= 80 && (
              <button
              // navigation for game 
                  onClick={() => navigate('/FlappyBird')}
                style={{
                  backgroundColor: '#FF9800',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  minWidth: '150px'
                }}
              >
                Play Bonus Game
              </button>
            )}
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                backgroundColor: '#607D8B',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                minWidth: '150px'
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSystem;