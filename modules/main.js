// решила все же не тащить это в отдельный модуль, т.к. столкнулась с еще кучей ошибок
import { combinations, arrMoveP1, arrMoveP2, nameP1, nameP2, ACTIVE_CIRCLE_CLASS, ACTIVE_CROSS_CLASS } from "./constants.js";
import { winGameModal, checkDraw } from "./modal.js";

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
	const idMove = e.target.getAttribute('id');
	if (countMove % 2 === 0) {
		createShape(idMove);
		arrMoveP1.push(idMove);
		combinations.some(combinations => winCheck(arrMoveP1, combinations));
	} else if (!countMove % 2 === 0){
		createShape(idMove);
		arrMoveP2.push(idMove);
		combinations.some(combinations => winCheck(arrMoveP2, combinations));
	};

	if ((arrMoveP1.includes(idMove, -1)) || (arrMoveP2.includes(idMove, -1))) {
		delListener(e);
	};
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
		if (el.classList.contains(ACTIVE_CROSS_CLASS) || el.classList.contains(ACTIVE_CIRCLE_CLASS)) {
			el.removeEventListener('click', checkStep);
		}
		
	});
};


// по полученному id ячейки ставим О или Х, считаем ходы
function createShape(id) {
	if (countMove % 2 === 0) {
		const cellCircle = document.getElementById(`${ id }`);
			if ((!cellCircle.classList.contains(ACTIVE_CROSS_CLASS)) && (!cellCircle.classList.contains(ACTIVE_CIRCLE_CLASS))) {
				cellCircle.classList.add(ACTIVE_CIRCLE_CLASS);
			};
	} else if (!countMove % 2 === 0){
		const cellCircle = document.getElementById(`${ id }`);
			if ((!cellCircle.classList.contains(ACTIVE_CIRCLE_CLASS)) && (!cellCircle.classList.contains(ACTIVE_CROSS_CLASS))) {
				cellCircle.classList.add(ACTIVE_CROSS_CLASS);
			};
	};
};

// функция для проверки комбинаций и определения победителя
function winCheck(movePlayer, comb) {
	newArr = comb.filter(i => movePlayer.includes(i)).length === comb.length;
	if (newArr === true) {
		winGameModal(countMove);
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
		el.classList.remove(ACTIVE_CIRCLE_CLASS);
		el.classList.remove(ACTIVE_CROSS_CLASS);
	});
};