function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
function showAlert(input) {
    if (input != "") {
        var htmlstring = '<div class="alert fade in">'
            + '<button type="button" class="close" data-dismiss="alert">×</button>'
            + '<span class="alert-text">' + input + '</span>'
        + '</div>';
        $("body").prepend(htmlstring);
        $('.alert').alert();
        setTimeout(function () {
            $(".alert").alert('close')
        }, 3000);
    }
}

function getMessage() {
    var test = getParameterByName("message");
    var output  = "";
    switch (test) {
        case "login": output =  "Succesvol ingelogd.";
            break;
        case "logout": output =  "Succesvol afgemeld.";
            break;
        case "registered": output = "Succesvol geregistreerd. Er is een e-mail naar de desbetreffende logopedist gestuurd.";
            break;
        case "question": output = "E-mail succesvol verzonden.";
            break;
        case "appointment": output = "Afspraak succesvol verzonden.";
            break;
        case "registerchild": output = "Kind succesvol geregistreerd.";
            break;
        case "editimage": output = "Afbeelding succesvol aangepast.";
            break;
        case "imgdeleted": output = "Afbeelding succesvol verwijderd.";
            break;

            
            
            
        
    }
    showAlert(output);
}
$(document).ready(function () {
    getMessage();

})
