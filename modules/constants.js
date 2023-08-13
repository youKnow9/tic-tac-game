const combinations = [
	['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], ['1', '5', '9'], ['3', '5', '7'],
]; // список комбинаций для победы

const arrMoveP1 = []; // сюда записываем id ячейки, куда сходил игрок для проверки на победу
const arrMoveP2 = [];
const nameP1 = [];
const nameP2 = [];
const ACTIVE_CIRCLE_CLASS = 'active_circle';
const ACTIVE_CROSS_CLASS = 'active_cross';


export { combinations, arrMoveP1, arrMoveP2, nameP1, nameP2, ACTIVE_CIRCLE_CLASS, ACTIVE_CROSS_CLASS }