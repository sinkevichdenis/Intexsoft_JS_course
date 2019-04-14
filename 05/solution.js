//Подсказка: сюда можно складывать записи адресной книги.
const book = {}; //рабочая переменная, проще решать через объект
const phoneBook = []; // тестируемая переменная для вывода результата

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

//Здесь можно объявить переменные и функции, которые понядобятся вам для работы ваших функций

module.exports = {
    getWords: function(sentence){
    	let reg = /#\S+/gi;

		return sentence.match(reg).map((item) => item.slice(1));
    },
    normalizeWords: function(words){
    	words = words.map(item => item.toLowerCase());
		words = words.reduce((prev, curr) => {
		!prev.includes(curr) && prev.push(curr);
		return prev;
		}, []);

		return words.join(', ');
    },
    addressBook: function(command){
        try {
        return command.includes('SHOW') ? show(book)
        : command.includes('ADD') ? add(command.slice(4)) 
        : command.includes('REMOVE_PHONE') ? remove(command.slice(13)) 
        : (() => {throw new Error('Invalid command')})();
        } catch(e) {
            console.log(e.message + e.stack);
        }
    }
}