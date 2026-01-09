// ==========================================
// Quote Generator Tool
// ==========================================

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" }
];

function generateQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteText').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = `— ${quote.author}`;
}

function copyQuote() {
    const text = document.getElementById('quoteText').textContent;
    const author = document.getElementById('quoteAuthor').textContent;
    copyToClipboard(`${text} ${author}`);
}

function shareQuote() {
    const text = document.getElementById('quoteText').textContent;
    const author = document.getElementById('quoteAuthor').textContent;
    const shareText = `${text} ${author}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Great Quote',
            text: shareText
        });
    } else {
        copyToClipboard(shareText);
        showNotification('Quote copied to clipboard');
    }
}

function initQuoteGen() {
    setTimeout(generateQuote, 100);
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuoteGen);
} else {
    initQuoteGen();
}
