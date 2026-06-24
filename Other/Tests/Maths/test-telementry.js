import { db } from '../../../../firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Data parameters isolated completely from presentation layer
const testData = {
    title: "Calculus: A Rank Complexity",
    meta: "Good Luck 🫡",
    questions: [
        { id: 1, q: "Find the derivative $f'(x)$ of $f(x) = x^3 + x^2 + x + 1$.", ans: "3x^2 + 2x + 1" },
        { id: 2, q: "Find the derivative $g'(x)$ of $g(x) = 4x^3 - 5x + 2$.", ans: "12x^2 - 5" },
        { id: 3, q: "Calculate the gradient of $f(x) = x^3$ at the point where $x = 2$.", ans: "12" },
        { id: 4, q: "At what value of $x$ is the gradient of $y = x^3$ equal to 27?", ans: "3 or -3" },
        { id: 5, q: "Find the derivative of $h(x) = \\frac{1}{3}x^3 - 4x^2$.", ans: "x^2 - 8x" },
        { id: 6, q: "Solve for $x$ if $f'(x) = 0$ for the function $f(x) = x^3 - 3x$.", ans: "x = 1 or x = -1" },
        { id: 7, q: "Find the y-coordinate of the local maximum of $f(x) = x^3 - 3x$.", ans: "2" },
        { id: 8, q: "How many stationary points does a standard cubic function $y = ax^3 + bx^2 + cx + d$ typically have?", ans: "At most 2" },
        { id: 9, q: "Determine the stationary points of $g(x) = x^3 - 12x + 5$.", ans: "x = 2 and x = -2" },
        { id: 10, q: "If a cubic graph has turning points at $x=0$ and $x=4$, what is the x-coordinate of its inflection point?", ans: "2" },
        { id: 11, q: "Find the second derivative $f''(x)$ of $f(x) = 2x^3 - 6x^2$.", ans: "12x - 12" },
        { id: 12, q: "Solve $f''(x) = 0$ for $f(x) = x^3 - 9x^2 + 24x$.", ans: "x = 3" },
        { id: 13, q: "On what interval is $y = x^3$ concave up?", ans: "x > 0" },
        { id: 14, q: "On what interval is $y = -x^3 + 6x^2$ concave down?", ans: "x > 2" },
        { id: 15, q: "What is the value of the second derivative at a point of inflection?", ans: "0" },
        { id: 16, q: "Find the y-intercept of $f(x) = 2x^3 - 5x^2 + 3x - 7$.", ans: "-7" },
        { id: 17, q: "Find the x-intercepts of $f(x) = x^3 - 4x$.", ans: "0, 2, -2" },
        { id: 18, q: "Find the x-intercepts of $g(x) = x^3 - x^2$.", ans: "0 and 1" },
        { id: 19, q: "If $(x-1)$ is a factor of $x^3 + kx^2 + x - 3$, find $k$.", ans: "1" },
        { id: 20, q: "Find the coordinates of the point where $y = x^3$ crosses the y-axis.", ans: "(0, 0)" },
        { id: 21, q: "Find the inflection point of $f(x) = x^3 - 6x^2 + 12x$.", ans: "(2, 8)" },
        { id: 22, q: "Find the equation of the tangent to $y = x^3$ at $x = 1$.", ans: "y = 3x - 2" },
        { id: 23, q: "If $f'(x) = 3x^2 - 6x$, for what values of $x$ is the function $f$ increasing?", ans: "x < 0 or x > 2" },
        { id: 24, q: "Determine the nature of the stationary point at $x=0$ for $y = x^3$.", ans: "Point of Inflection (Stationary)" },
        { id: 25, q: "A cubic graph has turning points at $(-1, 4)$ and $(3, -28)$. Find the y-coordinate of its inflection point.", ans: "-12" }
    ]
};

function loadTest() {
    document.getElementById('test-title').innerText = testData.title;
    const container = document.getElementById('questions-container');
    
    testData.questions.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
            <div class="q-text"><strong>Q${index + 1}:</strong> ${item.q}</div>
            <input type="text" placeholder="Type your answer here..." id="ans-${item.id}">
        `;
        container.appendChild(card);
    });
    MathJax.typesetPromise();
}

window.closeSystemMsg = function() {
    const overlay = document.getElementById('system-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 500);
}

function showSystemMsg(title, body) {
    const savedName = localStorage.getItem('playerName') || "Candidate";
    const overlay = document.getElementById('system-overlay');
    document.getElementById('msg-title').innerText = title;
    document.getElementById('msg-body').innerText = `Salutations, ${savedName}. ${body}`;
    
    overlay.style.display = 'flex';
    setTimeout(() => { overlay.style.opacity = '1'; }, 10);
}

async function submitTest() {
    let score = 0;
    const total = testData.questions.length;
    let incorrectNodes = [];
    const playerName = localStorage.getItem('playerName') || "Unknown Player";
    
    testData.questions.forEach((item, index) => {
        const inputField = document.getElementById(`ans-${item.id}`);
        const userValue = inputField.value.trim().toLowerCase();
        const correctValue = item.ans.toLowerCase();
        
        if (userValue === correctValue) {
            score++;
            inputField.style.borderColor = "#2ecc71";
            inputField.style.backgroundColor = "rgba(46, 204, 113, 0.1)";
        } else {
            incorrectNodes.push(index + 1);
            inputField.style.borderColor = "#e74c3c";
            inputField.style.backgroundColor = "rgba(231, 76, 60, 0.1)";
            inputField.placeholder = `Correct: ${item.ans}`;
        }
        inputField.disabled = true;
    });
    
    document.getElementById('result-score').style.display = "block";
    document.getElementById('score-value').innerText = score;
    document.getElementById('total-value').innerText = total;
    
    const percentage = (score / total) * 100;

    try {
        console.log("Syncing performance metrics to the system mainframe...");
        await addDoc(collection(db, "test_results"), {
            player: playerName,
            testTitle: testData.title,
            finalScore: `${score}/${total}`,
            gradePercentage: percentage.toFixed(1) + "%",
            missedQuestions: incorrectNodes,
            submittedAt: new Date().toISOString()
        });
        console.log("Telemetry link established. Results recorded securely.");
    } catch (error) {
        console.error("Mainframe data transmission failed:", error);
    }
    
    if (percentage >= 80) {
        showSystemMsg("Sync Complete", "Distinction Level achieved. The core logic is flawless. Your system status has ascended.");
    } else if (percentage >= 50) {
        showSystemMsg("System Warning", "Analysis passed, but internal friction detected. Perfect your calculation vectors to avoid drop-off.");
    } else {
        showSystemMsg("Critical Error", "Logic failure in the assessment phase. Reboot your calculations and attempt execution again.");
    }
}

window.onload = () => {
    loadTest();
    const name = localStorage.getItem('playerName') || "User";
    document.getElementById('test-meta').innerText = `Subject: Mathematics | Grade 12 | Active Session: ${name}`;
};

document.getElementById('submit-btn').addEventListener('click', submitTest);
