/* ARRAYS WITH PHONETIC ABBREVIATIONS */
var a = ["\u03B1"];
var z = ["\u0292"];
var e = ["\u025B", "\u0259"];
var u = ["\u028C"]
var i = ["\u026A"];
var o = ["\u0254"];
var s = ["\u0283"];
var g = ["\u0263", "\u03C7"];
var n = ["\u014B", "\u0272"];
var multiple = ["\u00F8", "\u03B5\u03AF", "\u0153y", "\u0153"]
var eu = ["\u0153"];
var ei = ["\u025B" + "i"];
var ui = ["\u0153" + "i"];
var tooltip;
var dataid = new Number();
var over = false;

/* END ARRAY */


$(document).ready(function () {
    
});

function StartPhonetic() {
    //$(".phonetic").first().focus();
    $(".phonetic").each(function (i, val) {
        $(val).keypress(function (ev) {
            var kCode;
            if (ev.keyCode)
            { kCode = ev.keyCode; }
            else if (ev.charCode)
            { kCode = ev.charCode; }
            else
            { kCode = ev.which; }
            CheckPhonetic(ev, val, kCode);
        })
        $(".phonetic").blur(function (e) {
            if (!over) {
                $(tooltip).remove();
            }
                
        });
    })
    $(".phonetic").each(function (i, val) {
        var kCode;
        $(val).keydown(function (ev) {
            if (ev.keyCode)
            { kCode = ev.keyCode; }
            else if (ev.charCode)
            { kCode = ev.charCode; }
            else
            { kCode = ev.which; }
            if (tooltip) {
                switch (kCode) {
                    case 8: $(tooltip).remove();
                        break;
                    case 38: PreventCursorMove(ev, val);
                        MoveSelection(0, val);
                        break;
                    case 40: PreventCursorMove(ev, val);
                        MoveSelection(1, val);
                        break;
                    case 37:
                        $(tooltip).remove();
                        break;
                    case 39:
                        $(tooltip).remove();
                        break;
                    case 27: $(tooltip).remove();
                        break;
                    case 13: console.log($(".active").html()); AddToString(val, $(".active").html());
                        break;

                }
            };
        })
    });
}

function MoveSelection(dir, elemen) {
    if (dir == 1) {
        $(tooltip).find("li").each(function (ind, vallue) {
            if ($(vallue).hasClass("active")) {
                dataid = parseInt(vallue.getAttribute("data-id"));
                if (parseInt($(tooltip).find("li").length) - 1 != dataid) {
                    $(vallue).removeClass("active");
                };
            };
        })
        if (dataid != parseInt($(tooltip).find("li").length) - 1) {
            $(tooltip).find("li").each(function (ind, vallue) {
                if ($(vallue).attr("data-id") == (dataid + 1).toString()) {
                    $(vallue).addClass("active");
                };
            })
        };
    } else if (dir == 0) {
        $(tooltip).find("li").each(function (ind, vallue) {
            if ($(vallue).hasClass("active")) {
                dataid = parseInt(vallue.getAttribute("data-id"));
                if (0 != dataid) {
                    $(vallue).removeClass("active");
                };
            };
        })
        if (dataid != 0) {
            $(tooltip).find("li").each(function (ind, vallue) {
                if ($(vallue).attr("data-id") == (dataid - 1).toString()) {
                    $(vallue).addClass("active");
                };
            })
        };
    }
}

function CheckPhonetic(ev, el, char) {
    switch (char) {
        case 43: ShowHint(el, multiple);
            break;
        case 97: ShowHint(el, a);
            break;

        case 101: ShowHint(el, e);
            break;

        case 103: ShowHint(el, g);
            break;

        case 105: ShowHint(el, i);
            break;

        case 110: ShowHint(el, n);
            break;
        case 111: ShowHint(el, o);
            break;

        case 115: ShowHint(el, s);
            break;

        case 117: ShowHint(el, u);
            break;

        case 122: ShowHint(el, z);
            break;

        default:
            if (char != 38 && char != 40) {
                tooltip = document.getElementById("tooltip");
                if (tooltip) $(tooltip).remove();
            } else {
                PreventCursorMove(ev, el);
            }
            break;
    }
}

function PreventCursorMove(ev, el) {
    var pos = el.selectionStart;
    //el.value = (ev.keyCode == 38?1:-1)+parseInt(el.value,10);        
    el.selectionStart = pos; el.selectionEnd = pos;
    ev.preventDefault();
}

function ShowHint(el, list) {
    //SHOW TOOLTIP
    tooltip = document.getElementById("tooltip");
    if (tooltip) {
        $(tooltip).remove();
    };

    tooltip = document.createElement("ul");
    tooltip.setAttribute("id", "tooltip");
    tooltip.setAttribute("data-array", "tooltip");

    for (var i = 0; i < list.length; i++) {
        var lis = document.createElement("li");
        lis.setAttribute("class", "toolelem");
        lis.setAttribute("data-id", i);
        $(lis).html(list[i]);
        $(lis).click(function (e) {
            AddToString(el, $(e.currentTarget).html());
        });
        tooltip.appendChild(lis);
    };
    var xPos = el.offsetLeft + el.offsetWidth + 10;
    var yPos = el.offsetTop;

    el.parentNode.appendChild(tooltip);

    $(tooltip).find("li").each(function (ind, vallue) {
        if ($(vallue).attr("data-id") == 0) {
            $(vallue).addClass("active");
        };
    })
    var co = $(tooltip).children().length;
    if (co == 1) {
        $(".toolelem").css({ "border-radius": "8px" });
    };
    $(tooltip).css({ "top": yPos, "left": xPos });
    $(tooltip).mouseenter(function (e) {
        over = true;
    }).mouseleave(function (e) {
        over = false;
    });
}

function AddToString(el, letter) {
    //Delete character to be replaced
    backspaceAtCursor(el);
    //insert new char
    insertAtCursor(el, letter);
    //hide tooltip
    tooltip = document.getElementById("tooltip");
    $(tooltip).remove();
    $(el).focus();
}

function insertAtCursor(elementRef, valueToInsert) {
    if (document.selection) {
        // Internet Explorer
        elementRef.focus();
        var selectionRange = document.selection.createRange();
        selectionRange.text = valueToInsert;
    }
    else if ((elementRef.selectionStart) || (elementRef.selectionStart == '0')) {
        // Mozilla/Netscape
        var startPos = elementRef.selectionStart;
        var endPos = elementRef.selectionEnd;
        elementRef.value = elementRef.value.substring(0, startPos) +
		valueToInsert + elementRef.value.substring(endPos, elementRef.value.length);
    }
    else {
        elementRef.value += valueToInsert;
    }
}
function backspaceAtCursor(element) {
    var field = element;
    if (field.selectionStart) {
        var startPos = field.selectionStart;
        var endPos = field.selectionEnd;

        if (field.selectionStart == field.selectionEnd) {
            field.value = field.value.substring(0, startPos - 1) + field.value.substring(endPos, field.value.length);

            field.focus();
            field.setSelectionRange(startPos - 1, startPos - 1);
        }
        else {
            field.value = field.value.substring(0, startPos) + field.value.substring(endPos, field.value.length);

            field.focus();
            field.setSelectionRange(startPos, startPos);
        }
    }
}