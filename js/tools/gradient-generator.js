// ==========================================
// Gradient Generator - God Tier Version
// ==========================================

const gradientPresets = {
    'Sunset': { type: 'linear', angle: 135, stops: [{color: '#FF6B6B', pos: 0}, {color: '#FFA500', pos: 50}, {color: '#FFD700', pos: 100}] },
    'Ocean': { type: 'linear', angle: 90, stops: [{color: '#001F3F', pos: 0}, {color: '#0074D9', pos: 50}, {color: '#7FDBCA', pos: 100}] },
    'Forest': { type: 'linear', angle: 135, stops: [{color: '#0D3B2A', pos: 0}, {color: '#1F8B6B', pos: 50}, {color: '#7FFFD4', pos: 100}] },
    'Purple Dream': { type: 'linear', angle: 45, stops: [{color: '#6C5CE7', pos: 0}, {color: '#A29BFE', pos: 50}, {color: '#DFE6E9', pos: 100}] },
    'Flamingo': { type: 'linear', angle: 90, stops: [{color: '#FF69B4', pos: 0}, {color: '#FFB6C1', pos: 100}] },
    'Mint Fresh': { type: 'linear', angle: 135, stops: [{color: '#00D2FC', pos: 0}, {color: '#3A47D5', pos: 50}, {color: '#00D2FC', pos: 100}] },
    'Fire': { type: 'linear', angle: 90, stops: [{color: '#FF0000', pos: 0}, {color: '#FF7F00', pos: 50}, {color: '#FFFF00', pos: 100}] },
    'Radial Rainbow': { type: 'radial', angle: 0, stops: [{color: '#FF0000', pos: 0}, {color: '#FFFF00', pos: 33}, {color: '#00FF00', pos: 66}, {color: '#0000FF', pos: 100}] },
    'Conic Wheel': { type: 'conic', angle: 0, stops: [{color: '#FF0000', pos: 0}, {color: '#FFFF00', pos: 33}, {color: '#00FF00', pos: 66}, {color: '#0000FF', pos: 100}] },
    'Cool Blues': { type: 'linear', angle: 180, stops: [{color: '#000080', pos: 0}, {color: '#0047AB', pos: 50}, {color: '#ADD8E6', pos: 100}] },
    'Peachy': { type: 'linear', angle: 45, stops: [{color: '#FFB347', pos: 0}, {color: '#FFDAB9', pos: 100}] },
    'Midnight': { type: 'linear', angle: 135, stops: [{color: '#0F0C29', pos: 0}, {color: '#302B63', pos: 50}, {color: '#24243E', pos: 100}] }
};

let gradientState = {
    type: 'linear',
    angle: 135,
    radialShape: 'circle',
    stops: [
        { id: 1, color: '#6EE7F9', pos: 0 },
        { id: 2, color: '#A78BFA', pos: 100 }
    ],
    nextStopId: 3
};

function getPreviewBox() {
    let el = document.getElementById('ggPreview');
    if (!el) {
        el = document.createElement('div');
        el.id = 'ggPreview';
        el.style.cssText = 'height: 250px; border: 2px solid var(--border-color); border-radius: 12px; margin-bottom: 1.5rem; box-shadow: inset 0 2px 8px rgba(0,0,0,0.1);';
        const toolContent = document.querySelector('.tool-content');
        toolContent.insertBefore(el, toolContent.firstChild);
    }
    return el;
}

function buildCSS() {
    const stops = gradientState.stops
        .sort((a, b) => a.pos - b.pos)
        .map(s => `${s.color} ${s.pos}%`)
        .join(', ');
    
    let css = '';
    switch(gradientState.type) {
        case 'linear':
            css = `linear-gradient(${gradientState.angle}deg, ${stops})`;
            break;
        case 'radial':
            css = `radial-gradient(${gradientState.radialShape}, ${stops})`;
            break;
        case 'conic':
            css = `conic-gradient(from ${gradientState.angle}deg, ${stops})`;
            break;
    }
    return css;
}

function renderGradient() {
    const css = buildCSS();
    const preview = getPreviewBox();
    preview.style.backgroundImage = css;
    
    const cssOutput = document.getElementById('ggCSS');
    if (cssOutput) {
        cssOutput.textContent = `background-image: ${css};`;
    }
    
    updateStopControls();
}

function setGradientType(type) {
    gradientState.type = type;
    updateTypeUI();
    renderGradient();
}

function setRadialShape(shape) {
    gradientState.radialShape = shape;
    renderGradient();
}

function setAngle(angle) {
    gradientState.angle = parseFloat(angle);
    const display = document.getElementById('angleDisplay');
    if (display) display.textContent = angle + '°';
    renderGradient();
}

function updateTypeUI() {
    document.querySelectorAll('.gradient-type-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.gradient-type-btn[data-type="${gradientState.type}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Show/hide angle control
    const angleControl = document.getElementById('angleControl');
    const radialControl = document.getElementById('radialControl');
    if (gradientState.type === 'linear' || gradientState.type === 'conic') {
        if (angleControl) angleControl.style.display = 'block';
        if (radialControl) radialControl.style.display = 'none';
    } else if (gradientState.type === 'radial') {
        if (angleControl) angleControl.style.display = 'none';
        if (radialControl) radialControl.style.display = 'block';
    }
}

function addColorStop() {
    if (gradientState.stops.length >= 5) {
        showNotification('Maximum 5 color stops allowed');
        return;
    }
    
    const midPos = 50;
    gradientState.stops.push({
        id: gradientState.nextStopId++,
        color: '#000000',
        pos: midPos
    });
    
    renderGradient();
}

function removeColorStop(id) {
    if (gradientState.stops.length <= 2) {
        showNotification('Minimum 2 color stops required');
        return;
    }
    
    gradientState.stops = gradientState.stops.filter(s => s.id !== id);
    renderGradient();
}

function updateColorStop(id, property, value) {
    const stop = gradientState.stops.find(s => s.id === id);
    if (stop) {
        stop[property] = property === 'pos' ? parseFloat(value) : value;
        renderGradient();
    }
}

function updateStopControls() {
    const container = document.getElementById('colorStopsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    gradientState.stops.forEach(stop => {
        const div = document.createElement('div');
        div.style.cssText = 'display: grid; grid-template-columns: 50px 1fr 60px 20px; gap: 0.5rem; align-items: center; padding: 0.5rem; background: var(--bg-tertiary); border-radius: 6px; margin-bottom: 0.5rem;';
        
        div.innerHTML = `
            <input type="color" value="${stop.color}" onchange="updateColorStop(${stop.id}, 'color', this.value)" style="width: 50px; height: 40px; border: none; border-radius: 4px; cursor: pointer;">
            <input type="range" min="0" max="100" value="${stop.pos}" onchange="updateColorStop(${stop.id}, 'pos', this.value)" style="width: 100%; cursor: pointer;">
            <input type="number" min="0" max="100" value="${stop.pos}" onchange="updateColorStop(${stop.id}, 'pos', this.value)" style="width: 60px; padding: 0.25rem; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-secondary); color: var(--text-primary);">
            <button class="btn btn-danger btn-sm" onclick="removeColorStop(${stop.id})" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;"><i class="fas fa-trash"></i></button>
        `;
        
        container.appendChild(div);
    });
}

function loadPreset(presetName) {
    const preset = gradientPresets[presetName];
    if (preset) {
        gradientState = {
            type: preset.type,
            angle: preset.angle,
            radialShape: 'circle',
            stops: JSON.parse(JSON.stringify(preset.stops)),
            nextStopId: Math.max(...preset.stops.map(s => s.id || 0)) + 1
        };
        updateTypeUI();
        renderGradient();
    }
}

function randomizeGradient() {
    const types = ['linear', 'radial', 'conic'];
    gradientState.type = types[Math.floor(Math.random() * types.length)];
    gradientState.angle = Math.floor(Math.random() * 360);
    
    const numStops = 2 + Math.floor(Math.random() * 4);
    gradientState.stops = [];
    for (let i = 0; i < numStops; i++) {
        const hue = Math.floor(Math.random() * 360);
        gradientState.stops.push({
            id: gradientState.nextStopId++,
            color: `hsl(${hue}, 70%, 50%)`,
            pos: i === 0 ? 0 : i === numStops - 1 ? 100 : Math.floor((i / (numStops - 1)) * 100)
        });
    }
    
    updateTypeUI();
    renderGradient();
}

function copyCSS() {
    const css = buildCSS();
    copyToClipboard(`background-image: ${css};`);
}

function copyCSSVariable() {
    const css = buildCSS();
    const varCode = `--my-gradient: ${css};`;
    copyToClipboard(varCode);
}

function downloadAsCSS() {
    const css = buildCSS();
    const cssContent = `.gradient-bg {\n  background-image: ${css};\n  background-attachment: fixed;\n}`;
    downloadFile(cssContent, 'gradient.css', 'text/css');
}

function downloadAsSVG() {
    const svg = generateSVGGradient();
    downloadFile(svg, 'gradient.svg', 'image/svg+xml');
}

function generateSVGGradient() {
    const stops = gradientState.stops
        .sort((a, b) => a.pos - b.pos)
        .map((s, i) => `<stop offset="${s.pos}%" style="stop-color:${s.color};stop-opacity:1" />`)
        .join('\n');
    
    if (gradientState.type === 'linear') {
        return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops}
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#grad)"/>
</svg>`;
    } else if (gradientState.type === 'radial') {
        return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad" cx="50%" cy="50%" r="50%">
      ${stops}
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="url(#grad)"/>
</svg>`;
    }
    return '';
}

function initGradientGenerator() {
    updateTypeUI();
    renderGradient();
    
    // Populate preset buttons
    const presetContainer = document.getElementById('presetsContainer');
    if (presetContainer) {
        Object.keys(gradientPresets).forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary btn-sm';
            btn.textContent = name;
            btn.onclick = () => loadPreset(name);
            presetContainer.appendChild(btn);
        });
    }
}

// Public API
window.setGradientType = setGradientType;
window.setRadialShape = setRadialShape;
window.setAngle = setAngle;
window.addColorStop = addColorStop;
window.removeColorStop = removeColorStop;
window.updateColorStop = updateColorStop;
window.loadPreset = loadPreset;
window.randomizeGradient = randomizeGradient;
window.copyCSS = copyCSS;
window.copyCSSVariable = copyCSSVariable;
window.downloadAsCSS = downloadAsCSS;
window.downloadAsSVG = downloadAsSVG;

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGradientGenerator);
} else {
    initGradientGenerator();
}
