/*/!*var time = date('2017-05-16 13:45')
    .add(24, 'hours')
    .subtract(1, 'months')
    .add(3, 'days')
    .add(15, 'minutes');
console.info(time.value);
// "2017-04-20 14:00"*!/


function timeShift(time) {
    let date = new Date(time);

    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    function changeTime(num, str) {
        switch(str){
        case 'years':
            date.setFullYear(date.getFullYear() + num);
            break;
        case 'months':
            date.setMonth(date.getMonth() + num);
            break;
        case 'days':
            date.setDate(date.getDate() + num);
            break;
        case 'hours':
            date.setHours(date.getHours() + num);
            break;
        case 'minutes':
            date.setMinutes(date.getMinutes() + num);
            break;
        }
        return timeShift(date);
    }

    return {
        add: (num, str) =>  changeTime(num, str),
        subtract: (num, str) => changeTime(-num, str),
        value: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
                + ` ${pad(date.getHours())}:${pad(date.getMinutes())}`,
    }
}

let time = timeShift('2017-05-16 13:45')
    .add(24, 'hours')
    .subtract(1, 'months')
    .add(3, 'days')
    .add(15, 'minutes');
console.info(time.value);*/


const friends = [
    {
        name: 'Сэм',
        gender: 'Мужской',
        email: 'email1@example.com',
        favoriteFood: 'Картофель'
    },
    {
        name: 'Эмили',
        gender: 'Женский',
        email: 'email2@example.com',
        favoriteFood: 'Яблоко'
    },
    {
        name: 'Ann',
        gender: 'Мужской',
        email: 'email1@e321.com',
        favoriteFood: 'Редька'
    },
    {
        name: 'petr',
        gender: 'Женский',
        email: 'email2@123.com',
        favoriteFood: 'Груша'
    }
];

const lib = {
    query: function (collection) {
        let resultArr = collection;

        if (arguments.length === 1) {
            return resultArr;
        }

        for (let i = 1; i < arguments.length; i++){
            if (arguments[i].toString().includes('doFilter')) {
                resultArr = arguments[i](resultArr);
            }
        }

        for (let i = 1; i < arguments.length; i++){
            if (arguments[i].toString().includes('doSelect')) {
                resultArr = arguments[i](resultArr);
            }
        }

       return resultArr;
    },

    filterIn: function (property, values) {
        return function doFilter(arrToFilter) {
            return arrToFilter.filter(item => values.includes(item[property]))
        }
    },

    select: function() {
        let argArr = Array.from(arguments);

        return function doSelect(arrToSelect) {
            return arrToSelect.map(item => {
                let resultObj = {},
                    sortObj = {};

                argArr.forEach(key => {
                    if (item.hasOwnProperty(key)) {
                        resultObj[key] = item[key];
                    }
                });

                Object.keys(resultObj).sort( (a, b) => {
                    let templateArr = Object.keys(arrToSelect[0]),
                        indexA = templateArr.indexOf(a),
                        indexB = templateArr.indexOf(b);
                    return Math.sign(indexA - indexB);
                }).forEach(key => {
                    sortObj[key] = resultObj[key];
                });

                return sortObj;
           })
        }
    },
};

var bestFriends = lib.query(
    friends,
    lib.select('name', 'gender', 'email'),
    lib.filterIn('favoriteFood', ['Яблоко', 'Картофель'])
);
console.info(bestFriends);






