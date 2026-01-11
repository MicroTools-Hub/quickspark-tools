// Name Picker wheel with enhanced animations and effects
(function(){
    const wheel = () => document.getElementById('wheelCanvas');
    const ctx = () => wheel().getContext('2d');
    const confettiCanvas = () => document.getElementById('confettiCanvas');
    const confettiCtx = () => confettiCanvas().getContext('2d');

    window.wheelRotation = 0;
    window.isSpinning = false;
    let selectedName = null;

    function drawWheel(names, rotation){
        const c = wheel();
        if (!c) return;
        const context = ctx();
        const W = c.width, H = c.height, R = Math.min(W,H)/2 - 30;
        
        context.clearRect(0, 0, W, H);
        context.save();
        context.translate(W/2, H/2);
        context.rotate(rotation);
        
        const n = Math.max(names.length, 1);
        for (let i = 0; i < n; i++){
            const start = (i/n) * 2*Math.PI;
            const end = ((i+1)/n) * 2*Math.PI;
            context.beginPath();
            context.moveTo(0, 0);
            context.arc(0, 0, R, start, end);
            
            const hue = Math.floor(360*(i/n));
            context.fillStyle = `hsl(${hue}, 70%, 55%)`;
            context.fill();
            context.strokeStyle = 'rgba(0,0,0,0.3)';
            context.lineWidth = 2;
            context.stroke();
            
            // Label with responsive font sizing
            const mid = (start + end) / 2;
            context.save();
            context.rotate(mid);
            context.translate(R * 0.7, 0);
            context.rotate(-rotation);
            context.fillStyle = '#fff';
            
            const label = names[i] || '—';
            // Responsive font size based on wheel size and label length
            const baseFontSize = Math.max(12, Math.min(20, R / 8));
            const maxWidth = R * 0.5;
            let fontSize = baseFontSize;
            context.font = `bold ${fontSize}px system-ui`;
            let textWidth = context.measureText(label).width;
            
            // Reduce font size if text is too long
            while (textWidth > maxWidth && fontSize > 10) {
                fontSize -= 1;
                context.font = `bold ${fontSize}px system-ui`;
                textWidth = context.measureText(label).width;
            }
            
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.shadowColor = 'rgba(0,0,0,0.5)';
            context.shadowBlur = 4;
            context.fillText(label, 0, 0);
            context.restore();
        }
        
        // Center circle
        context.beginPath();
        context.arc(0, 0, 25, 0, Math.PI * 2);
        context.fillStyle = '#fff';
        context.fill();
        context.strokeStyle = 'rgba(0,0,0,0.3)';
        context.lineWidth = 2;
        context.stroke();
        
        context.restore();
        
        // Fixed arrow pointer at top pointing DOWN into wheel
        const arrowSize = 25;
        const arrowY = 15;
        
        // Draw arrow pointing down
        context.fillStyle = '#FF4444'; // Bright red for visibility
        context.beginPath();
        context.moveTo(W/2 - arrowSize, arrowY); // Left base
        context.lineTo(W/2 + arrowSize, arrowY); // Right base
        context.lineTo(W/2, arrowY + arrowSize); // Point (down towards wheel)
        context.closePath();
        context.fill();
        
        // Add thick border for clarity
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 3;
        context.stroke();
        context.strokeStyle = 'rgba(0,0,0,0.5)';
        context.lineWidth = 1;
        context.stroke();
    }

    function updateWheelLive(){
        const names = document.getElementById('nameInput').value.split('\n').filter(n => n.trim());
        drawWheel(names, window.wheelRotation || 0);
    }

    function spinWheel() {
        const names = document.getElementById('nameInput').value.split('\n').filter(n => n.trim());
        if (names.length === 0) {
            showNotification('Add names to the list first!');
            return;
        }
        
        if (window.isSpinning) return;
        window.isSpinning = true;
        
        const spinBtn = document.getElementById('spinBtn');
        if (spinBtn) spinBtn.disabled = true;
        
        // Generate random final rotation (3 full rotations + random offset)
        const randomSpin = Math.random() * (Math.PI * 2);
        const totalRotation = (Math.PI * 2 * 3) + randomSpin;
        const duration = 3000; // 3 seconds
        const startTime = Date.now();
        const startRotation = window.wheelRotation;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth deceleration
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            window.wheelRotation = startRotation + (totalRotation * easeOutCubic);
            
            updateWheelLive();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                window.isSpinning = false;
                if (spinBtn) spinBtn.disabled = false;
                
                // Calculate which name won (align to fixed top pointer)
                const TWO_PI = Math.PI * 2;
                const n = names.length;
                const normalizedRotation = ((window.wheelRotation % TWO_PI) + TWO_PI) % TWO_PI;
                const segmentAngle = TWO_PI / n;
                const pointerAngle = -Math.PI / 2; // top (12 o'clock)
                const relativeAngle = ((pointerAngle - normalizedRotation) % TWO_PI + TWO_PI) % TWO_PI;
                const selectedIndex = Math.floor((relativeAngle + 1e-12) / segmentAngle) % n;
                selectedName = names[selectedIndex];
                
                // Show result
                showWinner(selectedName);
                createConfetti();
            }
        }
        
        animate();
    }

    function showWinner(name) {
        const resultEl = document.getElementById('wheelResult');
        if (resultEl) {
            resultEl.innerHTML = `<div style="text-align: center; padding: 1.5rem;"><div style="font-size: 2rem; font-weight: bold; color: var(--accent-primary); margin-bottom: 0.5rem;"><i class="fas fa-star"></i></div><div style="font-size: 1.5rem; font-weight: bold; color: var(--text-primary);">${name}</div><div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">is the lucky one! 🎉</div></div>`;
        }
    }

    function createConfetti(){
        const c = confettiCanvas();
        const cx = confettiCtx();
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        
        const pieces = Array.from({length: 100}, (_, i) => ({
            x: Math.random() * c.width,
            y: -20 - Math.random() * 100,
            w: 6 + Math.random() * 8,
            h: 4 + Math.random() * 6,
            vy: 2 + Math.random() * 4,
            vx: -2 + Math.random() * 4,
            rot: Math.random() * Math.PI * 2,
            vr: (-0.1 + Math.random() * 0.2),
            color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`,
            life: 1
        }));
        
        let frames = 0;
        const maxFrames = 200;
        
        function tick(){
            cx.clearRect(0, 0, c.width, c.height);
            
            for (let i = 0; i < pieces.length; i++) {
                const p = pieces[i];
                if (p.life <= 0) continue;
                
                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.vr;
                p.vy += 0.15; // gravity
                p.life -= 1 / maxFrames;
                
                cx.save();
                cx.globalAlpha = p.life;
                cx.translate(p.x, p.y);
                cx.rotate(p.rot);
                cx.fillStyle = p.color;
                cx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
                cx.restore();
            }
            
            frames++;
            if (frames < maxFrames) {
                requestAnimationFrame(tick);
            } else {
                cx.clearRect(0, 0, c.width, c.height);
            }
        }
        
        tick();
    }

    function clearResult() {
        const resultEl = document.getElementById('wheelResult');
        if (resultEl) resultEl.innerHTML = '';
        selectedName = null;
    }

    function addName() {
        const input = document.getElementById('nameInput');
        const addBtn = document.getElementById('addNameBtn');
        if (input && addBtn) {
            const val = input.value.trim();
            if (val) {
                input.value += (input.value ? '\n' : '') + val;
                addBtn.value = '';
                updateWheelLive();
            }
        }
    }

    window.drawWheel = drawWheel;
    window.updateWheelLive = updateWheelLive;
    window.createConfetti = createConfetti;
    window.spinWheel = spinWheel;
    window.clearResult = clearResult;
    window.addName = addName;

    // Setup resize listener for canvas
    window.addEventListener('resize', () => {
        const c = wheel();
        if (c) {
            c.width = c.parentElement.offsetWidth;
            c.height = Math.min(500, window.innerHeight * 0.7);
            updateWheelLive();
        }
    });

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        const c = wheel();
        if (c) {
            c.width = c.parentElement.offsetWidth;
            c.height = Math.min(500, window.innerHeight * 0.7);
        }
        updateWheelLive();
    });
})();
