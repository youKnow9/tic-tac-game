import { resetGame, gameCellsListener } from "./main.js";
import { nameP1, nameP2 } from "./constants.js";

const gameBtn = document.getElementById('startBtn');
const modalStart = document.getElementById('startWindows');
const gameWindows = document.getElementById('gameWindows');
const resrtGame = document.getElementById('resrtGame');
const winModal = document.getElementById('winWindows');
const playerName = document.getElementById('playerNameWin');
const winGame = document.getElementById('winGame');
const dwaw = document.getElementById('drawModal');
const drawGame = document.getElementById('drawGame');


gameBtn.addEventListener('click', startGame);
resrtGame.addEventListener('click', reset);
winGame.addEventListener('click', clouseWinModal);
drawGame.addEventListener('click', clouseWinModal);

function startGame(e) {
	gameCellsListener();
	modalStart.classList.add('modal_window');
	gameWindows.classList.remove('modal_window');
	gameBtn.removeEventListener('click', startGame);
};

function reset(e) {
	resetGame(e);
};

function winGame1() {
	winModal.classList.remove('modal_window');
	gameWindows.classList.add('modal_window');
	dwaw.classList.add('modal_window');
	playerName.innerText = `Победитель ${nameP1[0]}!`;
	reset();
}

function winGame2() {
	winModal.classList.remove('modal_window');
	dwaw.classList.add('modal_window');
	gameWindows.classList.add('modal_window');
	playerName.innerText = `Победитель ${nameP2[0]}!`;
	reset();
}

function clouseWinModal() {
	winModal.classList.add('modal_window');
	dwaw.classList.add('modal_window');
	gameWindows.classList.remove('modal_window');
	reset();
}

function checkDraw(a) {
	dwaw.classList.remove("modal_window");
	gameWindows.classList.add('modal_window');
	reset();
}

export { startGame, reset, winGame1, winGame2, checkDraw }