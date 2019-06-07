function CreateContainer() {
    this.parentElement = document.getElementById('contentArea');

    this.createForm();
    this.events();
}

CreateContainer.prototype.createForm = function () {
    const form = document.createElement('form');
    form.setAttribute('id', 'form');

    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('placeholder', 'От 0 до 30');

    const table =  document.createElement('table');
    table.setAttribute('id', 'table');

    form.appendChild(input);
    form.appendChild(this.createButton('send', 'Отправить'));
    form.appendChild(this.createButton('reset', 'Очистить'));
    this.parentElement.appendChild(form);
    this.parentElement.appendChild(this.createTempDiv());
    this.parentElement.appendChild(table);
};

CreateContainer.prototype.createButton = function (id, text) {
    const button = document.createElement('button');
    button.setAttribute('id', id);
    button.innerText = text;
    return button;
};

CreateContainer.prototype.createTempDiv = function () {
    const div =  document.createElement('div');
    div.setAttribute('id', 'templates');
    div.style.margin = '10px 0';
    this.createTemplates().forEach(item => {
        div.appendChild(item);
    });
    return div;
};

CreateContainer.prototype.createTemplates = function () {
    let template = [];
    template[0] = '0';
    template[1] = '50%';
    template[2] = '50% 0';
    template[3] = '0 50%';

    template = template.map(item => {
        let tempDiv = document.createElement('div');
        tempDiv.style.border = '1px solid black';
        tempDiv.style.borderRadius = item;
        tempDiv.style.width = '40px';
        tempDiv.style.height = '40px';
        tempDiv.style.margin = '3px';
        tempDiv.style.display = 'inline-block';
        return tempDiv;
    });

    return template;
};

CreateContainer.prototype.createTable = function (table, index, style) {
    for (let i = 0; i < index; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < index; j++) {
            let td = document.createElement('td');
            let div = document.createElement('div');
            div.style.width = style.width;
            div.style.height = style.height;
            div.style.border = style.border;
            div.style.borderRadius = style.borderRadius;
            div.style.backgroundColor = this.getRandomColor();
            td.appendChild(div);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
};

CreateContainer.prototype.getRandomColor = function () {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

CreateContainer.prototype.events = function () {
    const template = document.getElementById('templates');
    const resetBtn = document.getElementById('reset');
    const sendBtn = document.getElementById('send');
    const table = document.getElementById('table');
    const input = document.getElementsByTagName('input')[0];

    let styleTemplate = '';
    let tableHTML = '';

    template.addEventListener('click', (event) => {
        if (!event.target.id) {
            template.querySelectorAll('div').forEach(item => {
                item.style.backgroundColor = '';
            });
            event.target.style.backgroundColor = 'grey';
        }
        styleTemplate = event.target.style;
    });

    resetBtn.addEventListener('click', event => {
        event.preventDefault();
        input.value = '';
        tableHTML = '';
        table.innerHTML = tableHTML;
    });

    sendBtn.addEventListener('click', event => {
        event.preventDefault();
        if (input.value >= 0
            && input.value <= 30
            && input.value.trim() !== '') {
            this.createTable(table, input.value, styleTemplate);
        }
        input.value = '';
    });
};

new CreateContainer();
