// ==========================================
// Password Generator Tool
// ==========================================

function generatePassword() {
    const baseWord = document.getElementById('pwBaseWord').value.trim();
    const len = parseInt(document.getElementById('pwLen').value);
    let password = '';
    
    if (baseWord) {
        password = convertWordToPassword(baseWord, len);
    } else {
        let chars = '';
        if (document.getElementById('pwUpper').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (document.getElementById('pwLower').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (document.getElementById('pwNumbers').checked) chars += '0123456789';
        if (document.getElementById('pwSymbols').checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        if (!chars) return;
        
        for (let i = 0; i < len; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
    }
    
    document.getElementById('pwResult').textContent = password;
    analyzePasswordStrength(password);
}

function convertWordToPassword(word, targetLength) {
    const leetMap = {
        'a': '@', 'e': '3', 'i': '!', 'o': '0', 's': '$', 't': '7', 'l': '1'
    };
    
    let transformed = word;
    transformed = transformed.charAt(0).toUpperCase() + transformed.slice(1).toLowerCase();
    
    let result = '';
    for (let i = 0; i < transformed.length; i++) {
        const char = transformed[i];
        result += (i % 2 === 0 && leetMap[char.toLowerCase()]) ? leetMap[char.toLowerCase()] : char;
    }
    
    const year = new Date().getFullYear().toString();
    result += '#' + year.slice(-2);
    
    return result.slice(0, targetLength).padEnd(targetLength, '!');
}

function analyzePasswordStrength(password) {
    const strength = document.getElementById('pwStrength');
    const strengthText = document.getElementById('pwStrengthText');
    if (!strength || !strengthText) return;
    
    let score = 0;
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 20;
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^a-zA-Z0-9]/.test(password)) score += 15;
    
    strength.style.width = score + '%';
    let level = 'Weak';
    let color = 'var(--accent-danger)';
    if (score >= 50) level = 'Fair';
    if (score >= 75) { level = 'Strong'; color = 'var(--accent-success)'; }
    if (score >= 90) { level = 'Very Strong'; color = 'var(--accent-success)'; }
    
    strengthText.textContent = level;
    strength.style.background = color;
}

function initPasswordGen() {
    const btn = document.querySelector('button[onclick="generatePassword()"]');
    if (btn) {
        setTimeout(generatePassword, 100);
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordGen);
} else {
    initPasswordGen();
}
