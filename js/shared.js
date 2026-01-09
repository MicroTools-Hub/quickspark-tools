// ==========================================
// Shared JavaScript for MicroTools MPA
// ==========================================

// Tools Definition Array
const tools = [
    { id: 'wordCounter', name: 'Word Counter', desc: 'Analyze your text with comprehensive statistics including word count, character count, and reading time.\nGet insights like average word length, readability scores, and top keywords from your content.', icon: 'fa-file-word', category: 'text' },
    { id: 'quoteGen', name: 'Quote Generator', desc: 'Discover inspirational and motivational quotes across multiple categories.\nGet a fresh source of inspiration for your day with just one click.', icon: 'fa-quote-right', category: 'quote' },
    { id: 'passwordGen', name: 'Password Generator', desc: 'Create strong and secure random passwords with customizable length and character types.\nEnsure your accounts stay protected with complex password generation.', icon: 'fa-key', category: 'random' },
    { id: 'charCounter', name: 'Character Counter', desc: 'Count total characters, characters without spaces, and UTF-8 bytes in any text.\nCheck compatibility with social media platforms and character limits.', icon: 'fa-text-height', category: 'text' },
    { id: 'caseConverter', name: 'Case Converter', desc: 'Transform text between uppercase, lowercase, title case, and sentence case formats.\nQuickly change text formatting for different writing styles and purposes.', icon: 'fa-font', category: 'text' },
    { id: 'lineBreaks', name: 'Remove Line Breaks', desc: 'Eliminate unwanted line breaks and extra spaces from your text content.\nClean up formatted text for seamless readability and uniform spacing.', icon: 'fa-align-left', category: 'text' },
    { id: 'reverseText', name: 'Reverse Text', desc: 'Reverse the order of characters, words, or lines in your text instantly.\nUseful for checking palindromes, creating mirrored text, and text manipulation.', icon: 'fa-exchange-alt', category: 'text' },
    { id: 'loremIpsum', name: 'Lorem Ipsum', desc: 'Generate professional placeholder text for your design and mockup projects.\nCustomize the amount of text you need for layouts and wireframes.', icon: 'fa-paragraph', category: 'text' },
    { id: 'findReplace', name: 'Find & Replace', desc: 'Quickly locate and replace specific text throughout your entire content.\nSupports multiple replacements with case-sensitive options.', icon: 'fa-search', category: 'text' },
    { id: 'sortLines', name: 'Sort Lines', desc: 'Sort text lines alphabetically in ascending or descending order.\nAlso sort by line length, remove duplicates, or reverse the order.', icon: 'fa-sort-alpha-down', category: 'text' },
    { id: 'countWord', name: 'Count Specific Word', desc: 'Find and count the exact number of times a word appears in your text.\nView statistics with case-sensitive or case-insensitive options.', icon: 'fa-search-plus', category: 'text' },
    { id: 'textDiff', name: 'Text Diff', desc: 'Compare two texts side-by-side to identify additions, deletions, and changes.\nVisually highlight differences between document versions.', icon: 'fa-code-branch', category: 'text' },
    { id: 'textToSpeech', name: 'Text to Speech', desc: 'Convert written text into natural-sounding audio with multiple voice options.\nAdjust speech rate and pitch for personalized audio output.', icon: 'fa-volume-up', category: 'text' },
    { id: 'randomNumber', name: 'Random Number', desc: 'Generate random numbers within your specified range with full customization.\nIdeal for games, raffles, sampling, and statistical experiments.', icon: 'fa-dice', category: 'number' },
    { id: 'numberConverter', name: 'Number Converter', desc: 'Convert numbers between binary, decimal, octal, and hexadecimal number systems.\nSupports large numbers and displays results in all formats instantly.', icon: 'fa-calculator', category: 'number' },
    { id: 'colorConverter', name: 'Color Converter', desc: 'Convert colors between HEX, RGB, and HSL formats with live preview.\nPerfect for designers and developers working with web colors.', icon: 'fa-palette', category: 'color' },
    { id: 'gradientGenerator', name: 'Gradient Generator', desc: 'Create stunning CSS gradients with linear, radial, and conic gradient types.\nCustomize colors, angles, and export as CSS code for your projects.', icon: 'fa-fill-drip', category: 'color' },
    { id: 'urlEncoder', name: 'URL Encoder', desc: 'Encode and decode URLs to handle special characters and ensure compatibility.\nEssential for working with query parameters and URL manipulation.', icon: 'fa-link', category: 'code' },
    { id: 'morseCode', name: 'Morse Code', desc: 'Translate text to Morse code and decode Morse back to readable text.\nFun tool for communication, learning, and creative text encoding.', icon: 'fa-wifi', category: 'code' },
    { id: 'asciiArt', name: 'ASCII Art', desc: 'Transform regular text into creative ASCII art using various font styles.\nGenerate eye-catching text art for comments, signatures, and designs.', icon: 'fa-paint-brush', category: 'code' },
    { id: 'namePicker', name: 'Name Picker', desc: 'Pick a random name from your custom list with an exciting spinning wheel.\nGreat for games, drawings, classroom activities, and team selections.', icon: 'fa-random', category: 'random' }
];

// URL Slug Mapping (SEO-friendly kebab-case URLs)
const slugToId = {
    'word-counter': 'wordCounter',
    'quote-generator': 'quoteGen',
    'password-generator': 'passwordGen',
    'character-counter': 'charCounter',
    'case-converter': 'caseConverter',
    'remove-line-breaks': 'lineBreaks',
    'reverse-text': 'reverseText',
    'lorem-ipsum': 'loremIpsum',
    'find-replace': 'findReplace',
    'sort-lines': 'sortLines',
    'count-specific-words': 'countWord',
    'text-diff': 'textDiff',
    'text-to-speech': 'textToSpeech',
    'random-number': 'randomNumber',
    'number-converter': 'numberConverter',
    'color-converter': 'colorConverter',
    'gradient-generator': 'gradientGenerator',
    'url-encoder': 'urlEncoder',
    'morse-code': 'morseCode',
    'ascii-art': 'asciiArt',
    'name-picker': 'namePicker',
    'privacy-policy': 'privacy',
    'terms-of-service': 'terms',
    'contact': 'contact'
};

// Create reverse mapping for ID to slug
const idToSlug = {};
Object.keys(slugToId).forEach(slug => {
    idToSlug[slugToId[slug]] = slug;
});
// Add static pages
idToSlug['privacy'] = 'privacy-policy';
idToSlug['terms'] = 'terms-of-service';
idToSlug['contact'] = 'contact';

// ==========================================
// Helper Functions
// ==========================================

function getToolIdFromSlug(slug) {
    return slugToId[slug] || slug;
}

function getSlugFromToolId(toolId) {
    return idToSlug[toolId] || toolId;
}

function getToolById(toolId) {
    return tools.find(tool => tool.id === toolId);
}

// ==========================================
// Theme Toggle
// ==========================================

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const icon = document.querySelector('#themeBtn i');
    if (icon) {
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
    }
    // Persist theme preference
    localStorage.setItem('theme-mode', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    // Set initial icon
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('#themeBtn i');
    if (icon) {
        icon.className = document.body.classList.contains('light-mode') ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ==========================================
// Sidebar Navigation
// ==========================================

let sidebarOpen = true;

function initSidebar() {
    const sidebarTools = document.getElementById('sidebarTools');
    if (!sidebarTools) return;
    
    sidebarTools.innerHTML = '';

    const path = window.location.pathname || '';
    const isInTools = path.includes('/tools/');
    const isInPages = path.includes('/pages/');
    const basePrefix = (isInTools || isInPages) ? '../' : '';

    tools.forEach((tool, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `${basePrefix}tools/${getSlugFromToolId(tool.id)}.html`;
        a.textContent = tool.name;
        a.dataset.toolId = tool.id;
        
        // Check if this is the current page
        const currentPath = window.location.pathname.split('/').pop();
        const toolPath = `${getSlugFromToolId(tool.id)}.html`;
        if (currentPath === toolPath || currentPath === `tools/${toolPath}` || (currentPath === '' && tool.id === 'wordCounter')) {
            a.classList.add('active');
        }
        
        a.onkeydown = (e) => handleSidebarKeydown(e, index);
        li.appendChild(a);
        sidebarTools.appendChild(li);
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar) return;
    
    if (window.innerWidth > 768) {
        sidebarOpen = !sidebarOpen;
        document.body.classList.toggle('sidebar-open', sidebarOpen);
    } else {
        sidebar.classList.toggle('mobile-closed');
        sidebarOpen = !sidebar.classList.contains('mobile-closed');
        overlay.classList.toggle('visible', sidebarOpen);
    }
    updateSidebarToggleUI();
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar) return;
    
    if (window.innerWidth <= 768) {
        sidebar.classList.add('mobile-closed');
        overlay.classList.remove('visible');
        sidebarOpen = false;
    }
    updateSidebarToggleUI();
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar) return;
    
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-closed');
        overlay.classList.add('visible');
        sidebarOpen = true;
    }
    updateSidebarToggleUI();
}

function updateSidebarToggleUI() {
    const toggle = document.getElementById('hamburgerBtn');
    if (!toggle) return;
    const isMobile = window.innerWidth <= 768;
    toggle.setAttribute('aria-label', sidebarOpen ? 'Close tools menu' : 'Open tools menu');
    toggle.innerHTML = sidebarOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

function handleSidebarKeydown(e, index) {
    const buttons = document.querySelectorAll('.sidebar-tools a');
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % buttons.length;
        buttons[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + buttons.length) % buttons.length;
        buttons[prevIndex].focus();
    }
}

// ==========================================
// Sidebar Overlay Click Handler
// ==========================================

function initSidebarOverlay() {
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
}

// ==========================================
// Theme Button Event Listener
// ==========================================

function initThemeButton() {
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}

// ==========================================
// Hamburger Button Event Listener
// ==========================================

function initHamburgerButton() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleSidebar);
    }
}

// ==========================================
// Home Navigation
// ==========================================

function goHome() {
    window.location.href = '/';
}

// ==========================================
// Logo Click Handler
// ==========================================

function initLogoClick() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', goHome);
    }
}

// ==========================================
// Window Resize Handler
// ==========================================

function handleWindowResize() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    if (window.innerWidth > 768) {
        // Desktop: show sidebar
        sidebar.classList.remove('mobile-closed');
        document.body.classList.add('sidebar-open');
        document.getElementById('sidebarOverlay').classList.remove('visible');
        sidebarOpen = true;
    } else {
        // Mobile: hide sidebar by default
        sidebar.classList.add('mobile-closed');
        document.body.classList.remove('sidebar-open');
        sidebarOpen = false;
    }
    updateSidebarToggleUI();
}

// ==========================================
// Notification System
// ==========================================

function showNotification(message, duration = 2000) {
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// ==========================================
// Utility Functions
// ==========================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(() => {
        showNotification('Failed to copy');
    });
}

function downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showNotification(`${filename} downloaded!`);
}

// ==========================================
// Page Initialization
// ==========================================

function initPage() {
    // Initialize theme
    initTheme();
    
    // Initialize sidebar
    initSidebar();
    
    // Initialize event listeners
    initThemeButton();
    initHamburgerButton();
    initSidebarOverlay();
    initLogoClick();
    
    // Handle window resize
    window.addEventListener('resize', handleWindowResize);
    
    // Initial sidebar setup based on screen size
    handleWindowResize();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
