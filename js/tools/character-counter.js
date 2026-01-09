// ==========================================
// Character Counter Tool
// ==========================================

function initCharCounter() {
    const input = document.getElementById('ccInput');
    if (input) {
        input.addEventListener('input', countChars);
        setTimeout(countChars, 100);
    }
}

function countChars() {
    const text = document.getElementById('ccInput').value;
    const chars = text.length;
    const noSpaces = text.replace(/\s/g, '').length;
    const utf8Bytes = new TextEncoder().encode(text).length;
    
    document.getElementById('ccResult').textContent = `Characters: ${chars} | Without spaces: ${noSpaces} | UTF-8 bytes: ${utf8Bytes}`;
    
    // Social media limits
    updateSocialLimit('Twitter', 280, chars);
    updateSocialLimit('InstaBio', 150, chars);
    updateSocialLimit('SMS', 160, chars);
}

function updateSocialLimit(platform, limit, charCount) {
    const remaining = limit - charCount;
    document.getElementById('cc' + platform).textContent = `${charCount}/${limit}`;
    const statusEl = document.getElementById('cc' + platform + 'Status');
    if (statusEl) {
        statusEl.textContent = remaining >= 0 ? '✓' : '✗';
        statusEl.style.color = remaining >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)';
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharCounter);
} else {
    initCharCounter();
}
