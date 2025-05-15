import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/ruleone.css';

const MultiplicationAnimation = () => {
  const location = useLocation();
  const { ruleNumber, multiplicand, multiplier, result, steps } = location.state || {};
  
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (ruleNumber && multiplicand && multiplier) {
      initializeAnimation();
    }
  }, [ruleNumber, multiplicand, multiplier]);

  const speak = (text) => {
    if (isMuted) return;
    
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
    speechSynthesisRef.current = utterance;
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleSpeak = (text) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      stopSpeaking();
      setIsMuted(true);
    }
  };

  const initializeAnimation = () => {
    const data = {
      ruleNumber,
      multiplicand,
      multiplier,
      result,
      steps
    };

    // Determining the steps for the number
    let stepsCount = 0;
    switch(ruleNumber) {
      case 1:
        stepsCount = 3;
        data.steps = [
          {
            title: "Step 1: Subtract Unit Place digit from 10",
            content: `10 - ${multiplicand} = ${10 - multiplicand}`,
            unitDigit: 10 - multiplicand,
            tensDigit: '?'
          },
          {
            title: "Step 2: Subtract 1 from the digit",
            content: `${multiplicand} - 1 = ${multiplicand - 1}`,
            unitDigit: 10 - multiplicand,
            tensDigit: multiplicand - 1
          },
          {
            title: "Final Calculation formula",
            content: `(10 × ${multiplicand - 1}) + ${10 - multiplicand} = ${result}`,
            finalResult: result,
            unitDigit: 10 - multiplicand,
            tensDigit: multiplicand - 1
          }
        ];
        break;
      
      case 2:
        stepsCount = 4;
        const a1 = Math.floor(multiplicand / 10);
        const b1 = multiplicand % 10;
        const step1 = 10 - b1;
        const step2 = 9 + b1 - a1;
        const step3 = a1 - 1;
        
        data.steps = [
          {
            title: "Step 1: Subtract unit digit from 10",
            content: `10 - ${b1} = ${step1}`,
            unitDigit: step1,
            tensDigit: '?',
            hundredsDigit: '?'
          },
          {
            title: "Step 2: Add 9 to unit digit and subtract tens digit",
            content: `9 + ${b1} - ${a1} = ${step2}`,
            unitDigit: step1,
            tensDigit: step2,
            hundredsDigit: '?'
          },
          {
            title: "Step 3: Subtract 1 from tens digit",
            content: `${a1} - 1 = ${step3}`,
            unitDigit: step1,
            tensDigit: step2,
            hundredsDigit: step3
          },
          {
            title: "Final Calculation",
            content: `(100 × ${step3}) + (10 × ${step2}) + ${step1} = ${result}`,
            finalResult: result,
            unitDigit: step1,
            tensDigit: step2,
            hundredsDigit: step3
          }
        ];
        break;
        
      case 3: 
        stepsCount = 5;
        const a3 = Math.floor(multiplicand / 100);
        const b3 = Math.floor((multiplicand / 10) % 10);
        const c3 = multiplicand % 10;
        const step1_3 = 10 - c3;
        const step2_3 = 9 + c3 - b3;
        const step3_3 = 9 + b3 - a3;
        const step4_3 = a3 - 1;
        
        data.steps = [
          {
            title: "Step 1: Subtract unit digit from 10",
            content: `10 - ${c3} = ${step1_3}`,
            unitDigit: step1_3,
            tensDigit: '?',
            hundredsDigit: '?',
            thousandsDigit: '?'
          },
          {
            title: "Step 2: Add 9 to unit digit and subtract tens digit",
            content: `9 + ${c3} - ${b3} = ${step2_3}`,
            unitDigit: step1_3,
            tensDigit: step2_3,
            hundredsDigit: '?',
            thousandsDigit: '?'
          },
          {
            title: "Step 3: Add 9 to tens digit and subtract hundreds digit",
            content: `9 + ${b3} - ${a3} = ${step3_3}`,
            unitDigit: step1_3,
            tensDigit: step2_3,
            hundredsDigit: step3_3,
            thousandsDigit: '?'
          },
          {
            title: "Step 4: Subtract 1 from hundreds digit",
            content: `${a3} - 1 = ${step4_3}`,
            unitDigit: step1_3,
            tensDigit: step2_3,
            hundredsDigit: step3_3,
            thousandsDigit: step4_3
          },
          {
            title: "Final Calculation",
            content: `(1000 × ${step4_3}) + (100 × ${step3_3}) + (10 × ${step2_3}) + ${step1_3} = ${result}`,
            finalResult: result,
            unitDigit: step1_3,
            tensDigit: step2_3,
            hundredsDigit: step3_3,
            thousandsDigit: step4_3
          }
        ];
        break;
        
      case 4: 
        stepsCount = 4;
        const step1_4 = 10 - multiplicand;
        const step2_4 = 9;
        const step3_4 = multiplicand - 1;
        
        data.steps = [
          {
            title: "Step 1: Subtract unit place digit from 10",
            content: `10 - ${multiplicand} = ${step1_4} (unit place)`,
            unitDigit: step1_4,
            tensDigit: '?',
            hundredsDigit: '?'
          },
          {
            title: "Step 2: Put 9 in tens place",
            content: `9 (tens place)`,
            unitDigit: step1_4,
            tensDigit: step2_4,
            hundredsDigit: '?'
          },
          {
            title: "Step 3: Subtract 1",
            content: `${multiplicand} - 1 = ${step3_4} (hundreds place)`,
            unitDigit: step1_4,
            tensDigit: step2_4,
            hundredsDigit: step3_4
          },
          {
            title: "Final Calculation",
            content: `(100 × ${step3_4}) + (10 × ${step2_4}) + ${step1_4} = ${result}`,
            finalResult: result,
            unitDigit: step1_4,
            tensDigit: step2_4,
            hundredsDigit: step3_4
          }
        ];
        break;
        
      case 5:
        stepsCount = 5;
        const a5 = Math.floor(multiplicand / 10);
        const b5 = multiplicand % 10;
        const step1_5 = 10 - b5;
        const step2_5 = 9 - a5;
        const step3_5 = b5 - 1;
        const step4_5 = a5;
        
        data.steps = [
          {
            title: "Step 1: Subtract unit digit from 10",
            content: `10 - ${b5} = ${step1_5} (unit place)`,
            unitDigit: step1_5,
            tensDigit: '?',
            hundredsDigit: '?',
            thousandsDigit: '?'
          },
          {
            title: "Step 2: Subtract tens digit from 9",
            content: `9 - ${a5} = ${step2_5} (tens place)`,
            unitDigit: step1_5,
            tensDigit: step2_5,
            hundredsDigit: '?',
            thousandsDigit: '?'
          },
          {
            title: "Step 3: Subtract 1 from unit digit",
            content: `${b5} - 1 = ${step3_5} (hundreds place)`,
            unitDigit: step1_5,
            tensDigit: step2_5,
            hundredsDigit: step3_5,
            thousandsDigit: '?'
          },
          {
            title: "Step 4: Place tens digit in thousand place as is",
            content: `${a5} (thousands place)`,
            unitDigit: step1_5,
            tensDigit: step2_5,
            hundredsDigit: step3_5,
            thousandsDigit: step4_5
          },
          {
            title: "Final Calculation",
            content: `(1000 × ${step4_5}) + (100 × ${step3_5}) + (10 × ${step2_5}) + ${step1_5} = ${result}`,
            finalResult: result,
            unitDigit: step1_5,
            tensDigit: step2_5,
            hundredsDigit: step3_5,
            thousandsDigit: step4_5
          }
        ];
        break;
        
      case 6:
        stepsCount = 6;
        const a6 = Math.floor(multiplicand / 100);
        const b6 = Math.floor((multiplicand / 10) % 10);
        const c6 = multiplicand % 10;
        const step1_6 = 10 - c6;
        const step2_6 = 9 - b6;
        const step3_6 = 9 + c6 - a6;
        const step4_6 = b6 - 1;
        const step5_6 = a6;
        
        data.steps = [
          {
            title: "Step 1: Subtract unit digit from 10",
            content: `10 - ${c6} = ${step1_6} (unit place)`,
            unitDigit: step1_6,
            tensDigit: '?',
            hundredsDigit: '?',
            thousandsDigit: '?',
            tenThousandsDigit: '?'
          },
          {
            title: "Step 2: Subtract tens digit from 9",
            content: `9 - ${b6} = ${step2_6} (tens place)`,
            unitDigit: step1_6,
            tensDigit: step2_6,
            hundredsDigit: '?',
            thousandsDigit: '?',
            tenThousandsDigit: '?'
          },
          {
            title: "Step 3: Add 9 to unit digit and subtract hundreds digit",
            content: `9 + ${c6} - ${a6} = ${step3_6} (hundreds place)`,
            unitDigit: step1_6,
            tensDigit: step2_6,
            hundredsDigit: step3_6,
            thousandsDigit: '?',
            tenThousandsDigit: '?'
          },
          {
            title: "Step 4: Subtract 1 from tens digit",
            content: `${b6} - 1 = ${step4_6} (thousands place)`,
            unitDigit: step1_6,
            tensDigit: step2_6,
            hundredsDigit: step3_6,
            thousandsDigit: step4_6,
            tenThousandsDigit: '?'
          },
          {
            title: "Step 5: Use hundreds digit as is and place in ten thousand place",
            content: `${a6} (ten-thousands place)`,
            unitDigit: step1_6,
            tensDigit: step2_6,
            hundredsDigit: step3_6,
            thousandsDigit: step4_6,
            tenThousandsDigit: step5_6
          },
          {
            title: "Final Calculation",
            content: `(10000 × ${step5_6}) + (1000 × ${step4_6}) + (100 × ${step3_6}) + (10 × ${step2_6}) + ${step1_6} = ${result}`,
            finalResult: result,
            unitDigit: step1_6,
            tensDigit: step2_6,
            hundredsDigit: step3_6,
            thousandsDigit: step4_6,
            tenThousandsDigit: step5_6
          }
        ];
        break;
        
      case 7:
        stepsCount = 5;
        const step1_7 = 10 - multiplicand;
        const step2_7 = 9;
        const step3_7 = 9;
        const step4_7 = multiplicand - 1;
        
        data.steps = [
          {
            title: "Step 1: Subtract unit place digit from 10",
            content: `10 - ${multiplicand} = ${step1_7} (unit place)`,
            unitDigit: step1_7,
            tensDigit: '?',
            hundredsDigit: '?',
            thousandsDigit: '?'
          },
          {
            title: "Step 2: Put 9 in tens place",
            content: `9 (tens place)`,
            unitDigit: step1_7,
            tensDigit: step2_7,
            hundredsDigit: '?',
            thousandsDigit: '?'
          },
          {
            title: "Step 3: Put 9 in hundreds place",
            content: `9 (hundreds place)`,
            unitDigit: step1_7,
            tensDigit: step2_7,
            hundredsDigit: step3_7,
            thousandsDigit: '?'
          },
          {
            title: "Step 4: Subtract 1",
            content: `${multiplicand} - 1 = ${step4_7} (thousands place)`,
            unitDigit: step1_7,
            tensDigit: step2_7,
            hundredsDigit: step3_7,
            thousandsDigit: step4_7
          },
          {
            title: "Final Calculation",
            content: `(1000 × ${step4_7}) + (100 × ${step3_7}) + (10 × ${step2_7}) + ${step1_7} = ${result}`,
            finalResult: result,
            unitDigit: step1_7,
            tensDigit: step2_7,
            hundredsDigit: step3_7,
            thousandsDigit: step4_7
          }
        ];
        break;
        
      case 8:
        stepsCount = 6;
        const a8 = Math.floor(multiplicand / 10);
        const b8 = multiplicand % 10;
        const step1_8 = 10 - b8;
        const step2_8 = 9 - a8;
        const step3_8 = 9;
        const step4_8 = b8 - 1;
        const step5_8 = a8;
        
        data.steps = [
          {
            title: "Step 1: Subtract unit digit from 10",
            content: `10 - ${b8} = ${step1_8} (unit place)`,
            unitDigit: step1_8,
            tensDigit: '?',
            hundredsDigit: '?',
            thousandsDigit: '?',
            tenThousandsDigit: '?'
          },
          {
            title: "Step 2: Subtract tens digit from 9",
            content: `9 - ${a8} = ${step2_8} (tens place)`,
            unitDigit: step1_8,
            tensDigit: step2_8,
            hundredsDigit: '?',
            thousandsDigit: '?',
            tenThousandsDigit: '?'
          },
          {
            title: "Step 3: Put 9 in hundreds place",
            content: `9 (hundreds place)`,
            unitDigit: step1_8,
            tensDigit: step2_8,
            hundredsDigit: step3_8,
            thousandsDigit: '?',
            tenThousandsDigit: '?'
          },
          {
            title: "Step 4: Subtract 1 from unit digit",
            content: `${b8} - 1 = ${step4_8} (thousands place)`,
            unitDigit: step1_8,
            tensDigit: step2_8,
            hundredsDigit: step3_8,
            thousandsDigit: step4_8,
            tenThousandsDigit: '?'
          },
          {
            title: "Step 5: Use tens digit as is",
            content: `${a8} (ten-thousands place)`,
            unitDigit: step1_8,
            tensDigit: step2_8,
            hundredsDigit: step3_8,
            thousandsDigit: step4_8,
            tenThousandsDigit: step5_8
          },
          {
            title: "Final Calculation",
            content: `(10000 × ${step5_8}) + (1000 × ${step4_8}) + (100 × ${step3_8}) + (10 × ${step2_8}) + ${step1_8} = ${result}`,
            finalResult: result,
            unitDigit: step1_8,
            tensDigit: step2_8,
            hundredsDigit: step3_8,
            thousandsDigit: step4_8,
            tenThousandsDigit: step5_8
          }
        ];
        break;
        
      case 9:
        stepsCount = 7;
        const a9 = Math.floor(multiplicand / 100);
        const b9 = Math.floor((multiplicand / 10) % 10);
        const c9 = multiplicand % 10;
        const step1_9 = 10 - c9;
        const step2_9 = 9 - b9;
        const step3_9 = 9 - a9;
        const step4_9 = c9 - 1;
        const step5_9 = b9;
        const step6_9 = a9;
        
        data.steps = [
          {
            title: "Step 1: Subtract unit digit from 10",
            content: `10 - ${c9} = ${step1_9} (unit place)`,
            unitDigit: step1_9,
            tensDigit: '?',
            hundredsDigit: '?',
            thousandsDigit: '?',
            tenThousandsDigit: '?',
            hundredThousandsDigit: '?'
          },
          {
            title: "Step 2: Subtract tens digit from 9",
            content: `9 - ${b9} = ${step2_9} (tens place)`,
            unitDigit: step1_9,
            tensDigit: step2_9,
            hundredsDigit: '?',
            thousandsDigit: '?',
            tenThousandsDigit: '?',
            hundredThousandsDigit: '?'
          },
          {
            title: "Step 3: Subtract hundreds digit from 9",
            content: `9 - ${a9} = ${step3_9} (hundreds place)`,
            unitDigit: step1_9,
            tensDigit: step2_9,
            hundredsDigit: step3_9,
            thousandsDigit: '?',
            tenThousandsDigit: '?',
            hundredThousandsDigit: '?'
          },
          {
            title: "Step 4: Subtract 1 from unit digit",
            content: `${c9} - 1 = ${step4_9} (thousands place)`,
            unitDigit: step1_9,
            tensDigit: step2_9,
            hundredsDigit: step3_9,
            thousandsDigit: step4_9,
            tenThousandsDigit: '?',
            hundredThousandsDigit: '?'
          },
          {
            title: "Step 5: Use tens digit as is",
            content: `${b9} (ten-thousands place)`,
            unitDigit: step1_9,
            tensDigit: step2_9,
            hundredsDigit: step3_9,
            thousandsDigit: step4_9,
            tenThousandsDigit: step5_9,
            hundredThousandsDigit: '?'
          },
          {
            title: "Step 6: Use hundreds digit as is",
            content: `${a9} (hundred-thousands place)`,
            unitDigit: step1_9,
            tensDigit: step2_9,
            hundredsDigit: step3_9,
            thousandsDigit: step4_9,
            tenThousandsDigit: step5_9,
            hundredThousandsDigit: step6_9
          },
          {
            title: "Final Calculation",
            content: `(100000 × ${step6_9}) + (10000 × ${step5_9}) + (1000 × ${step4_9}) + (100 × ${step3_9}) + (10 × ${step2_9}) + ${step1_9} = ${result}`,
            finalResult: result,
            unitDigit: step1_9,
            tensDigit: step2_9,
            hundredsDigit: step3_9,
            thousandsDigit: step4_9,
            tenThousandsDigit: step5_9,
            hundredThousandsDigit: step6_9
          }
        ];
        break;
        
      default:
        break;
    }
    
    setTotalSteps(stepsCount);
    setAnimationData(data);
    setShowSteps(true);
  };

  const handleVisualize = () => {
    if (!multiplicand || !multiplier) {
      setErrorMsg("Please enter valid numbers");
      return;
    }
    
    setErrorMsg('');
    setShowSteps(true);
    setCurrentStep(1);
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      if (currentStep + 1 === totalSteps) {
        setShowFinalResult(true);
      }
    }
  };

  const handlePreview = () => {
    if (!animationData) return;
    
    setIsPreviewMode(true);
    setCurrentStep(0);
    setShowFinalResult(false);
    
    let step = 1;
    const previewSequence = () => {
      if (step <= totalSteps) {
        setCurrentStep(step);
        const stepData = animationData.steps[step - 1];
        speak(`${stepData.title}. ${stepData.content}`);
        
        if (step === totalSteps) {
          setShowFinalResult(true);
        }
        
        step++;
        setTimeout(previewSequence, 3000);
      } else {
        setIsPreviewMode(false);
      }
    };
    
    previewSequence();
  };

  const renderDigitBoxes = (stepData) => {
    if (!stepData) return null;
    
    const isFinalStep = currentStep === totalSteps;
    const resultLength = String(result).length;
    
    return (
      <div className="answer-container">
        {resultLength >= 6 && (
          <div className="answer-digit">
            <div className={`digit-box ${isFinalStep ? 'highlight' : ''}`}>
              {stepData.hundredThousandsDigit || '?'}
            </div>
            <div className="place-label">Hundred-Thousands</div>
          </div>
        )}
        {resultLength >= 5 && (
          <div className="answer-digit">
            <div className={`digit-box ${isFinalStep ? 'highlight' : ''}`}>
              {stepData.tenThousandsDigit || '?'}
            </div>
            <div className="place-label">Ten-Thousands</div>
          </div>
        )}
        {resultLength >= 4 && (
          <div className="answer-digit">
            <div className={`digit-box ${isFinalStep ? 'highlight' : ''}`}>
              {stepData.thousandsDigit || '?'}
            </div>
            <div className="place-label">Thousands</div>
          </div>
        )}
        {resultLength >= 3 && (
          <div className="answer-digit">
            <div className={`digit-box ${currentStep >= 3 || isFinalStep ? 'highlight' : ''}`}>
              {stepData.hundredsDigit || '?'}
            </div>
            <div className="place-label">Hundreds</div>
          </div>
        )}
        <div className="answer-digit">
          <div className={`digit-box tens-digit ${currentStep >= 2 || isFinalStep ? 'highlight' : ''}`}>
            {stepData.tensDigit || '?'}
          </div>
          <div className="place-label">Tens</div>
        </div>
        <div className="answer-digit">
          <div className={`digit-box unit-digit ${currentStep >= 1 ? 'highlight' : ''}`}>
            {stepData.unitDigit || '?'}
          </div>
          <div className="place-label">Units</div>
        </div>
      </div>
    );
  };
  const renderFinalCalculation = (stepData) => {
    if (!stepData || currentStep !== totalSteps) return null;
    return (
      <div className="formula-container">
        <div className="formula-part">
          <span>{stepData.content}</span>
        </div>
        <div className="explanation">
          This is the final calculation combining all the steps.
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    if (!animationData || currentStep < 1 || currentStep > totalSteps) return null;
    
    const stepData = animationData.steps[currentStep - 1];
    const speakText = `${stepData.title}. ${stepData.content}`;
    
    return (
      <div className={`rule1step active`}>
        <div className="step-header">
          <div className="step-title">{stepData.title}</div>
          <button 
            className={`speak-btn ${isSpeaking ? 'active' : ''}`}
            onClick={() => toggleSpeak(speakText)}
          >
            {isSpeaking ? '🔊 Stop' : '🔈 Speak'}
          </button>
        </div>
        <div className="formula">{stepData.content}</div>
        <div className="explanation">
          {steps[currentStep]?.content || ''}
        </div>
        
        {renderDigitBoxes(stepData)}
        {currentStep === totalSteps && renderFinalCalculation(stepData)}
      </div>
    );
  };

  const renderPreviewContent = () => {
    if (!animationData) return null;
    
    return (
      <div className="preview-container">
        <h2>Preview Mode</h2>
        <div className="preview-steps">
          {animationData.steps.map((step, index) => (
            <div 
              key={index} 
              className={`preview-step ${currentStep > index ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}
            >
              <div className="step-header">
                <div className="step-title">{step.title}</div>
                {currentStep === index + 1 && (
                  <button 
                    className={`speak-btn ${isSpeaking ? 'active' : ''}`}
                    onClick={() => toggleSpeak(`${step.title}. ${step.content}`)}
                  >
                    {isSpeaking ? '🔊 Stop' : '🔈 Speak'}
                  </button>
                )}
              </div>
              <div className="formula">{step.content}</div>
              {currentStep === index + 1 && renderDigitBoxes(step)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='rule1main'>
      <div className="rulecontainer">
        <h1>✨ Multiplication Animation ✨</h1>
        <p>Visualizing the calculation of {multiplicand} × {multiplier}</p>
        
        <div className="audio-controls">
          <button onClick={toggleMute} className={`mute-btn ${isMuted ? 'muted' : ''}`}>
            {isMuted ? '🔇 Unmute' : '🔊 Mute'}
          </button>
        </div>
        
        {errorMsg && (
          <div className="error-message">{errorMsg}</div>
        )}
        
        <button id="visualizeBtn" onClick={handleVisualize}>
          Show Animation 🎩✨
        </button>
        
        {showSteps && animationData && (
          <div className="rule1steps" id="steps">
            {isPreviewMode ? renderPreviewContent() : renderStepContent()}
            
            {showFinalResult && currentStep === totalSteps && (
              <div className="final-result" id="finalResult">
                <span className="fun-emoji">🎉</span> 
                <span id="final-equation">{multiplicand} × {multiplier} = {result}</span> 
                <span className="fun-emoji">🎉</span>
              </div>
            )}
            
            <div className="nav-buttons" id="navButtons">
              <button id="prevBtn" onClick={handlePrev} disabled={currentStep === 1 || isPreviewMode}>
                <span className="fun-emoji">👈</span> Previous
              </button>
              <button id="previewBtn" className="preview-btn" onClick={handlePreview} disabled={isPreviewMode}>
                <span className="fun-emoji">👀</span> Preview
              </button>
              <button id="nextBtn" onClick={handleNext} disabled={currentStep === totalSteps || isPreviewMode}>
                <span className="fun-emoji">👉</span> Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplicationAnimation;