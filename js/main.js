document.addEventListener("DOMContentLoaded", insertTemplates); // выполняется на событие создания DOM'а т.к. код отрабатывает ранее создания элемента

function insertTemplates() {
    var templator = {
        centerColumnTemplate: document.getElementById('message-list').innerHTML, //шаблон центральной колонки
        rightColumnTemplate: document.getElementById('right-colomn').innerHTML, //шаблон правой колонки
        centerColumn: document.querySelector('.dialog'), //узел для вставки центральной колонки
        rightColumn: document.querySelector('.right-col-msgs'), //узел для вставки  правой колонки
        clearCenterColumn: function () {
            this.centerColumn.innerHTML = 'Loading...'
        },
        insertData: function (place, tmpl, dataTmpl) { // метод вставки шаблонов
            place.innerHTML = (Mustache.render(tmpl, dataTmpl));
        },
        openDialogsData: {
            messages: requestData.getData().messeges,
            users: requestData.getData().users
        }
    };

    // заполнение шаблонов данными
    templator.insertData(templator.centerColumn, templator.centerColumnTemplate, templator.openDialogsData);
    templator.insertData(templator.rightColumn, templator.rightColumnTemplate, templator.openDialogsData);


    // работа с хешами
    routie('dialog/:dialId', function (dialId) {
        dialIdArg = parseInt(dialId, 10);
        if (typeof(dialIdArg) != 'NaN') {
            hasher(dialIdArg);
        }
    });

    function hasher(arg) {
        templator.clearCenterColumn();
        var senderId = _.findWhere(requestData.getData().dialogs, {id: arg}).first_recipient_id;
        var receiverId = _.findWhere(requestData.getData().dialogs, {id: arg}).second_recipient_id;
        var currentDialogData = {
            messages: _.where(requestData.getData().messeges, {'dialog_id': arg}),
            users: _.filter(requestData.getData().users, function (obj) {
                return obj.id == senderId || obj.id == receiverId
            })
        };
        templator.insertData(templator.centerColumn, templator.centerColumnTemplate, currentDialogData);

    }
}



/**
 * Created by sinslav on 27.06.15.
 */
