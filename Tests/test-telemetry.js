// Import the active database instance from your central configuration file
import { db } from '../core/firebase-config.js';
// Import the official Firestore tools directly from the CDN matching your configuration
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Central Processing Engine - Dynamic Component Routing
let testData;

// Dictionary mapping Template IDs to their respective UI generators
const TemplateMux = {
    "SINGLE_INPUT": (q) => buildInputs(q.inputs || ["Answer"], q.id),
    "MULTI_INPUT": (q) => buildInputs(q.inputs, q.id),
    "RANGE_INPUT": (q) => buildInputs(q.inputs || ["Value"], q.id),
    "OR_FACTOR": (q) => buildInputs(q.inputs || ["Value"], q.id),
    "DIAGRAM": (q) => buildInputs(q.inputs || ["Answer"], q.id),
    "TIP_BOX": (q) => buildInputs(q.inputs || ["Answer"], q.id),
    "MULTIPART": (q) => buildMultipart(q.subquestions, q.id)
};

// DYNAMICALLY FETCH DATA CORE BASED ON QUERY PARAMETER
async function loadTestDataModule() {
    const urlParams = new URLSearchParams(window.location.search);
    const testFile = urlParams.get('test') || 'math-t170426'; // Fallback to current file name
    
    try {
        // Dynamic compilation execution bypasses static MIME lock restrictions
        const module = await import(`./Maths/${testFile}.js`);
        testData = module.testData;
        
        // Execute structural rendering
        loadTest();
    } catch (error) {
        console.error(`Failed to load data node [${testFile}.js]:`, error);
        document.getElementById('test-title').innerText = "System Error: Node Block Missing";
    }
}

function initializeTheme() {
    const metaText = testData.meta;
    let themeColor = "#00d4ff";
    const rankColors = { 'sss': '#ff0000', 'ss': '#ffaa00', 's': '#f8d7da', 'a': '#ffe5d0' };
    const rankMatch = metaText.match(/Rank\s*:\s*([a-z]+)/i);
    let updatedMetaHTML = metaText;

    if (rankMatch && rankMatch[1]) {
        const targetRank = rankMatch[1].toLowerCase();
        if (rankColors[targetRank]) {
            themeColor = rankColors[targetRank];
            updatedMetaHTML = metaText.replace(
                rankMatch[0], 
                `<span style="color: ${themeColor}; font-weight: bold; text-shadow: 0 0 10px ${themeColor}40">${rankMatch[0]}</span>`
            );
        }
    }

    document.documentElement.style.setProperty('--accent-theme', themeColor);
    document.getElementById('test-title').innerText = testData.title;
    
    const name = localStorage.getItem('playerName') || "Candidate";
    document.getElementById('test-meta').innerHTML = `${updatedMetaHTML} | Active: ${name}`;
}

function buildInputs(labelsArray, questionId, subId = null) {
    let html = '';
    labelsArray.forEach((label, index) => {
        const uniqueId = subId ? `ans-${questionId}-${subId}-${index}` : `ans-${questionId}-${index}`;
        html += `
            <div class="input-group">
                <label class="input-label">${label}</label>
                <input type="text" id="${uniqueId}" class="input-field" placeholder="Enter calculated response...">
            </div>
        `;
    });
    return html;
}

function buildMultipart(subquestions, parentId) {
    let html = '<div class="multipart-box">';
    subquestions.forEach((sub) => {
        const subInputs = buildInputs(sub.inputs, parentId, sub.subId);
        html += `
            <div class="sub-q-card">
                <div class="sub-q-text"><strong>${sub.subId}:</strong> ${sub.q}</div>
                ${subInputs}
                <button id="sol-btn-${parentId}-${sub.subId}" class="toggle-solution-btn">VIEW BREAKDOWN</button>
                <div id="drawer-${parentId}-${sub.subId}" class="correction-drawer">
                    <div class="correction-content">
                        <div class="correction-title">Sub-Node Analysis</div>
                        <div>${sub.solution || "No parameter instructions logged."}</div>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function loadTest() {
    initializeTheme();
    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    testData.questions.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';

        let tipHTML = item.tip ? `<div class="q-tip"><span>💡</span><div>${item.tip}</div></div>` : '';
        const generator = TemplateMux[item.templateId];
        const primaryInteractiveContent = generator ? generator(item) : '';

        let standardFooter = item.templateId !== "MULTIPART" ? `
            <button id="sol-btn-${item.id}" class="toggle-solution-btn">VIEW CORRECTION METHOD</button>
            <div id="drawer-${item.id}" class="correction-drawer">
                <div class="correction-content">
                    <div class="correction-title">Analysis & Methods</div>
                    <div>${item.solution || "No correction track loaded."}</div>
                </div>
            </div>` : '';

        card.innerHTML = `
            <div class="q-text"><strong>Q${index + 1}:</strong> ${item.q}</div>
            ${tipHTML}
            ${primaryInteractiveContent}
            ${standardFooter}
        `;
        container.appendChild(card);
    });

    bindDynamicEvents();
    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise();
}

function bindDynamicEvents() {
    document.querySelectorAll('.toggle-solution-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const combinedId = e.target.id.replace('sol-btn-', '');
            toggleSolution(combinedId);
        });
    });

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.onclick = submitTest;

    const closeMsgBtn = document.getElementById('close-msg-btn');
    if (closeMsgBtn) closeMsgBtn.onclick = closeSystemMsg;
}

function toggleSolution(combinedId) {
    const drawer = document.getElementById(`drawer-${combinedId}`);
    if (!drawer) return;
    if (drawer.style.maxHeight && drawer.style.maxHeight !== "0px") {
        drawer.style.maxHeight = "0px";
    } else {
        drawer.style.maxHeight = drawer.scrollHeight + "px";
    }
}

function validateAnswer(inputElement, correctAnswers) {
    const userAnswer = inputElement.value.trim().toLowerCase().replace(/\s+/g, '');
    if (Array.isArray(correctAnswers) && Array.isArray(correctAnswers[0])) {
        return correctAnswers[0].some(ans => ans.toString().toLowerCase().replace(/\s+/g, '') === userAnswer);
    }
    if (Array.isArray(correctAnswers)) {
        return correctAnswers.some(ans => ans.toString().toLowerCase().replace(/\s+/g, '') === userAnswer);
    }
    return correctAnswers.toString().toLowerCase().replace(/\s+/g, '') === userAnswer;
}

function gradeField(field, isCorrect) {
    field.disabled = true;
    if (isCorrect) {
        field.style.borderColor = "var(--success-green)";
        field.style.backgroundColor = "rgba(46, 204, 113, 0.05)";
    } else {
        field.style.borderColor = "var(--error-red)";
        field.style.backgroundColor = "rgba(231, 76, 60, 0.05)";
    }
}


























function submitTest() {
    let score = 0;
    let totalInputs = 0;

    testData.questions.forEach((item) => {
        if (item.templateId === "MULTIPART") {
            item.subquestions.forEach((sub) => {
                sub.inputs.forEach((label, i) => {
                    totalInputs++;
                    const inputField = document.getElementById(`ans-${item.id}-${sub.subId}-${i}`);
                    if (inputField) {
                        const isCorrect = validateAnswer(inputField, sub.ans[i]);
                        gradeField(inputField, isCorrect);
                        if (isCorrect) score++;
                    }
                });
                const solBtn = document.getElementById(`sol-btn-${item.id}-${sub.subId}`);
                if (solBtn) solBtn.style.display = "inline-block";
            });
        } else {
            item.inputs.forEach((label, i) => {
                totalInputs++;
                const inputField = document.getElementById(`ans-${item.id}-${i}`);
                if (inputField) {
                    const isCorrect = validateAnswer(inputField, item.ans[i]);
                    gradeField(inputField, isCorrect);
                    if (isCorrect) score++;
                }
            });
            const solBtn = document.getElementById(`sol-btn-${item.id}`);
            if (solBtn) solBtn.style.display = "inline-block";
        }
    });

    const scoreDisplay = document.getElementById('result-score');
    if (scoreDisplay) {
        scoreDisplay.style.display = "block";
        scoreDisplay.innerHTML = `SESSION ANALYSIS: SCORE <span>${score}</span> / <span>${totalInputs}</span>`;
    }

    // Trigger System Overlay Feedback Message
    const percentage = (score / totalInputs) * 100;
    
    // NEW: Fire the asynchronous cloud sync transmission sequence
    syncTelemetryToFirestore(score, totalInputs, percentage);

    if (percentage >= 80) {
        showSystemMsg("Sync Complete", "Distinction Level achieved. The core logic is flawless. Astra Academy data is fully optimized.");
    } else if (percentage >= 50) {
        showSystemMsg("System Warning", "Analysis passed, but interference detected. Review the nodes to reach peak performance.");
    } else {
        showSystemMsg("Critical Error", "Logic failure in the assessment phase. Reboot your study sequence and try again.");
    }
}

// NEW FUNCTION: Handles the background link to the Firestore collection
async function syncTelemetryToFirestore(score, totalInputs, percentage) {
    const urlParams = new URLSearchParams(window.location.search);
    const activeTestFile = urlParams.get('test') || 'math-t170426';
    const playerDesignation = localStorage.getItem('playerName') || "Candidate";
    
    try {
        console.log("Establishing node sync sequence with Firestore...");
        
        // Writes a brand new session log document inside a collection named "test_results"
        await addDoc(collection(db, "test_results"), {
            playerName: playerDesignation,
            testId: activeTestFile,
            score: score,
            total: totalInputs,
            percentage: parseFloat(percentage.toFixed(2)),
            completedAt: serverTimestamp() // Uses absolute cloud server time clocks
        });
        
        console.log("Telemetry matrix sync successful. Database entries securely saved to scaling-train-54894.");
    } catch (error) {
        console.error("Critical connection failure syncing to Firestore collection:", error);
    }
}






































function showSystemMsg(title, body) {
    const savedName = localStorage.getItem('playerName') || "Candidate";
    const overlay = document.getElementById('system-overlay');
    document.getElementById('msg-title').innerText = title;
    document.getElementById('msg-body').innerText = `Salutations, ${savedName}. ${body}`;
    overlay.style.display = 'flex';
    setTimeout(() => { overlay.style.opacity = '1'; }, 10);
}

function closeSystemMsg() {
    const overlay = document.getElementById('system-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 500);
}

window.onload = () => {
    loadTestDataModule();
};
