const internProfiles = [
  {
    name: 'Christian Glover',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/christian-gl0ver/'
  },
  {
    name: 'Carina Curiel Alaniz',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/carina-curiel-alaniz/'
  },
  {
    name: 'Viri Pesce',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/viripesce/'
  },
  {
    name: 'Abdulaziz Abdelrhman',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/abdelaziz-abdelrhman/'
  },
  {
    name: 'Mohomed Akbar',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/mohamad-abakar/'
  },
  {
    name: 'Valentina Loaisiga',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/valentina-loaisiga/'
  },
  {
    name: 'Sega Khafif',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/sega-khafif-90484823b/'
  },
  {
    name: 'Mustafa Nomair',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/mustafa-nomair/'
  },
  {
    name: 'Emily Mojica',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/emilymojica/'
  },
  {
    name: 'Jared Lizama',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/jaredglizama/'
  },
  {
    name: 'Ahmed Ataelfadeel',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/ahmed-ataelfadeel/'
  },
  {
    name: 'Simon Solomon',
    headline: 'Project Intern',
    bio: '[Default]',
    url: 'https://www.linkedin.com/in/simon-solomon-/'
  }
];

const learningVideos = [
  { id: '15jk6Ja337Y', title: 'What is Artificial Intelligence?', blurb: 'A beginner-focused introduction to AI concepts, history, and applications.' },
  { id: 'iqJVVoluJzY', title: 'Machine Learning Explained', blurb: 'A concise overview of machine learning and where it is useful in practice.' },
  { id: 'aircAruvnKk', title: 'Neural Networks Basics', blurb: 'A visual explanation of how neural networks are structured and why they work.' },
  { id: 'ofzk9zzcXjM', title: 'Generative AI in Plain English', blurb: 'Andrew Ng discusses what generative AI is good at and how people can use it well.' }
];

function initFloatingNav() {
  const nav = document.getElementById('floatingNav');
  const toggleNav = () => {
    nav.classList.toggle('visible', window.scrollY > window.innerHeight * 0.82);
  };

  toggleNav();
  window.addEventListener('scroll', toggleNav, { passive: true });
}

function initParticles() {
  const field = document.getElementById('particleField');
  if (!field) return;

  for (let i = 0; i < 28; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${8 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * -12}s`;
    particle.style.opacity = `${0.2 + Math.random() * 0.6}`;
    field.appendChild(particle);
  }
}

function initRevealAnimations() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'opacity 700ms ease, transform 700ms ease';
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  items.forEach((item) => observer.observe(item));

  if (window.gsap) {
    gsap.to('.orb-a, .orb-b, .orb-c', {
      y: 16,
      duration: 5,
      stagger: 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}

function initCountdown() {
  const target = new Date('2026-09-20T10:00:00-07:00').getTime();
  const slots = {
    days: document.querySelector('[data-unit="days"]'),
    hours: document.querySelector('[data-unit="hours"]'),
    minutes: document.querySelector('[data-unit="minutes"]'),
    seconds: document.querySelector('[data-unit="seconds"]')
  };

  const render = () => {
    const diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    slots.days.textContent = String(days).padStart(2, '0');
    slots.hours.textContent = String(hours).padStart(2, '0');
    slots.minutes.textContent = String(minutes).padStart(2, '0');
    slots.seconds.textContent = String(seconds).padStart(2, '0');
  };

  render();
  window.setInterval(render, 1000);
}

function initialsFromName(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function buildAvatarMarkup(profile) {
  if (profile.image) {
    return `<img src="${profile.image}" alt="${profile.name} profile photo">`;
  }

  return `<span>${initialsFromName(profile.name)}</span>`;
}

async function tryHydrateLinkedInProfile(profile) {
  const linkedInToken = window.LINKEDIN_ACCESS_TOKEN;
  if (linkedInToken) {
    try {
      const response = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${linkedInToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return {
          ...profile,
          name: data.localizedFirstName && data.localizedLastName
            ? `${data.localizedFirstName} ${data.localizedLastName}`
            : profile.name,
          headline: data.headline || profile.headline,
          bio: data.summary || profile.bio
        };
      }
    } catch (error) {
      console.debug('LinkedIn API unavailable, falling back.', error);
    }
  }

  const proxyBase = window.OPEN_GRAPH_PROXY;
  if (proxyBase) {
    try {
      const response = await fetch(`${proxyBase}?url=${encodeURIComponent(profile.url)}`);
      if (response.ok) {
        const data = await response.json();
        return {
          ...profile,
          name: data.title || profile.name,
          headline: data.description || profile.headline,
          image: data.image || profile.image
        };
      }
    } catch (error) {
      console.debug('OpenGraph fallback unavailable, using static profile.', error);
    }
  }

  return profile;
}

async function renderInterns() {
  const grid = document.getElementById('internGrid');
  if (!grid) return;

  const profiles = await Promise.all(internProfiles.map((profile) => tryHydrateLinkedInProfile(profile)));

  grid.innerHTML = profiles.map((profile) => `
    <article class="intern-card reveal" tabindex="0" data-url="${profile.url}" aria-label="${profile.name} LinkedIn profile card">
      <div class="intern-banner"></div>
      <div class="intern-body">
        <div class="intern-avatar">${buildAvatarMarkup(profile)}</div>
        <div class="intern-info">
          <p class="card-headline">LinkedIn Preview</p>
          <h3>${profile.name}</h3>
          <p class="intern-role">${profile.headline}</p>
          <p>${profile.bio}</p>
        </div>
        <div class="intern-meta">
          <span class="panel-label">Open Profile</span>
          <span class="linkedin-button"><span class="linkedin-icon">in</span>LinkedIn</span>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.intern-card').forEach((card) => {
    const openProfile = () => {
      window.open(card.dataset.url, '_blank', 'noopener,noreferrer');
    };
    card.addEventListener('click', openProfile);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProfile();
      }
    });
  });

  initRevealAnimations();
}

function renderVideos() {
  const grid = document.getElementById('videoGrid');
  if (!grid) return;

  grid.innerHTML = learningVideos.map((video) => `
    <a class="video-card reveal" href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noreferrer">
      <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title} YouTube thumbnail">
      <div class="video-card-copy">
        <h3>${video.title}</h3>
        <p>${video.blurb}</p>
      </div>
    </a>
  `).join('');
}

function createBoard() {
  return Array.from({ length: 6 }, () => Array(7).fill(null));
}

const connectFourState = {
  board: createBoard(),
  currentPlayer: 'player',
  isLocked: false,
  winner: null,
  mode: 'fallback',
  module: null
};

function findOpenRow(board, column) {
  for (let row = board.length - 1; row >= 0; row -= 1) {
    if (!board[row][column]) return row;
  }
  return -1;
}

function checkWinner(board, token) {
  const rows = board.length;
  const cols = board[0].length;
  const lines = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1]
  ];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (board[row][col] !== token) continue;
      for (const [dr, dc] of lines) {
        let streak = 1;
        while (
          streak < 4 &&
          board[row + dr * streak] &&
          board[row + dr * streak][col + dc * streak] === token
        ) {
          streak += 1;
        }
        if (streak === 4) return true;
      }
    }
  }

  return false;
}

function boardFull(board) {
  return board[0].every(Boolean);
}

function renderConnectFour() {
  const root = document.getElementById('connectFourBoard');
  if (!root) return;

  root.innerHTML = '';
  connectFourState.board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `connect-cell ${cell || ''}`;
      button.setAttribute('aria-label', `Column ${colIndex + 1}, row ${rowIndex + 1}`);
      button.addEventListener('click', () => playerMove(colIndex));
      root.appendChild(button);
    });
  });
}

function renderExternalConnectFour() {
  const root = document.getElementById('connectFourBoard');
  if (!root || !connectFourState.module) return;

  root.innerHTML = '';
  for (let row = 5; row >= 0; row -= 1) {
    for (let col = 0; col < 7; col += 1) {
      const value = connectFourState.module._getCell(row, col);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'connect-cell';
      if (value === 1) button.classList.add('player');
      if (value === 2) button.classList.add('ai');
      button.setAttribute('aria-label', `Column ${col + 1}, row ${row + 1}`);
      button.addEventListener('click', () => playerMove(col));
      root.appendChild(button);
    }
  }
}

function setConnectFourStatus(message) {
  const status = document.getElementById('connectFourStatus');
  if (status) status.textContent = message;
}

function scoreMove(board, column, token) {
  const row = findOpenRow(board, column);
  if (row === -1) return -Infinity;
  const clone = board.map((boardRow) => [...boardRow]);
  clone[row][column] = token;
  if (checkWinner(clone, token)) return 100;

  let score = 0;
  const centerBias = 3 - Math.abs(3 - column);
  score += centerBias * 4;

  const opponent = token === 'ai' ? 'player' : 'ai';
  for (let nextCol = 0; nextCol < 7; nextCol += 1) {
    const nextRow = findOpenRow(clone, nextCol);
    if (nextRow === -1) continue;
    clone[nextRow][nextCol] = opponent;
    if (checkWinner(clone, opponent)) score -= 80;
    clone[nextRow][nextCol] = null;
  }

  return score;
}

function chooseAiColumn(board) {
  const validColumns = board[0].map((_, index) => index).filter((column) => findOpenRow(board, column) !== -1);

  for (const column of validColumns) {
    const row = findOpenRow(board, column);
    const clone = board.map((boardRow) => [...boardRow]);
    clone[row][column] = 'ai';
    if (checkWinner(clone, 'ai')) return column;
  }

  for (const column of validColumns) {
    const row = findOpenRow(board, column);
    const clone = board.map((boardRow) => [...boardRow]);
    clone[row][column] = 'player';
    if (checkWinner(clone, 'player')) return column;
  }

  return validColumns
    .map((column) => ({ column, score: scoreMove(board, column, 'ai') }))
    .sort((a, b) => b.score - a.score)[0]?.column ?? validColumns[0];
}

function dropToken(column, token) {
  if (connectFourState.mode === 'wasm' && connectFourState.module) {
    const tokenIndex = token === 'player' ? 0 : 1;
    const row = connectFourState.module._makeMove(column, tokenIndex);
    if (row === -1) return false;
    renderExternalConnectFour();
    return { row, column };
  }

  const row = findOpenRow(connectFourState.board, column);
  if (row === -1) return false;
  connectFourState.board[row][column] = token;
  renderConnectFour();
  return { row, column };
}

function handleEndState(token) {
  if (connectFourState.mode === 'wasm' && connectFourState.module) {
    const lastTokenIndex = token === 'player' ? 0 : 1;
    const boardValues = token === 'player' ? 'You win. The AI got outplayed.' : 'AI wins this round. Reset to try again.';

    if (connectFourState.lastMove && connectFourState.module._checkWin(connectFourState.lastMove.row, connectFourState.lastMove.column, lastTokenIndex)) {
      connectFourState.winner = token;
      connectFourState.isLocked = true;
      setConnectFourStatus(boardValues);
      return true;
    }

    if (connectFourState.module._checkDraw()) {
      connectFourState.winner = 'draw';
      connectFourState.isLocked = true;
      setConnectFourStatus('Draw. Reset the board for another round.');
      return true;
    }

    return false;
  }

  if (checkWinner(connectFourState.board, token)) {
    connectFourState.winner = token;
    connectFourState.isLocked = true;
    setConnectFourStatus(token === 'player' ? 'You win. The AI got outplayed.' : 'AI wins this round. Reset to try again.');
    return true;
  }

  if (boardFull(connectFourState.board)) {
    connectFourState.winner = 'draw';
    connectFourState.isLocked = true;
    setConnectFourStatus('Draw. Reset the board for another round.');
    return true;
  }

  return false;
}

function aiMove() {
  if (connectFourState.isLocked) return;
  connectFourState.isLocked = true;
  setConnectFourStatus('AI is thinking...');

  window.setTimeout(() => {
    if (connectFourState.mode === 'wasm' && connectFourState.module) {
      const packedMove = connectFourState.module._makeAIMoveWithPos(1);
      if (packedMove === -1) {
        connectFourState.isLocked = false;
        return;
      }
      connectFourState.lastMove = {
        row: packedMove >> 8,
        column: packedMove & 0xFF
      };
      renderExternalConnectFour();
    } else {
      const column = chooseAiColumn(connectFourState.board);
      const move = dropToken(column, 'ai');
      connectFourState.lastMove = move;
    }
    if (!handleEndState('ai')) {
      connectFourState.isLocked = false;
      setConnectFourStatus('Your move. Drop a blue disk.');
    }
  }, 420);
}

function playerMove(column) {
  if (connectFourState.isLocked || connectFourState.winner) return;
  const move = dropToken(column, 'player');
  if (!move) return;
  connectFourState.lastMove = move;
  if (!handleEndState('player')) aiMove();
}

function resetConnectFour() {
  connectFourState.currentPlayer = 'player';
  connectFourState.isLocked = false;
  connectFourState.winner = null;
  connectFourState.lastMove = null;
  if (connectFourState.mode === 'wasm' && connectFourState.module) {
    connectFourState.module._resetBoard();
    renderExternalConnectFour();
  } else {
    connectFourState.board = createBoard();
    renderConnectFour();
  }
  setConnectFourStatus('Your move. Drop a blue disk.');
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

async function tryLoadExternalConnectFour() {
  const candidate = './connect4_web-main/connect4.js';
  try {
    await loadScript(candidate);
    if (typeof window.Module !== 'function') return false;
    const moduleInstance = await window.Module();
    moduleInstance._initBoard(6, 7);
    connectFourState.mode = 'wasm';
    connectFourState.module = moduleInstance;
    renderExternalConnectFour();
    setConnectFourStatus('Your move. Drop a blue disk.');
    return true;
  } catch (error) {
    return false;
  }
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = state * 16807 % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function drawPromptArt(prompt) {
  const canvas = document.getElementById('promptPainterCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const seed = hashString(prompt || 'AI Community');
  const random = seededRandom(seed);
  const gradients = [
    ['#f7feff', '#8eeeff', '#73b2ff'],
    ['#ebffff', '#a2ffd9', '#7adfff'],
    ['#ffffff', '#8bddff', '#5ca7ff']
  ];
  const palette = gradients[seed % gradients.length];

  const background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  background.addColorStop(0, palette[0]);
  background.addColorStop(0.5, palette[1]);
  background.addColorStop(1, palette[2]);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 22; i += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const radius = 20 + random() * 80;
    const glow = ctx.createRadialGradient(x, y, 5, x, y, radius);
    glow.addColorStop(0, `rgba(255,255,255,${0.4 + random() * 0.4})`);
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 36; i += 1) {
    ctx.save();
    ctx.translate(random() * canvas.width, random() * canvas.height);
    ctx.rotate(random() * Math.PI * 2);
    ctx.fillStyle = `hsla(${180 + random() * 60}, 90%, ${65 + random() * 20}%, ${0.18 + random() * 0.28})`;
    const width = 20 + random() * 110;
    const height = 12 + random() * 60;
    ctx.beginPath();
    ctx.roundRect(-width / 2, -height / 2, width, height, 999);
    ctx.fill();
    ctx.restore();
  }

  const gridSize = 24;
  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      const noise = random();
      if (noise > 0.72) {
        ctx.fillStyle = `hsla(${190 + random() * 70}, 100%, ${80 + random() * 12}%, 0.44)`;
        ctx.fillRect(x, y, gridSize - 3, gridSize - 3);
      }
    }
  }

  ctx.fillStyle = 'rgba(7, 42, 69, 0.72)';
  ctx.font = '600 24px "Space Grotesk", sans-serif';
  ctx.fillText(prompt || 'AI Community', 22, canvas.height - 28);
}

function initPromptPainter() {
  const input = document.getElementById('promptInput');
  const button = document.getElementById('generatePromptArt');
  if (!input || !button) return;

  const generate = () => drawPromptArt(input.value.trim());
  button.addEventListener('click', generate);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') generate();
  });

  input.value = 'future city';
  generate();
}

async function initConnectFour() {
  const loaded = await tryLoadExternalConnectFour();
  if (!loaded) {
    connectFourState.mode = 'fallback';
    connectFourState.module = null;
    connectFourState.board = createBoard();
    renderConnectFour();
    setConnectFourStatus('Your move. Drop a blue disk.');
  } else {
    resetConnectFour();
  }
  const reset = document.getElementById('resetConnectFour');
  if (reset) reset.addEventListener('click', resetConnectFour);
}

window.addEventListener('DOMContentLoaded', async () => {
  initFloatingNav();
  initParticles();
  initRevealAnimations();
  initCountdown();
  renderVideos();
  await renderInterns();
  initPromptPainter();
  await initConnectFour();
});
