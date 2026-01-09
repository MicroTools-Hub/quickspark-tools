// ==========================================
// Text Diff Tool
// ==========================================

function compareDiff() {
    const original = document.getElementById('diffOriginal').value;
    const changed = document.getElementById('diffChanged').value;
    if (original === changed) {
        document.getElementById('diffResult').innerHTML = '<span style="color: var(--accent-success)">Texts are identical</span>';
        return;
    }
    document.getElementById('diffResult').innerHTML = `
        <div class="diff-grid" style="margin-top: 0.5rem;">
            <div class="diff-removed" style="color: var(--accent-danger);">- ${original.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            <div class="diff-added" style="color: var(--accent-success);">+ ${changed.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        </div>
    `;
}

function initTextDiff() {
    const inputs = [document.getElementById('diffOriginal'), document.getElementById('diffChanged')];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', compareDiff);
        }
    });
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTextDiff);
} else {
    initTextDiff();
}
