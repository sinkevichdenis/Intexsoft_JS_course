function CreateContainer() {
    this.parentElement = document.getElementById('contentArea');
    this.figures = ['pawn', 'bishop', 'knight', 'rook', 'queen', 'king'];
    this.imageTd = [];

    this.createFigures();
    this.createTable();
    this.events();
}

CreateContainer.prototype.createFigures = function () {
    let parentDiv = document.createElement('div');
    parentDiv.setAttribute('id', 'images');
    parentDiv.style.height = '50px';

    this.figures.forEach(item => {
        let img = document.createElement('img');
        let div = document.createElement('div');

        img.setAttribute('src', `./img/${item}.png`);
        img.style.height = 'inherit';

        div.setAttribute('id', item);
        div.style.display ='inline-block';
        div.style.height = '40px';
        div.style.padding = '3px';
        div.style.border = '2px solid white';

        div.appendChild(img);
        parentDiv.appendChild(div);
    });
    this.parentElement.appendChild(parentDiv);
};

CreateContainer.prototype.createTable = function () {
    let table = document.createElement('table');
    table.setAttribute('id', 'table');
    table.style.borderCollapse = 'collapse';
    table.style.margin = '10px';

    for (let i = 1; i <= 8; i++) {
        let tr = document.createElement('tr');

        for (let j = 1; j <= 8; j++) {
            let td = document.createElement('td');
            td.setAttribute('data-row', i);
            td.setAttribute('data-col', j);
            td.style.width = '50px';
            td.style.height = '50px';
            td.style.border = '1px solid black';
            this.colorTdDefault(td, i, j);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    this.parentElement.appendChild(table);
};

CreateContainer.prototype.colorTdDefault= function (td, i, j) {
    td.style.backgroundColor = ((i + j) % 2) ? 'black' : 'white';
};

CreateContainer.prototype.events = function () {
    const imagesDiv = document.getElementById('images');
    const table = document.getElementById('table');
    const allTd = table.querySelectorAll('td');
    let figure = {
        name: null,
        row: null,
        col: null,
    };

    imagesDiv.addEventListener('click', (event) => {
        let target;
        if (event.target.id !== 'images') {
            imagesDiv.querySelectorAll('div').forEach(item => {
                item.style.borderColor = 'white';
            });
            target = (event.target.tagName === 'IMG') ? event.target.parentElement : event.target;
            target.style.borderColor = 'red';
            figure.name = target.id;
            this.createPath(allTd, figure);
        }
    });

    table.addEventListener('click', event => {
         if (event.target.tagName === 'TD'){
            event.target.style.backgroundColor = 'red';
            figure.row = event.target.dataset.row;
            figure.col = event.target.dataset.col;
            this.createPath(allTd, figure);
        }
    });

    document.addEventListener('keydown', event => {
        figure.col = (figure.col === null) ? 1 : figure.col;
        figure.row = (figure.row === null) ? 1 : figure.row;

        switch(event.keyCode) {
            case 37:
                figure.col = (figure.col <= 1) ? 1 : figure.col - 1;
                break;
            case 39:
                figure.col = (figure.col >= 8) ? 8 : figure.col + 1;
                break;
            case 38:
                figure.row = (figure.row <= 1) ? 1 : figure.row - 1;
                break;
            case 40:
                figure.row = (figure.row >= 8) ? 8 : figure.row + 1;
                break;
        }

        this.createPath(allTd, figure);
    });
};

CreateContainer.prototype.createPath = function (allTd, figure) {
    let row = figure.row;
    let col = figure.col;

    allTd.forEach(item => {
        this.colorTdDefault(item, +item.dataset.row, +item.dataset.col);
        item.innerHTML = '';
    });

    this.figures.forEach(item => {
       if (item === figure.name
           && row !== null
           && col !== null) {
           CreateContainer.prototype[`${item}Move`](allTd, +row, +col);
       }
    });

    allTd.forEach(item => {
        this.startPointColor(item, +row, +col);
    });
};

CreateContainer.prototype.startPointColor = function (item, row, col) {
    if (+item.dataset.row === row
        && +item.dataset.col === col) {
        item.style.backgroundColor = 'red';
    }
};

CreateContainer.prototype.kingMove = function (allTd, row, col) {

    allTd.forEach(item => {
        if (item.dataset.row >= row - 1
            && item.dataset.row <= row + 1
            && item.dataset.col >= col - 1
            && item.dataset.col <= col + 1) {
            item.style.backgroundColor = 'green';
        }
    })
};

CreateContainer.prototype.queenMove = function (allTd, row, col) {
    this.bishopMove(allTd, row, col);
    this.rookMove(allTd, row, col);
};

CreateContainer.prototype.knightMove = function (allTd, row, col) {
    allTd.forEach(item => {
        if ((+item.dataset.row === row + 1 || +item.dataset.row === row - 1)
            && (+item.dataset.col === col + 2 || +item.dataset.col === col - 2)) {
            item.style.backgroundColor = 'green';
        }

        if ((+item.dataset.row === row + 2 || +item.dataset.row === row - 2)
            && (+item.dataset.col === col + 1 || +item.dataset.col === col - 1)) {
            item.style.backgroundColor = 'green';
        }
    })
};

CreateContainer.prototype.rookMove = function (allTd, row, col) {
    allTd.forEach(item => {
        if (+item.dataset.row === row
            || +item.dataset.col === col) {
            item.style.backgroundColor = 'green';
        }
    })
};

CreateContainer.prototype.bishopMove = function (allTd, row, col) {
    //create diagonal from left to right
    let startRow = row;
    let startCol = col;

    allTd.forEach(item => {
        while (row > 1 && col > 1){
            row--;
            col--;
        }

        for (let i = 0; i <= 7; i++){
            if (+item.dataset.row === row + i
            && +item.dataset.col === col + i){
            item.style.backgroundColor = 'green';
            }
        }
    });

    //create diagonal from right to left
    row = startRow;
    col = startCol;

    allTd.forEach(item => {
        while (row > 1 && col < 8){
            row--;
            col++;
        }

        for (let i = 0; i <= 7; i++){
            if (+item.dataset.row === row + i
                && +item.dataset.col === col - i){
                item.style.backgroundColor = 'green';
            }
        }
    });
};

CreateContainer.prototype.pawnMove = function (allTd, row, col) {
    allTd.forEach(item => {
        if (+item.dataset.col === col) {
            if (row === 7
                && +item.dataset.row < 7
                && +item.dataset.row >= 5 ){
                item.style.backgroundColor = 'green';
            }
            if (row < 7
                && +item.dataset.row < row
                && +item.dataset.row >= row - 1 ){
                item.style.backgroundColor = 'green';
            }
        }
    })
};

new CreateContainer();
