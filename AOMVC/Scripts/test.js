//TODO:
//
//pauzeerscherm inlassen(in goto)
//

var _getImages = "http://" + window.location.host.toString() + "/Test/GetRoutines";
var _finished = "http://" + window.location.host.toString() + "/Test/";
var _imgPath = "http://" + window.location.host.toString() + "/images/";
var _soundUploadPath = "http://" + window.location.host.toString() + "/Test/UploadSound";
var _soundFragmentPath = "http://" + window.location.host.toString() + "/sound/";
var _swfPath = "http://" + window.location.host.toString() + "/Scripts/jRecorder.swf";
var _finalizePath = "http://" + window.location.host.toString() + "/Test/Finalize";
var _timer;
var _sentenceTimer;
var _imgs;
var _active = 0;
var _audio = {};
var _fragments = {};
var _paused = false;
var _errors = {};
var _results = {};
var _comment;
var started = false;

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
                started = true;
            });
            $("#pause").click(function () {
                App.resumeRecording();
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
                        if (_paused) {
                            App.resumeRecording();
                        }else{
                            App.pauseRecording();
                        }
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
                    case "visualError":
                        App.showVisualError();
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
            var rbl = document.getElementsByName("error");
            $(rbl).change(function () {
                App.hideVisualErrors();
            });
            $("#setError p").click(function () {
                App.closeErrorDialog();
            });
            $("#noMicrophone > p:first-of-type").click(function () {
                App.closeMicrophoneDialog();
            });
            $("#comment button").click(function () {
                App.finalizeTest();
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
            _timer = setTimeout(function () { $("footer").fadeOut(300); }, 500);
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
            if (started) {
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
                        case 32: App.markAnswer(true);
                            break;
                        case 13: App.markAnswer(false);
                            break;
                    }
                }
            }
        },
        goTo: function (number) {
            var l;
            if (0 <= number && number < _imgs.length) {
                l = _imgs[number];
                _active = number;
                App.stopRecording();
                //App.sendData();
                App.resetErrorList();
                App.renderImage(l);
                App.renderProgress(number + 1);
                _results[_active] = true;
                //App.startRecording();
            }
            else if (number == _imgs.length) {
                _active = number;
                _results[_active] = true;
                App.stopRecording();
                App.showWYSIWYG();
            }
        },
        markAnswer: function (score) {
            var pos = _active + 1;
            if (pos != _imgs.length) {
                l = _imgs[pos];
                _active++;
                App.stopRecording();
                //App.sendData();
                App.resetErrorList();
                App.renderImage(l);
                App.renderProgress(_active + 1);
                _results[_active] = score;
            }
            else {
                _active++;
                _results[_active] = score;
                App.stopRecording();
                App.showWYSIWYG();
            }
        },
        showVisualError: function(){
            $("#setError").fadeIn();
        },
        hideVisualErrors: function(e, item) {
            $("#setError").fadeOut();
            var error = document.getElementsByName("error");
            for (var elem in error) {
                if (error[elem].checked) {
                    _errors[_active + 1] = error[elem].value;
                }
            }
            
            
        },
        resetErrorList: function () {
            //Reset Errorlist
            var error = document.getElementsByName("error");
            for (var elem in error) {
                if (error[elem].value == "0") {
                    error[elem].checked = true;
                }
            }
        },
        closeErrorDialog: function () {
            $("#setError").fadeOut();
        },
        closeMicrophoneDialog: function () {
            $("#noMicrophone").fadeOut();
            $(".overlay").fadeOut();
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
        showWYSIWYG: function () {
            $(".images").css({ "display": "none" });
            $("#comment").show();
            $(".overlay").show();
            tinymce.init({
                selector: "textarea#comment_field",
                theme: "advanced",
                width: 800,
                height: 400,
                //content_css: "css/content.css",
                toolbar: "undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | hr code",
            });
        },
        //RECORDER HANDLERS
        initializeRecorder: function () {
            var settings = {
                'rec_width': '150',
                'rec_height': '100',
                'rec_top': '0%',
                'rec_left': '0%',
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
                'callback_error_recording': function () { console.log("Error rec")},
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
        pauseRecording: function () {
            $.jRecorder.pause();
            $("footer a").each(function (ind,val) {
                if ($(val).data("function") == "pause") {
                    $(val).attr("title", "pauzeer test")
                    $(val).find("i").first().removeClass("icon-pause").addClass("icon-play");
                }
            });
            _paused = true;
            $(".overlay").fadeIn();
            $("#pause").fadeIn();
        },
        resumeRecording: function () {
            $.jRecorder.resume();
            $("footer a").each(function (ind, val) {
                if ($(val).data("function") == "pause") {
                    $(val).attr("title","herneem test")
                    $(val).find("i").first().removeClass("icon-play").addClass("icon-pause");
                }
            });
            _paused = false;
            $(".overlay").fadeOut();
            $("#pause").fadeOut();
        },
        sendData: function () {
            $.jRecorder.sendData();
        },
        //RECORDER CALLBACKS
        showParameter: function (params) {
            console.log("params: " + params);
            _audio[_active] = params;
        },


        finalizeTest: function () {
            _comment = tinyMCE.activeEditor.getContent();
            var formData = new FormData();
            formData.append("comment", _comment);
            formData.append("errors", JSON.stringify(_errors));
            formData.append("audio", JSON.stringify(_audio));
            formData.append("results", JSON.stringify(_results));
            formData.append("test_id", _testid);
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function (evt) {
                if (evt.currentTarget.responseText == "success") {
                    window.location = _finished;
                }
            }, false);
            xhr.addEventListener("error", function (evt) {
                console.log("There was an error finalizing the test.");
            }, false);
            xhr.addEventListener("abort", function (evt) {
                console.log("The finalizing has been canceled by the user or the browser dropped the connection.");
            }, false);

            xhr.open("POST", _finalizePath);
            xhr.send(formData);
        }
    }
    App.init();
}(window));