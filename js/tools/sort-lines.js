// ==========================================
// Sort Lines Tool
// ==========================================

function sortLines(type) {
    const lines = document.getElementById('sortInput').value.split('\n').filter(l => l.trim());
    let sorted;
    switch(type) {
        case 'az': sorted = lines.sort(); break;
        case 'za': sorted = lines.sort().reverse(); break;
        case 'short': sorted = lines.sort((a, b) => a.length - b.length); break;
        case 'long': sorted = lines.sort((a, b) => b.length - a.length); break;
        case 'reverse': sorted = lines.reverse(); break;
    }
    document.getElementById('sortResult').textContent = sorted.join('\n');
}

function initSortLines() {
    const input = document.getElementById('sortInput');
    if (input) {
        input.addEventListener('input', () => {
            if (document.getElementById('sortResult').textContent) {
                sortLines('az');
            }
        });
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSortLines);
} else {
    initSortLines();
}
