
//**************************************************************************


//  TODO:

//      Validation for input fields before send to server
/**********************************************************************
                    CHECK FOR VISUALISATION AUDIO
**********************************************************************/

//**************************************************************************


var pointer = 0;
var _uploadImagePath = window.location.toString();
var _uploadSoundPath = "http://" + window.location.host.toString() + "/Image/UploadSound";
var _root = "http://" + window.location.host.toString() + "/images/temp/";
var _rootSound = "http://" + window.location.host.toString() + "/sound/temp/";
var _send = "http://" + window.location.host.toString() + "/Image/UploadToServer";
var _deleteImagePath = "http://" + window.location.host.toString() + "/Image/DeleteTempImage";
var _error = false;


(function () {
    var App = {
        init: function () {
            this.cacheElements();
            this.bindEvents();
        },
        cacheElements: function () {
            this.$appUpload = $("#upload-section");
            this.$upload = $('#upload');
            this.$uploadClone = $("#uploadClone");
            this.$uploadRender = $('#upload-render');
            this.$send = $("#upload-send");
        },
        bindEvents: function () {
            this.$uploadClone.on('click', this.fireUpload);
            this.$upload.on('change', this.createUploads);
            this.$send.on('click', this.sendToServer);
            this.$uploadRender.on('click', '.destroy', this.deleteFile);
        },
        fireUpload: function(e){
            $('#upload').click();
            e.preventDefault();
        },
        
        createUploads: function (e) {
            App.uploadFiles(e.target.files);
        },
        uploadFiles: function (files) {
            //ADD FILES
            for (var i = 0, file; file = files[i]; ++i) {
                pointer++;
                //RENDER FILE
                App.renderFile(file, pointer);
                //UPLOAD THE FILE
                App.uploadFile(file, pointer);
                
            }
            if (files.length == 1 && $("#upload-render").children().length==0) {
                $(".upload-entry").css({ "border-radius": "5px" });
            }
            $("#upload-render").css({ "border": " 1px solid #A9A9A9" });
            StartPhonetic();
            $("#upload-send").css({ "display": "block" });
            $(".upload-entry input:text").on('change', function (e) {
                e.target.setAttribute("style", "");
            });
        },
        renderFile: function (file, p) {
            var htmlContent = ''
            + '<li class="upload-entry' + p + ' upload-entry clearfix">'
            + '<a class="destroy" href="#" title="Verwijder afbeelding"><i class="icon-remove"></i></a>'
            + ((file.type.indexOf('image') != -1) ? '<figure class="fileThumbnail"><img src="" /></figure>' : '<section class="fileThumbnail"><span>DOC</span></section>')
            + '<section class="fileInformation">'
            + '<h3>' + file.name + '<span class="info"> ('+ (file.size / 1024).toFixed(2) + ' KB)</span></h3>'
            //+ '<section class="fileMeta">'
            //+ '<span><strong>Grootte: </strong>' + (file.size / 1024).toFixed(2) + ' kB</span>'
            //+ '<span><strong>Soort: </strong>' + file.type + '</span>'
            //+ '</section>'
            + '<section class="phoneticgroup-' + p + ' phon">'
            + '<input type="text" class="img-name" name="naam" placeholder="Naam" />'
            /*+ '<span class="keyicon" onclick="toggleKeyboard(this)">.</span><a href="" onclick="erasePhonetic(this)">wis</a>'
            + '<p class="phonetic"></p>'*/
            + '<input type="text" placeholder="Fonetisch" class="phonetic" name="phonetic" />'
            + '<input type="text" placeholder="Aanvulzin" name="sentence" class="sentence"/><br />'
            + '<section class="audioInput">'
            + '<input type="file" accept="audio/*" name="audio" class="audio"/>'
            + '<a class="btn audioClone" href="#" title="Kies geluidsfragment"><i class="icon-music"></i>Kies geluidsfragment</a>'
            + '<div class="audioTag"></div>'
            + '</section>'
            + '</section>'
            + '<section class="progressi">'
            + '<progress class="pb" value="0" max="100">0 %</progress>'
            + '</section>'
            + '</section>'
            + '</li>';
            $('#upload-render').prepend(htmlContent);
            
            $(".upload-entry" + p + " .audioClone").on('click', this.fireSoundUpload);
            $(".upload-entry" + p + " .audio").on('change', this.createAudioUpload);
            

        },
        uploadFile: function (file, p) {
            //CREATE FORMDATA OBJECT
            var formData = new FormData();
            //ADD FILE
            formData.append(file.name, file);

            //CREATE THE NEW REQUEST
            var xhr = new XMLHttpRequest();

            //REGISTER LISTENERS
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    var pb = $('.upload-entry' + p).find('progress');
                    $(pb).attr('value', percentComplete);
                    $(pb).html(percentComplete.toString() + '%');
                    if (percentComplete == 100) {
                        $('.upload-entry' + p).addClass('completed');
                    }
                }
                else {
                    console.log('unable to compute');
                }
            }, false);
            xhr.addEventListener("load", function (evt) {
                //set loadbar to 100%
                var pb = $('.upload-entry' + p).find('progress');
                $(pb).attr('value', 100);
                $(pb).html('100%');
                $(pb).remove();
                $('.upload-entry' + p).addClass('completed');

                //set attributes for data-id and source
                $('.upload-entry' + p).attr('data-id', evt.target.responseText);
                $('.upload-entry' + p + ' img').attr('src', _root + evt.target.responseText);
            }, false);
            xhr.addEventListener("error", function (evt) {
                console.log("There was an error attempting to upload the file.");
            }, false);
            xhr.addEventListener("abort", function (evt) {
                console.log("The upload has been canceled by the user or the browser dropped the connection.");
            }, false);


            xhr.open("POST", _uploadImagePath);
            xhr.send(formData);
        },
        sendToServer: function () {

            App.$uploadRender.find('li').each(function (key, el) {
                $el = $(el);
                var url = $el.attr('data-id');
                var soundurl = $el.find(".audio").first().attr("data-id");
                var name = $el.find('.img-name').first().val();
                var phonetic = $el.find('.phonetic').first().val();
                var sentence = $el.find(".sentence").first().val();

                if (!$el.hasClass("completed")) {
                    _error = true;
                    $("#upload-section .error").html("De afbeeldingen zijn nog niet allemaal geladen.");
                }
                if (!$el.find(".audio").first().attr("data-id")) {
                    _error = true;
                    $("#upload-section .error").html("De geluidsfragmenten zijn nog niet allemaal geladen.");
                }
                if (name == "" || name == undefined || name == null) {
                    _error = true;
                    $el.find('.img-name').first().css({ "background": "#D36A6A", "color":"white" });
                }
                if (phonetic == "" || phonetic == undefined || phonetic == null) {
                    _error = true;
                    $el.find('.phonetic').first().css({ "background": "#D36A6A", "color": "white" });
                }
                if (sentence == "" || sentence == undefined || sentence == null) {
                    _error = true;
                    $el.find('.sentence').first().css({ "background": "#D36A6A", "color": "white" });
                }
                if (url == null || url == undefined || url == "" || name == null || name == undefined || name == "" || phonetic == null || phonetic == undefined || phonetic == "" || sentence == null || sentence == undefined || sentence == "" || soundurl == null || soundurl == undefined || soundurl == "") {
                    $("#upload-section .error").html("<p class='error'>Een van de velden werd niet ingevuld. De naam, fonetische naam, de aanvulzin en een geluidsfragment is verplicht voor elke afbeelding.</p>");
                    _error = true;
                    window.scroll(0, 0);
                }
            });
            if (!_error) {
                App.$uploadRender.find('li').each(function (key, el) {
                    $el = $(el);
                    var url = $el.attr('data-id');
                    var soundurl = $el.find(".audio").first().attr("data-id");
                    var name = $el.find('.img-name').first().val();
                    var phonetic = $el.find('.phonetic').first().val();
                    var sentence = $el.find(".sentence").first().val();

                    var fd = new FormData();
                    fd.append("name", name);
                    fd.append("phonetic", phonetic);
                    fd.append("img", url);
                    fd.append("sentence", sentence);
                    fd.append("audio", soundurl);

                    //CREATE THE NEW REQUEST
                    var xhr = new XMLHttpRequest();

                    xhr.addEventListener("load", function (evt) {
                        console.log(evt.target.responseText);
                        if (evt.target.responseText == "error") {
                            window.scrollTo(0, 0);
                        }
                        else if (evt.target.responseText == "saved") {
                            App.$uploadRender.children().each(function (key, child) {
                                $(child).remove();
                            });
                            var htmlstring = '<div class="alert fade in">'
                                    + '<button type="button" class="close" data-dismiss="alert">×</button>'
                                    + '<span class="alert-text">Succesvol toegevoegd.</span>'
                                + '</div>';
                            $("body").prepend(htmlstring);
                            $('.alert').alert();
                            setTimeout(function () {
                                $(".alert").alert('close')
                            }, 3000);
                            $("#upload-render").css({ "border": "none" });
                            $("#upload-section .error").html("");
                            $("#upload-send").hide();
                        }

                    }, false);
                    xhr.addEventListener("error", function (evt) {
                        console.log("There was an error attempting to delete the file.");
                    }, false);
                    xhr.addEventListener("abort", function (evt) {
                        console.log("The delete has been canceled by the user or the browser dropped the connection.");
                    }, false);

                    xhr.open("POST", _send);
                    xhr.send(fd);
                });
            }
            _error = false;
            
        },
        deleteFile: function (e) {
            //CREATE FORMDATA OBJECT
            var formData = new FormData();

            var id = $(e.target).parent().parent().data('id');
            var audio = $(e.target).parent().parent().find(".audio").first().data('id');
            if (audio == undefined || audio == "" || audio  == NaN) {
                console.log("there was no audio detected");
            }
            else {
                formData.append("audio", audio);
            }
            formData.append("id", id);

            //CREATE THE NEW REQUEST
            var xhr = new XMLHttpRequest();

            xhr.addEventListener("load", function (evt) {
                console.log(evt.target.responseText);
                if (evt.target.responseText == "200") {
                    $(e.target).parent().parent().remove();
                    var count = document.getElementsByClassName("upload-entry").length;
                    if (count == 1) {
                        $(".upload-entry").css({ "border-radius": "5px" });
                    } else if (count == 0) {
                        $("#upload-render").css({ "border": "none" });
                        $("#upload-send").hide();
                    }
                }
            }, false);
            xhr.addEventListener("error", function (evt) {
                console.log("There was an error attempting to delete the file.");
            }, false);
            xhr.addEventListener("abort", function (evt) {
                console.log("The delete has been canceled by the user or the browser dropped the connection.");
            }, false);


            xhr.open("POST", _deleteImagePath);
            xhr.send(formData);
            e.preventDefault();
            
        },
        createAudioUpload: function (e) {
            console.log("audio Upload initiate");
            console.log(e.target.files[0]);
            var aud = e.target.files[0];

            //CREATE FORMDATA OBJECT
            var formData = new FormData();
            //ADD FILE
            formData.append(aud.name, aud);

            //CREATE THE NEW REQUEST
            var xhr = new XMLHttpRequest();

            xhr.addEventListener("load", function (evt) {
                //set attributes for data-id and source
                e.target.setAttribute('data-id', evt.target.responseText);
                var audios = '<audio controls="controls" preload="preload">'
                            +'<source src="' + _rootSound + evt.target.responseText.split(",")[0] + '" type="audio/wav">'
                            +'Your browser does not support the audio tag.'
                        +'</audio>'; 


                $(e.target.parentNode).find(".audioTag").first().html(audios);
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
        fireSoundUpload: function (e) {
            var el = $(e.target.parentNode).find('.audio').click();
            e.preventDefault();
        }
    }
    App.init();
}(window));