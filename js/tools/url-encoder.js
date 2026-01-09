// ==========================================
// URL Encoder/Decoder Tool
// ==========================================

function encodeUrl() {
    document.getElementById('urlResult').textContent = encodeURIComponent(document.getElementById('urlInput').value);
}

function decodeUrl() {
    try {
        document.getElementById('urlResult').textContent = decodeURIComponent(document.getElementById('urlInput').value);
    } catch(e) {
        document.getElementById('urlResult').textContent = 'Invalid encoded URL';
    }
}

function initUrlEncoder() {
    const input = document.getElementById('urlInput');
    if (input) {
        input.addEventListener('input', encodeUrl);
        setTimeout(encodeUrl, 100);
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUrlEncoder);
} else {
    initUrlEncoder();
}
