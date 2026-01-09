// ==========================================
// Word Counter Tool
// ==========================================

function initWordCounter() {
    const input = document.getElementById('wcInput');
    if (input) {
        input.addEventListener('input', countWords);
        // Initial count
        setTimeout(countWords, 100);
    }
}

function countWords() {
    const text = document.getElementById('wcInput').value;
    const wpm = parseInt(document.getElementById('wcWPM').value) || 50;
    
    // Basic stats
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const normalized = text.replace(/[.!?]+/g, '.');
    const sentences = (normalized.match(/\./g) || []).length;
    
    // Advanced stats
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const avgWordLen = words > 0 ? (charsNoSpaces / words).toFixed(1) : 0;
    const readingTime = Math.ceil(words / wpm);
    const speakingTime = Math.ceil(words / 150); // Average speaking speed ~150 WPM
    
    // Calculate Flesch-Kincaid readability grade
    const syllables = countSyllables(text);
    const readabilityGrade = (0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59).toFixed(1);
    
    // Extract keywords (top 5)
    const keywords = extractKeywords(text, 5);
    
    // Update UI
    document.getElementById('wcResult').textContent = `Words: ${words} | Characters: ${chars} | Sentences: ${sentences} | Paragraphs: ${paragraphs}`;
    document.getElementById('wcReadingTime').textContent = readingTime + ' min';
    document.getElementById('wcSpeakingTime').textContent = speakingTime + ' min';
    document.getElementById('wcAvgWordLen').textContent = avgWordLen;
    document.getElementById('wcReadability').textContent = readabilityGrade + ' (grade)';
    
    if (keywords.length > 0) {
        let keywordHtml = keywords.map(k => 
            `<div style="margin: 0.5rem 0;"><strong>${k.word}</strong> (${k.count}) - ${k.percent.toFixed(1)}%</div>`
        ).join('');
        document.getElementById('wcKeywords').innerHTML = keywordHtml;
    } else {
        document.getElementById('wcKeywords').textContent = 'No keywords yet';
    }
}

function countSyllables(text) {
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    let syllableCount = 0;
    words.forEach(word => {
        let count = 0;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const vowels = word.match(/[aeiouy]{1,2}/g);
        if (vowels) syllableCount += vowels.length;
    });
    return Math.max(1, syllableCount);
}

function extractKeywords(text, limit) {
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how']);
    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const wordCount = {};
    words.forEach(word => {
        if (!stopWords.has(word)) {
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    });
    const totalWords = Object.values(wordCount).reduce((a, b) => a + b, 0);
    return Object.entries(wordCount)
        .map(([word, count]) => ({ word, count, percent: (count / totalWords) * 100 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
}

function removeExtraSpaces() {
    const textarea = document.getElementById('wcInput');
    textarea.value = textarea.value.replace(/\s+/g, ' ').trim();
    countWords();
}

function fixCapitalization() {
    const textarea = document.getElementById('wcInput');
    let text = textarea.value;
    // Capitalize first letter of sentences
    text = text.replace(/(^|\.\s+|!\s+|\?\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
    textarea.value = text;
    countWords();
}

function removeHTMLTags() {
    const textarea = document.getElementById('wcInput');
    textarea.value = textarea.value.replace(/<[^>]*>/g, '');
    countWords();
}

function clearWCText() {
    document.getElementById('wcInput').value = '';
    countWords();
}

function copyWCStats() {
    const basic = document.getElementById('wcResult').textContent;
    const advanced = document.getElementById('wcAdvanced').innerText;
    const keywords = document.getElementById('wcKeywords').innerText;
    const fullStats = basic + '\n\n' + advanced + '\n\n' + keywords;
    copyToClipboard(fullStats);
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWordCounter);
} else {
    initWordCounter();
}
