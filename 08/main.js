/*var time = date('2017-05-16 13:45')
    .add(24, 'hours')
    .subtract(1, 'months')
    .add(3, 'days')
    .add(15, 'minutes');
console.info(time.value);
// "2017-04-20 14:00"*/


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
console.info(time.value);



