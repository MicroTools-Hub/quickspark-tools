// ==========================================
// Text to Speech Tool
// ==========================================

function initTTS() {
    const select = document.getElementById('ttsVoice');
    const rate = document.getElementById('ttsRate');
    
    function loadVoices() {
        const voices = speechSynthesis.getVoices();
        select.innerHTML = '<option value="">Default</option>';
        voices.forEach(v => {
            select.innerHTML += `<option value="${v.name}">${v.name} (${v.lang})</option>`;
        });
    }
    
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    
    if (rate) {
        rate.oninput = () => {
            const valSpan = document.getElementById('ttsRateVal');
            if (valSpan) valSpan.textContent = rate.value;
        };
    }
}

function speakText() {
    const text = document.getElementById('ttsInput').value;
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(document.getElementById('ttsRate').value);
    const voiceName = document.getElementById('ttsVoice').value;
    if (voiceName) {
        utterance.voice = speechSynthesis.getVoices().find(v => v.name === voiceName);
    }
    const statusEl = document.getElementById('ttsStatus');
    if (statusEl) {
        utterance.onstart = () => statusEl.textContent = 'Speaking...';
        utterance.onend = () => statusEl.textContent = 'Finished';
    }
    speechSynthesis.speak(utterance);
}

function pauseText() {
    const statusEl = document.getElementById('ttsStatus');
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
        if (statusEl) statusEl.textContent = 'Speaking...';
    } else {
        speechSynthesis.pause();
        if (statusEl) statusEl.textContent = 'Paused';
    }
}

function stopText() {
    speechSynthesis.cancel();
    const statusEl = document.getElementById('ttsStatus');
    if (statusEl) statusEl.textContent = 'Stopped';
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTTS);
} else {
    initTTS();
}
