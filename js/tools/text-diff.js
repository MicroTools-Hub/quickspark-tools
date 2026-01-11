// ==========================================
// Text Diff Tool - Advanced Version
// ==========================================

let diffMode = 'line'; // 'line', 'word', or 'character'
let diffView = 'sidebyside'; // 'sidebyside' or 'inline'

function setDiffMode(mode) {
    diffMode = mode;
    document.querySelectorAll('.diff-mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.diff-mode-btn[data-mode="${mode}"]`).classList.add('active');
    compareDiff();
}

function setDiffView(view) {
    diffView = view;
    document.querySelectorAll('.diff-view-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.diff-view-btn[data-view="${view}"]`).classList.add('active');
    compareDiff();
}

function compareDiff() {
    const original = document.getElementById('diffOriginal').value;
    const changed = document.getElementById('diffChanged').value;
    
    if (original === changed) {
        document.getElementById('diffResult').innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--accent-success);"><i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i><div style="font-size: 1.2rem;">Texts are identical!</div></div>';
        updateDiffStats(0, 0, 0);
        return;
    }
    
    let diffResult;
    switch(diffMode) {
        case 'character':
            diffResult = characterDiff(original, changed);
            break;
        case 'word':
            diffResult = wordDiff(original, changed);
            break;
        case 'line':
        default:
            diffResult = lineDiff(original, changed);
            break;
    }
    
    displayDiff(diffResult);
}

function lineDiff(original, changed) {
    const originalLines = original.split('\n');
    const changedLines = changed.split('\n');
    const diff = [];
    const lcs = longestCommonSubsequence(originalLines, changedLines);
    
    let i = 0, j = 0;
    let additions = 0, deletions = 0, modifications = 0;
    
    while (i < originalLines.length || j < changedLines.length) {
        if (i < originalLines.length && j < changedLines.length && originalLines[i] === changedLines[j]) {
            diff.push({ type: 'equal', original: originalLines[i], changed: changedLines[j] });
            i++;
            j++;
        } else if (j < changedLines.length && !lcs.has(originalLines[i])) {
            diff.push({ type: 'removed', original: originalLines[i], changed: null });
            deletions++;
            i++;
        } else {
            diff.push({ type: 'added', original: null, changed: changedLines[j] });
            additions++;
            j++;
        }
    }
    
    updateDiffStats(additions, deletions, modifications);
    return diff;
}

function wordDiff(original, changed) {
    const originalWords = original.split(/\s+/);
    const changedWords = changed.split(/\s+/);
    const diff = [];
    const lcs = longestCommonSubsequence(originalWords, changedWords);
    
    let i = 0, j = 0;
    let additions = 0, deletions = 0;
    
    while (i < originalWords.length || j < changedWords.length) {
        if (i < originalWords.length && j < changedWords.length && originalWords[i] === changedWords[j]) {
            diff.push({ type: 'equal', original: originalWords[i], changed: changedWords[j] });
            i++;
            j++;
        } else if (i < originalWords.length && !lcs.has(originalWords[i])) {
            diff.push({ type: 'removed', original: originalWords[i], changed: null });
            deletions++;
            i++;
        } else {
            diff.push({ type: 'added', original: null, changed: changedWords[j] });
            additions++;
            j++;
        }
    }
    
    updateDiffStats(additions, deletions, 0);
    return diff;
}

function characterDiff(original, changed) {
    const diff = [];
    let additions = 0, deletions = 0;
    const maxLen = Math.max(original.length, changed.length);
    
    for (let i = 0; i < maxLen; i++) {
        if (i < original.length && i < changed.length) {
            if (original[i] === changed[i]) {
                diff.push({ type: 'equal', original: original[i], changed: changed[i] });
            } else {
                diff.push({ type: 'modified', original: original[i], changed: changed[i] });
                deletions++;
                additions++;
            }
        } else if (i < original.length) {
            diff.push({ type: 'removed', original: original[i], changed: null });
            deletions++;
        } else {
            diff.push({ type: 'added', original: null, changed: changed[i] });
            additions++;
        }
    }
    
    updateDiffStats(additions, deletions, 0);
    return diff;
}

function longestCommonSubsequence(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return new Set([...set1].filter(x => set2.has(x)));
}

function displayDiff(diff) {
    const resultContainer = document.getElementById('diffResult');
    
    if (diffView === 'sidebyside') {
        let originalHTML = '';
        let changedHTML = '';
        
        diff.forEach(item => {
            const text = item.original || item.changed || '';
            const escapedOriginal = escapeHTML(item.original || '');
            const escapedChanged = escapeHTML(item.changed || '');
            
            if (item.type === 'equal') {
                originalHTML += `<div class="diff-line-equal">${escapedOriginal || '&nbsp;'}</div>`;
                changedHTML += `<div class="diff-line-equal">${escapedChanged || '&nbsp;'}</div>`;
            } else if (item.type === 'removed') {
                originalHTML += `<div class="diff-line-removed"><span class="diff-marker">-</span> ${escapedOriginal}</div>`;
                changedHTML += `<div class="diff-line-empty">&nbsp;</div>`;
            } else if (item.type === 'added') {
                originalHTML += `<div class="diff-line-empty">&nbsp;</div>`;
                changedHTML += `<div class="diff-line-added"><span class="diff-marker">+</span> ${escapedChanged}</div>`;
            } else if (item.type === 'modified') {
                originalHTML += `<div class="diff-line-modified"><span class="diff-marker">~</span> ${escapedOriginal}</div>`;
                changedHTML += `<div class="diff-line-modified"><span class="diff-marker">~</span> ${escapedChanged}</div>`;
            }
        });
        
        resultContainer.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-family: monospace; font-size: 0.9rem;">
                <div>
                    <div style="font-weight: bold; margin-bottom: 0.5rem; color: var(--text-primary); padding: 0.5rem; background: var(--bg-tertiary); border-radius: 4px;">Original</div>
                    <div class="diff-content">${originalHTML}</div>
                </div>
                <div>
                    <div style="font-weight: bold; margin-bottom: 0.5rem; color: var(--text-primary); padding: 0.5rem; background: var(--bg-tertiary); border-radius: 4px;">Changed</div>
                    <div class="diff-content">${changedHTML}</div>
                </div>
            </div>
        `;
    } else {
        let inlineHTML = '';
        diff.forEach(item => {
            const escapedOriginal = escapeHTML(item.original || '');
            const escapedChanged = escapeHTML(item.changed || '');
            
            if (item.type === 'equal') {
                inlineHTML += `<div class="diff-line-equal">${escapedOriginal}</div>`;
            } else if (item.type === 'removed') {
                inlineHTML += `<div class="diff-line-removed"><span class="diff-marker">-</span> ${escapedOriginal}</div>`;
            } else if (item.type === 'added') {
                inlineHTML += `<div class="diff-line-added"><span class="diff-marker">+</span> ${escapedChanged}</div>`;
            } else if (item.type === 'modified') {
                inlineHTML += `<div class="diff-line-removed"><span class="diff-marker">-</span> ${escapedOriginal}</div>`;
                inlineHTML += `<div class="diff-line-added"><span class="diff-marker">+</span> ${escapedChanged}</div>`;
            }
        });
        
        resultContainer.innerHTML = `
            <div style="font-family: monospace; font-size: 0.9rem;">
                <div class="diff-content">${inlineHTML}</div>
            </div>
        `;
    }
}

function updateDiffStats(additions, deletions, modifications) {
    const statsEl = document.getElementById('diffStats');
    if (statsEl) {
        statsEl.innerHTML = `
            <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center;">
                <div><i class="fas fa-plus-circle" style="color: var(--accent-success);"></i> <strong>${additions}</strong> additions</div>
                <div><i class="fas fa-minus-circle" style="color: var(--accent-danger);"></i> <strong>${deletions}</strong> deletions</div>
                ${modifications > 0 ? `<div><i class="fas fa-edit" style="color: var(--accent-warning);"></i> <strong>${modifications}</strong> modifications</div>` : ''}
            </div>
        `;
    }
}

function escapeHTML(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#039;');
}

function swapTexts() {
    const original = document.getElementById('diffOriginal');
    const changed = document.getElementById('diffChanged');
    const temp = original.value;
    original.value = changed.value;
    changed.value = temp;
    compareDiff();
}

function clearDiff() {
    document.getElementById('diffOriginal').value = '';
    document.getElementById('diffChanged').value = '';
    document.getElementById('diffResult').innerHTML = '';
    updateDiffStats(0, 0, 0);
}

function copyDiffSummary() {
    const statsText = document.getElementById('diffStats').innerText;
    copyToClipboard('Diff Summary:\n' + statsText);
}

function initTextDiff() {
    const inputs = [document.getElementById('diffOriginal'), document.getElementById('diffChanged')];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                // Debounce for performance
                clearTimeout(input.debounceTimer);
                input.debounceTimer = setTimeout(compareDiff, 300);
            });
        }
    });
    
    // Set default active buttons
    const defaultModeBtn = document.querySelector('.diff-mode-btn[data-mode="line"]');
    if (defaultModeBtn) defaultModeBtn.classList.add('active');
    
    const defaultViewBtn = document.querySelector('.diff-view-btn[data-view="sidebyside"]');
    if (defaultViewBtn) defaultViewBtn.classList.add('active');
    
    updateDiffStats(0, 0, 0);
}

// Add CSS styles dynamically
const style = document.createElement('style');
style.textContent = `
.diff-line-equal { padding: 0.25rem 0.5rem; border-left: 3px solid transparent; }
.diff-line-removed { padding: 0.25rem 0.5rem; background: rgba(255, 59, 48, 0.1); border-left: 3px solid var(--accent-danger); }
.diff-line-added { padding: 0.25rem 0.5rem; background: rgba(48, 209, 88, 0.1); border-left: 3px solid var(--accent-success); }
.diff-line-modified { padding: 0.25rem 0.5rem; background: rgba(255, 159, 10, 0.1); border-left: 3px solid var(--accent-warning); }
.diff-line-empty { padding: 0.25rem 0.5rem; background: var(--bg-tertiary); opacity: 0.3; }
.diff-marker { font-weight: bold; margin-right: 0.5rem; }
.diff-content { max-height: 500px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 4px; padding: 0.5rem; background: var(--bg-secondary); }
`;
document.head.appendChild(style);

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTextDiff);
} else {
    initTextDiff();
}
