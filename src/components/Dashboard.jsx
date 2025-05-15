import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const MultiplicationRules = () => {
  const navigate = useNavigate();
  const [multiplicand, setMultiplicand] = useState('');
  const [multiplier, setMultiplier] = useState('');
  const [result, setResult] = useState('');
  const [steps, setSteps] = useState([]);
  const [activeRule, setActiveRule] = useState(null);
  const [showAnimateButtons, setShowAnimateButtons] = useState(false);
  const calculate = () => {
    const multiplicandNum = parseInt(multiplicand);
    const multiplierNum = parseInt(multiplier);
    if (isNaN(multiplicandNum)) {
      alert("Please enter valid numbers in both fields.");
      return;
    }
    if (isNaN(multiplierNum)) {
      alert("Please enter valid numbers in both fields.");
      return;
    }
    setResult('');
    setSteps([]);
    setActiveRule(null);
    setShowAnimateButtons(false);
    if (multiplierNum === 9) {
      if (multiplicandNum < 10) {
        setActiveRule(1);
        rule1(multiplicandNum);
      } else if (multiplicandNum >= 10 && multiplicandNum < 100) {
        const tens = Math.floor(multiplicandNum / 10);
        const ones = multiplicandNum % 10;
        setActiveRule(2);
        rule2(tens, ones);
      } else if (multiplicandNum >= 100) {
        const hundreds = Math.floor(multiplicandNum / 100);
        const tens = Math.floor((multiplicandNum / 10) % 10);
        const ones = multiplicandNum % 10;
        setActiveRule(3);
        rule3(hundreds, tens, ones);
      }
    } else if (multiplierNum === 99) {
      if (multiplicandNum < 10) {
        setActiveRule(4);
        rule4(multiplicandNum);
      } else if (multiplicandNum >= 10 && multiplicandNum < 100) {
        const tens = Math.floor(multiplicandNum / 10);
        const ones = multiplicandNum % 10;
        setActiveRule(5);
        rule5(tens, ones);
      } else if (multiplicandNum >= 100) {
        const hundreds = Math.floor(multiplicandNum / 100);
        const tens = Math.floor((multiplicandNum / 10) % 10);
        const ones = multiplicandNum % 10;
        setActiveRule(6);
        rule6(hundreds, tens, ones);
      }
    } else if (multiplierNum === 999) {
      if (multiplicandNum < 10) {
        setActiveRule(7);
        rule7(multiplicandNum);
      } else if (multiplicandNum >= 10 && multiplicandNum < 100) {
        const tens = Math.floor(multiplicandNum / 10);
        const ones = multiplicandNum % 10;
        setActiveRule(8);
        rule8(tens, ones);
      } else if (multiplicandNum >= 100) {
        const hundreds = Math.floor(multiplicandNum / 100);
        const tens = Math.floor((multiplicandNum / 10) % 10);
        const ones = multiplicandNum % 10;
        setActiveRule(9);
        rule9(hundreds, tens, ones);
      }
    }
    setShowAnimateButtons(true);
  };
  // rules for multiplication  
  const rule1 = (a) => {
    const step1 = 10 - a;
    const step2 = a - 1;
    const finalResult = (10 * step2) + step1;

    const newSteps = [
      { title: "Rule 1:", content: "" },
      { 
        title: "Step 1:", 
        content: `Subtract multiplicand from 10: 10 - ${a} = ${step1} placed in unit position` 
      },
      { 
        title: "Step 2:", 
        content: `Subtract 1 from the multiplicand: ${a} - 1 = ${step2} placed in Tens place` 
      },
      { 
        title: "Final Calculation:", 
        content: `(10 * ${step2}) + ${step1} = ${finalResult}` 
      }
    ];
    setResult(finalResult);
    setSteps(newSteps);
  };
 const rule2 = (a1, b1) => {
    const step1 = 10 - b1;
    const step2 = 9 + b1 - a1;
    const step3 = a1 - 1;
    const finalResult = (100 * step3) + (10 * step2) + step1;

    const newSteps = [
      { title: "Rule 2:", content: "" },
      { 
        title: "Step 1:", 
        content: `Subtract unit place digit from 10: 10 - ${b1} = ${step1} (unit place)` 
      },
      { 
        title: "Step 2:", 
        content: `Add 9 to unit place digit and subtract tens place digit: 9 + ${b1} - ${a1} = ${step2} (Tens place)` 
      },
      { 
        title: "Step 3:", 
        content: `Subtract 1 from tens place digit: ${a1} - 1 = ${step3} (Hundred place)` 
      },
      { 
        title: "Final Calculation:", 
        content: `(100 * ${step3}) + (10 * ${step2}) + ${step1} = ${finalResult}` 
      }
    ];

    setResult(finalResult);
    setSteps(newSteps);
  };

  const rule3 = (a, b, c) => {
    const step1 = 10 - c;
    const step2 = 9 + c - b;
    const step3 = 9 + b - a;
    const step4 = a - 1;
    const finalResult = (1000 * step4) + (100 * step3) + (10 * step2) + step1;

    const newSteps = [
      { title: "Rule 3:", content: "" },
      { 
        title: "Step 1:", 
        content: `Subtract unit place digit from 10: 10 - ${c} = ${step1}(Unit Place)` 
      },
      { 
        title: "Step 2:", 
        content: `Add 9 to unit place digit and subtract tens place digit: 9 + ${c} - ${b} = ${step2} (Tens Place)` 
      },
      { 
        title: "Step 3:", 
        content: `Add 9 to tens place digit and subtract hundreds place digit: 9 + ${b} - ${a} = ${step3} (Hundred Place)` 
      },
      { 
        title: "Step 4:", 
        content: `Subtract 1 from hundreds place digit: ${a} - 1 = ${step4} (Thousand Place)` 
      },
      { 
        title: "Final Calculation:", 
        content: `(1000 * ${step4}) + (100 * ${step3}) + (10 * ${step2}) + ${step1} = ${finalResult}` 
      }
    ];

    setResult(finalResult);
    setSteps(newSteps);
   };

  const rule4 = (a) => {
    const step1 = 10 - a;
    const step2 = 9;
    const step3 = (a - 1);
    const finalResult = 100 * step3 + 10 * step2 + step1;

    const newSteps = [
      { title: "Rule 4:", content: "" },
      { 
        title: "Step 1:", 
        content: `Subtract multiplicand from 10: 10 - ${a} = ${step1} placed in unit position` 
      },
      { 
        title: "Step 2:", 
        content: `Multiply 9 with 10: 10 * 9 = ${step2} placed in Tens place` 
      },
      { 
        title: "Step 3:", 
        content: `Substract ${a}-1 and multiply with 100: 100 * ${a} -1 = ${step3} placed in Tens place` 
      },
      { 
        title: "Final Calculation:", 
        content: `(100 * ${step3}) + 10* ${step2} + ${step1} = ${finalResult}` 
      }
    ];

    setResult(finalResult);
    setSteps(newSteps);
   };

  const rule5 = (a1, b1) => {
    const step1 = 10 - b1;
    const step2 = 9 - a1;
    const step3 = b1 - 1;
    const step4 = a1;
    const finalResult = (1000 * step4) + (100 * step3) + (10 * step2) + step1;

    const newSteps = [
      { title: "Rule 4:", content: "" },
      { 
        title: "Step 1:", 
        content: `Subtract unit place digit from 10: 10 - ${b1} = ${step1} (unit place)` 
      },
      { 
        title: "Step 2:", 
        content: `Subtract tens place digit from 9: 9 - ${a1} = ${step2} (tens place)` 
      },
      { 
        title: "Step 3:", 
        content: `Subtract 1 from unit place digit: ${b1} - 1 = ${step3} (hundreds place)` 
      },
      { 
        title: "Step 4:", 
        content: `Use tens place digit as is: ${a1} (thousands place)` 
      },
      { 
        title: "Final Calculation:", 
        content: `(1000 * ${step4}) + (100 * ${step3}) + (10 * ${step2}) + ${step1} = ${finalResult}` 
      }
    ];

    setResult(finalResult);
    setSteps(newSteps);
 };

  const rule6 = (a, b, c) => {
    const step1 = 10 - c;
    const step2 = 9 - b;
    const step3 = 9 + c - a;
    const step4 = b - 1;
    const step5 = a;
    const finalResult = (10000 * step5) + (1000 * step4) + (100 * step3) + (10 * step2) + step1;

    const newSteps = [
      { title: "Rule 6:", content: "" },
      { 
        title: "Step 1:", 
        content: `Subtract unit place digit from 10: 10 - ${c} = ${step1}(Unit Place)` 
      },
      { 
        title: "Step 2:", 
        content: `Substract 9 to tens place digit: 9 - ${b} = ${step2} (Tens Place)` 
      },
      { 
        title: "Step 3:", 
        content: `Add 9 to unit place digit and subtract hundreds place digit: 9 + ${c} - ${a} = ${step3} (Hundred Place)` 
      },
      { 
        title: "Step 4:", 
        content: `Subtract 1 from tens place digit: ${b} - 1 = ${step4} (Thousand Place)` 
      },
      { 
        title: "Step 5:", 
        content: `Normally put the hundred place digit: ${a} = ${step4} (Thousand Place)` 
      },
      { 
        title: "Final Calculation:", 
        content: `(10000 * ${step5}) + (1000 * ${step4}) + (100 * ${step3}) + (10 * ${step2}) + (${step1}) = ${finalResult}` 
      }
    ];

    setResult(finalResult);
    setSteps(newSteps);
 };

  const rule7 = (a) => {
    const step1 = 10 - a;
    const step2 = 9;
    const step3 = 9;
    const step4 = (a - 1);
    const finalResult = 1000 * step4 + 100 * step3 + 10 * step2 + step1;

    const newSteps = [
      { title: "Rule 7:", content: "" },
      { 
        title: "Step 1:", 
        content: `Subtract multiplicand from 10: 10 - ${a} = ${step1} placed in unit position` 
      },
      { 
        title: "Step 2:", 
        content: `Multiply 9 with 10: 10 * 9 = ${step2} placed in Tens place` 
      },
      { 
        title: "Step 3:", 
        content: `Multiply 9 with 100: 100 * 9 = ${step3} placed in Tens place` 
      },
      { 
        title: "Step 4:", 
        content: `Substract ${a}-1 and multiply with 1000: 1000 * ${a} -1 = ${step3} placed in Tens place` 
      },
      { 
        title: "Final Calculation:", 
        content: `(1000 * ${step4}) + 100 * ${step3} + 10 * ${step2} + ${step1} = ${finalResult}` 
      }
    ];

    setResult(finalResult);
    setSteps(newSteps);
  };

  const rule8 = (a1, b1) => {
    const step1 = 10 - b1;
    const step2 = 9 - a1;
    const step3 = 9;
    const step4 = b1 - 1;
    const step5 = a1;
    const finalResult = (10000 * step5) + (1000 * step4) + (100 * step3) + 10 * (step2) + step1;

    const newSteps = [
      { title: "Rule 8:", content: "" },
      { 
        title: "Step 1:", 
        content: `Subtract unit place digit from 10: 10 - ${b1} = ${step1} (unit place)` 
      },
      { 
        title: "Step 2:", 
        content: `Subtract tens place digit from 9: 9 - ${a1} = ${step2} (tens place)` 
      },
      { 
        title: "Step 3:", 
        content: `Put 9 and multiply by 100: 100 * 9 = ${step3} (hundreds place)` 
      },
      { 
        title: "Step 4:", 
        content: `Subtract 1 from unit place digit: ${b1} - 1 = ${step4} (thousand place place)` 
      },
      { 
        title: "Step 5:", 
        content: `Use tens place digit as it is: ${a1} (5th place)` 
      },
      { 
        title: "Final Calculation:", 
        content: `(10000 * ${step5}) + (1000 * ${step4}) + (100 * ${step3}) + (10 * ${step2}) + ${step1} = ${finalResult}` 
      }
    ];

    setResult(finalResult);
    setSteps(newSteps);
  };

  const rule9 = (a, b, c) => {
    const step1 = 10 - c;
    const step2 = 9 - b;
    const step3 = 9 - a;
    const step4 = c - 1;
    const step5 = b;
    const step6 = a;
    const finalResult = (100000 * step6) + (10000 * step5) + (1000 * step4) + (100 * step3) + (10 * step2) + step1;

    const newSteps = [
      { title: "Rule 9:", content: "" },
      { 
        title: "Step 1:", 
        content: `Subtract unit place digit from 10: 10 - ${c} = ${step1}(Unit Place)` 
      },
      { 
        title: "Step 2:", 
        content: `Substract 9 to tens place digit: 9 - ${b} = ${step2} (Tens Place)` 
      },
      { 
        title: "Step 3:", 
        content: `Substract 9 to hundred place digit and subtract hundreds place digit: 9 - ${a} = ${step3} (Hundred Place)` 
      },
      { 
        title: "Step 4:", 
        content: `Substract 1 to unit place digit:${c} -1 = ${step4} (thousand Place)` 
      },
      { 
        title: "Step 5:", 
        content: `Put tens place digit as it is: ${b} = ${step5} (5th Place)` 
      },
      { 
        title: "Step 6:", 
        content: `Put hundred place digit as it is: ${a} = ${step6} (6th Place)` 
      },
      { 
        title: "Final Calculation:", 
        content: `(100000 * ${step6}) + (10000 * ${step5}) + (1000 * ${step4}) + (100 * ${step3}) + (10 * ${step2}) + (${step1})= ${finalResult}` 
      }
    ];

    setResult(finalResult);
    setSteps(newSteps);
  };
  const handleAnimateClick = (ruleNumber) => {
    navigate('/rule1', {
      state: {
        ruleNumber,
        multiplicand: parseInt(multiplicand),
        multiplier: parseInt(multiplier),
        result,
        steps
      }
    });
  };

    const exportSteps = () => {
    const content = document.createElement('div');
    content.style.padding = '20px';
    content.style.backgroundColor = '#ffffff';
      // title section 
    const title = document.createElement('h2');
    title.textContent = 'Multiplication Steps';
    title.style.textAlign = 'center';
    title.style.color = '#4CAF50';
    content.appendChild(title);

    if (result) {
      const resultDiv = document.createElement('div');
      resultDiv.innerHTML = `<p style="font-size: 1.2em; margin: 10px 0;">Result: <strong>${result}</strong></p>`;
      content.appendChild(resultDiv);
    }

    if (steps.length > 0) {
      const stepsContainer = document.createElement('div');
      stepsContainer.style.marginTop = '20px';
      
      steps.forEach(step => {
        const stepElement = document.createElement('div');
        if (step.title.includes("Rule")) {
          stepElement.style.margin = '15px 0 10px';
          stepElement.style.fontSize = '1.1em';
          stepElement.innerHTML = `<strong>${step.title}</strong>`;
        } else {
          stepElement.style.margin = '10px 0';
          stepElement.style.padding = '10px';
          stepElement.style.backgroundColor = '#f9f9f9';
          stepElement.style.borderRadius = '5px';
          stepElement.innerHTML = `<p><strong>${step.title}</strong> ${step.content}</p>`;
        }
        stepsContainer.appendChild(stepElement);
      });
      
      content.appendChild(stepsContainer);
    }
    document.body.appendChild(content);
    // for print pdf 
    html2canvas(content, {
      scale: 2, 
      logging: false,
      useCORS: true,
      allowTaint: true,
      scrollY: 0
    }).then(canvas => {
      document.body.removeChild(content);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; 
      const pageHeight = 295; 
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('multiplication_steps.pdf');
    });
  };
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      margin: '50px',
      backgroundColor: '#f4f4f9'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#4CAF50' }}>Multiplication Rules</h2>
        <input
          type="number"
          id="multiplicand"
          placeholder="Enter multiplicand"
          value={multiplicand}
          onChange={(e) => setMultiplicand(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />
        <input
          type="number"
          id="multiplier"
          placeholder="Enter multiplier (9, 99, or 999)"
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />
        <button
          onClick={calculate}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Calculate
        </button>

        {result && (
          <div className="result" style={{ marginTop: '20px', fontSize: '1.2em', color: '#333' }}>
            Result: <strong>{result}</strong>
          </div>
        )}

        {steps.length > 0 && (
          <div className="steps" style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e9e9e9',
            borderRadius: '5px',
            animation: 'fadeIn 0.5s ease'
          }}>
            {steps.map((step, index) => (
              <div key={index}>
                {step.title === "Rule 1:" || step.title === "Rule 2:" || step.title === "Rule 3:" || 
                 step.title === "Rule 4:" || step.title === "Rule 5:" || step.title === "Rule 6:" || 
                 step.title === "Rule 7:" || step.title === "Rule 8:" || step.title === "Rule 9:" ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p><strong>{step.title}</strong></p>
                    {showAnimateButtons && (
                      <button
                        onClick={() => handleAnimateClick(activeRule)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#FF9800',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '5px',
                          fontSize: '14px',
                          transition: 'background-color 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#e68a00'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#FF9800'}
                      >
                        Animate Rule {activeRule}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="step" style={{
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>
                    <p><strong>{step.title}</strong> {step.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {steps.length > 0 && (
          <button
            className="export-button"
            onClick={exportSteps}
            style={{
              marginTop: '20px',
              backgroundColor: '#008CBA',
              width: '100%',
              padding: '10px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
              fontSize: '16px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#007B9E'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#008CBA'}
          >
            Export Steps as PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiplicationRules;