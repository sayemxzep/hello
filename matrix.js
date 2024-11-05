// Optimize Matrix rain effect
const MatrixEffect = {
    init() {
        this.canvas = document.getElementById('matrix');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        this.setDimensions();
        
        // Use requestAnimationFrame instead of setInterval
        this.animate();
        
        // Debounce resize event
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.setDimensions(), 250);
        });
    },

    setDimensions() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.scale(dpr, dpr);
        
        // Reset drops array
        this.columns = Math.floor(this.canvas.width / 14);
        this.drops = new Array(this.columns).fill(1);
    },

    animate() {
        // Use opacity buffer for better performance
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Batch rendering
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = '14px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            if (i % 2 === 0) { // Render only half the columns each frame
                const text = String.fromCharCode(0x30A0 + Math.random() * 96);
                const x = i * 14;
                const y = this.drops[i] * 14;
                
                this.ctx.fillText(text, x, y);
                
                if (y > this.canvas.height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                }
                this.drops[i]++;
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
};

// Initialize once DOM is loaded
document.addEventListener('DOMContentLoaded', () => MatrixEffect.init()); 