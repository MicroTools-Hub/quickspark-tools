// ==========================================
// Count Specific Word Tool
// ==========================================

function countSpecificWord() {
    const text = document.getElementById('cwInput').value;
    const word = document.getElementById('cwWord').value;
    const caseSensitive = document.getElementById('cwCase').checked;
    if (!word) return;
    const regex = new RegExp(`\\b${word}\\b`, caseSensitive ? 'g' : 'gi');
    const count = (text.match(regex) || []).length;
    document.getElementById('cwResult').textContent = `"${word}" appears ${count} time(s)`;
}

function initCountWord() {
    const inputs = [document.getElementById('cwInput'), document.getElementById('cwWord')];
    const checkbox = document.getElementById('cwCase');
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', countSpecificWord);
        }
    });
    if (checkbox) {
        checkbox.addEventListener('change', countSpecificWord);
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountWord);
} else {
    initCountWord();
}
