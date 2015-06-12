document.addEventListener("DOMContentLoaded", insertTemplates); // выполняется на событие создания DOM'а т.к. код отрабатывает ранее создания элемента

function insertTemplates() {
    var templator = {
        centerColumnTemplate: document.getElementById('message-list').innerHTML, //шаблон центральной колонки
        rightColumnTemplate: document.getElementById('right-colomn').innerHTML, //шаблон правой колонки
        centerColumn: document.querySelector('.dialog'), //узел для вставки центральной колонки
        rightColumn : document.querySelector('.right-col-msgs'), //узел для вставки  правой колонки
        data : {
            messages: messagesObject,
            users: usersObject
        }
    };

    templator.centerColumn.innerHTML = (Mustache.render(templator.centerColumnTemplate, templator.data));
    templator.rightColumn.innerHTML = (Mustache.render(templator.rightColumnTemplate, templator.data));

    routie( {
            'dialog/:dial_id': function(dial_id){
                console.log(dial_id); //Почему не возвращается айди?
                var crrntData = {};
                templator.centerColumn.innerHTML = '';
                crrntData.messages = _.where(messagesObject, {'dialog_id': dial_id});
                crrntData.users = usersObject;

                console.log(crrntData.messages);// На выходе получается пустой массив... а должен быть из тех, у которых соответствует айди диалогов
                templator.centerColumn.innerHTML = (Mustache.render(templator.centerColumnTemplate, crrntData));

            }
        }
    );

}



