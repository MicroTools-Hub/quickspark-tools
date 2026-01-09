// Minimal Gradient Generator scaffold
(function(){
  const cssOut = () => document.getElementById('ggCSS');
  const previewBox = () => {
    // Create preview box if not present
    let el = document.getElementById('ggPreview');
    if (!el) {
      el = document.createElement('div');
      el.id = 'ggPreview';
      el.style.height = '200px';
      el.style.border = '1px solid var(--border-color)';
      el.style.borderRadius = '12px';
      el.style.marginBottom = '1rem';
      document.querySelector('.tool-content').prepend(el);
    }
    return el;
  };

  const state = {
    type: 'linear', // 'linear' | 'radial' | 'conic'
    angle: 135,
    stops: [
      { color: '#6EE7F9', pos: 0 },
      { color: '#A78BFA', pos: 100 }
    ]
  };

  function buildCSS(){
    const stops = state.stops.map(s => `${s.color} ${s.pos}%`).join(', ');
    let css = '';
    if (state.type === 'linear') {
      css = `linear-gradient(${state.angle}deg, ${stops})`;
    } else if (state.type === 'radial') {
      css = `radial-gradient(circle, ${stops})`;
    } else {
      css = `conic-gradient(from ${state.angle}deg, ${stops})`;
    }
    return css;
  }

  function render(){
    const css = buildCSS();
    const p = previewBox();
    p.style.backgroundImage = css;
    cssOut().textContent = `background-image: ${css};`;
  }

  // Public API (expand with controls later)
  function setType(t){ state.type = t; render(); }
  function setAngle(a){ state.angle = a; render(); }
  function setStops(stops){ state.stops = stops; render(); }

  window.ggSetType = setType;
  window.ggSetAngle = setAngle;
  window.ggSetStops = setStops;

  // Initial render
  document.addEventListener('DOMContentLoaded', render);
})();
