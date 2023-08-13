import { resetGame, gameCellsListener } from "./main.js";
import { nameP1, nameP2 } from "./constants.js";

const gameBtn = document.getElementById('startBtn');
const modalStart = document.getElementById('startWindows');
const gameWindows = document.getElementById('gameWindows');
const resetGameBtn = document.getElementById('resetGame');
const winModal = document.getElementById('winWindows');
const playerName = document.getElementById('playerNameWin');
const winGame = document.getElementById('winGame');
const draw = document.getElementById('drawModal');
const drawGame = document.getElementById('drawGame');


gameBtn.addEventListener('click', startGame);
resetGameBtn.addEventListener('click', reset);
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

function winGameModal(countMove) {
	winModal.classList.remove('modal_window');
	gameWindows.classList.add('modal_window');
	draw.classList.add('modal_window');
	if (countMove % 2 === 0) {
		playerName.innerText = `Победитель ${nameP1[0]}!`;
		reset();
	} else if (!countMove % 2 === 0) {
		playerName.innerText = `Победитель ${nameP2[0]}!`;
		reset();
	}
};

function clouseWinModal() {
	winModal.classList.add('modal_window');
	draw.classList.add('modal_window');
	gameWindows.classList.remove('modal_window');
	reset();
}

function checkDraw(a) {
	draw.classList.remove("modal_window");
	gameWindows.classList.add('modal_window');
	reset();
}

export { startGame, reset, winGameModal, checkDraw }