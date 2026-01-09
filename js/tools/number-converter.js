// ==========================================
// Number Converter Tool
// ==========================================

let lastNumberSource = '';

function convertNumber() {
    const bin = document.getElementById('ncBin').value.trim();
    const dec = document.getElementById('ncDec').value.trim();
    const hex = document.getElementById('ncHex').value.trim();
    let decimal;

    // Prefer last edited field to avoid ambiguity during live updates
    if (lastNumberSource === 'bin' && bin) {
        decimal = parseInt(bin, 2);
    } else if (lastNumberSource === 'dec' && dec) {
        decimal = parseInt(dec, 10);
    } else if (lastNumberSource === 'hex' && hex) {
        decimal = parseInt(hex, 16);
    } else {
        if (bin) decimal = parseInt(bin, 2);
        else if (dec) decimal = parseInt(dec, 10);
        else if (hex) decimal = parseInt(hex, 16);
        else return;
    }

    document.getElementById('ncBin').value = decimal.toString(2);
    document.getElementById('ncDec').value = decimal;
    document.getElementById('ncHex').value = decimal.toString(16).toUpperCase();
    document.getElementById('ncResult').textContent = `Binary: ${decimal.toString(2)} | Decimal: ${decimal} | Hex: ${decimal.toString(16).toUpperCase()}`;
}

function initNumberConverter() {
    const inputs = {
        'ncBin': 'bin',
        'ncDec': 'dec',
        'ncHex': 'hex'
    };
    
    Object.entries(inputs).forEach(([id, source]) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                lastNumberSource = source;
                convertNumber();
            });
        }
    });
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNumberConverter);
} else {
    initNumberConverter();
}
