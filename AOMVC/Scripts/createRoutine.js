var _name;
var _routineToServer = "http://" + window.location.host.toString() + "/Routine/Create";

$(document).ready(function (e) {
    $("#routine-name").focus(function (e) {
        $(e.target).attr("style", "");
    });

    $(".gallery-img").click(function (e) {
        if ($(e.currentTarget).hasClass("selected")) {
            $(e.currentTarget).css({ "background": "none" });
            $(e.currentTarget).removeClass("selected");
        }
        else {
            $(e.currentTarget).css({ "background-color": "#9E9E9E" });
            $(e.currentTarget).addClass("selected");
        }
    });
});

function next(id) {
    switch (id) {
        case 1:
            if ($("#routine-name").val() == "") {
                console.log("empty");
                $("#routine-name").css({ "background": "#D36A6A", "color": "white" });
            } else {
                _name = $("#routine-name").val();
                $("#name-step").hide();
                $("#image-step").show();
            }

            break;
        case 2: $("#image-step").hide();
            $("#sorting-step").show();
            var outp = "";
            $("#image-step .selected").each(function (k, v) {
                outp += '<li class="gallery-img" data-id="' + $(v).data("id") + '"><img src="' + $(v).find('img').first().attr('src') + '" alt="' + $(v).find('img').first().attr('alt') + '" /></li>';
            });
            $(".sortable").html(outp);
            $(".sortable").sortable();
            $(".sortable").disableSelection();
            break;
    }
}
function prev(id) {
    switch (id) {
        case 1: $("#image-step").hide();
            $("#name-step").show();
            break;
        case 2:
            $("#sorting-step").hide();
            $("#image-step").show();
            break;
    }
}
function finish() {
    console.log("send to server");
    var imgs = [];
    $("#sorting-step .gallery .gallery-img").each(function (i, v) {
        imgs.push($(v).data('id').toString());
    });
    console.log(imgs);

    var formData = new FormData();
    formData.append("name", _name);
    formData.append("imges", imgs);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function (evt) {
        if (evt.target.responseText == "200") {
            window.location = "http://" + window.location.host.toString() + "/Routine/?message=routinecreate";
        };
    }, false);
    xhr.addEventListener("error", function (evt) {
        console.log("There was an error attempting to upload the file.");
    }, false);
    xhr.addEventListener("abort", function (evt) {
        console.log("The upload has been canceled by the user or the browser dropped the connection.");
    }, false);
    xhr.open("POST", _routineToServer);
    xhr.send(formData);
}