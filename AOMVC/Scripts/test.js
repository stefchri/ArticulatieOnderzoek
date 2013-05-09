var _getImages = "http://" + window.location.host.toString() + "/Test/GetRoutines";
var _imgPath = "http://" + window.location.host.toString() + "/images/";
var _soundUploadPath = "http://" + window.location.host.toString() + "/Test/UploadSound";
var _swfPath = "http://" + window.location.host.toString() + "/Scripts/jRecorder.swf";
var _timer;
var _sentenceTimer;
var _imgs;
var _active = 0;
var _audio;

(function () {
    var App = {
        init: function () {
            this.bindEvents();
        },
        bindEvents: function () {
            this.getImagesInRoutine();
            $(window).resize(function (e) { App.handleResize(e); });
            $("footer li").first().click(function (e) {
                App.setFullScreen();
            });
            $("footer li:nth-of-type(2)").mousedown(function (e) {
                App.showSentence(true, e);
            });
            $("footer li:nth-of-type(2)").mouseup(function (e) {
                App.showSentence(false, e);
            });
            $("footer li:nth-of-type(3)").mouseup(function (e) {
                App.handleBtnStartRec();
            });
            $("body").mousemove(function (e) {
                App.toggleFooter();
            });
            $(window).keyup(function (e) {
                App.handleKeyboard(e);
            });
            this.startRecording();
        },
        getImagesInRoutine: function () {
            $.getJSON(_getImages, { "id": routineid }, function (data) {
                _imgs = $.parseJSON(data).Images;
                var list = "";

                $.each(_imgs, function (index, value) {
                    list += "<li class='";
                    list += index == 0 ? "active" : "";
                    list +=  "'>"
                    list += "<img src='" + _imgPath + value.Url + "' alt='" + value.Name + "' /></li>";

                    if (index == 0) {
                        $(".sentence").html(value.Sentence);
                    }
                });
                $(".images").append(list);
                
            });
        },
        toggleFooter: function (e) {
            window.clearTimeout(_timer)
            $("footer").fadeIn(300);
            _timer = setTimeout(function () { $("footer").fadeOut(300); }, 1000);
        },
        setFullScreen: function () {
            if (screenfull.enabled) {
                screenfull.request();

            }
        },
        showSentence: function (bool, e) {
            if (bool) {
                $(".sentence").fadeIn('fast');
                _sentenceTimer = setTimeout(function () { $(".sentence").fadeOut('fast');}, 2000);
                
            } else {
                window.clearTimeout(_sentenceTimer);
                $(".sentence").fadeOut('fast');
            }
            e.preventDefault();
        },
        handleResize: function (e) {
            if (e.currentTarget.innerWidth < e.currentTarget.innerHeight) {
                $("img").width("95%");
                $("img").height("auto");
            }
            else {
                $("img").height("95%");
                $("img").width("auto");
            }   
        },
        handleKeyboard: function (ev) {
            var kCode;
            if (ev.keyCode)
            { kCode = ev.keyCode; }
            else if (ev.charCode)
            { kCode = ev.charCode; }
            else
            { kCode = ev.which; }
            if (kCode != undefined) {
                switch (kCode) {
                    //PREV
                    case 37: App.goTo(_active - 1);
                        break;
                    //NEXT
                    case 39: App.goTo(_active + 1);
                        break;
                }
            }
        },
        goTo: function (number) {
            $.jRecorder.sendData();
            var l;
            if (0 <= number && number < _imgs.length) {
                l = _imgs[number];
                _active = number;
            } else if (number < 0) {
                l = _imgs[_imgs.length - 1];
                _active = _imgs.length - 1;
            } else if (number >= _imgs.length) {
                l = _imgs[0];
                _active = 0;
            }
            $("#record").remove();
            App.renderImage(l);
        },
        renderImage: function (image) {
            $(".sentence").html(image.Sentence);
            $(".images li").each(function (i, v) {
                $(v).removeClass("active");
            });
            $(".images li:nth-of-type(" + image.Order + ")").addClass("active");
        },
        startRecording: function () {
            
        },
        handleBtnStartRec: function () {
            var settings = {
                'rec_width': '300',
                'rec_height': '200',
                'rec_top': '40%',
                'rec_left': '40%',
                'recorderlayout_id': 'flashrecarea',
                'recorder_id': 'audiorecorder',
                'recorder_name': 'audiorecorder',
                'wmode': 'transparent',
                'bgcolor': '#ff0000',
                'swf_path': _swfPath,
                'host':  _soundUploadPath +'?test=' + _testid + '$' + (_active+1).toString() ,
                'callback_started_recording': function () { },
                'callback_finished_recording': function () { },
                'callback_stopped_recording': function () { },
                'callback_error_recording': function () { },
                'callback_activityTime': function (time) { },
                'callback_activityLevel': function (level) { }
            };
            $.jRecorder(settings, $("#record"));

            $.jRecorder.record();
        }
    }
    App.init();
}(window));










