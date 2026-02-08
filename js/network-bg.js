'use strict';

/* ========================================
   Network Graph Background Animation

   Renders an interactive network/graph of
   interconnected nodes on an HTML5 Canvas.
   Mouse cursor acts as an invisible hub node.
   ======================================== */
class NetworkBackground {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');

    // Merge user options with defaults
    const defaults = {
      particleCountDesktop: 80,
      particleCountMobile: 30,
      mobileBreakpoint: 768,
      connectDistance: 150,
      mouseConnectDistance: 200,
      particleMinRadius: 1,
      particleMaxRadius: 3,
      hubRadius: 5,
      hubProbability: 0.08,
      minSpeed: 0.15,
      maxSpeed: 0.4,
      edgeBaseOpacity: 0.15,
      mouseEdgeOpacity: 0.25,
      edgeLineWidth: 0.5,
      bufferZone: 20,
      nodeColor: 'rgba(88, 166, 255, 0.6)',
      edgeColor: 'rgb(88, 166, 255)',
    };
    this.options = Object.assign({}, defaults, options);

    this.particles = [];
    this.mouse = { x: null, y: null };
    this.animationFrameId = null;
    this.isVisible = true;
    this.dpr = window.devicePixelRatio || 1;
    this.width = 0;
    this.height = 0;

    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();

    if (this.prefersReducedMotion) {
      // Draw a single static frame, then stop
      this.drawEdges();
      this.drawNodes();
      return;
    }

    this.bindEvents();
    this.animate();
  }

  /* ---- Canvas resize handling ---- */
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    // Reset transform and apply DPR scale so we draw in CSS pixels
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  /* ---- Create particles based on viewport size ---- */
  createParticles() {
    this.particles = [];
    const isMobile = window.innerWidth < this.options.mobileBreakpoint;
    const count = isMobile
      ? this.options.particleCountMobile
      : this.options.particleCountDesktop;

    for (let i = 0; i < count; i++) {
      const isHub = Math.random() < this.options.hubProbability;
      const radius = isHub
        ? this.options.hubRadius
        : this.options.particleMinRadius +
          Math.random() *
            (this.options.particleMaxRadius - this.options.particleMinRadius);

      // Random speed and direction
      const speed =
        this.options.minSpeed +
        Math.random() * (this.options.maxSpeed - this.options.minSpeed);
      const angle = Math.random() * Math.PI * 2;

      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: radius,
      });
    }
  }

  /* ---- Bind events: resize, mouse, visibility ---- */
  bindEvents() {
    let resizeTimeout;
    this._onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resize();
        this.createParticles();
      }, 250);
    };
    window.addEventListener('resize', this._onResize);

    // Mouse interaction (desktop only)
    const isMobile = window.innerWidth < this.options.mobileBreakpoint;
    if (!isMobile) {
      this._onMouseMove = (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      };
      this._onMouseLeave = () => {
        this.mouse.x = null;
        this.mouse.y = null;
      };
      window.addEventListener('mousemove', this._onMouseMove);
      document.addEventListener('mouseleave', this._onMouseLeave);
    }

    // Pause animation when tab is hidden
    this._onVisibilityChange = () => {
      if (document.hidden) {
        this.isVisible = false;
        cancelAnimationFrame(this.animationFrameId);
      } else {
        this.isVisible = true;
        this.animate();
      }
    };
    document.addEventListener('visibilitychange', this._onVisibilityChange);
  }

  /* ---- Animation loop ---- */
  animate() {
    if (!this.isVisible) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.updateParticles();
    this.drawEdges();
    this.drawNodes();

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  /* ---- Move particles and bounce off edges ---- */
  updateParticles() {
    const buf = this.options.bufferZone;

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off horizontal boundaries
      if (p.x < buf || p.x > this.width - buf) {
        p.vx *= -1;
        p.x = Math.max(buf, Math.min(this.width - buf, p.x));
      }

      // Bounce off vertical boundaries
      if (p.y < buf || p.y > this.height - buf) {
        p.vy *= -1;
        p.y = Math.max(buf, Math.min(this.height - buf, p.y));
      }
    }
  }

  /* ---- Draw connections between nearby particles ---- */
  drawEdges() {
    const ctx = this.ctx;
    const particles = this.particles;
    const len = particles.length;
    const maxDist = this.options.connectDistance;
    const maxDistSq = maxDist * maxDist;
    const baseOpacity = this.options.edgeBaseOpacity;

    ctx.lineWidth = this.options.edgeLineWidth;
    ctx.strokeStyle = this.options.edgeColor;

    // Particle-to-particle connections
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          // Only compute sqrt when we know we'll draw
          const dist = Math.sqrt(distSq);
          const opacity = baseOpacity * (1 - dist / maxDist);
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Mouse-to-particle connections (brighter)
    if (this.mouse.x !== null && this.mouse.y !== null) {
      const mouseMaxDist = this.options.mouseConnectDistance;
      const mouseMaxDistSq = mouseMaxDist * mouseMaxDist;
      const mouseOpacity = this.options.mouseEdgeOpacity;

      for (let i = 0; i < len; i++) {
        const dx = particles[i].x - this.mouse.x;
        const dy = particles[i].y - this.mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseMaxDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = mouseOpacity * (1 - dist / mouseMaxDist);
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(this.mouse.x, this.mouse.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
  }

  /* ---- Draw particle nodes ---- */
  drawNodes() {
    const ctx = this.ctx;
    ctx.fillStyle = this.options.nodeColor;

    for (const p of this.particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ---- Cleanup ---- */
  destroy() {
    cancelAnimationFrame(this.animationFrameId);

    if (this._onResize) {
      window.removeEventListener('resize', this._onResize);
    }
    if (this._onMouseMove) {
      window.removeEventListener('mousemove', this._onMouseMove);
    }
    if (this._onMouseLeave) {
      document.removeEventListener('mouseleave', this._onMouseLeave);
    }
    if (this._onVisibilityChange) {
      document.removeEventListener('visibilitychange', this._onVisibilityChange);
    }
  }
}
