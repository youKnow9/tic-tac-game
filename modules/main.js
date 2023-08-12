// решила все же не тащить это в отдельный модуль, т.к. столкнулась с еще кучей ошибок
import { combinations, arrMoveP1, arrMoveP2, nameP1, nameP2 } from "./constants.js";
import { winGame1, winGame2, checkDraw } from "./modal.js";

const form = document.getElementById('form');
const gameCell = document.getElementsByClassName('game-cell');
const gameCells = Array.from(gameCell);
const firstMoveName = document.getElementById('firstMove');

form.addEventListener('submit', choicePlayers);

let countMove = 0; // счетчик ходов 
let newArr = false;

function choicePlayers(formNode) {
	formNode.preventDefault();
	const dataPlayers = Array.from(form)
	.map((element) => {
		const { id, name, type } = element;
		const value = 
		type === 'radio' ? element.checked : element.value;
		return { id, name, value }
	})
	.filter((item) => !!item.name);
	nameP1.push(dataPlayers[0].value);
	nameP2.push(dataPlayers[1].value);
	changePlayer(dataPlayers);
};

// отслеживаем ходы игроков и проверяем на победу
export function checkStep(e) {
	countMove++;
	firstMoveName.classList.add('hidden_elem');
	let id1 = e.target.getAttribute('id');
	let id2 = e.target.getAttribute('id');
	if (countMove % 2 === 0) {
		createCircle(id1);
		arrMoveP1.push(id1);
		combinations.some(combinations => winCheckP1(arrMoveP1, combinations));
	} else if (!countMove % 2 === 0){
		createCross(id2);
		arrMoveP2.push(id2);
		combinations.some(combinations => winCheckP2(arrMoveP2, combinations));
	};

	if ((arrMoveP1.includes(id1, -1)) || (arrMoveP1.includes(id2, -1))) {
		delListener(e);
	}
};

// функция для передачи имени, кто ходит первым
function changePlayer(dataPlayers) {
	if ((dataPlayers[2].value === true)) {
		firstMoveName.innerText = `Первый ход за ${dataPlayers[0].value}!`;
	} else if ((dataPlayers[3].value === true)) {
		firstMoveName.innerText = `Первый ход за ${dataPlayers[1].value}!`;
	};
};

// вешаем слушатель на все игровые ячейки и выдаем им id
export function gameCellsListener() {
	gameCells.forEach((el, i) => {
		i++;
		el.setAttribute('id', `${i}`);
		el.addEventListener('click', checkStep);
	});
};

// чтобы не считались клики по заполненным ячейкам слушатель с них убираем
function delListener(el) {
	gameCells.forEach((el) => {
		if (el.classList.contains('active_cross') || el.classList.contains('active_circle')) {
			el.removeEventListener('click', checkStep);
		}
		
	});
};


// по полученному id ячейки ставим О или Х, считаем ходы
function createCircle(id1) {
	const cellCircle = document.getElementById(`${ id1 }`);
	if ((!cellCircle.classList.contains('active_cross')) && (!cellCircle.classList.contains('active_circle'))) {
		cellCircle.classList.add('active_circle');
	} else {
		return;
	};
};

function createCross(id2) {
	const cellCircle = document.getElementById(`${ id2 }`);
	if ((!cellCircle.classList.contains('active_circle')) && (!cellCircle.classList.contains('active_cross'))) {
		cellCircle.classList.add('active_cross');
	} else {
		return;
	};
	
};

// функция для проверки комбинаций и определения победителя
function winCheckP1(a, b) {
	newArr = b.filter(i => a.includes(i)).length === b.length;
	if (newArr === true) {
		winGame1();
	} else if ((newArr === false) && (countMove >= 9)) {
		checkDraw();
	};
};

function winCheckP2(a, b) {
	newArr = b.filter(i => a.includes(i)).length === b.length;
	if (newArr === true) {
		winGame2();
	} else if ((newArr === false) && (countMove >= 9)) {
		checkDraw();
	};
};

// функция для ресета игры
export function resetGame(e) {
	gameCellsListener();
	arrMoveP1.length = 0; // обнуляем массивы с ходами
	arrMoveP2.length = 0;
	newArr = false;
	countMove = 0;
	gameCells.forEach(el => { //убираем отрисовку крестиков
		el.classList.remove('active_circle');
		el.classList.remove('active_cross');
	});
};