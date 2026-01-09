// ==========================================
// Random Number Tool
// ==========================================

function generateRandomNumber() {
    const min = parseInt(document.getElementById('rnMin').value) || 1;
    const max = parseInt(document.getElementById('rnMax').value) || 100;
    const count = parseInt(document.getElementById('rnCount').value) || 1;
    const numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    document.getElementById('rnResult').textContent = numbers.join(', ');
}

function initRandomNumber() {
    const btn = document.querySelector('button[onclick="generateRandomNumber()"]');
    if (btn) {
        btn.addEventListener('click', generateRandomNumber);
        setTimeout(generateRandomNumber, 100);
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRandomNumber);
} else {
    initRandomNumber();
}
