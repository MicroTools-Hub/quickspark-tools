// ==========================================
// Find & Replace Tool
// ==========================================

function findReplace() {
    const text = document.getElementById('frInput').value;
    const find = document.getElementById('frFind').value;
    const replace = document.getElementById('frReplace').value;
    if (!find) return;
    const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const count = (text.match(regex) || []).length;
    document.getElementById('frResult').innerHTML = text.replace(regex, replace) + `<br><small style="color: var(--text-muted)">Replaced ${count} occurrence(s)</small>`;
}

function initFindReplace() {
    const inputs = [document.getElementById('frInput'), document.getElementById('frFind'), document.getElementById('frReplace')];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', findReplace);
        }
    });
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFindReplace);
} else {
    initFindReplace();
}
