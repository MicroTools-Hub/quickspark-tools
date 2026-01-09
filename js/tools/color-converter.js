// ==========================================
// Color Converter Tool
// ==========================================

function hexToRgb() {
    let hex = document.getElementById('colorHex').value.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;
    if (hex.length !== 7) return;
    
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    if (isNaN(r) || isNaN(g) || isNaN(b)) return;
    
    const rgb = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('colorRgb').value = rgb;
    document.getElementById('colorPreview').style.background = hex;
    document.getElementById('colorResult').textContent = `HEX: ${hex} | RGB: ${rgb}`;
}

function rgbToHex() {
    const rgb = document.getElementById('colorRgb').value;
    const match = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return;
    
    const hex = '#' + [match[1], match[2], match[3]].map(x => {
        const num = parseInt(x);
        return (num < 0 ? 0 : num > 255 ? 255 : num).toString(16).padStart(2, '0');
    }).join('').toUpperCase();
    
    document.getElementById('colorHex').value = hex;
    document.getElementById('colorPreview').style.background = hex;
    document.getElementById('colorResult').textContent = `HEX: ${hex} | RGB: ${rgb}`;
}

function initColorConverter() {
    const hexInput = document.getElementById('colorHex');
    const rgbInput = document.getElementById('colorRgb');
    
    if (hexInput) {
        hexInput.addEventListener('input', hexToRgb);
    }
    if (rgbInput) {
        rgbInput.addEventListener('input', rgbToHex);
    }
    
    // Set default preview
    setTimeout(() => {
        const preview = document.getElementById('colorPreview');
        if (preview && !preview.style.background) {
            preview.style.background = '#FF0000';
            document.getElementById('colorHex').value = '#FF0000';
            document.getElementById('colorRgb').value = 'rgb(255, 0, 0)';
        }
    }, 100);
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColorConverter);
} else {
    initColorConverter();
}
