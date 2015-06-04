

for (var i = messages.length - 1; i >= 0; i--) {
	var timeArray = messages[i].created_at.split(' ');  // преобразовал дату в массив разбив по пробелам
	messages[i].created_at = (timeArray[2]+ ' ' + timeArray[1]+ ' ' +  timeArray[4]).toString(); // создал строку с датой в нужном формате для вывода в шаблон
}

for (var k= messages.length -1; k >= 0; k--) {
    messages[k].right_colomn_text = messages[k].text.substr(0, 90) + '...'; // Обрезаю текст сообщения, записывая его в новое свойство messages.right_colomn_text
}

$(function() {
	var template = document.getElementById('message-list').innerHTML;
	var data = {
		messages: messages,
		users: users
	};
	$('.dialog').prepend(Mustache.render(template, data));


});

$(function() {
var template_right = document.getElementById('right-colomn').innerHTML;
    var data = {
        messages: messages,
        users: users
    };
$('.right-col-btn').prepend(Mustache.render(template_right, data));
});