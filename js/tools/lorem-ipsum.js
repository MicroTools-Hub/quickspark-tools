// ==========================================
// Lorem Ipsum Tool
// ==========================================

const loremSentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia."
];

function generateLorem() {
    const count = parseInt(document.getElementById('loremCount').value) || 3;
    const type = document.getElementById('loremType').value;
    let result = '';
    
    if (type === 'paragraphs') {
        for (let i = 0; i < count; i++) {
            let para = '';
            for (let j = 0; j < 4; j++) {
                para += loremSentences[Math.floor(Math.random() * loremSentences.length)] + ' ';
            }
            result += para.trim() + '\n\n';
        }
    } else if (type === 'sentences') {
        for (let i = 0; i < count; i++) {
            result += loremSentences[Math.floor(Math.random() * loremSentences.length)] + ' ';
        }
    } else {
        const words = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor".split(' ');
        for (let i = 0; i < count; i++) {
            result += words[Math.floor(Math.random() * words.length)] + ' ';
        }
    }
    document.getElementById('loremResult').textContent = result.trim();
}

function initLorem() {
    const btn = document.querySelector('button[onclick="generateLorem()"]');
    if (btn) {
        btn.addEventListener('click', generateLorem);
        setTimeout(generateLorem, 100);
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLorem);
} else {
    initLorem();
}
