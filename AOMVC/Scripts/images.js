$(document).ready(function () {
    $(".image-block img").mouseenter(function (e) {
        $(e.target.parentNode).find(".image-overlay").first().fadeIn("fast");
    });
    $(".image-overlay").mouseleave(function (e) {
        $(".image-overlay").fadeOut("fast");
    });
    $(".delete").click(function (e) {
        var id = $(e.target).data('id');
        deleteImage(id);
    });
});

function deleteImage(id) {
    var formData = new FormData();
    formData.append("id", id);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function (evt) {
        showDialog(evt.target.responseText, id);
    }, false);
    xhr.addEventListener("error", function (evt) {
        console.log("There was an error attempting to upload the file.");
    }, false);
    xhr.addEventListener("abort", function (evt) {
        console.log("The upload has been canceled by the user or the browser dropped the connection.");
    }, false);


    xhr.open("POST", "http://" + window.location.host + "/image/delete/");
    xhr.send(formData);
}

function showDialog(code, id) {
    switch (code) {
        case '200':
            var dialog = '<div id="dialog-confirm" title="Afbeelding verwijderen?">'
                + '<p><span class="ui-icon ui-icon-trash" style="float: left; margin: 0 7px 20px 0;"></span>Deze afbeelding zal verwijderd worden en kan niet meer teruggehaald worden. Bent u zeker dat u deze wilt verwijderen?</p>';
            +'</div>';
            $("body").append(dialog);

                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: 180,
                    width: 550,
                    modal: true,
                    buttons: {
                        "Verwijderen": function () {
                            deleteConfirmedImage(id);
                            $(this).dialog("close");
                        },
                        Annuleer: function () {
                            console.log("cancel");
                            $(this).dialog("close");
                        }
                    }
                });
                break;
        case '404':
            var dialog = '<div id="dialog-confirm" title="Kan de afbeelding niet verwijderen.">'
               + '<p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>Deze afbeelding kan niet verwijderd worden omdat deze gebruikt wordt in één of meerdere routines. Gelieve deze routines eerst te verwijderen of aan te passen.</p>';
            +'</div>';
            $("body").append(dialog);

            $("#dialog-confirm").dialog({
                resizable: false,
                height: 180,
                width: 660,
                modal: true,
                buttons: {
                    "Ok": function () {
                        $(this).dialog("close");
                    }
                }
            });

            break;
        case '401': console.log("not mine");
            break;

    }
};

function deleteConfirmedImage(id) {
    var formData = new FormData();
    formData.append("id", id);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function (evt) {
        window.location = "http://" + window.location.host + "/image/?message=imgdeleted";
    }, false);
    xhr.addEventListener("error", function (evt) {
        console.log("There was an error attempting to upload the file.");
    }, false);
    xhr.addEventListener("abort", function (evt) {
        console.log("The upload has been canceled by the user or the browser dropped the connection.");
    }, false);

    xhr.open("POST", "http://" + window.location.host + "/image/DeleteConfirmed/");
    xhr.send(formData);
}