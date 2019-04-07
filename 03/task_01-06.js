'use strict';

 // task 1
function isTimeValid(hours, minutes) {
	return (Number.isInteger( hours ) && Number.isInteger( minutes ))
		? ( hours >= 0 && hours <= 23 ) && ( minutes >= 0 && minutes <= 59 )&& true
		: false;
}

/*console.log(isTimeValid('5', 40));
console.log(isTimeValid(0, 60));
console.log(isTimeValid(-1, 59));
console.log(isTimeValid(20.5, 15));
console.log(isTimeValid(14, 43));*/


// task 2
function addMinutes(hours, minutes, add) {
	let currMinutes = minutes + add,
		validation = item => (item.toString().length === 1)  ? ('0' + item) : item;

	hours = ( hours + Math.floor( currMinutes / 60 )) % 24;
	currMinutes = currMinutes % 60;

	return `${validation( hours )}:${validation( currMinutes )}`;
}

/*console.log(addMinutes(12, 25, 30));
console.log(addMinutes(23, 40, 83));
console.log(addMinutes(25, 240, 283));*/

//task 3
function getSeason(month) {
	let result = '';

	switch(true) {
	case (month === 12) || (month === 1) || (month === 2):
		result = 'Зима';
		break;
	case (month >= 3) && (month <= 5):
		result = 'Весна';
		break;
	case (month >= 6) && (month <= 8):
		result = 'Лето';
		break;
	case (month >= 9) && (month <= 11):
		result = 'Осень';
		break;
	default:
		result = 'Incorrect entered data';
	}

	return result;
}

/*console.log(0, getSeason(0));
console.log(1, getSeason(1));
console.log(2, getSeason(2));
console.log(3, getSeason(3));
console.log(4, getSeason(4));
console.log(5, getSeason(5));
console.log(6, getSeason(6));
console.log(7, getSeason(7));
console.log(8, getSeason(8));
console.log(9, getSeason(9));
console.log(10, getSeason(10));
console.log(11, getSeason(11));
console.log(12, getSeason(12));
console.log(13, getSeason(13));
console.log('text', getSeason('13'));*/

// task 4
function getDayDeclension(day) {
	let dd = day % 100,
		d = day % 10,
		result;

	switch (true) {
	case (dd >= 11) && (dd <= 14):
		result = 'Дней';
		break;
	case (d >= 2) && (d <= 4):
		result = 'Дня';
		break;
	case d === 1:
		result = 'День';
		break;
	case day < 0 || !Number.isInteger(day):
		result = 'Incorrect entered data ';
		break;
	default:
		result = 'Дней';
	}

	return result;
}

/*console.log(0, getDayDeclension(0));
console.log(1, getDayDeclension(1));
console.log(2, getDayDeclension(2));
console.log(7, getDayDeclension(7));
console.log(11, getDayDeclension(11));
console.log(301, getDayDeclension(301));
console.log(22, getDayDeclension(22));
console.log('text', getDayDeclension('45'));*/

//task 5
function getSumm(num) {
	let summ = 0;

	while (num > 0) {
		summ += num--;
	}
	return summ;
}

/*console.log('getSumm(6)', getSumm(6));
console.log('getSumm(3)', getSumm(3));*/

//task 6
function getMultiplicationTable(num) {
	let result = '';

	for (let i = 1; i <= 10; i++) {
		result += `${num} * ${i} = ${num * i} \n`;
	}

	console.log(result);
}

/*getMultiplicationTable(178);*/

