// ==========================================
// Morse Code Tool
// ==========================================

const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
    '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
    '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
    '$': '...-..-', '@': '.--.-.'
};

const reverseMorse = {};
Object.keys(morseCode).forEach(char => {
    reverseMorse[morseCode[char]] = char;
});

function textToMorse() {
    const text = document.getElementById('morseInput').value.toUpperCase();
    let morse = '';
    for (const char of text) {
        if (char === ' ') {
            morse += ' / ';
        } else if (morseCode[char]) {
            morse += morseCode[char] + ' ';
        }
    }
    document.getElementById('morseResult').textContent = morse.trim();
}

function morseToText() {
    const morse = document.getElementById('morseInput').value.trim();
    const words = morse.split(' / ');
    let text = '';
    words.forEach(word => {
        const chars = word.split(' ');
        text += chars.map(code => reverseMorse[code] || '?').join('');
        text += ' ';
    });
    document.getElementById('morseResult').textContent = text.trim();
}

function initMorse() {
    const input = document.getElementById('morseInput');
    if (input) {
        input.addEventListener('input', textToMorse);
        setTimeout(textToMorse, 100);
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMorse);
} else {
    initMorse();
}
