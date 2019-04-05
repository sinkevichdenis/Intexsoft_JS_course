//task 7
function isPointInCircle(x, y) {
	const X0 = 3,
		Y0 = 5,
		R = 4;

	return Math.pow((x - X0), 2) + Math.pow((y - Y0), 2) <= Math.pow(R, 2) ;
}

console.log('isPointInCircle(3, 5)', isPointInCircle(3, 5));
console.log('isPointInCircle(0, 0)', isPointInCircle(0, 0));
console.log('-------');



function isPointInSquare(x, y) {
	// Уравнение прямой в отрезках на осях (x/a + y/b = 1)
	return ( x/5 + y/3 <= 1 )
			&& ( x/-7 + y/4 <= 1 )
			&& ( x/-8 + y/-12 <= 1 )
			&& ( x/5 + y/-2 <= 1 );
}

console.log('isPointInSquare(0, 0)', isPointInSquare(0, 0));
console.log('isPointInSquare(-7, 0)', isPointInSquare(-7, 0));
console.log('isPointInSquare(1, 4)', isPointInSquare(1, 4));
console.log('isPointInSquare(-7.5, 0)', isPointInSquare(-7.5, 0));
console.log('isPointInSquare(0, -3)', isPointInSquare(0, -3));
console.log('isPointInSquare(1, 2)', isPointInSquare(1, 2));

