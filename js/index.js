function insertTemplates() {
    function setContent() {

        var crntDialogId, templator, sender, reciever, crrntData;

        templator = {
            centerColumnTemplate: document.getElementById('message-list').innerHTML, //шаблон центральной колонки
            rightColumnTemplate: document.getElementById('right-colomn').innerHTML, //шаблон правой колонки
            centerColumn: document.querySelector('.dialog'), //узел для вставки центральной колонки
            rightColumn: document.querySelector('.right-col-msgs'), //узел для вставки  правой колонки
            data: {
                messages: requestData.getData().messeges,
                users: requestData.getData().users
            },
            insertData: function (tmpl, place) {
                this.place.innerHTML = (Mustache.render(this.tmpl, this.data));
            }

        };
        templator.insertData(templator.centerColumnTemplate, templator.centerColumn);
        templator.insertData(templator.rightColumnTemplate, templator.rightColumn);


        //templator.centerColumn.innerHTML = (Mustache.render(templator.centerColumnTemplate, templator.data));
        //templator.rightColumn.innerHTML = (Mustache.render(templator.rightColumnTemplate, templator.data));


        routie({
                'dialog/:dial_id': function (dial_id) {

                    templator.centerColumn.innerHTML = '';

                    crntDialogId = parseInt(dial_id);
                    sender = parseInt(dialogs[crntDialogId - 1].first_recipient_id); //OK //Определяю айди отправителя
                    reciever = parseInt(dialogs[crntDialogId - 1].second_recipient_id); // OK //Определяю айди получателя

                    crrntData = {};
                    crrntData.messages = _.where(messagesObject, {'dialog_id': crntDialogId});
                    crrntData.users = (_.where(usersObject, {'id': sender})).concat(_.where(usersObject, {'id': reciever})); // объединил два массива (отправителя и получателя)

                    templator.centerColumn.innerHTML = (Mustache.render(templator.centerColumnTemplate, crrntData));

                }
            }
        );
    }

    requestData.xhr.onload = setContent;
}





