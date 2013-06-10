var _root = "http://" + window.location.host.toString() + "/";
var _up = true;
var _playing = false;
var _active = 1;
var _results = [];
var _makingError = false;
var _errorList = ["",
                    "Weglating finale consonant",
                    "Weglating initiale consonant",
                    "Clusterreductie",
                    "Epenthesis",
                    "Weglating onbeklemtoonde syllabe",
                    "Coalescentie",
                    "Fronting",
                    "Backing",
                    "Stopping",
                    "Gliding",
                    "Denasalisatie",
                    "Verstemlozing",
                    "Progressieve assimilatie",
                    "Regressieve assimilatie",
                    "Contactassimilatie",
                    "Afstandassimilatie",
                    "Reduplicatie door substitutie",
                    "Reduplicatie door additie",
                    "Metathisis",
                    "Idiosyncratische en ongewone processen"
];

(function () {
    var App = {
        init: function () {
            this.getResults();
            this.bindEvents();
        },
        bindEvents: function () {
            $(".close, .toggleInfo").click(function () {
                if (!_up) {
                    $("#test").slideUp('3000');
                    $("#info").slideUp('3000');
                    $(".close").find("i").attr("class", "icon-chevron-down")
                    _up = true;
                }
                else {
                    $("#test").slideDown('3000');
                    $("#info").slideDown('3000');
                    $(".close").find("i").attr("class", "icon-chevron-up")
                    _up = false;
                }
            });
            $("#test").hide();
            $("#info").hide();
            $(".close").find("i").attr("class", "icon-chevron-down")
            
            $("#previous").click(function () {
                if (_active != 1) {
                    App.showAnalyse(_active - 1);
                }
            });
            $("#next").click(function () {
                if (_active != _results.length) {
                    App.showAnalyse(_active + 1);
                }
            });
            $("#save").click(function () {
                App.saveAnalysis();
            });
            $("#final").click(function () {
                App.finalise();
            });

        },
        bindResultEvents: function () {
            $("#defaultspicture img").click(function () {
                if (!_playing) {
                    document.getElementById("fragment").play();
                    _playing = true;
                } else {
                    document.getElementById("fragment").pause();
                    _playing = false;
                }
            });
            //$(".result .phonetic").keyup(function (e) { App.handlePhoneticInput(e) });
            $(".addError").click(function (e) {
                if ($(e.currentTarget).parent().find(".phonetic-copy").html() != "" && !_makingError) {
                    App.addError();
                }
                e.preventDefault();
            })
        },
        bindErrorEvents: function () {
            $(".errorAccept").click(function (e) {
                var value = $(".errors .error[data-id=" + _active + "] .hearable").val();
                var text = $(".errors .error[data-id=" + _active + "] .hearable option:selected").text();
                var html = "<div class='error-entry'><span class='error-entry-type' data-value='" + value + "'>" + text + '</span><a class="btn errorRemove" href="#errors" title="Fout verwijderen"><i class="icon-remove-circle"></i></a></div>';

                $(".errors .error[data-id=" + _active + "] .error-entries-permanent").append(html);

                $(".errors .error[data-id=" + _active + "] .error-active .btn-toolbar").remove();
                $(".errors .error[data-id=" + _active + "] .error-active").remove();
                $(".errors .error[data-id=" + _active + "] .hearable").hide();
                e.preventDefault();
                _makingError = false;
                $(".errors .error[data-id=" + _active + "] .errorRemove").click(function (e) {
                    var output = window.confirm("Bent u zeker dat u deze fout wilt verwijderen");
                    if (output) {
                        $(e.currentTarget).parent().remove();
                    }
                });
            });
            $(".errorDeny").click(function (e) {
                $(".errors .error[data-id=" + _active + "] .hearable").hide();
                $(".errors .error[data-id=" + _active + "] .error-active").remove();
                e.preventDefault();
                _makingError = false;
            });
        },
        getResults: function () {
            var fd = new FormData();
            fd.append("id", _testid);
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function (evt) {
                var someting = evt.currentTarget.responseText;
                _results = JSON.parse(someting);
                App.handleResults();
            }, false);
            xhr.addEventListener("error", function (evt) {
                console.log("There was an error getting the values of the test.");
            }, false);
            xhr.addEventListener("abort", function (evt) {
                console.log("The retrieval has been canceled by the user or the browser dropped the connection.");
            }, false);
            xhr.open("POST", _root + "Test/GetValuesForAnalysing");
            xhr.send(fd);
        },
        handleResults: function () {
            var output1 = "";
            var output2 = "";
            var hearable = $(".hearable").html();
            var visible = $(".visible").html();
            for (var i = 0; i < _results.length; i++) {
                var b = i + 1;
                var html = '<section class="result nodisplay" data-id="'+ b +'">'
                            + '<section id="" class="span6">'
                                + '<audio controls="controls" preload="auto" tabindex="0">'
                                    + '<source src="'+ _root +'results/'+_testid + '/' + _results[i].Audio +'" type="audio/wav" />'
                                    + 'Your browser does not support the audio tag.'
                               + ' </audio>'
                            + '</section>'
                            + '<section id="" class="span6">'
                                + '<label class="control-label">Fonetisch</label>'
                                + '<input type="text" class="phonetic left" value="'+ _results[i].Phonetics +'" />'
                            + '</section>'
                        + '</section>';
                output1 += html;

                var v = "";
                for (var j = 0; j < _results[i].Errors.length; j++) {
                    if (_results[i].Errors[j].Id == 21) {
                        v = "Addentale fout";
                    } else if (_results[i].Errors[j].Id == 22) {
                        v = "Interdentale fout";
                    }
                }
                
                if (v == "") {
                    v = "Geen visuele fout.";
                }
                var entries = "";
                for (var j = 0; j < _results[i].Errors.length; j++) {
                    if (_results[i].Errors[j].Id != 21 && _results[i].Errors[j].Id != 22) {
                        entries += '<div class="error-entry">' +
                                        '<span class="error-entry-type" data-value="' + _results[i].Errors[j].Id + '">' + _results[i].Errors[j].Name + '</span>' +
                                        '<a class="btn errorRemove" href="#errors" title="Fout verwijderen"><i class="icon-remove-circle"></i></a>' +
                                    '</div>';
                    }
                }
                var html2 = '<section class="error" data-id="'+ b +'">'+
                                '<section id="" class="span6 borderright">'+
                                    '<h3>Fonologische Fouten</h3>' +
                                    '<p class="phonetic-copy"> </p>'+
                                    '<a class="btn addError" href="#errors"><i class="icon-plus"></i> Fout toevoegen</a>' +
                                    '<div class="error-entries-permanent">' +
                                        entries +
                                    '</div>' +
                                    '<div class="hearable-select">'+
                                        '<select class="hearable nodisplay">'+
                                            hearable +
                                        '</select>' +
                                    '</div>' +
                                    '<div class="error-entries"></div>' +
                                '</section>'+
                                '<section id="" class="span6">'+
                                    '<h3>Visuele Fouten</h3>'+
                                    v +
                                '</section>'+
                            '</section>';
                

                
                output2 += html2;
            }
            $(".results").html(output1);
            $(".errors").html(output2);
            
            App.showAnalyse(1);
            $(".errors .errorRemove").click(function (e) {
                var output = window.confirm("Bent u zeker dat u deze fout wilt verwijderen?");
                if (output) {
                    $(e.currentTarget).parent().remove();
                }
            });
            StartPhonetic();
        },
        showAnalyse: function (number) {
            $(".result").hide();
            $(".error").hide();
            $(".results .result[data-id=" + number + "]").show();
            $(".errors .error[data-id=" + number + "]").show();

            $("#defaultspicture").html('<img class="img-rounded" alt="afbeelding" src="' + _root + "images/" + _results[number-1].Image + '" />'
                        + '<audio id="fragment" class="nodisplay" tabindex="0" preload="auto" controls="controls">'
                        + '<source type="audio/wav" src="' + _root + "sound/" + _results[number-1].ImageSound + '"></source>'
                        + 'Your browser does not support the audio tag.'
                        + '</audio>');
            $("#name").html(_results[number-1].Name);
            $("#sentence").html(_results[number-1].Sentence);
            $("#phonetic").html(_results[number-1].Phonetic);

            $(".analyse-progress span").html(number + " / " + _results.length);
            $(".analyse-progress .inner-progress").width(number / _results.length * 100 + '%');
            _active = number;
            App.bindResultEvents();
        },
        handlePhoneticInput: function (e) {
            var el = $(e.currentTarget);
            $(".errors .error[data-id=" + _active + "] .phonetic-copy").html(el.val());
        },
        getSelectionHtml: function () {
            var html = "";
            if (typeof window.getSelection != "undefined") {
                var sel = window.getSelection();
                if (sel.rangeCount) {
                    var container = document.createElement("div");
                    for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                        container.appendChild(sel.getRangeAt(i).cloneContents());
                    }
                    html = container.innerHTML;
                }
            } else if (typeof document.selection != "undefined") {
                if (document.selection.type == "Text") {
                    html = document.selection.createRange().htmlText;
                }
            }
            return html;
        },
        addError: function () {
            $(".errors .error[data-id=" + _active + "] .hearable").show();
            $(".errors .error[data-id=" + _active + "] .error-entries").append("<div class='error-entry-temp error-active'><div class='btn-toolbar'>"+
                                                                                                                                '<div class="btn-group">'+
                                                                                                                                    '<a class="btn errorAccept" href="#errors" title="Fout accepteren"><i class="icon-ok-circle"></i></a>'+
                                                                                                                                    '<a class="btn errorDeny" href="#errors" title="Fout verwijderen"><i class="icon-remove-circle"></i></a>'+
                                                                                                                                '</div>'+
                                                                                                                            '</div></div>');
            App.bindErrorEvents();
            _makingError = true;
        },

        saveAnalysis: function() {
            var fd = new FormData();
            var data = {};
            var errors = [];
            var phon = [];

            $(".error").each(function (i, v) {
                var img = [];

                $(v).find("section .error-entries-permanent .error-entry").each(function (ind, val) {
                    var type = $(val).find(".error-entry-type").first().data("value");
                    var error = {};
                    error.type = type;
                    img.push(error);
                });

                errors.push(img);
                var dataid = $(v).data("id");
                var phoneticResult = $(v).parent().parent().find(".result[data-id=" + dataid + "]").first().find('.phonetic').val();
                var phonObject = {};
                phonObject.phonetic = phoneticResult;
                phon.push(phonObject);
            });
            var s = JSON.stringify(errors);
            var p = JSON.stringify(phon);
            fd.append("errors", s);
            fd.append("test", _testid);
            fd.append("phonetic", p);
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function (evt) {
                console.log(evt);
            }, false);
            xhr.addEventListener("error", function (evt) {
                console.log("There was an error saving the values of the analysis.");
            }, false);
            xhr.addEventListener("abort", function (evt) {
                console.log("The save has been canceled by the user or the browser dropped the connection.");
            }, false);
            xhr.open("POST", _root + "Test/SaveAnalysis");
            xhr.send(fd);
        },
        finalise: function () {
            App.saveAnalysis();
            var test = window.confirm("Bent u zeker dat alles coorect ingevuld is de analyse afgerond is?");
            if (test) {
                window.location = _root + "Test/Report?id=" + _testid;
            }
        }
    }
    App.init();
}(window));



