/**
 * Created by sinchenko on 26.06.15.
 */
var requestData, dataMessage;
requestData = {
    xhr: new XMLHttpRequest(),
    getData: function () {
        if (this.readyState === 4 && this.status === 200) {
            dataMessage = JSON.parse(this.responseText)
        }
        return dataMessage;
    },
    init: function (url) {
        this.xhr.open('GET', url);
        this.xhr.send();
        this.xhr.onreadystatechange = this.getData;
    }
};

requestData.init('js/messengerData.json');