// ==========================================
// Case Converter Tool
// ==========================================

function convertCase(type) {
    const text = document.getElementById('caseInput').value;
    let result = '';
    const words = text.split(/[\s\-_]+/);
    
    switch(type) {
        case 'upper':
            result = text.toUpperCase();
            break;
        case 'lower':
            result = text.toLowerCase();
            break;
        case 'title':
            result = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            break;
        case 'sentence':
            result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
            break;
        case 'camel':
            result = words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
            break;
        case 'snake':
            result = words.map(w => w.toLowerCase()).join('_');
            break;
        case 'kebab':
            result = words.map(w => w.toLowerCase()).join('-');
            break;
        case 'pascal':
            result = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
            break;
        case 'constant':
            result = words.map(w => w.toUpperCase()).join('_');
            break;
        case 'slug':
            result = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
            break;
    }
    document.getElementById('caseResult').textContent = result;
}

function initCaseConverter() {
    const input = document.getElementById('caseInput');
    if (input) {
        input.addEventListener('input', () => {
            const buttons = document.querySelectorAll('[data-case-type]');
            if (buttons.length > 0) {
                const type = buttons[0].getAttribute('data-case-type');
                convertCase(type);
            }
        });
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCaseConverter);
} else {
    initCaseConverter();
}
