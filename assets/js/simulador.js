const SIM_KEY = 'yaPuesTimerCompanion';

let state = {
  players: [],
  order: [],
  current: null,
  seconds: 60,
  timer: null,
  logs: []
};

const characters = [
  { name: 'Cholita', img: 'recursos/personajes (1).png' },
  { name: 'Carnavalito', img: 'recursos/personajes (2).png' },
  { name: 'Chico de la Madness', img: 'recursos/personajes (3).png' },
  { name: 'Trabajadora que recoge basura', img: 'recursos/personajes (4).png' },
  { name: 'Albañil', img: 'recursos/personajes (5).png' }
];

function save() {
  const clean = { ...state, timer: null };
  localStorage.setItem(SIM_KEY, JSON.stringify(clean));
}

function load() {
  try {
    state = { ...state, ...JSON.parse(localStorage.getItem(SIM_KEY) || '{}'), timer: null };
  } catch (error) {
    console.warn('No se pudo cargar la partida guardada.', error);
  }
}

function avatarFor(name) {
  return characters.find((character) => character.name === name)?.img || 'recursos/logo.png';
}

function getDraftPlayersFromForm() {
  const names = [...document.querySelectorAll('[data-name]')];
  const selects = [...document.querySelectorAll('[data-character]')];

  return names.map((nameInput, index) => ({
    name: nameInput.value.trim(),
    character: selects[index]?.value || characters[index % characters.length].name,
    score: state.players[index]?.score || 0
  }));
}

function setupPlayerFields() {
  const count = Number(document.querySelector('#playerCount')?.value || 3);
  const wrap = document.querySelector('#playerFields');
  if (!wrap) return;

  // Conserva lo que la persona ya escribió o seleccionó antes de reconstruir los campos.
  const draftPlayers = getDraftPlayersFromForm();

  wrap.innerHTML = '';

  for (let index = 0; index < count; index++) {
    const storedPlayer = state.players[index] || {};
    const draftPlayer = draftPlayers[index] || {};
    const selectedCharacter = draftPlayer.character || storedPlayer.character || characters[index % characters.length].name;
    const selectedName = draftPlayer.name || storedPlayer.name || '';

    wrap.insertAdjacentHTML(
      'beforeend',
      `<div class="player-input-card" data-player-card="${index}">
        <img data-avatar-preview="${index}" src="${avatarFor(selectedCharacter)}" alt="Avatar de ${selectedCharacter}">
        <div class="player-input-body">
          <label class="form-label">Jugador ${index + 1}</label>
          <input class="form-control mb-2" data-name="${index}" value="${selectedName}" placeholder="Nombre del jugador">
          <select class="form-select" data-character="${index}" aria-label="Elegir personaje para jugador ${index + 1}">
            ${characters
              .map(
                (character) =>
                  `<option value="${character.name}" ${selectedCharacter === character.name ? 'selected' : ''}>${character.name}</option>`
              )
              .join('')}
          </select>
        </div>
      </div>`
    );
  }

  // Antes se reconstruía todo el formulario al cambiar un select, por eso volvía a Cholita.
  // Ahora solo se actualiza la imagen del personaje seleccionado.
  document.querySelectorAll('[data-character]').forEach((select) => {
    select.addEventListener('change', (event) => {
      const index = event.currentTarget.dataset.character;
      const avatar = document.querySelector(`[data-avatar-preview="${index}"]`);
      if (avatar) avatar.src = avatarFor(event.currentTarget.value);
      if (avatar) avatar.alt = `Avatar de ${event.currentTarget.value}`;
    });
  });
}

function savePlayers() {
  const names = [...document.querySelectorAll('[data-name]')];
  const selects = [...document.querySelectorAll('[data-character]')];

  state.players = names.map((nameInput, index) => {
    const character = selects[index]?.value || characters[index % characters.length].name;
    return {
      name: nameInput.value.trim() || `Jugador ${index + 1}`,
      character,
      img: avatarFor(character),
      score: state.players[index]?.score || 0
    };
  });

  state.current = state.players[0] || null;
  addLog('Jugadores guardados. Ya pueden iniciar el temporizador.');
  save();
  renderAll();
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function sortTurnOrder() {
  if (!state.players.length) savePlayers();
  state.order = shuffle(state.players);
  state.current = state.order[0];
  addLog(`Orden sorteado: ${state.order.map((player) => player.name).join(' → ')}`);
  save();
  renderAll();
}

function startTimer() {
  clearInterval(state.timer);
  state.seconds = Number(document.querySelector('#timerSeconds')?.value || 60);
  renderTimer();
  state.timer = setInterval(() => {
    state.seconds--;
    renderTimer();
    if (state.seconds <= 0) {
      clearInterval(state.timer);
      addLog('Tiempo terminado. Ahora sorteen o continúen con argumentos.');
      renderLogs();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(state.timer);
}

function resetTimer() {
  pauseTimer();
  state.seconds = Number(document.querySelector('#timerSeconds')?.value || 60);
  renderTimer();
}

function voteWinner(index) {
  const player = state.players[index];
  if (!player) return;
  player.score += 1;
  addLog(`${player.name} ganó la ronda. Ranking actualizado.`);
  save();
  renderAll();
  showConfetti();
}

function addLog(text) {
  state.logs.unshift({
    text,
    time: new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })
  });
  state.logs = state.logs.slice(0, 8);
  save();
}

function renderTimer() {
  const element = document.querySelector('#timerDisplay');
  if (!element) return;
  const minutes = String(Math.floor(state.seconds / 60)).padStart(2, '0');
  const seconds = String(state.seconds % 60).padStart(2, '0');
  element.textContent = `${minutes}:${seconds}`;
}

function renderSpeaker() {
  const name = document.querySelector('#currentSpeaker');
  const avatar = document.querySelector('#speakerAvatar');
  if (!name) return;
  name.textContent = state.current?.name || 'Guarda jugadores';
  if (avatar) avatar.src = state.current?.img || 'recursos/logo-blanco.png';
}

function renderOrder() {
  const element = document.querySelector('#turnOrder');
  if (!element) return;
  element.innerHTML = state.order.length
    ? state.order
        .map(
          (player, index) =>
            `<div class="turn-item flip-in"><img src="${player.img}" alt="${player.character}"><strong>${player.name}</strong><span class="turn-badge">${index + 1}</span></div>`
        )
        .join('')
    : '<div class="empty-state">Presiona “Sortear orden”.</div>';
}

function renderWinners() {
  const element = document.querySelector('#winnerButtons');
  if (!element) return;
  element.innerHTML = state.players.length
    ? state.players
        .map((player, index) => `<button class="btn-yp btn-outline-yp btn-small" onclick="voteWinner(${index})">${player.name}</button>`)
        .join('')
    : '<div class="empty-state">Guarda jugadores para registrar ganadores.</div>';
}

function renderRanking() {
  const element = document.querySelector('#rankingList');
  if (!element) return;
  const list = [...state.players].sort((a, b) => b.score - a.score);
  element.innerHTML = list.length
    ? list
        .map(
          (player, index) =>
            `<div class="rank-row"><span><strong>${index + 1}. ${player.name}</strong><br><small>${player.character}</small></span><span>${player.score} rondas</span></div>`
        )
        .join('')
    : '<div class="empty-state">El ranking aparecerá aquí.</div>';
}

function renderLogs() {
  const element = document.querySelector('#logBox');
  if (!element) return;
  element.innerHTML = state.logs.length
    ? state.logs.map((log) => `<div class="log-item"><strong>${log.time}</strong> ${log.text}</div>`).join('')
    : '<div class="empty-state">Aquí se guardan las rondas.</div>';
}

function showConfetti() {
  const area = document.querySelector('.sim-main');
  if (!area) return;
  for (let i = 0; i < 24; i++) {
    const confetti = document.createElement('span');
    confetti.className = 'confetti-piece';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '0';
    confetti.style.background = ['#f9c743', '#ef5c22', '#77c5ee', '#0c6a40', '#8d36c6'][i % 5];
    area.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1800);
  }
}

function resetGame() {
  if (confirm('¿Reiniciar temporizador, jugadores y ranking?')) {
    localStorage.removeItem(SIM_KEY);
    location.reload();
  }
}

function renderAll() {
  setupPlayerFields();
  renderTimer();
  renderSpeaker();
  renderOrder();
  renderWinners();
  renderRanking();
  renderLogs();
}

document.addEventListener('DOMContentLoaded', () => {
  load();
  renderAll();
  document.querySelector('#playerCount')?.addEventListener('change', setupPlayerFields);
});
