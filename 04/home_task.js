/**
 * get sum through recursion
 * @param  num {number}
 * @returns {number}
 */
function getSumm(num) {
	let sum = 0;

	if (num > 0) sum = num + getSumm(--num);
	return sum;
}

console.log('getSumm(3)', getSumm(3));
console.log('getSumm(6)', getSumm(6));

/**
 * get through through recursion
 * @param num {number}
 * @returns {number}
 */
function getFactorial(num) {
	let mult = 1;

	if (num > 0) mult = num * getFactorial(--num);
	return mult;
}

console.log('getFactorial(3)', getFactorial(3));
console.log('getFactorial(4)', getFactorial(4));
console.log('getFactorial(5)', getFactorial(5));
