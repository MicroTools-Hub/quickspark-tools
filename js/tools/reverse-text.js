// ==========================================
// Reverse Text Tool
// ==========================================

let reverseMode = 'characters';

function setReverseMode(mode) {
    reverseMode = mode;
    // Update active button states
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.mode-btn[data-mode="${mode}"]`).classList.add('active');
    reverseText();
}

function reverseText() {
    const text = document.getElementById('revInput').value;
    let result = '';
    
    if (!text) {
        document.getElementById('revResult').textContent = '';
        return;
    }
    
    switch(reverseMode) {
        case 'characters':
            // Reverse all characters
            result = text.split('').reverse().join('');
            break;
        
        case 'words':
            // Reverse word order, keep words intact
            result = text.split(/\s+/).reverse().join(' ');
            break;
        
        case 'lines':
            // Reverse line order
            result = text.split('\n').reverse().join('\n');
            break;
    }
    
    document.getElementById('revResult').textContent = result;
}

function clearReverseText() {
    document.getElementById('revInput').value = '';
    document.getElementById('revResult').textContent = '';
}

function copyReversedText() {
    const result = document.getElementById('revResult').textContent;
    if (result) {
        copyToClipboard(result);
    }
}

function initReverseText() {
    const input = document.getElementById('revInput');
    if (input) {
        input.addEventListener('input', reverseText);
        setTimeout(reverseText, 100);
    }
    
    // Set default active mode
    const defaultBtn = document.querySelector('.mode-btn[data-mode="characters"]');
    if (defaultBtn) defaultBtn.classList.add('active');
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReverseText);
} else {
    initReverseText();
}
