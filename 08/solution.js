function query(collection) {
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
}

function select() {
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
}

function filterIn(property, values) {
    return function doFilter(arrToFilter) {
        return arrToFilter.filter(item => values.includes(item[property]))
    }
}

module.exports = {
    timeShift: function(date) {
        let date = new Date(date);

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
    },
    lib: {
        query: query,
        select: select,
        filterIn: filterIn
    }
};