function query(collection) {

}

function select() {

}

function filterIn(property, values) {

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