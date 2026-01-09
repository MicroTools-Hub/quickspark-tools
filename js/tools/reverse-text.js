// ==========================================
// Reverse Text Tool
// ==========================================

function reverseText() {
    const text = document.getElementById('revInput').value;
    document.getElementById('revResult').textContent = text.split('').reverse().join('');
}

function initReverseText() {
    const input = document.getElementById('revInput');
    if (input) {
        input.addEventListener('input', reverseText);
        setTimeout(reverseText, 100);
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReverseText);
} else {
    initReverseText();
}
