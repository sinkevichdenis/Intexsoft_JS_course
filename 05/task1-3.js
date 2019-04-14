//task 1
function getWords(str) {
	let reg = /#\S+/gi;

	return str.match(reg).map((item) => item.slice(1));
}

console.log(getWords('Прохожу курс в компании #intexsoft по #javascript'));

//task 2
function normalizeWords(arr) {
	arr = arr.map(item => item.toLowerCase());
	arr = arr.reduce((prev, curr) => {
		!prev.includes(curr) && prev.push(curr);
		return prev;
	}, []);

	return arr.join(', ');
}

console.log(normalizeWords(['web', 'intexsoft', 'JavaScript', 'Intexsoft', 'script', 'programming']));

//task 3
const book = {};
let phoneBook = [];

function isValidPhone(phone) {
	try {
		if (phone.length !== 9) throw new Error('Invalid number ' + phone);
	} catch (e) {
		console.log(e.message);
		return false;
	}
	return true;
}

function phoneToArr(phone) {
	return phone.split(',').map(item => item.trim()).filter(item => isValidPhone(item));
}

function add(str) {
	let name, phones;

	name = str.slice(0, str.indexOf(' '));
	str = str.slice(str.indexOf(' ') + 1);
	phones = phoneToArr(str);

	phones.forEach(item => {
		if (!JSON.stringify(book).includes(item)) {
			book.hasOwnProperty(name) ? (book[name].push(item)) : (book[name] = [item]);
		}
	})
}

/*function remove(str) {
	let phones = phoneToArr(str),
		index;

	phones.forEach(item => {
		for (let key in book) {
			index = book[key].indexOf(item);

			if (index !== -1) {
				book[key].splice(index, 1);
			}

			(book[key].length === 0) && delete book[key];
		}
	})
}*/

function remove(phone) {
	let index, 
		status = false;

	for (let key in book) {
		index = book[key].indexOf(phone);

		if (index !== -1) {
			book[key].splice(index, 1);
			status = true;
		}

		(book[key].length === 0) && delete book[key];
	}
	return status;
}

function show(book) {
	phoneBook = [];
	for (let key in book) {
		phoneBook.push(`${key}: ${book[key].join(', ')}`);
	}

	return phoneBook.sort();
}

function addressBook(command) {
	try {
		return command.includes('SHOW') ? show(book)
		: command.includes('ADD') ? add(command.slice(4)) 
		: command.includes('REMOVE_PHONE') ? remove(command.slice(13)) 
		: (() => {throw new Error('Invalid command')})();
	} catch(e) {
		console.log(e.message + e.stack);
	}
}

console.log(addressBook('ADD Ivan 527-34-47,589-60-88'));
console.log(addressBook('ADD Petr 589-00-00'));
console.log(addressBook('ADD Petr 589-00-00,   589-00-01'));
console.log(addressBook('ADD Ivan 511-11-11'));
console.log(addressBook('REMOVE_PHONE 589-60-88'));
console.log(addressBook('SHOW'));
console.log(addressBook('REMOVE_PHONE 589-00-99'));
console.log(addressBook('SHOW'));
console.log(addressBook('ADD ASemen 511-11-11,   111-11-22'));
console.log(addressBook('SHOW'));


