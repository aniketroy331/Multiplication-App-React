    // Text-to-Speech Function
//    function speak(text) {
//     const utterance = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(utterance);
// }

// Calculate Function
function calculate() {
    // Get input values
    const multiplicand = parseInt(document.getElementById('multiplicand').value);
    const multiplier = parseInt(document.getElementById('multiplier').value);

    // Validate inputs
    if (isNaN(multiplicand) || isNaN(multiplier)) {
        alert("Please enter valid numbers in both fields.");
        return;
    }

    // Clear previous results
    document.getElementById('result').innerHTML = '';
    document.getElementById('steps').innerHTML = '';

    // Apply rules based on conditions
    if (multiplier === 9) {
        if (multiplicand < 10) {
            rule1(multiplicand);
        } else if (multiplicand >= 10 && multiplicand < 100) {
            const tens = Math.floor(multiplicand / 10);
            const ones = multiplicand % 10;
            rule2(tens, ones);
        } else if (multiplicand >= 100) {
            const hundreds = Math.floor(multiplicand / 100);
            const tens = Math.floor((multiplicand / 10) % 10);
            const ones = multiplicand % 10;
            rule3(hundreds, tens, ones);
        }
    }
    if(multiplier==99){
        if(multiplicand<10){
            rule4(multiplicand)
        }else if(multiplicand>=10 && multiplicand<100){
            const tens = Math.floor(multiplicand / 10);
            const ones = multiplicand % 10;
            rule5(tens,ones)
        }else if(multiplicand>=100){
            const hundreds = Math.floor(multiplicand / 100);
            const tens = Math.floor((multiplicand / 10) % 10);
            const ones = multiplicand % 10;
            rule6(hundreds, tens, ones);
        }
    }
    if(multiplier == 999){
        if(multiplicand<10){
            rule7(multiplicand)
        }else if(multiplicand>10 && multiplicand<100){
            const tens = Math.floor(multiplicand / 10);
            const ones = multiplicand % 10;
            rule8(tens,ones)
        }else if(multiplicand>100){
            const hundreds = Math.floor(multiplicand / 100);
            const tens = Math.floor((multiplicand / 10) % 10);
            const ones = multiplicand % 10;
            rule9(hundreds, tens, ones);
        }
    }
}

// Rule 1: For 1-digit multiplicand
function rule1(a) {
    const step1 = 10 - a; // Step 1: Subtract multiplicand from 10
    const step2 = a - 1; // Step 2: Subtract 1 from the multiplicand
    const result = (10 * step2) + step1; // Final result

    const steps = `
        <p><strong>Rule 1:</strong></p>
        <div class="step">
            <p><strong>Step 1:</strong> Subtract multiplicand from 10: 10 - ${a} = ${step1} placed in unit position</p>
        </div>
        <div class="step">
            <p><strong>Step 2:</strong> Subtract 1 from the multiplicand: ${a} - 1 = ${step2} placed in Tens place</p>
        </div>
        <div class="step">
            <p><strong>Final Calculation:</strong> (10 * ${step2}) + ${step1} = ${result}</p>
        </div>
        <p><strong>Result:</strong> ${result}</p>
    `;
    document.getElementById('result').innerHTML = `Result: <strong>${result}</strong>`;
    document.getElementById('steps').innerHTML = steps;

    // Speak the steps
    speak(`Rule 1. Step 1: Subtract multiplicand from 10: 10 minus ${a} equals ${step1} placed in unit position. Step 2: Subtract 1 from the multiplicand: ${a} minus 1 equals ${step2} placed in Tens position. Final Calculation: 10 multiplied by ${step2} plus ${step1} equals ${result}. Result: ${result}`);
}

// Rule 2: For 2-digit multiplicand
function rule2(a1, b1) {
    const step1 = 10 - b1; // Step 1: Subtract unit place digit from 10
    const step2 = 9 + b1 - a1; // Step 2: Add 9 to unit place digit and subtract tens place digit
    const step3 = a1 - 1; // Step 3: Subtract 1 from tens place digit
    const result = (100 * step3) + (10 * step2) + step1; // Final result

    const steps = `
        <p><strong>Rule 2:</strong></p>
        <div class="step">
            <p><strong>Step 1:</strong> Subtract unit place digit from 10: 10 - ${b1} = ${step1} (unit place)</p>
        </div>
        <div class="step">
            <p><strong>Step 2:</strong> Add 9 to unit place digit and subtract tens place digit: 9 + ${b1} - ${a1} = ${step2} (Tens place)</p>
        </div>
        <div class="step">
            <p><strong>Step 3:</strong> Subtract 1 from tens place digit: ${a1} - 1 = ${step3} (Hundred place)</p>
        </div>
        <div class="step">
            <p><strong>Final Calculation:</strong> (100 * ${step3}) + (10 * ${step2}) + ${step1} = ${result}</p>
        </div>
        <p><strong>Result:</strong> ${result}</p>
    `;
    document.getElementById('result').innerHTML = `Result: <strong>${result}</strong>`;
    document.getElementById('steps').innerHTML = steps;

    // Speak the steps
    speak(`Rule 2. Step 1: Subtract unit place digit from 10: 10 minus ${b1} equals ${step1}(Unit place). Step 2: Add 9 to unit place digit and subtract tens place digit: 9 plus ${b1} minus ${a1} equals ${step2}(Tens Place). Step 3: Subtract 1 from tens place digit: ${a1} minus 1 equals ${step3}(Hundred place). Final Calculation: 100 multiplied by ${step3} plus 10 multiplied by ${step2} plus ${step1} equals ${result}. Result: ${result}`);
}

// Rule 3: For 3-digit multiplicand
function rule3(a, b, c) {
    const step1 = 10 - c; // Step 1: Subtract unit place digit from 10
    const step2 = 9 + c - b; // Step 2: Add 9 to unit place digit and subtract tens place digit
    const step3 = 9 + b - a; // Step 3: Add 9 to tens place digit and subtract hundreds place digit
    const step4 = a - 1; // Step 4: Subtract 1 from hundreds place digit
    const result = (1000 * step4) + (100 * step3) + (10 * step2) + step1; // Final result

    const steps = `
        <p><strong>Rule 3:</strong></p>
        <div class="step">
            <p><strong>Step 1:</strong> Subtract unit place digit from 10: 10 - ${c} = ${step1}(Unit Place)</p>
        </div>
        <div class="step">
            <p><strong>Step 2:</strong> Add 9 to unit place digit and subtract tens place digit: 9 + ${c} - ${b} = ${step2} (Tens Place)</p>
        </div>
        <div class="step">
            <p><strong>Step 3:</strong> Add 9 to tens place digit and subtract hundreds place digit: 9 + ${b} - ${a} = ${step3} (Hundred Place)</p>
        </div>
        <div class="step">
            <p><strong>Step 4:</strong> Subtract 1 from hundreds place digit: ${a} - 1 = ${step4} (Thousand Place)</p>
        </div>
        <div class="step">
            <p><strong>Final Calculation:</strong> (1000 * ${step4}) + (100 * ${step3}) + (10 * ${step2}) + ${step1} = ${result}</p>
        </div>
        <p><strong>Result:</strong> ${result}</p>
    `;
    document.getElementById('result').innerHTML = `Result: <strong>${result}</strong>`;
    document.getElementById('steps').innerHTML = steps;

    // Speak the steps
    speak(`Rule 3. Step 1: Subtract unit place digit from 10: 10 minus ${c} equals ${step1}(Unit place). Step 2: Add 9 to unit place digit and subtract tens place digit: 9 plus ${c} minus ${b} equals ${step2} (Tens place). Step 3: Add 9 to tens place digit and subtract hundreds place digit: 9 plus ${b} minus ${a} equals ${step3} (Hundred Place). Step 4: Subtract 1 from hundreds place digit: ${a} minus 1 equals ${step4} (Thousand Place). Final Calculation: 1000 multiplied by ${step4} plus 100 multiplied by ${step3} plus 10 multiplied by ${step2} plus ${step1} equals ${result}. Result: ${result}`);
}

function rule4(a){
    const step1 = 10 - a; // Step 1: Subtract multiplicand from 10
    const step2 = 9; 
    const step3= (a-1);
    const result = 100*step3 + 10*step2 + step1; // Final result

    const steps = `
        <p><strong>Rule 4:</strong></p>
        <div class="step">
            <p><strong>Step 1:</strong> Subtract multiplicand from 10: 10 - ${a} = ${step1} placed in unit position</p>
        </div>
        <div class="step">
            <p><strong>Step 2:</strong> Multiply 9 with 10: 10 * 9 = ${step2} placed in Tens place</p>
        </div>
        <div class="step">
            <p><strong>Step 3:</strong> Substract ${a}-1 and multiply with 100: 100 * ${a} -1 = ${step3} placed in Tens place</p>
        </div>
        <div class="step">
            <p><strong>Final Calculation:</strong> (100 * ${step3}) + 10* ${step2} + ${step1} = ${result}</p>
        </div>
        <p><strong>Result:</strong> ${result}</p>
    `;
    document.getElementById('result').innerHTML = `Result: <strong>${result}</strong>`;
    document.getElementById('steps').innerHTML = steps;

    // Speak the steps
    speak(`Rule 1. Step 1: Subtract multiplicand from 10: 10 - ${a} = ${step1} placed in unit position. Step 2: Multiply 9 with 10: 10 * 9 = ${step2} placed in Tens place. Step 3: Substract ${a}-1 and multiply with 100: 100 * ${a} -1 = ${step3} placed in Tens place. Final Calculation: 100 multiplied by ${step3} plus 10 multiply by ${step2} plus ${step3} equals ${result}. Result: ${result}`);
}

function rule5(a1, b1) {
const step1 = 10 - b1; // Step 1: Subtract unit place digit from 10 (unit place)
const step2 = 9 - a1; // Step 2: Subtract tens place digit from 9 (tens place)
const step3 = b1 - 1; // Step 3: Subtract 1 from unit place digit (hundreds place)
const step4 = a1; // Step 4: Use tens place digit as is (thousands place)
const result = (1000 * step4) + (100 * step3) + (10 * step2) + step1; // Final result

const steps = `
    <p><strong>Rule 4:</strong></p>
    <div class="step">
        <p><strong>Step 1:</strong> Subtract unit place digit from 10: 10 - ${b1} = ${step1} (unit place)</p>
    </div>
    <div class="step">
        <p><strong>Step 2:</strong> Subtract tens place digit from 9: 9 - ${a1} = ${step2} (tens place)</p>
    </div>
    <div class="step">
        <p><strong>Step 3:</strong> Subtract 1 from unit place digit: ${b1} - 1 = ${step3} (hundreds place)</p>
    </div>
    <div class="step">
        <p><strong>Step 4:</strong> Use tens place digit as is: ${a1} (thousands place)</p>
    </div>
    <div class="step">
        <p><strong>Final Calculation:</strong> (1000 * ${step4}) + (100 * ${step3}) + (10 * ${step2}) + ${step1} = ${result}</p>
    </div>
    <p><strong>Result:</strong> ${result}</p>
`;
document.getElementById('result').innerHTML = `Result: <strong>${result}</strong>`;
document.getElementById('steps').innerHTML = steps;

// Speak the steps
speak(`Rule 5. Step 1: Subtract unit place digit from 10: 10 minus ${b1} equals ${step1} (unit place). Step 2: Subtract tens place digit from 9: 9 minus ${a1} equals ${step2} (tens place). Step 3: Subtract 1 from unit place digit: ${b1} minus 1 equals ${step3} (hundreds place). Step 4: Use tens place digit as is: ${a1} (thousands place). Final Calculation: 1000 multiplied by ${step4} plus 100 multiplied by ${step3} plus 10 multiplied by ${step2} plus ${step1} equals ${result}. Result: ${result}`);
}


function rule6(a, b, c) {
    const step1 = 10 - c; // Step 1: Subtract unit place digit from 10
    const step2 = 9 - b; // Step 2: Add 9 to unit place digit and subtract tens place digit
    const step3 = 9 + c - a; // Step 3: Add 9 to tens place digit and subtract hundreds place digit
    const step4 = b - 1; // Step 4: Subtract 1 from hundreds place digit
    const step5 = a;
    const result = (10000 * step5) + (1000 * step4) + (100 * step3) + (10 * step2) + step1; // Final result

    const steps = `
        <p><strong>Rule 6:</strong></p>
        <div class="step">
            <p><strong>Step 1:</strong> Subtract unit place digit from 10: 10 - ${c} = ${step1}(Unit Place)</p>
        </div>
        <div class="step">
            <p><strong>Step 2:</strong> Substract 9 to tens place digit: 9 - ${b} = ${step2} (Tens Place)</p>
        </div>
        <div class="step">
            <p><strong>Step 3:</strong> Add 9 to unit place digit and subtract hundreds place digit: 9 + ${c} - ${a} = ${step3} (Hundred Place)</p>
        </div>
        <div class="step">
            <p><strong>Step 4:</strong> Subtract 1 from tens place digit: ${b} - 1 = ${step4} (Thousand Place)</p>
        </div>
        <div class="step">
            <p><strong>Step 5:</strong> Normally put the hundred place digit: ${a} = ${step4} (Thousand Place)</p>
        </div>
        <div class="step">
            <p><strong>Final Calculation:</strong> (10000 * ${step5}) + (1000 * ${step4}) + (100 * ${step3}) + (10 * ${step2}) + (${step1}) = ${result}</p>
        </div>
        <p><strong>Result:</strong> ${result}</p>
    `;
    document.getElementById('result').innerHTML = `Result: <strong>${result}</strong>`;
    document.getElementById('steps').innerHTML = steps;

    // Speak the steps
    speak(`Rule 6. Step 1: Subtract unit place digit from 10: 10 minus ${c} equals ${step1}(Unit place). Step 2: Substract 9 to tens place digit: 9 minus ${b} equals ${step2} (Tens place). Step 3: Add 9 to unit place digit and subtract hundreds place digit: 9 plus ${c} minus ${a} equals ${step3} (Hundred Place). Step 4: Subtract 1 from tens place digit: ${b} minus 1 equals ${step4} (Thousand Place).Step 5: Normally put the hundred place digit: ${step5}. Final Calculation: 10000 multiplied by ${step5} plus 1000 multiplied by ${step4} plus 100 multiplied by ${step3} plus 10 multiply by ${step2} plus ${step1} equals ${result}. Result: ${result}`);
}

function rule7(a){
    const step1 = 10 - a; // Step 1: Subtract multiplicand from 10
    const step2 = 9; 
    const step3 = 9;
    const step4= (a-1);
    const result = 1000*step4 + 100*step3 + 10*step2 + step1; // Final result

    const steps = `
        <p><strong>Rule 7:</strong></p>
        <div class="step">
            <p><strong>Step 1:</strong> Subtract multiplicand from 10: 10 - ${a} = ${step1} placed in unit position</p>
        </div>
        <div class="step">
            <p><strong>Step 2:</strong> Multiply 9 with 10: 10 * 9 = ${step2} placed in Tens place</p>
        </div>
        <div class="step">
            <p><strong>Step 3:</strong> Multiply 9 with 100: 100 * 9 = ${step3} placed in Tens place</p>
        </div>
        <div class="step">
            <p><strong>Step 4:</strong> Substract ${a}-1 and multiply with 1000: 1000 * ${a} -1 = ${step3} placed in Tens place</p>
        </div>
        <div class="step">
            <p><strong>Final Calculation:</strong> (1000 * ${step4}) + 100 * ${step3} + 10 * ${step2} + ${step1} = ${result}</p>
        </div>
        <p><strong>Result:</strong> ${result}</p>
    `;
    document.getElementById('result').innerHTML = `Result: <strong>${result}</strong>`;
    document.getElementById('steps').innerHTML = steps;

    // Speak the steps
    speak(`Rule 7. Step 1: Subtract multiplicand from 10: 10 - ${a} = ${step1} placed in unit position. Step 2: Multiply 9 with 10: 10 * 9 = ${step2} placed in Tens place. Step 3: Multiply 9 with 100: 100 * 9 equals to ${step3} Step 4: Substract ${a}-1 and multiply with 1000: 1000 * ${a} -1 = ${step4} placed in Tens place. Final Calculation: 1000 multiplied by ${step4} plus 100 multiply by ${step3} plus ${step2} plus ${step1} equals ${result}. Result: ${result}`);
}
function rule8(a1, b1) {
    const step1 = 10 - b1; // Step 1: Subtract unit place digit from 10 (unit place)
    const step2 = 9 - a1; // Step 2: Subtract tens place digit from 9 (tens place)
    const step3 = 9;
    const step4 = b1 - 1; // Step 3: Subtract 1 from unit place digit (hundreds place)
    const step5 = a1; // Step 4: Use tens place digit as is (thousands place)
    const result = (10000 * step5) + (1000 * step4) + (100 * step3) +10 * (step2) + step1; // Final result
    
    const steps = `
        <p><strong>Rule 8:</strong></p>
        <div class="step">
            <p><strong>Step 1:</strong> Subtract unit place digit from 10: 10 - ${b1} = ${step1} (unit place)</p>
        </div>
        <div class="step">
            <p><strong>Step 2:</strong> Subtract tens place digit from 9: 9 - ${a1} = ${step2} (tens place)</p>
        </div>
        <div class="step">
            <p><strong>Step 3:</strong> Put 9 and multiply by 100: 100 * 9 = ${step3} (hundreds place)</p>
        </div>
        <div class="step">
            <p><strong>Step 4:</strong> Subtract 1 from unit place digit: ${b1} - 1 = ${step4} (thousand place place)</p>
        </div>
        <div class="step">
            <p><strong>Step 5:</strong> Use tens place digit as it is: ${a1} (5th place)</p>
        </div>
        <div class="step">
            <p><strong>Final Calculation:</strong> (10000 * ${step5}) + (1000 * ${step4}) + (100 * ${step3}) + (10 * ${step2}) + ${step1} = ${result}</p>
        </div>
        <p><strong>Result:</strong> ${result}</p>
    `;
    document.getElementById('result').innerHTML = `Result: <strong>${result}</strong>`;
    document.getElementById('steps').innerHTML = steps;
    
    // Speak the steps
    speak(`Rule 8. Step 1: Subtract unit place digit from 10: 10 minus ${b1} equals ${step1} (unit place). Step 2: Subtract tens place digit from 9: 9 minus ${a1} equals ${step2} (tens place). Step 3:Put 9 and multiply by 100: 100 * 9 equals to ${step3} Step 4: Subtract 1 from unit place digit: ${b1} minus 1 equals ${step4} (hundreds place). Step 5: Use tens place digit as is: ${a1} (5th place). Final Calculation: 10000 multiplied by ${step5} plus 1000 multiplied by ${step4} plus 100 * 9 euqals to ${step3} plus 10 multiplied by ${step2} plus ${step1} equals ${result}. Result: ${result}`);
    }

    function rule9(a, b, c) {
        const step1 = 10 - c; // Step 1: Subtract unit place digit from 10
        const step2 = 9 - b; // Step 2: Add 9 to unit place digit and subtract tens place digit
        const step3 = 9 - a;
        const step4 = c-1; // Step 3: Add 9 to tens place digit and subtract hundreds place digit
        const step5 = b; // Step 4: Subtract 1 from hundreds place digit
        const step6 = a;
        const result = (100000 * step6) + (10000 * step5) + (1000 * step4) + (100 * step3) +(10 * step2) + step1; // Final result
    
        const steps = `
            <p><strong>Rule 9:</strong></p>
            <div class="step">
                <p><strong>Step 1:</strong> Subtract unit place digit from 10: 10 - ${c} = ${step1}(Unit Place)</p>
            </div>
            <div class="step">
                <p><strong>Step 2:</strong> Substract 9 to tens place digit: 9 - ${b} = ${step2} (Tens Place)</p>
            </div>
            <div class="step">
                <p><strong>Step 3:</strong> Substract 9 to hundred place digit and subtract hundreds place digit: 9 - ${a} = ${step3} (Hundred Place)</p>
            </div>
            <div class="step">
                <p><strong>Step 4:</strong> Substract 1 to unit place digit:${c} -1 = ${step4} (thousand Place)</p>
            </div>
            <div class="step">
                <p><strong>Step 5:</strong> Put tens place digit as it is: ${b} = ${step5} (5th Place)</p>
            </div>
            <div class="step">
                <p><strong>Step 6:</strong> Put hundred place digit as it is: ${a} = ${step6} (6th Place)</p>
            </div>
            <div class="step">
                <p><strong>Final Calculation:</strong> (100000 * ${step6}) + (10000 * ${step5}) + (1000 * ${step4}) + (100 * ${step3}) + (10 * ${step2}) + (${step1})= ${result}</p>
            </div>
            <p><strong>Result:</strong> ${result}</p>
        `;
        document.getElementById('result').innerHTML = `Result: <strong>${result}</strong>`;
        document.getElementById('steps').innerHTML = steps;
    
        // Speak the steps
        speak(`Rule 9. Step 1: Subtract unit place digit from 10: 10 minus ${c} equals to ${step1}(Unit Place). Step 2: Substract 9 to hundred place digit and subtract hundreds place digit: 9 minus ${a} equals to ${step3} (Hundred Place). Step 4: Substract 1 to unit place digit:${c} minus 1 equals to ${step4} (thousand Place) .Step 5: Put tens place digit as it is: ${step5} (5th Place).Step 6:Put hundred place digit as it is: ${step6} (6th Place)  Final Calculation: 100000 multiplied by ${step6} plus 10000 multiplied by ${step5} plus 1000 multiplied by ${step4} plus 100 multiply by ${step3} plus 10 multiply by ${step2} plus ${step1} equals ${result}. Result: ${result}`);
    }
function exportSteps() {
    const stepsElement = document.getElementById('steps');
    const resultElement = document.getElementById('result');
    
    const content = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = 'Multiplication Steps';
    content.appendChild(h2);
   
    
    // Clone the nodes instead of using innerHTML
    content.appendChild(resultElement.cloneNode(true));
    content.appendChild(stepsElement.cloneNode(true));

    const opt = {
        margin: 10,
        filename: 'multiplication_steps.pdf',
        html2canvas: { 
            scale: 1,
            scrollY: 0,  // Important for capturing all content
            windowHeight: document.body.scrollHeight  // Capture full height
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait',color:'red' }
    };

    // html2pdf().set(opt).from(content).save();
    setTimeout(() => {
        html2pdf().set(opt).from(content).save();
    }, 1000);
}