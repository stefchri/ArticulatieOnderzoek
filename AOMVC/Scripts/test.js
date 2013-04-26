var _getImages = "http://" + window.location.host.toString() + "/Test/GetRoutines";
var _imgPath = "http://" + window.location.host.toString() + "/images/";
var _imgs;

(function () {
    var App = {
        init: function () {
            this.bindEvents();
        },
        bindEvents: function(){
            this.getImagesInRoutine();
        },
        getImagesInRoutine: function () {
            $.getJSON(_getImages, { "id": routineid }, function (data) {
                _imgs = $.parseJSON(data).Images;

                var list = "<ul class='unstyled'>";

                $.each(_imgs, function (index, value) {
                    list += '<li">' + value.Name + '<img src="' + _imgPath + value.Url + '" alt="' + value.Name + '" /></li>';
                });
                list += "</ul>";

                $("body").append(list);
                
            });
        }
    }
    App.init();
}(window));










