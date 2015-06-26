document.addEventListener("DOMContentLoaded", insertTemplates); // выполняется на событие создания DOM'а т.к. код отрабатывает ранее создания элемента


function insertTemplates() {
    var confirmOldBrowser, goHappyBrowser, getMessagesFromJson, ajaxConfirmQuestion, happyBrowserLocation, getData, myData, xhr;

    // Проверка на AJAX

    ajaxConfirmQuestion = 'You browser does not support our site (AJAX). Click OK to update your browser';
    happyBrowserLocation = 'http://browsehappy.com/?locale=en';

    confirmOldBrowser = function () {
        return confirm(ajaxConfirmQuestion)
    };

    goHappyBrowser = function () {
        confirmOldBrowser();
        if (confirmOldBrowser) {
            window.location = happyBrowserLocation
        }
    };

    // Проверка на AJAX


    var abc;
    // AJAX запрос
    getMessagesFromJson = function (url) {
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();

            getData = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    abc = JSON.parse(xhr.responseText);
                    return abc;
                }
            };
            xhr.addEventListener('readystatechange', getData);
        }
        else
            goHappyBrowser();
    };




    getMessagesFromJson('js/messengerData.json');

    myData = function (){ return getData.bind(getMessagesFromJson)};
    console.log(myData());

    function myFunc () {
        console.log(abc);
        // заполнение шаблонов данными
        var crntDialogId, templator, sender, reciever, crrntData, xhr, dataJson;

        templator = {
            centerColumnTemplate: document.getElementById('message-list').innerHTML, //шаблон центральной колонки
            rightColumnTemplate: document.getElementById('right-colomn').innerHTML, //шаблон правой колонки
            centerColumn: document.querySelector('.dialog'), //узел для вставки центральной колонки
            rightColumn: document.querySelector('.right-col-msgs'), //узел для вставки  правой колонки
            data: {
                messages: messagesObject,
                users: usersObject
            }
        };

        templator.centerColumn.innerHTML = (Mustache.render(templator.centerColumnTemplate, templator.data));
        templator.rightColumn.innerHTML = (Mustache.render(templator.rightColumnTemplate, templator.data));


        routie({
                'dialog/:dial_id': function (dial_id) {

                    templator.centerColumn.innerHTML = '';

                    crntDialogId = parseInt(dial_id);
                    sender = parseInt(dialogs[crntDialogId - 1].first_recipient_id); //Определяю айди отправителя
                    reciever = parseInt(dialogs[crntDialogId - 1].second_recipient_id); //Определяю айди получателя

                    crrntData = {};
                    crrntData.messages = _.where(messagesObject, {'dialog_id': crntDialogId});
                    crrntData.users = (_.where(usersObject, {'id': sender})).concat(_.where(usersObject, {'id': reciever})); // объединил два массива (отправителя и получателя)

                    templator.centerColumn.innerHTML = (Mustache.render(templator.centerColumnTemplate, crrntData));

                }
            }
        );
        }
    xhr.addEventListener('readystatechange', myFunc);
}



