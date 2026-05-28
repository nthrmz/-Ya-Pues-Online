// Datos base del prototipo. Están separados de la lógica para que sea fácil exponerlos o cambiarlos.
const characters = [
  { name: "Cholita", role: "Exploradora", avatar: "👒", color: "#1f9fd1" },
  { name: "Carnavalito", role: "Cronista", avatar: "🎭", color: "#e3343f" },
  { name: "Albañil", role: "Constructor", avatar: "👷", color: "#f47a1f" },
  { name: "Chico de la Madness", role: "Influencer", avatar: "😎", color: "#8b47d9" },
  { name: "Trabajadora que recoge basura", role: "Cuidadora", avatar: "🧹", color: "#29964a" }
];

const situations = [
  "¿Dónde llevarías a una cita a comer?",
  "¿Qué lugar mostrarías primero a alguien que visita Cochabamba?",
  "¿Qué comida representa mejor a un verdadero cochabambino?",
  "¿Dónde llevarías a tu familia un domingo?",
  "¿Qué lugar defenderías como el más bonito de la ciudad?"
];

const cards = [
  { type: "food", title: "Silpancho", emoji: "🍳", description: "Plato emblema de Cochabamba. Sabor que conquista a todos.", color: "#ff7a1a" },
  { type: "food", title: "Pique macho", emoji: "🥩", description: "Contundente, picante y perfecto para defender con carácter.", color: "#ff7a1a" },
  { type: "food", title: "Salteñas", emoji: "🥟", description: "La pausa jugosa que salva cualquier mañana cochabambina.", color: "#ff7a1a" },
  { type: "food", title: "Chicharrón", emoji: "🍖", description: "Domingo, familia y mote: argumento difícil de vencer.", color: "#ff7a1a" },
  { type: "food", title: "Anticucho", emoji: "🍢", description: "Callejero, nocturno y con sabor a paseo por la ciudad.", color: "#ff7a1a" },
  { type: "food", title: "Sopa de maní", emoji: "🥣", description: "Calientita, casera y poderosa para convencer con cariño.", color: "#ff7a1a" },
  { type: "place", title: "Cristo de la Concordia", emoji: "🗽", description: "La vista clásica de la ciudad y la meta del tablero.", color: "#39b85a" },
  { type: "place", title: "Laguna Alalay", emoji: "🌊", description: "Un lugar tranquilo para respirar, caminar y conversar.", color: "#39b85a" },
  { type: "place", title: "Palacio Portales", emoji: "🏛️", description: "Elegante, histórico y perfecto para una visita con estilo.", color: "#39b85a" },
  { type: "place", title: "Jardín Botánico", emoji: "🌿", description: "Naturaleza en la ciudad para una defensa fresca y relajada.", color: "#39b85a" },
  { type: "place", title: "La Cancha", emoji: "🛍️", description: "Caótica, enorme y auténtica: aquí se encuentra de todo.", color: "#39b85a" },
  { type: "place", title: "Plaza 14 de Septiembre", emoji: "⛲", description: "Centro histórico, paseo familiar y corazón de la ciudad.", color: "#39b85a" },
  { type: "extra", title: "Llajua poderosa", emoji: "🌶️", description: "Suma +1 voto a tu resultado de ronda.", color: "#8b47d9", effect: "plusVote" },
  { type: "extra", title: "Buen lugar, pues", emoji: "📍", description: "Si elegiste un lugar y ganas, avanzas 2 casillas.", color: "#8b47d9", effect: "placeBoost" },
  { type: "extra", title: "Casero confiable", emoji: "🍽️", description: "Si elegiste comida y ganas, avanzas 2 casillas.", color: "#8b47d9", effect: "foodBoost" },
  { type: "extra", title: "Cambio de situación", emoji: "🔄", description: "Cambia inmediatamente la carta de situación.", color: "#8b47d9", effect: "changeSituation" },
  { type: "extra", title: "No pues", emoji: "🚫", description: "Cancela el efecto de una carta extra rival en esta ronda.", color: "#8b47d9", effect: "cancel" },
  { type: "extra", title: "Trufi lleno", emoji: "🚌", description: "Un jugador pierde una ronda por quedarse sin asiento.", color: "#8b47d9", effect: "skip" }
];

const state = {
  selectedCharacter: null,
  selectedCard: null,
  selectionConfirmed: false,
  revealed: false,
  currentSituation: 0,
  hand: [],
  players: [
    { name: "Ana", avatar: "👒", character: "Cholita", points: 0, position: 0, color: "#1f9fd1" },
    { name: "Luis", avatar: "🎭", character: "Carnavalito", points: 0, position: 0, color: "#e3343f" },
    { name: "Majo", avatar: "😎", character: "Chico de la Madness", points: 0, position: 0, color: "#8b47d9" },
    { name: "Tere", avatar: "👷", character: "Albañil", points: 0, position: 0, color: "#f47a1f" },
    { name: "Diego", avatar: "🧹", character: "Trabajadora que recoge basura", points: 0, position: 0, color: "#29964a" }
  ]
};

const screens = {
  hero: document.querySelector("#hero"),
  characters: document.querySelector("#characterScreen"),
  board: document.querySelector("#boardScreen")
};

const characterGrid = document.querySelector("#characterGrid");
const continueToBoard = document.querySelector("#continueToBoard");
const pathGrid = document.querySelector("#pathGrid");
const playersList = document.querySelector("#playersList");
const situationCard = document.querySelector("#situationCard");
const handCards = document.querySelector("#handCards");
const hiddenSelection = document.querySelector("#hiddenSelection");
const revealedCards = document.querySelector("#revealedCards");
const confirmSelection = document.querySelector("#confirmSelection");
const revealCards = document.querySelector("#revealCards");
const argumentText = document.querySelector("#argumentText");
const charCount = document.querySelector("#charCount");
const argumentStatus = document.querySelector("#argumentStatus");
const voteOptions = document.querySelector("#voteOptions");
const roundResult = document.querySelector("#roundResult");
const podium = document.querySelector("#podium");
const rankingList = document.querySelector("#rankingList");

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[screenName].classList.add("is-active");
}

// Construye la pantalla de personajes y guarda la elección principal del jugador local.
function drawCharacters() {
  characterGrid.innerHTML = "";
  characters.forEach((character) => {
    const button = document.createElement("button");
    button.className = "character-card";
    button.style.setProperty("--character-color", character.color);
    button.innerHTML = `
      <span class="character-avatar">${character.avatar}</span>
      <h3>${character.name}</h3>
      <p>${character.role}</p>
    `;
    button.addEventListener("click", () => {
      state.selectedCharacter = character;
      state.players[0] = {
        ...state.players[0],
        avatar: character.avatar,
        character: character.name,
        color: character.color
      };
      continueToBoard.disabled = false;
      drawCharacters();
    });
    if (state.selectedCharacter?.name === character.name) {
      button.classList.add("is-selected");
    }
    characterGrid.appendChild(button);
  });
}

// Dibuja una ruta de 18 casillas con fichas de jugadores sobre la posición actual.
function drawPath() {
  pathGrid.innerHTML = "";
  const colors = ["#1f73d1", "#36bde8", "#ffca2c", "#ff7a1a", "#f34f68", "#39b85a", "#8b47d9"];
  for (let index = 0; index < 18; index++) {
    const cell = document.createElement("div");
    cell.className = "path-cell";
    cell.style.background = colors[index % colors.length];
    cell.innerHTML = `<span>${index + 1}</span><div class="tokens"></div>`;
    const tokens = cell.querySelector(".tokens");
    state.players
      .filter((player) => player.position === index)
      .forEach((player) => {
        const token = document.createElement("span");
        token.style.setProperty("--token-color", player.color);
        token.textContent = player.avatar;
        tokens.appendChild(token);
      });
    pathGrid.appendChild(cell);
  }
}

// Actualiza el panel lateral de jugadores con personaje, color y puntaje.
function drawPlayers() {
  playersList.innerHTML = "";
  state.players.forEach((player) => {
    const chip = document.createElement("div");
    chip.className = "player-chip";
    chip.style.setProperty("--player-color", player.color);
    chip.innerHTML = `
      <span>${player.avatar}</span>
      <div>${player.name}<br><small>${player.character}</small></div>
      <strong>${player.points} pts</strong>
    `;
    playersList.appendChild(chip);
  });
}

// Muestra la pregunta de debate activa en formato de carta grande.
function drawSituation() {
  situationCard.innerHTML = `
    <div>
      <div class="bubble">💬</div>
      <h4>${situations[state.currentSituation]}</h4>
    </div>
  `;
}

function pickRandom(list, amount) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, amount);
}

// Reparte una mano equilibrada: 3 comidas, 3 lugares y 2 extras.
function dealHand() {
  state.hand = [
    ...pickRandom(cards.filter((card) => card.type === "food"), 3),
    ...pickRandom(cards.filter((card) => card.type === "place"), 3),
    ...pickRandom(cards.filter((card) => card.type === "extra"), 2)
  ];
  state.selectedCard = null;
  state.selectionConfirmed = false;
  state.revealed = false;
  drawHand();
  drawSelection();
}

// Genera una carta reutilizable para la mano, la selección y las reveladas.
function createCard(card, isSelectable = false) {
  const article = document.createElement(isSelectable ? "button" : "article");
  article.className = "game-card";
  article.style.setProperty("--card-color", card.color);
  article.innerHTML = `
    <h4>${card.title}</h4>
    <div class="card-emoji">${card.emoji}</div>
    <p>${card.description}</p>
  `;
  if (isSelectable) {
    article.addEventListener("click", () => {
      state.selectedCard = card;
      state.selectionConfirmed = false;
      state.revealed = false;
      confirmSelection.disabled = false;
      revealCards.disabled = true;
      drawHand();
      drawSelection();
    });
    if (state.selectedCard?.title === card.title) {
      article.classList.add("is-selected");
    }
  }
  return article;
}

function drawHand() {
  handCards.innerHTML = "";
  state.hand.forEach((card) => handCards.appendChild(createCard(card, true)));
}

function drawSelection() {
  hiddenSelection.innerHTML = "";
  revealedCards.innerHTML = "";

  if (!state.selectedCard) {
    hiddenSelection.innerHTML = `<div class="card-back">Elige una carta</div>`;
    return;
  }

  if (!state.revealed) {
    hiddenSelection.innerHTML = `<div class="card-back">Carta oculta<br>🃏</div>`;
  } else {
    revealedCards.appendChild(createCard(state.selectedCard));
  }
}

function drawVoteOptions() {
  voteOptions.innerHTML = "";
  state.players.forEach((player, index) => {
    const card = document.createElement("div");
    card.className = "vote-card";
    card.innerHTML = `
      <div class="avatar">${player.avatar}</div>
      <strong>${player.name}</strong>
      <small>${player.character}</small>
      <button type="button">Votar</button>
    `;
    card.querySelector("button").addEventListener("click", () => voteForPlayer(index));
    voteOptions.appendChild(card);
  });
}

// Calcula efectos simples de cartas extra para el avance del ganador.
function getAdvanceForWinner(winner) {
  let advance = 1;
  const card = state.selectedCard;
  if (!card || winner.name !== "Ana") return advance;
  if (card.effect === "placeBoost" || (card.type === "place" && card.title === "Buen lugar, pues")) advance = 2;
  if (card.effect === "foodBoost" || (card.type === "food" && card.title === "Casero confiable")) advance = 2;
  return advance;
}

// Simula una votación local: suma puntos, mueve ficha y refresca ranking.
function voteForPlayer(playerIndex) {
  if (!state.revealed) {
    roundResult.textContent = "Primero revela la carta seleccionada para poder votar.";
    return;
  }

  const winner = state.players[playerIndex];
  const extraVote = state.selectedCard?.effect === "plusVote" && winner.name === "Ana" ? 1 : 0;
  const advance = getAdvanceForWinner(winner);
  winner.points += 100 + extraVote * 50;
  winner.position = Math.min(17, winner.position + advance);
  roundResult.textContent = `${winner.name} ganó la ronda y avanza ${advance} casilla${advance > 1 ? "s" : ""}.`;

  if (state.selectedCard?.effect === "changeSituation") {
    nextSituation();
    roundResult.textContent += " La carta extra cambió la situación.";
  }

  state.selectedCard = null;
  state.selectionConfirmed = false;
  state.revealed = false;
  drawAll();
}

// Ordena jugadores y pinta el podio con canastón dorado, plateado y bronce.
function drawRanking() {
  const ranked = [...state.players].sort((a, b) => b.points - a.points);
  const prizes = [
    { className: "second", label: "2", basket: "🧺 plateado" },
    { className: "first", label: "1", basket: "🧺 dorado" },
    { className: "third", label: "3", basket: "🧺 bronce" }
  ];
  const podiumPlayers = [ranked[1], ranked[0], ranked[2]];

  podium.innerHTML = "";
  prizes.forEach((prize, index) => {
    const player = podiumPlayers[index] || ranked[index];
    const place = document.createElement("div");
    place.className = `podium-place ${prize.className}`;
    place.innerHTML = `<span>${player?.avatar || "🎁"}</span><strong>${prize.label}</strong><small>${player?.name || "Libre"}</small><small>${prize.basket}</small>`;
    podium.appendChild(place);
  });

  rankingList.innerHTML = "";
  ranked.forEach((player) => {
    const item = document.createElement("li");
    item.textContent = `${player.name} (${player.character}) - ${player.points} pts - casilla ${player.position + 1}`;
    rankingList.appendChild(item);
  });
}

function nextSituation() {
  state.currentSituation = (state.currentSituation + 1) % situations.length;
  drawSituation();
}

function drawAll() {
  drawPath();
  drawPlayers();
  drawSituation();
  drawHand();
  drawSelection();
  drawVoteOptions();
  drawRanking();
  confirmSelection.disabled = !state.selectedCard || state.selectionConfirmed;
  revealCards.disabled = !state.selectionConfirmed || state.revealed;
}

document.querySelector("#startGame").addEventListener("click", () => showScreen("characters"));
continueToBoard.addEventListener("click", () => {
  showScreen("board");
  if (state.hand.length === 0) dealHand();
  drawAll();
});

document.querySelector("#turnButton").addEventListener("click", () => {
  roundResult.textContent = "Tu turno: elige una carta y prepara tu argumento.";
});

document.querySelector("#newSituation").addEventListener("click", nextSituation);
document.querySelector("#dealCards").addEventListener("click", dealHand);

confirmSelection.addEventListener("click", () => {
  state.selectionConfirmed = true;
  confirmSelection.disabled = true;
  revealCards.disabled = false;
  roundResult.textContent = "Carta confirmada. Está boca abajo hasta revelar.";
  drawSelection();
});

revealCards.addEventListener("click", () => {
  state.revealed = true;
  revealCards.disabled = true;
  roundResult.textContent = "Carta revelada. Ahora pueden escuchar argumentos y votar.";
  drawSelection();
});

argumentText.addEventListener("input", () => {
  charCount.textContent = `${argumentText.value.length} / 500 caracteres`;
});

document.querySelector("#sendArgument").addEventListener("click", () => {
  const text = argumentText.value.trim();
  argumentStatus.textContent = text
    ? "Argumento enviado para la ronda. Ahora toca votar."
    : "Escribe un argumento antes de enviarlo.";
});

drawCharacters();
drawAll();
