var activeNr;
var phonetic = "";
var kb = '<div class="kb-close">x</div><div class="keyboardrow"><div class="key"><img title="Rhoticity diacritic [02DE: MODIFIER LETTER RHOTIC HOOK ]" src="/Content/phonetic/images/25CC02DE.png" alt="˞"><img title="No audible release diacritic [031A: COMBINING LEFT ANGLE ABOVE]" src="/Content/phonetic/images/25CC031A.png" alt="̚"><img title="Minor (foot) group [007C: VERTICAL LINE]" src="/Content/phonetic/images/007C.png" alt="|" id="minorgroup2"></div>'
		+ '<div class="key"><img title="High central vowel unrounded [0268: LATIN SMALL LETTER I WITH STROKE]" src="/Content/phonetic/images/0268.png" alt="ɨ"><img title="(Post) alveolar click [01C3: LATIN LETTER RETROFLEX CLICK]" src="/Content/phonetic/images/01C3.png" alt="ǃ"><img title="Uvular nasal [0274: LATIN LETTER SMALL CAPITAL N]" src="/Content/phonetic/images/0274.png" alt="ɴ"></div>'
		+ '<div class="key"><img title="Upper mid front vowel rounded [00F8: LATIN SMALL LETTER O WITH STROKE]" src="/Content/phonetic/images/00F8.png" alt="ø"><img title="Primary stress [02C8: MODIFIER LETTER VERTICAL LINE]" src="/Content/phonetic/images/02C8.png" alt="ˈ"><img title="Major (intonation) group [2016: DOUBLE VERTICAL LINE]" src="/Content/phonetic/images/2016.png" alt="‖" id="majorgroup2"></div>'
		+ '<div class="key"><img title="Lower-mid central unrounded vowel [025C: LATIN SMALL LETTER REVERSED OPEN E]" src="/Content/phonetic/images/025C.png" alt="ɜ"><img title="Alveolar approximant [0279: LATIN SMALL LETTER TURNED R]" src="/Content/phonetic/images/0279.png" alt="ɹ"><img title="Retroflex approximant [027B: LATIN SMALL LETTER TURNED R WITH HOOK]" src="/Content/phonetic/images/027B.png" alt="ɻ"></div>'
		+ '<div class="key"><img title="Alveolar tap or flap [027E: LATIN SMALL LETTER R WITH FISHHOOK]" src="/Content/phonetic/images/027E.png" alt="ɾ"><img title="0024 DOLLAR SIGN" src="/Content/phonetic/images/0024.png" alt="$"><img title="Retroflex tap or flap [027D: LATIN SMALL LETTER R WITH TAIL]" src="/Content/phonetic/images/027D.png" alt="ɽ"></div>'
		+ '<span class="key"><img title="Velarized voiced alveolar lateral approximant [026B: LATIN SMALL LETTER L WITH MIDDLE TILDE]" src="/Content/phonetic/images/026B.png" alt="ɫ"><img title="Secondary stress [02CC: MODIFIER LETTER LOW VERTICAL LINE]" src="/Content/phonetic/images/02CC.png" alt="ˌ"><img title="Velar lateral approximant [029F: LATIN LETTER SMALL CAPITAL L]" src="/Content/phonetic/images/029F.png" alt="ʟ"></span>'
		+ '<span class="key"><img title="Lower central vowel rounded [0250: LATIN SMALL LETTER TURNED A]" src="/Content/phonetic/images/0250.png" alt="ɐ"><img title="Non-syllabic diacritic [032F: COMBINING INVERTED BREVE BELOW]" src="/Content/phonetic/images/25CC032F.png" alt="̯"><img title="Voiced bilabial implosive [0253: LATIN SMALL LETTER B WITH HOOK]" src="/Content/phonetic/images/0253.png" alt="ɓ"></span>'
		+ '<span class="key"><img title="Upper mid back vowel unrounded [0264: LATIN SMALL LETTER RAMS HORN]" src="/Content/phonetic/images/0264.png" alt="ɤ"><img title="Low front vowel rounded [0276: LATIN LETTER SMALL CAPITAL OE]" src="/Content/phonetic/images/0276.png" alt="ɶ"><img title="Velarised diacritic [02E0: MODIFIER LETTER SMALL GAMMA]" src="/Content/phonetic/images/02E0.png" alt="ˠ"></span> '
		+ '<span class="key"><img title="Mid central vowel rounded [0275: LATIN SMALL LETTER BARRED O]" src="/Content/phonetic/images/0275.png" alt="ɵ"><img title="002A ASTERISK" src="/Content/phonetic/images/002A.png" alt="*"><img title="Lower-mid central rounded vowel [025E: LATIN SMALL LETTER CLOSED REVERSED OPEN E]" src="/Content/phonetic/images/025E.png" alt="ɞ"></span> '
		+ '<span class="key"><img title="Lower mid front vowel rounded [0153: LATIN SMALL LIGATURE OE]" src="/Content/phonetic/images/0153.png" alt="œ"><img title="0028 LEFT PARENTHESIS" src="/Content/phonetic/images/0028.png" alt="("><img title="Voiced velar implosive [0260: LATIN SMALL LETTER G WITH HOOK]" src="/Content/phonetic/images/0260.png" alt="ɠ"></span> '
		+ '<span class="key"><img title="Voiceless diacritic [0325: COMBINING RING BELOW]" src="/Content/phonetic/images/25CC0325.png" alt="̥"><img title="0029 RIGHT PARENTHESIS" src="/Content/phonetic/images/0029.png" alt=")"><img title="Voiceless diacritic [030A: COMBINING RING ABOVE]" src="/Content/phonetic/images/25CC030A.png" alt="̊"></span> '
		+ '<span class="key"><img title="002D HYPHEN-MINUS" src="/Content/phonetic/images/002D.png" alt="-"><img title="Linking (absence of a break) [203F: UNDERTIE]" src="/Content/phonetic/images/203F.png" alt="‿"><img title="Upper ligature tie [0361: COMBINING DOUBLE INVERTED BREVE]" src="/Content/phonetic/images/25CC036125CC.png" alt="͡"></span>'
		+ '<span class="key"><img title="Syllabic diacritic [0329: COMBINING VERTICAL LINE BELOW]" src="/Content/phonetic/images/25CC0329.png" alt="̩"><img title="002B PLUS SIGN" src="/Content/phonetic/images/002B.png" alt="+"><img title="Palato alveolar click [01C2: LATIN LETTER ALVEOLAR CLICK]" src="/Content/phonetic/images/01C2.png" alt="ǂ"></span></div>'
	+ '<div class="keyboardrow" style="padding-left: 70px;">'
		+ '<span class="key"><img title="Unvoiced uvular plosive [0071: LATIN SMALL LETTER Q]" src="/Content/phonetic/images/0071.png" alt="q"><img title="Low back vowel rounded [0252: LATIN SMALL LETTER TURNED ALPHA]" src="/Content/phonetic/images/0252.png" alt="ɒ"><img title="Raised diacritic [031D: COMBINING UP TACK BELOW]" src="/Content/phonetic/images/25CC031D.png" alt="̝"></span>'
		+ '<span class="key"><img title="Voiced labial velar approximant [0077: LATIN SMALL LETTER W]" src="/Content/phonetic/images/0077.png" alt="w"><img title="Voiceless labial velar plosive [028D: LATIN SMALL LETTER TURNED W]" src="/Content/phonetic/images/028D.png" alt="ʍ"><img title="Labialised diacritic [02B7: MODIFIER LETTER SMALL W]" src="/Content/phonetic/images/02B7.png" alt="ʷ"></span>'
		+ '<span class="key"><img title="Upper mid front vowel unrounded [0065: LATIN SMALL LETTER E]" src="/Content/phonetic/images/0065.png" alt="e"><img title="Lower mid front vowel unrounded [025B: LATIN SMALL LETTER OPEN E]" src="/Content/phonetic/images/025B.png" alt="ɛ"><img title="Upper-mid central unrounded vowel [0258: LATIN SMALL LETTER REVERSED E]" src="/Content/phonetic/images/0258.png" alt="ɘ"></span>'
		+ '<span class="key"><img title="Alveolar trill [0072: LATIN SMALL LETTER R]" src="/Content/phonetic/images/0072.png" alt="r"><img title="Voiced uvular fricative [0281: LATIN LETTER SMALL CAPITAL INVERTED R]" src="/Content/phonetic/images/0281.png" alt="ʁ"><img title="Uvular trill [0280: LATIN LETTER SMALL CAPITAL R]" src="/Content/phonetic/images/0280.png" alt="ʀ"></span>'
		+ '<span class="key"><img title="Unvoiced dental plosive [0074: LATIN SMALL LETTER T]" src="/Content/phonetic/images/0074.png" alt="t"><img title="Unvoiced dental fricative [03B8: GREEK SMALL LETTER THETA]" src="/Content/phonetic/images/03B8.png" alt="θ"><img title="Unvoiced retroflex plosive [0288: LATIN SMALL LETTER T WITH RETROFLEX HOOK]" src="/Content/phonetic/images/0288.png" alt="ʈ"></span>'
		+ '<span class="key"><img title="High front vowel rounded [0079: LATIN SMALL LETTER Y]" src="/Content/phonetic/images/0079.png" alt="y"><img title="Semi-high front vowel rounded [028F: LATIN LETTER SMALL CAPITAL Y]" src="/Content/phonetic/images/028F.png" alt="ʏ"><img title="Lowered diacritic [031E: COMBINING DOWN TACK BELOW]" src="/Content/phonetic/images/25CC031E.png" alt="̞"></span>'
		+ '<span class="key"><img title="High back vowel rounded [0075: LATIN SMALL LETTER U]" src="/Content/phonetic/images/0075.png" alt="u"><img title="Semi-high back vowel unrounded [028A: LATIN SMALL LETTER UPSILON]" src="/Content/phonetic/images/028A.png" alt="ʊ"><img title="Voiced glottal fricative [0266: LATIN SMALL LETTER H WITH HOOK]" src="/Content/phonetic/images/0266.png" alt="ɦ"></span>'
		+ '<span class="key"><img title="High front vowel unrounded [0069: LATIN SMALL LETTER I]" src="/Content/phonetic/images/0069.png" alt="i"><img title="Semi-high front vowel unrounded [026A: LATIN LETTER SMALL CAPITAL I ]" src="/Content/phonetic/images/026A.png" alt="ɪ"><img title="Advanced diacritic [031F: COMBINING PLUS SIGN BELOW]" src="/Content/phonetic/images/25CC031F.png" alt="̟"></span> '
		+ '<span class="key"><img title="Upper mid back vowel rounded [006F: LATIN SMALL LETTER O]" src="/Content/phonetic/images/006F.png" alt="o"><img title="Lower mid back vowel rounded [0254: LATIN SMALL LETTER OPEN O]" src="/Content/phonetic/images/0254.png" alt="ɔ"><img title="Bilabial click [0298: LATIN LETTER BILABIAL CLICK]" src="/Content/phonetic/images/0298.png" alt="ʘ"></span> '
		+ '<span class="key"><img title="Unvoiced bilabial plosive [0070: LATIN SMALL LETTER P]" src="/Content/phonetic/images/0070.png" alt="p"><img title="Labiodental approximant [028B: LATIN SMALL LETTER V WITH HOOK]" src="/Content/phonetic/images/028B.png" alt="ʋ"><img title="Unvoiced bilabial fricative [0278: LATIN SMALL LETTER PHI]" src="/Content/phonetic/images/0278.png" alt="ɸ"></span> '
		+ '<span class="key"><img src="/Content/phonetic/images/005B.png" alt="[" title="005B: LEFT SQUARE BRACKET"><img title="Lower mid front vowel [00E6: LATIN SMALL LETTER AE ]" src="/Content/phonetic/images/00E6.png" alt="æ"><img title="Voiced alveolar implosive [0257: LATIN SMALL LETTER D WITH HOOK]" src="/Content/phonetic/images/0257.png" alt="ɗ"></span> '
		+ '<span class="key"><img src="/Content/phonetic/images/005D.png" alt="]" title="005D: RIGHT SQUARE BRACKET"><img title="High central vowel rounded [0289: LATIN SMALL LETTER U BAR]" src="/Content/phonetic/images/0289.png" alt="ʉ"><img title="Dental diacritic [032A: COMBINING BRIDGE BELOW]" src="/Content/phonetic/images/25CC032A.png" alt="̪"></span></div>'
	+ '<div class="keyboardrow" style="padding-left: 80px;">'
		+ '<span class="key"><img title="Low front vowel unrounded [0061: LATIN SMALL LETTER A]" src="/Content/phonetic/images/0061.png" alt="a"><img title="Low back vowel unrounded [0251: LATIN SMALL LETTER ALPHA]" src="/Content/phonetic/images/0251.png" alt="ɑ"><img title="Retracted diacritic [0320: COMBINING MINUS SIGN BELOW ]" src="/Content/phonetic/images/25CC0320.png" alt="̠"></span>'
		+ '<span class="key"><img title="Unvoiced alveolar fricative [0073: LATIN SMALL LETTER S]" src="/Content/phonetic/images/0073.png" alt="s"><img title="Unvoiced postalveolar fricative [0283: LATIN SMALL LETTER ESH]" src="/Content/phonetic/images/0283.png" alt="ʃ"><img title="Unvoiced retroflex fricative [0282: LATIN SMALL LETTER S WITH HOOK]" src="/Content/phonetic/images/0282.png" alt="ʂ"></span>'
		+ '<span class="key"><img title="Voiced dental plosive [0064: LATIN SMALL LETTER D]" src="/Content/phonetic/images/0064.png" alt="d"><img title="Voiced dental fricative [00F0: LATIN SMALL LETTER ETH]" src="/Content/phonetic/images/00F0.png" alt="ð"><img title="Voiced retroflex plosive [0256: LATIN SMALL LETTER D WITH TAIL]" src="/Content/phonetic/images/0256.png" alt="ɖ"></span>'
		+ '<span class="key"><img title="Unvoiced labiodental fricative [0066: LATIN SMALL LETTER F]" src="/Content/phonetic/images/0066.png" alt="f"><img title="Labiodental nasal [0271: LATIN SMALL LETTER M WITH HOOK ]" src="/Content/phonetic/images/0271.png" alt="ɱ"><img title="Voiced palatal plosive [025F: LATIN SMALL LETTER DOTLESS J WITH STROKE]" src="/Content/phonetic/images/025F.png" alt="ɟ"></span>'
		+ '<span class="key"><img title="Voiced velar plosive [0261: LATIN SMALL LETTER SCRIPT G]" src="/Content/phonetic/images/0261.png" alt="ɡ"><img title="Voiced velar fricative [0263: LATIN SMALL LETTER GAMMA]" src="/Content/phonetic/images/0263.png" alt="ɣ"><img title="Voiced uvular plosive [0262: LATIN LETTER SMALL CAPITAL G]" src="/Content/phonetic/images/0262.png" alt="ɢ"></span>'
		+ '<span class="key"><img title="Unvoiced glottal fricative [0068: LATIN SMALL LETTER H]" src="/Content/phonetic/images/0068.png" alt="h"><img title="Voiced labial palatal approximant [0265: LATIN SMALL LETTER TURNED H]" src="/Content/phonetic/images/0265.png" alt="ɥ"><img title="Aspirated diacritic [02B0: MODIFIER LETTER SMALL H]" src="/Content/phonetic/images/02B0.png" alt="ʰ"></span>'
		+ '<span class="key"><img title="Palatal approximant [006A: LATIN SMALL LETTER J]" src="/Content/phonetic/images/006A.png" alt="j"><img title="Palatal nasal [0272: LATIN SMALL LETTER N WITH LEFT HOOK]" src="/Content/phonetic/images/0272.png" alt="ɲ"><img title="Voiced palatal fricative [029D: LATIN SMALL LETTER J WITH CROSSED-TAIL]" src="/Content/phonetic/images/029D.png" alt="ʝ"></span>'
		+ '<span class="key"><img title="Unvoiced velar plosive [006B: LATIN SMALL LETTER K]" src="/Content/phonetic/images/006B.png" alt="k"><img title="Unvoiced alveolar lateral fricative [026C: LATIN SMALL LETTER L WITH BELT]" src="/Content/phonetic/images/026C.png" alt="ɬ"><img title="Voiced alveolar lateral fricative [026E: LATIN SMALL LETTER LEZH]" src="/Content/phonetic/images/026E.png" alt="ɮ"></span> '
		+ '<span class="key"><img title="Alveolar lateral approximant [006C: LATIN SMALL LETTER L]" src="/Content/phonetic/images/006C.png" alt="l"><img title="Palatal lateral approximant [028E: LATIN SMALL LETTER TURNED Y]" src="/Content/phonetic/images/028E.png" alt="ʎ"><img title="Retroflex lateral approximant [026D: LATIN SMALL LETTER L WITH RETROFLEX HOOK]" src="/Content/phonetic/images/026D.png" alt="ɭ"></span> '
		+ '<span class="key"><img title="003B SEMICOLON" src="/Content/phonetic/images/003B.png" alt=";"><img title="Long [02D0: MODIFIER LETTER TRIANGULAR COLON]" src="/Content/phonetic/images/02D0.png" alt="ː"><img title="Centralised diacritic [0308: COMBINING DIAERESIS]" src="/Content/phonetic/images/25CC0308.png" alt="̈"></span><span class="key"><img title="Palatalised diacritic [02B2: MODIFIER LETTER SMALL J]" src="/Content/phonetic/images/02B2.png" alt="ʲ"><img title="Mid central vowel unrounded [0259: LATIN SMALL LETTER SCHWA]" src="/Content/phonetic/images/0259.png" alt="ə"><img title="Rhoticised schwa [025A: LATIN SMALL LETTER SCHWA WITH HOOK]" src="/Content/phonetic/images/025A.png" alt="ɚ"></span><span class="key"><img title="0023 NUMBER SIGN" src="/Content/phonetic/images/0023.png" alt="#"><img title="Nasalised diacritic [0303: COMBINING TILDE ]" src="/Content/phonetic/images/25CC0303.png" alt="̃"><img title="Creaky voiced diacritic [0330: COMBINING TILDE BELOW ]" src="/Content/phonetic/images/25CC0330.png" alt="̰"></span> </div>'
	+ '<div class="keyboardrow" style="padding-left: 100px;">'
		+ '<span class="key"><img title="Voiced alveolar fricative [007A: LATIN SMALL LETTER Z]" src="/Content/phonetic/images/007A.png" alt="z"><img title="Voiced postalveolar fricative [0292: LATIN SMALL LETTER EZH]" src="/Content/phonetic/images/0292.png" alt="ʒ"><img title="Voiced retroflex fricative [0290: LATIN SMALL LETTER Z WITH RETROFLEX HOOK]" src="/Content/phonetic/images/0290.png" alt="ʐ"></span>'
		+ '<span class="key"><img title="Unvoiced velar fricative [0078: LATIN SMALL LETTER X]" src="/Content/phonetic/images/0078.png" alt="x"><img title="Unvoiced uvular fricative [03C7: GREEK SMALL LETTER CHI]" src="/Content/phonetic/images/03C7.png" alt="χ"><img title="Unvoiced pharyngeal fricative [0127: LATIN SMALL LETTER H WITH STROKE]" src="/Content/phonetic/images/0127.png" alt="ħ"></span>'
		+ '<span class="key"><img title="Unvoiced palatal plosive [0063: LATIN SMALL LETTER C]" src="/Content/phonetic/images/0063.png" alt="c"><img title="Unvoiced palatal fricative [00E7: LATIN SMALL LETTER C WITH CEDILLA]" src="/Content/phonetic/images/00E7.png" alt="ç"><img title="Voiceless alveolo-palatal fricative [0255: LATIN SMALL LETTER C WITH CURL]" src="/Content/phonetic/images/0255.png" alt="ɕ"></span>'
		+ '<span class="key"><img title="Voiced labiodental fricative [0076: LATIN SMALL LETTER V]" src="/Content/phonetic/images/0076.png" alt="v"><img title="Lower mid back vowel unrounded [028C: LATIN SMALL LETTER TURNED V ]" src="/Content/phonetic/images/028C.png" alt="ʌ"><img title="Voiced alveolo-palatal fricative [0291: LATIN SMALL LETTER Z WITH CURL]" src="/Content/phonetic/images/0291.png" alt="ʑ"></span>'
		+ '<span class="key"><img title="Voiced bilabial plosive [0062: LATIN SMALL LETTER B]" src="/Content/phonetic/images/0062.png" alt="b"><img title="Voiced bilabial fricative [03B2: GREEK SMALL LETTER BETA]" src="/Content/phonetic/images/03B2.png" alt="β"><img title="Bilabial trill [0299: LATIN LETTER SMALL CAPITAL B]" src="/Content/phonetic/images/0299.png" alt="ʙ"></span>'
		+ '<span class="key"><img title="Alveolar nasal [006E: LATIN SMALL LETTER N]" src="/Content/phonetic/images/006E.png" alt="n"><img title="Velar nasal [014B: LATIN SMALL LETTER ENG]" src="/Content/phonetic/images/014B.png" alt="ŋ"><img title="Retroflex nasal [0273: LATIN SMALL LETTER N WITH RETROFLEX HOOK]" src="/Content/phonetic/images/0273.png" alt="ɳ"></span>'
		+ '<span class="key" style="width:70px;"><img title="Bilabial nasal [006D: LATIN SMALL LETTER M ]" src="/Content/phonetic/images/006D.png" alt="m"><img style="margin-left:0; margin-right:0;" title="High back vowel unrounded [026F: LATIN SMALL LETTER TURNED M]" src="/Content/phonetic/images/026F.png" alt="ɯ"><img title="Velar approximant [0270: LATIN SMALL LETTER TURNED M WITH LONG LEG]" src="/Content/phonetic/images/0270.png" alt="ɰ"></span>'
		+ '<span class="key"><img title="002C COMMA" src="/Content/phonetic/images/002C.png" alt=","><img title="Extra short diacritic [0306: COMBINING BREVE]" src="/Content/phonetic/images/0306.png" alt="̆"><img title="Ejective diacritic [02BC: MODIFIER LETTER APOSTROPHE]" src="/Content/phonetic/images/02BC.png" alt="ʼ"></span> '
		+ '<span class="key"><img title="Syllable break [002E: FULL STOP]" src="/Content/phonetic/images/002E.png" alt="."><img title="2192  RIGHTWARDS ARROW" src="/Content/phonetic/images/2192.png" alt="→"><img title="Breathy voiced diacritic [0324: COMBINING DIAERESIS BELOW]" src="/Content/phonetic/images/25CC0324.png" alt="̤"></span> '
		+ '<span class="key"><img src="/Content/phonetic/images/002F.png" alt="/" title="002F: SOLIDUS"><img title="Glottal plosive [0294: LATIN LETTER GLOTTAL STOP]" src="/Content/phonetic/images/0294.png" alt="ʔ"><img title="Voiced pharyngeal fricative [0295: LATIN LETTER PHARYNGEAL VOICED FRICATIVE]" src="/Content/phonetic/images/0295.png" alt="ʕ"></span></div>'
	+ '<div class="keyboardrow" style="padding-left: 140px;"><span class="key" style="width: 242px; border:0; margin-right: 30px;"><img title="0020: SPACE" src="/Content/phonetic/images/space.png" alt=" "></span> <span class="key" style="width: 84px; border:0;"><img title="00A0: NO-BREAK SPACE" src="/Content/phonetic/images/nbsp.png" alt="&nbsp;"></span></div>';
$(function (e) {
    var keyboard = document.createElement("div");
    keyboard.setAttribute("id", "keyboard");
    keyboard.innerHTML = kb;
    var b = document.getElementsByTagName("body")[0];
    b.appendChild(keyboard);

    $("#keyboard .key img").click(function (e) {
        $(".phoneticgroup-" + activeNr + " p.phonetic").append($(this).attr('alt'));
        phonetic += $(this).attr('alt');
        $(".phoneticgroup-" + activeNr + " textarea.phonetic").value += toUnicode($(this).attr('alt'));
        phonetic += toUnicode($(this).attr('alt'));
    });
    $(".keyicon").click(function (e) {
        if (activeNr == $(e.currentTarget).parent().attr("class").split("-")[1]) {
            $("#keyboard").slideUp();
            activeNr = 0;
        }
        else {
            //ALTER KEYBOARD POSITION
            var y = e.currentTarget.offsetTop;
            var x = e.currentTarget.offsetLeft;

            $("#keyboard").slideUp("slow");
            $("#keyboard").css("top", y + 100);
            $("#keyboard").slideDown("slow");
            activeNr = $(e.currentTarget).parent().attr("class").split("-")[1];
        }
    });

    $(".kb-close").click(function (e) {
        $("#keyboard").slideUp();
        activeNr = 0;
    });

    
});
function erasePhonetic(e) {
    var jelm = $(e);
    var test = $(jelm).parent().find(".phonetic");
    test.each(function (index, element) {
        $(element).html("");
    });
}

function toggleKeyboard(span) {
    if (activeNr == $(span).parent().attr("class").split("-")[1]) {
        $("#keyboard").slideUp();
        activeNr = 0;
    }
    else {
        //ALTER KEYBOARD POSITION
        var y = span.offsetTop;
        var x = span.offsetLeft;

        $("#keyboard").slideUp("slow");
        $("#keyboard").css("top", y + 100);
        $("#keyboard").slideDown("slow");
        activeNr = $(span).parent().attr("class").split("-")[1];
    }
}

function toUnicode(theString) {
    var unicodeString = '';
    for (var i = 0; i < theString.length; i++) {
        var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
        while (theUnicode.length < 4) {
            theUnicode = '0' + theUnicode;
        }
        theUnicode = '\\u' + theUnicode;
        unicodeString += theUnicode;
    }
    return unicodeString;
}