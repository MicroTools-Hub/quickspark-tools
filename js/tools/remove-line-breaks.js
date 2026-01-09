// ==========================================
// Remove Line Breaks Tool
// ==========================================

function removeLineBreaks() {
    const text = document.getElementById('lbInput').value;
    document.getElementById('lbResult').textContent = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function initLineBreaks() {
    const input = document.getElementById('lbInput');
    if (input) {
        input.addEventListener('input', removeLineBreaks);
        setTimeout(removeLineBreaks, 100);
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLineBreaks);
} else {
    initLineBreaks();
}
