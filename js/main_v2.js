/**
 * Created by sinslav on 27.06.15.
 */
document.addEventListener("DOMContentLoaded", insertTemplates); // выполняется на событие создания DOM'а т.к. код отрабатывает ранее создания элемента
 function insertTemplates(){
    var templator = {
        centerColumnTemplate: document.getElementById('message-list').innerHTML, //шаблон центральной колонки
        rightColumnTemplate: document.getElementById('right-colomn').innerHTML, //шаблон правой колонки
        centerColumn: document.querySelector('.dialog'), //узел для вставки центральной колонки
        rightColumn: document.querySelector('.right-col-msgs'), //узел для вставки  правой колонки
        insertData: function (tmpl, place, dataTmpl){ // метод вставки шаблонов
            place.innerHTML = (Mustache.render(tmpl, dataTmpl));
        },
        dat: {
            messages: requestData.getData().messeges,
            users: requestData.getData().users
        }
    };
     templator.insertData(templator.centerColumn, templator.centerColumnTemplate, templator.dat);
     templator.insertData(templator.rightColumn, templator.rightColumnTemplate, templator.dat);


     console.log(requestData.getData())
}
