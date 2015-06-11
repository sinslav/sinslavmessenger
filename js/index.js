document.addEventListener("DOMContentLoaded", insertTemplates); // выполняется на событие создания DOM'а т.к. код отрабатывает ранее создания элемента

function insertTemplates() {
    var templator = {
        centerColumnTemplate: document.getElementById('message-list').innerHTML, //шаблон центральной колонки
        rightColumnTemplate: document.getElementById('right-colomn').innerHTML, //шаблон правой колонки
        centerColumn: document.querySelector('.dialog'), //узел для вставки центральной колонки
        rightColumn : document.querySelector('.right-col-msgs'), //узел для вставки  правой колонки
        data : {
            messages: messages,
            users: users
        }
    };

    templator.centerColumn.innerHTML = (Mustache.render(templator.centerColumnTemplate, templator.data));
    templator.rightColumn.innerHTML = (Mustache.render(templator.rightColumnTemplate, templator.data));
}


