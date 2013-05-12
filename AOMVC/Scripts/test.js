var _getImages = "http://" + window.location.host.toString() + "/Test/GetRoutines";
var _imgPath = "http://" + window.location.host.toString() + "/images/";
var _soundUploadPath = "http://" + window.location.host.toString() + "/Test/UploadSound";
var _soundFragmentPath = "http://" + window.location.host.toString() + "/sound/";
var _swfPath = "http://" + window.location.host.toString() + "/Scripts/jRecorder.swf";
var _timer;
var _sentenceTimer;
var _imgs;
var _active = 0;
var _audio = {};
var _fragments = {};

(function () {
    var App = {
        init: function () {
            this.bindEvents();
        },
        bindEvents: function () {
            this.getImagesInRoutine();
            $(window).resize(function (e) { App.handleResize(e); });
            $(window).mousemove(function (e) { App.toggleFooter(e); });

            $("#startTest button").click(function () {
                App.startRecording();
            });

            $("footer li a").click(function (e) {
                var funct = $(e.currentTarget).data("function");
                switch (funct) {
                    case "back":
                        App.goTo(_active - 1);
                        break;
                    case "fullscreen":
                        App.setFullScreen();
                        break;
                    case "sentence":
                        //Do nothing, look at mouseup and down events
                        break;
                    case "playaudio":
                        App.playFragment();
                        break;
                    case "pause":
                        App.pauseRecording();
                        break;
                    case "wrong":
                        App.markAnswer(false);
                        break;
                    case "correct":
                        App.markAnswer(true);
                        break;
                    case "next":
                        App.goTo(_active + 1);
                        break;
                    default:
                        console.log("Function " + funct + " is not defined in footer."); 
                        break;
                }
            });
            $("footer li a").mouseup(function (e) {
                if ($(e.currentTarget).data("function") == "sentence")
                {
                    App.showSentence(false, e);
                }
            });
            $("footer li a").mousedown(function (e) {
                if ($(e.currentTarget).data("function") == "sentence") {
                    App.showSentence(true, e);
                }
            });
            $(window).keydown(function (e) {
                App.handleKeyboard(e);
            });
            this.initializeRecorder();
        },
        //INIT
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
                    _fragments[index] = value.Sound;
                });
                $(".images").append(list);
                $("#progress").html("1 / " + _imgs.length);
            });
            var e = {};
            e.currentTarget = window;
            this.handleResize(e);
        },
        //USER EVENTS VISUALS
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
                $("img").width("70%");
                $("img").height("auto");
            }
            else {
                $("img").height("70%");
                $("img").width("auto");
            }   
        },
        //HANDLE USER INPUT -- NAVIGATION
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
                    case 37: App.goTo(_active - 1);
                        break;
                    case 39: App.goTo(_active + 1);
                        break;
                }
            }
        },
        goTo: function (number) {
            var l;
            if (0 <= number && number < _imgs.length) {
                l = _imgs[number];
                _active = number;
                App.renderImage(l);
                App.renderProgress(number + 1);
            }
        },
        //RENDERING 
        renderImage: function (image) {
            $(".sentence").html(image.Sentence);
            $(".images li").each(function (i, v) {
                $(v).removeClass("active");
            });
            $(".images li:nth-of-type(" + image.Order + ")").addClass("active");
        },
        renderProgress: function(act) {
            $("#progress").html(act + " / " + _imgs.length);
        },
        playFragment: function () {
            var url = _fragments[_active];
            var sound = document.createElement("source");
            sound.src = _soundFragmentPath + url;
            sound.type = "audio/wav";
            $("#fragment").append(sound);
            document.getElementById("fragment").play();
            console.log(url);
        },
        //RECORDER HANDLERS
        initializeRecorder: function () {
            var settings = {
                'rec_width': '300',
                'rec_height': '200',
                'rec_top': '40%',
                'rec_left': '40%',
                'recorderlayout_id': 'flashrecarea',
                'recorder_id': 'audiorecorder',
                'recorder_name': 'audiorecorder',
                'wmode': 'transparent',
                'bgcolor': '#000000',
                'swf_path': _swfPath,
                'host': _soundUploadPath + '?filename=' + _testid.toString(),
                'callback_started_recording': function () { },
                'callback_finished_recording': function (e) { App.finished(e) },
                'callback_stopped_recording': function () { },
                'callback_finished_params': function(params){ App.showParameter(params) },
                'callback_error_recording': function () { },
                'callback_activityTime': function (time) { },
                'callback_activityLevel': function (level) { }
            };
            $.jRecorder(settings, $("#record"));
        },
        startRecording: function () {
            $("#startTest").fadeOut('fast');
            $(".overlay").fadeOut('fast');
            $.jRecorder.record();
        },
        stopRecording: function () {
            $.jRecorder.stop();
        },
        sendData: function () {
            $.jRecorder.sendData();
        },
        pauseRecording: function () {
            $.jRecorder.pause();
        },
        //RECORDER CALLBACKS
        showParameter: function (params) {
            console.log("params: " + params);
            _audio[_active] = params;
        }
    }
    App.init();
}(window));