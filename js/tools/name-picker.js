// Name Picker wheel with simple canvas draw and confetti
(function(){
  const wheel = () => document.getElementById('wheelCanvas');
  const ctx = () => wheel().getContext('2d');
  const confettiCanvas = () => document.getElementById('confettiCanvas');
  const confettiCtx = () => confettiCanvas().getContext('2d');

  window.wheelRotation = 0;
  window.isSpinning = false;

  function drawWheel(names, rotation){
    const c = wheel();
    if (!c) return;
    const context = ctx();
    const W = c.width, H = c.height, R = Math.min(W,H)/2 - 10;
    context.clearRect(0,0,W,H);
    context.save();
    context.translate(W/2, H/2);
    context.rotate(rotation);
    const n = Math.max(names.length, 1);
    for (let i=0;i<n;i++){
      const start = (i/n) * 2*Math.PI;
      const end = ((i+1)/n) * 2*Math.PI;
      context.beginPath();
      context.moveTo(0,0);
      context.arc(0,0,R,start,end);
      const hue = Math.floor(360*(i/n));
      context.fillStyle = `hsl(${hue}, 70%, 55%)`;
      context.fill();
      context.strokeStyle = 'rgba(0,0,0,0.2)';
      context.stroke();
      // label
      const mid = (start+end)/2;
      context.save();
      context.rotate(mid);
      context.translate(R*0.65,0);
      context.rotate(-rotation);
      context.fillStyle = '#111';
      context.font = '12px system-ui';
      const label = names[i] || '—';
      context.fillText(label, -context.measureText(label).width/2, 4);
      context.restore();
    }
    // pointer
    context.restore();
    context.beginPath();
    context.moveTo(W/2, H/2 - R - 8);
    context.lineTo(W/2 + 12, H/2 - R - 24);
    context.lineTo(W/2 - 12, H/2 - R - 24);
    context.closePath();
    context.fillStyle = 'var(--accent-primary)';
    context.fill();
  }

  function updateWheelLive(){
    const names = document.getElementById('nameInput').value.split('\n').filter(n=>n.trim());
    drawWheel(names, window.wheelRotation || 0);
  }

  function createConfetti(){
    const c = confettiCanvas();
    const cx = confettiCtx();
    c.width = window.innerWidth; c.height = window.innerHeight;
    const pieces = Array.from({length: 80}, (_,i)=>({
      x: Math.random()*c.width,
      y: -20 - Math.random()*100,
      w: 6 + Math.random()*8,
      h: 4 + Math.random()*6,
      vy: 2 + Math.random()*3,
      vx: -1 + Math.random()*2,
      rot: Math.random()*Math.PI,
      vr: (-0.05 + Math.random()*0.1),
      color: `hsl(${Math.floor(Math.random()*360)},80%,60%)`
    }));
    let frames = 0;
    function tick(){
      cx.clearRect(0,0,c.width,c.height);
      for (const p of pieces){
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        cx.save();
        cx.translate(p.x, p.y);
        cx.rotate(p.rot);
        cx.fillStyle = p.color;
        cx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        cx.restore();
      }
      if (frames++ < 180) requestAnimationFrame(tick);
    }
    tick();
  }

  window.drawWheel = drawWheel;
  window.updateWheelLive = updateWheelLive;
  window.createConfetti = createConfetti;

  document.addEventListener('DOMContentLoaded', ()=>{
    updateWheelLive();
  });
})();
