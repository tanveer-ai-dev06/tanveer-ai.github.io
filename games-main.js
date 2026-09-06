// games-main.js - Premium Puzzle Game Website Animations

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // ========== LOADING ANIMATION ==========
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2000);
  }

  // ========== CUSTOM CURSOR ==========
  const cursorDot = document.createElement('div');
  const cursorOutline = document.createElement('div');
  const mouseGlow = document.createElement('div');
  
  cursorDot.classList.add('cursor-dot');
  cursorOutline.classList.add('cursor-outline');
  mouseGlow.classList.add('mouse-glow');
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);
  document.body.appendChild(mouseGlow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;
  let glowX = mouseX;
  let glowY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    mouseGlow.style.left = glowX + 'px';
    mouseGlow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll('a, button, .btn, .glass-card, .game-card, .puzzle-tile, .memory-card, input, textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.width = '60px';
      cursorOutline.style.height = '60px';
      cursorOutline.style.borderColor = 'rgba(139, 92, 246, 0.8)';
      cursorOutline.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.width = '45px';
      cursorOutline.style.height = '45px';
      cursorOutline.style.borderColor = 'rgba(139, 92, 246, 0.5)';
      cursorOutline.style.backgroundColor = 'transparent';
    });
  });

  // ========== PARTICLES ==========
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ========== GSAP ANIMATIONS ==========
  
  // Hero entrance
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.from(heroContent.children, {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.3
    });
  }

  // Section titles
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  });

  // Game cards animation
  gsap.utils.toArray('.game-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
      },
      y: 80,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(2, 6, 23, 0.95)';
      navbar.style.padding = '15px 8%';
    } else {
      navbar.style.background = 'rgba(2, 6, 23, 0.8)';
      navbar.style.padding = '20px 8%';
    }
  });

  // Mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Active nav link
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Magnetic buttons
  document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // Tilt effect for cards
  document.querySelectorAll('.game-card, .game-section').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // Reveal on scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Contact form handler
  const sendMessageBtn = document.getElementById('sendMessageBtn');
  if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', () => {
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      const successDiv = document.getElementById('contactSuccess');
      
      if (!name || !email || !message) {
        alert('Please fill in all fields before sending.');
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }
      
      sendMessageBtn.textContent = 'Sending...';
      sendMessageBtn.disabled = true;
      
      setTimeout(() => {
        document.getElementById('contactForm').style.display = 'none';
        successDiv.classList.add('show');
        sendMessageBtn.textContent = 'Send Message';
        sendMessageBtn.disabled = false;
      }, 1500);
    });
  }
});

// ========== SLIDING PUZZLE GAME ==========
class SlidingPuzzle {
  constructor() {
    this.board = document.querySelector('.puzzle-board');
    this.tiles = [];
    this.size = 3;
    this.emptyPos = { row: 2, col: 2 };
    this.moves = 0;
    this.timer = null;
    this.seconds = 0;
    this.isPlaying = false;
    
    this.init();
  }
  
  init() {
    this.createBoard();
    this.shuffle();
    this.render();
    this.startTimer();
  }
  
  createBoard() {
    this.board.innerHTML = '';
    this.tiles = [];
    
    for (let row = 0; row < this.size; row++) {
      this.tiles[row] = [];
      for (let col = 0; col < this.size; col++) {
        const num = row * this.size + col + 1;
        if (num === this.size * this.size) {
          this.tiles[row][col] = 0;
          this.emptyPos = { row, col };
        } else {
          this.tiles[row][col] = num;
        }
      }
    }
  }
  
  shuffle() {
    for (let i = 0; i < 100; i++) {
      const neighbors = this.getNeighbors(this.emptyPos.row, this.emptyPos.col);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      this.swap(this.emptyPos, randomNeighbor);
      this.emptyPos = randomNeighbor;
    }
  }
  
  getNeighbors(row, col) {
    const neighbors = [];
    if (row > 0) neighbors.push({ row: row - 1, col });
    if (row < this.size - 1) neighbors.push({ row: row + 1, col });
    if (col > 0) neighbors.push({ row, col: col - 1 });
    if (col < this.size - 1) neighbors.push({ row, col: col + 1 });
    return neighbors;
  }
  
  swap(pos1, pos2) {
    [this.tiles[pos1.row][pos1.col], this.tiles[pos2.row][pos2.col]] = 
    [this.tiles[pos2.row][pos2.col], this.tiles[pos1.row][pos1.col]];
  }
  
  render() {
    this.board.innerHTML = '';
    const colors = [
      'linear-gradient(135deg, #8b5cf6, #3b82f6)',
      'linear-gradient(135deg, #ec4899, #8b5cf6)',
      'linear-gradient(135deg, #3b82f6, #06b6d4)',
      'linear-gradient(135deg, #10b981, #3b82f6)',
      'linear-gradient(135deg, #f59e0b, #ec4899)',
      'linear-gradient(135deg, #ef4444, #f59e0b)',
      'linear-gradient(135deg, #06b6d4, #10b981)',
      'linear-gradient(135deg, #8b5cf6, #ec4899)'
    ];
    
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const tile = document.createElement('div');
        tile.className = 'puzzle-tile';
        
        const num = this.tiles[row][col];
        if (num === 0) {
          tile.classList.add('empty');
          tile.textContent = '';
        } else {
          tile.textContent = num;
          tile.style.background = colors[(num - 1) % colors.length];
          
          if (num === row * this.size + col + 1) {
            tile.classList.add('correct');
          }
        }
        
        tile.addEventListener('click', () => this.move(row, col));
        this.board.appendChild(tile);
      }
    }
  }
  
  move(row, col) {
    if (!this.isPlaying) {
      this.isPlaying = true;
    }
    
    if (this.isAdjacent(row, col, this.emptyPos.row, this.emptyPos.col)) {
      this.swap({ row, col }, this.emptyPos);
      this.emptyPos = { row, col };
      this.moves++;
      this.render();
      
      if (this.checkWin()) {
        this.win();
      }
    }
  }
  
  isAdjacent(r1, c1, r2, c2) {
    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
  }
  
  checkWin() {
    let count = 1;
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.tiles[row][col] !== count && !(row === this.size - 1 && col === this.size - 1)) {
          return false;
        }
        count++;
      }
    }
    return true;
  }
  
  win() {
    clearInterval(this.timer);
    alert(`Congratulations! You solved the puzzle in ${this.moves} moves and ${this.seconds} seconds!`);
    this.moves = 0;
    this.seconds = 0;
    this.isPlaying = false;
    this.createBoard();
    this.shuffle();
    this.render();
    this.startTimer();
  }
  
  startTimer() {
    this.seconds = 0;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.seconds++;
      const timerEl = document.getElementById('puzzleTimer');
      if (timerEl) {
        const mins = Math.floor(this.seconds / 60);
        const secs = this.seconds % 60;
        timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }
}

// ========== MEMORY MATCH GAME ==========
class MemoryGame {
  constructor() {
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.isLocked = false;
    this.emojis = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎬', '🎤', '🎸'];
    
    this.init();
  }
  
  init() {
    this.createBoard();
    this.render();
  }
  
  createBoard() {
    this.cards = [...this.emojis, ...this.emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
  }
  
  render() {
    const grid = document.querySelector('.memory-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    this.cards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = `memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`;
      cardEl.dataset.id = card.id;
      
      cardEl.innerHTML = `
        <div class="card-front">${card.emoji}</div>
        <div class="card-back">?</div>
      `;
      
      cardEl.addEventListener('click', () => this.flipCard(card.id));
      grid.appendChild(cardEl);
    });
  }
  
  flipCard(id) {
    if (this.isLocked) return;
    
    const card = this.cards[id];
    if (card.isFlipped || card.isMatched) return;
    
    card.isFlipped = true;
    this.flippedCards.push(card);
    this.render();
    
    if (this.flippedCards.length === 2) {
      this.moves++;
      this.updateMoves();
      
      if (this.flippedCards[0].emoji === this.flippedCards[1].emoji) {
        this.flippedCards.forEach(c => c.isMatched = true);
        this.matchedPairs++;
        this.flippedCards = [];
        this.render();
        
        if (this.matchedPairs === this.emojis.length) {
          this.win();
        }
      } else {
        this.isLocked = true;
        setTimeout(() => {
          this.flippedCards.forEach(c => c.isFlipped = false);
          this.flippedCards = [];
          this.render();
          this.isLocked = false;
        }, 1000);
      }
    }
  }
  
  updateMoves() {
    const movesEl = document.getElementById('memoryMoves');
    if (movesEl) movesEl.textContent = this.moves;
  }
  
  win() {
    setTimeout(() => {
      alert(`Congratulations! You won in ${this.moves} moves!`);
      this.reset();
    }, 500);
  }
  
  reset() {
    this.matchedPairs = 0;
    this.moves = 0;
    this.flippedCards = [];
    this.isLocked = false;
    this.createBoard();
    this.render();
    this.updateMoves();
  }
}

// ========== COLOR MATCH GAME ==========
class ColorMatchGame {
  constructor() {
    this.colors = [
      { name: 'Purple', hex: '#8b5cf6' },
      { name: 'Blue', hex: '#3b82f6' },
      { name: 'Green', hex: '#10b981' },
      { name: 'Pink', hex: '#ec4899' },
      { name: 'Yellow', hex: '#f59e0b' },
      { name: 'Red', hex: '#ef4444' }
    ];
    this.score = 0;
    this.currentColor = null;
    this.timer = null;
    this.timeLeft = 30;
    
    this.init();
  }
  
  init() {
    this.nextColor();
    this.startTimer();
    this.renderOptions();
  }
  
  nextColor() {
    this.currentColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    const display = document.querySelector('.color-display');
    if (display) {
      display.style.background = this.currentColor.hex;
      display.style.color = this.currentColor.hex;
    }
  }
  
  renderOptions() {
    const container = document.querySelector('.color-options');
    if (!container) return;
    
    container.innerHTML = '';
    const shuffled = [...this.colors].sort(() => Math.random() - 0.5);
    
    shuffled.forEach(color => {
      const btn = document.createElement('div');
      btn.className = 'color-option';
      btn.style.background = color.hex;
      btn.addEventListener('click', () => this.checkAnswer(color));
      container.appendChild(btn);
    });
  }
  
  checkAnswer(color) {
    if (color.name === this.currentColor.name) {
      this.score++;
      this.updateScore();
      this.nextColor();
      this.renderOptions();
    } else {
      this.timeLeft = Math.max(0, this.timeLeft - 2);
    }
  }
  
  updateScore() {
    const scoreEl = document.getElementById('colorScore');
    if (scoreEl) scoreEl.textContent = this.score;
  }
  
  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      const timerEl = document.getElementById('colorTimer');
      if (timerEl) timerEl.textContent = this.timeLeft;
      
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        alert(`Game Over! Your score: ${this.score}`);
        this.reset();
      }
    }, 1000);
  }
  
  reset() {
    this.score = 0;
    this.timeLeft = 30;
    this.updateScore();
    const timerEl = document.getElementById('colorTimer');
    if (timerEl) timerEl.textContent = this.timeLeft;
    this.nextColor();
    this.renderOptions();
    this.startTimer();
  }
}

// ========== REACTION TIME GAME ==========
class ReactionGame {
  constructor() {
    this.area = document.querySelector('.reaction-area');
    this.state = 'waiting'; // waiting, ready, clicked, result
    this.times = [];
    this.startTime = 0;
    this.timer = null;
    
    this.init();
  }
  
  init() {
    if (!this.area) return;
    
    this.area.classList.add('waiting');
    this.area.textContent = 'Click to Start';
    
    this.area.addEventListener('click', () => this.handleClick());
  }
  
  handleClick() {
    if (this.state === 'waiting' || this.state === 'result') {
      this.startWaiting();
    } else if (this.state === 'ready') {
      this.clickReady();
    } else if (this.state === 'clicked') {
      this.showResult();
    }
  }
  
  startWaiting() {
    this.state = 'waiting';
    this.area.classList.remove('ready', 'clicked', 'result');
    this.area.classList.add('waiting');
    this.area.textContent = 'Wait for green...';
    
    const delay = 2000 + Math.random() * 3000;
    this.timer = setTimeout(() => {
      this.ready();
    }, delay);
  }
  
  ready() {
    this.state = 'ready';
    this.startTime = Date.now();
    this.area.classList.remove('waiting', 'clicked', 'result');
    this.area.classList.add('ready');
    this.area.textContent = 'CLICK NOW!';
  }
  
  clickReady() {
    const reactionTime = Date.now() - this.startTime;
    this.times.push(reactionTime);
    
    this.state = 'clicked';
    this.area.classList.remove('waiting', 'ready', 'result');
    this.area.classList.add('clicked');
    this.area.textContent = `${reactionTime}ms`;
    
    clearTimeout(this.timer);
    
    setTimeout(() => {
      this.showResult();
    }, 1000);
  }
  
  showResult() {
    this.state = 'result';
    const avg = Math.round(this.times.reduce((a, b) => a + b, 0) / this.times.length);
    const best = Math.min(...this.times);
    
    this.area.classList.remove('waiting', 'ready', 'clicked');
    this.area.classList.add('result');
    this.area.innerHTML = `
      <div>
        <div style="font-size: 24px; margin-bottom: 10px;">Average: ${avg}ms</div>
        <div style="font-size: 18px; color: var(--gray);">Best: ${best}ms</div>
        <div style="font-size: 14px; color: var(--gray); margin-top: 10px;">Click to play again</div>
      </div>
    `;
  }
}

// ========== INITIALIZE GAMES ==========
let puzzleGame, memoryGame, colorMatchGame, reactionGame;

function initPuzzleGame() {
  if (document.querySelector('.puzzle-board')) {
    puzzleGame = new SlidingPuzzle();
  }
}

function initMemoryGame() {
  if (document.querySelector('.memory-grid')) {
    memoryGame = new MemoryGame();
  }
}

function initColorMatchGame() {
  if (document.querySelector('.color-display')) {
    colorMatchGame = new ColorMatchGame();
  }
}

function initReactionGame() {
  if (document.querySelector('.reaction-area')) {
    reactionGame = new ReactionGame();
  }
}

// Initialize games when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initPuzzleGame();
  initMemoryGame();
  initColorMatchGame();
  initReactionGame();
});
