document.addEventListener("DOMContentLoaded", insertTemplates); // выполняется на событие создания DOM'а т.к. код отрабатывает ранее создания элемента

function insertTemplates() {
    var crntDialogId, templator, sender, reciever;
    templator = {
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
                crntDialogId = parseInt(dial_id);
                var crrntData = {};
                sender = parseInt(dialogs[crntDialogId-1].first_recipient_id); //Определяю айди отправителя
                reciever = parseInt(dialogs[crntDialogId-1].second_recipient_id); //Определяю айди получателя
                templator.centerColumn.innerHTML = '';
                crrntData.messages = _.where(messagesObject, {'dialog_id': crntDialogId});
                crrntData.users =(_.where(usersObject, {'id' : sender})).concat(_.where(usersObject, {'id' : reciever})); // объединил два массива (отправителя и получателя)

                templator.centerColumn.innerHTML = (Mustache.render(templator.centerColumnTemplate, crrntData));


            }
        }
    );

}



