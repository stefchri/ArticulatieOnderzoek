
var _editImagePath = "http://" + window.location.host.toString() + "/Image/Edit";
var _uploadSoundPath = "http://" + window.location.host.toString() + "/Image/UploadSound";
var _soundPath = "http://" + window.location.host.toString() + "/sound/temp/";
var _error = false;
var _loading = false;
var _audioUrl = "";


(function () {
    var App = {
        init: function () {
            StartPhonetic();
            this.bindEvents();
            $("#SoundUrl").on('change', this.fireChangeAudio);
            $("#edit-image-submit").on('click', this.fireApplyChanges);
            $(".controls input:text").on('focus', this.focusFields);
        },
        bindEvents: function () {

        },
        focusFields: function(e){
            _error = false;
            $(e.target).attr("style", "");
        },
        fireChangeAudio: function (e) {
            _loading = true;
            App.uploadFiles(e.target.files);
        },
        uploadFiles: function (files) {
            //ADD FILES
            for (var i = 0, file; file = files[i]; ++i) {
                App.uploadFile(file);
            }
        },
        uploadFile: function (file) {
            var pb = '<div class="bar" style="width: 0%;"></div>';
            $(".progress").fadeIn().html(pb);
            var formData = new FormData();
            formData.append(file.name, file);
            var xhr = new XMLHttpRequest();

            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    var bar = $('.progress').find('bar');
                    $(bar).css({'width': percentComplete});
                    
                }
                else {
                    console.log('unable to compute');
                }
            }, false);
            xhr.addEventListener("load", function (evt) {
                $(".progress .bar").animate({ width: "100%" }, 1000, function () {
                    $(".progress").fadeOut("slow");
                });
                $('.edit-form audio source').remove();
                $('.edit-form audio').html("<source src=" + _soundPath + evt.target.responseText.split(",")[0] + " type=" + evt.target.responseText.split(",")[1] + " />");
                //$('.edit-form audio source').attr('src', _soundPath + evt.target.responseText.split(",")[0]);
                //$('.edit-form audio source').attr('type', evt.target.responseText.split(",")[1]);
                _audioUrl = evt.target.responseText.split(",")[0];
                $('.edit-form audio').load();
                _loading = false;
            }, false);
            xhr.addEventListener("error", function (evt) {
                console.log("There was an error attempting to upload the file.");
            }, false);
            xhr.addEventListener("abort", function (evt) {
                console.log("The upload has been canceled by the user or the browser dropped the connection.");
            }, false);
            xhr.open("POST", _uploadSoundPath);
            xhr.send(formData);
        },
        fireApplyChanges: function (e) {
            var name = $("#Name").val();
            var phonetic = $("#Phonetic").val();
            var sentence = $("#Sentence").val();
            var id = $(".edit-form").data('id');

            if (_loading == true) {
                var htmlstring = '<div class="alert alert-error fade in">'
                                   + '<button type="button" class="close" data-dismiss="alert">×</button>'
                                   + '<span class="alert-text">Het geluidsfragment is nog aan het laden.</span>'
                               + '</div>';
                $("body").prepend(htmlstring);
                $('.alert').alert();
                setTimeout(function () {
                    $(".alert").alert('close');
                }, 3000);
                _error = true;
            }
            if (sentence == "") {
                $("#Sentence").css({ "background": "#D36A6A", "color": "white" });
                _error = true;
            }
            if (name == "") {
                $("#Name").css({ "background": "#D36A6A", "color": "white" });
                _error = true;
            }
            if (phonetic == "") {
                $("#Phonetic").css({ "background": "#D36A6A", "color": "white" });
                _error = true;
            }
            if (!_error) {
                console.log("gooood");

                var formData = new FormData();
                formData.append("name", name);
                formData.append("sentence", sentence);
                formData.append("phonetic", phonetic);
                formData.append("id", id);
                formData.append("audioUrl", _audioUrl);
                var xhr = new XMLHttpRequest();

                xhr.addEventListener("load", function (evt) {
                    if (evt.target.responseText == "success") {
                        console.log("success");
                        window.location = "http://" + window.location.host.toString() + "/image/?message=editimage";
                    } else if (evt.target.responseText == "error") {
                        console.log("error");
                    } else {
                        console.log("No idea what happened...");
                    }
                    
                }, false);
                xhr.addEventListener("error", function (evt) {
                    console.log("There was an error attempting to upload the file.");
                }, false);
                xhr.addEventListener("abort", function (evt) {
                    console.log("The upload has been canceled by the user or the browser dropped the connection.");
                }, false);
                xhr.open("POST", _editImagePath);
                xhr.send(formData);

            }

            e.preventDefault();
        }
    }
    App.init();
}(window));