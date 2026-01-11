// ==========================================
// Text to Speech Tool - Enhanced
// ==========================================

let allVoices = [];
let selectedVoice = null;
let currentUtterance = null;

function initTTS() {
    const select = document.getElementById('ttsVoice');
    const rate = document.getElementById('ttsRate');
    const pitch = document.getElementById('ttsPitch');
    const volume = document.getElementById('ttsVolume');
    
    function loadVoices() {
        allVoices = speechSynthesis.getVoices();
        populateVoiceSelect();
        updateVoiceCount();
    }
    
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    
    // Update value displays
    if (rate) {
        rate.oninput = () => {
            const valSpan = document.getElementById('ttsRateVal');
            if (valSpan) valSpan.textContent = rate.value + 'x';
        };
    }
    
    if (pitch) {
        pitch.oninput = () => {
            const valSpan = document.getElementById('ttsPitchVal');
            if (valSpan) valSpan.textContent = pitch.value;
        };
    }
    
    if (volume) {
        volume.oninput = () => {
            const valSpan = document.getElementById('ttsVolumeVal');
            if (valSpan) valSpan.textContent = Math.round(volume.value * 100) + '%';
        };
    }
}

function populateVoiceSelect() {
    const select = document.getElementById('ttsVoice');
    const filter = document.getElementById('ttsFilter')?.value.toLowerCase() || '';
    const langFilter = document.getElementById('ttsLangFilter')?.value || 'all';
    
    // Group voices by language
    const voicesByLang = {};
    allVoices.forEach((voice, index) => {
        const lang = voice.lang.split('-')[0]; // Get base language (e.g., 'en' from 'en-US')
        const matchesFilter = voice.name.toLowerCase().includes(filter) || voice.lang.toLowerCase().includes(filter);
        const matchesLang = langFilter === 'all' || lang === langFilter;
        
        if (matchesFilter && matchesLang) {
            if (!voicesByLang[voice.lang]) {
                voicesByLang[voice.lang] = [];
            }
            voicesByLang[voice.lang].push({ voice, index });
        }
    });
    
    // Build select options
    select.innerHTML = '<option value=\"\">🌐 Default Voice</option>';
    
    const sortedLangs = Object.keys(voicesByLang).sort();
    sortedLangs.forEach(lang => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = getLanguageName(lang);
        
        voicesByLang[lang].forEach(({ voice, index }) => {
            const option = document.createElement('option');
            option.value = index;
            const genderEmoji = voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman') ? '👩' : 
                               voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man') ? '👨' : '🗣️';
            option.textContent = `${genderEmoji} ${voice.name}`;
            if (voice.localService) option.textContent += ' ⚡';
            optgroup.appendChild(option);
        });
        
        select.appendChild(optgroup);
    });
}

function getLanguageName(code) {
    const langNames = {
        'en': '🇺🇸 English',
        'es': '🇪🇸 Spanish',
        'fr': '🇫🇷 French',
        'de': '🇩🇪 German',
        'it': '🇮🇹 Italian',
        'pt': '🇵🇹 Portuguese',
        'ru': '🇷🇺 Russian',
        'ja': '🇯🇵 Japanese',
        'ko': '🇰🇷 Korean',
        'zh': '🇨🇳 Chinese',
        'ar': '🇸🇦 Arabic',
        'hi': '🇮🇳 Hindi',
        'nl': '🇳🇱 Dutch',
        'pl': '🇵🇱 Polish',
        'tr': '🇹🇷 Turkish',
        'sv': '🇸🇪 Swedish',
        'da': '🇩🇰 Danish',
        'no': '🇳🇴 Norwegian',
        'fi': '🇫🇮 Finnish',
        'el': '🇬🇷 Greek',
        'cs': '🇨🇿 Czech',
        'hu': '🇭🇺 Hungarian',
        'ro': '🇷🇴 Romanian',
        'th': '🇹🇭 Thai',
        'vi': '🇻🇳 Vietnamese',
        'id': '🇮🇩 Indonesian',
        'uk': '🇺🇦 Ukrainian',
        'he': '🇮🇱 Hebrew'
    };
    
    const baseLang = code.split('-')[0];
    return langNames[baseLang] || `🌍 ${code}`;
}

function updateVoiceCount() {
    const countEl = document.getElementById('voiceCount');
    if (countEl) {
        const uniqueLangs = new Set(allVoices.map(v => v.lang.split('-')[0])).size;
        countEl.textContent = `${allVoices.length} voices available (${uniqueLangs} languages)`;
    }
}

function filterVoices() {
    populateVoiceSelect();
}

function speakText() {
    const text = document.getElementById('ttsInput').value;
    if (!text) {
        showNotification('Please enter some text to speak');
        return;
    }
    
    // Stop any ongoing speech
    speechSynthesis.cancel();
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.rate = parseFloat(document.getElementById('ttsRate').value);
    currentUtterance.pitch = parseFloat(document.getElementById('ttsPitch').value);
    currentUtterance.volume = parseFloat(document.getElementById('ttsVolume').value);
    
    const voiceIndex = document.getElementById('ttsVoice').value;
    if (voiceIndex !== '') {
        currentUtterance.voice = allVoices[parseInt(voiceIndex)];
    }
    
    const statusEl = document.getElementById('ttsStatus');
    const progressBar = document.getElementById('ttsProgress');
    
    currentUtterance.onstart = () => {
        if (statusEl) statusEl.innerHTML = '<i class=\"fas fa-volume-up\"></i> Speaking...';
        updatePlayButton(true);
    };
    
    currentUtterance.onend = () => {
        if (statusEl) statusEl.innerHTML = '<i class=\"fas fa-check-circle\"></i> Finished';
        if (progressBar) progressBar.style.width = '100%';
        updatePlayButton(false);
        setTimeout(() => {
            if (progressBar) progressBar.style.width = '0%';
        }, 1000);
    };
    
    currentUtterance.onerror = (e) => {
        if (statusEl) statusEl.innerHTML = '<i class=\"fas fa-exclamation-circle\"></i> Error: ' + e.error;
        updatePlayButton(false);
    };
    
    currentUtterance.onpause = () => {
        if (statusEl) statusEl.innerHTML = '<i class=\"fas fa-pause-circle\"></i> Paused';
    };
    
    currentUtterance.onresume = () => {
        if (statusEl) statusEl.innerHTML = '<i class=\"fas fa-volume-up\"></i> Speaking...';
    };
    
    // Estimate progress (approximate)
    const words = text.split(/\\s+/).length;
    const estimatedDuration = (words / (currentUtterance.rate * 150)) * 1000; // Rough estimate
    let startTime = Date.now();
    
    const progressInterval = setInterval(() => {
        if (!speechSynthesis.speaking) {
            clearInterval(progressInterval);
            return;
        }
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / estimatedDuration) * 100, 98);
        if (progressBar) progressBar.style.width = progress + '%';
    }, 100);
    
    speechSynthesis.speak(currentUtterance);
}

function pauseText() {
    if (speechSynthesis.speaking) {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        } else {
            speechSynthesis.pause();
        }
    }
}

function stopText() {
    speechSynthesis.cancel();
    const statusEl = document.getElementById('ttsStatus');
    const progressBar = document.getElementById('ttsProgress');
    if (statusEl) statusEl.innerHTML = '<i class=\"fas fa-stop-circle\"></i> Stopped';
    if (progressBar) progressBar.style.width = '0%';
    updatePlayButton(false);
}

function updatePlayButton(isSpeaking) {
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        if (isSpeaking) {
            playBtn.innerHTML = '<i class=\"fas fa-volume-up\"></i> Speaking';
            playBtn.disabled = true;
        } else {
            playBtn.innerHTML = '<i class=\"fas fa-play\"></i> Speak';
            playBtn.disabled = false;
        }
    }
}

function downloadAudio() {
    showNotification('Audio download requires server-side text-to-speech API. Currently using browser speech synthesis.');
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTTS);
} else {
    initTTS();
}
