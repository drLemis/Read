function changePart(partDelta) {
    if (!partDelta)
        partDelta = 0;

    partIndex = Number(partIndex) + Number(partDelta);

    if (partIndex < 0) {
        partIndex = 0;
        loadIndex();
        return;
    } else if (partIndex > [partList.length - 1])
        partIndex = partList.length - 1;

    if (partList[partIndex]) {
        var partIndexNew = partIndex;
        var partStyleNew = "";

        //Точная ссылка на главу
        if (partList[partIndex].length > 1)
            partIndexNew = partList[partIndex][0];

        //Особый стиль главы
        if (partList[partIndex].length > 2)
            partStyleNew = partList[partIndex][2];

        fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/" + partIndexNew)
            .then(function (response) {
                response.text().then(function (text) {

                    document.getElementsByClassName("textBodyText")[0].innerHTML = "\t" + parseAdditions(text);
                    document.getElementsByClassName("textBodyHeaderName")[0].innerHTML = partList[partIndex][1];

                    if (partStyleNew != partStyle)
                        changeStyle(partStyleNew);

                    setCookie("lastPart", partIndex);

                    document.getElementById("index").setAttribute("hidden", "true");
                    document.getElementById("main").removeAttribute("hidden");

                    window.scrollTo(0, 0);
                });
            });
    }
}

function changePartTo(partName) {
    if (!partName) {
        loadIndex();
        return;
    }

    partList.forEach(part => {
        if (part[0] == partName) {
            partIndex = 0;
            changePart(partList.indexOf(part))
            return;
        }
    });
}

function parseAdditions(text) {
    var i = 0;

    // footnote
    text = text.replace(/(\[(footnote|tooltip|f):([\s\S]+?)\])/g, function (a, b, c, d) {
        return '<sup class="tooltip">' + (++i) + '<span class="tooltipText">' + d + '</span></sup>';
    });

    //bold
    text = text.replace(/(\[(bold|b|strong):([\s\S]+?)\])/g, function (a, b, c, d) {
        return '<strong>' + d + '</strong>';
    });

    // italic
    text = text.replace(/(\[(italic|i|em):([\s\S]+?)\])/g, function (a, b, c, d) {
        return '<em>' + d + '</em>';
    });

    // link
    text = text.replace(/(\[link:([\s\S]+?)\|([\s\S]+?)\])/g, function (a, b, c, d) {
        return '<a href=\"' + c + '\" title=\"' + c + '\">' + d + '</a>';
    });

    // center
    text = text.replace(/(\[(center|c):([\s\S]+?)\])/g, function (a, b, c, d) {
        return '<center>' + d + '</center>';
    });

    // final
    text = text.split("\n");

    if (getCookie("newlineSingle") == false || getCookie("newlineSingle") == null || getCookie("newlineSingle") == "false") {
        text = text.join("\n\n\t");
    } else {
        text = text.join("\n\t");
    }
    return text;
}

function replaceAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

function getQuoteSymbol(quoteLevel, isOpening = true) {
    if (isOpening) {
        return (quoteLevel & 1) ? "«" : "“"
    } else {
        return (quoteLevel & 1) ? "»" : "”"
    }
}

// ========

// for local use only

// ALT+V to open local file
// ALT+C to open from library
document.onkeydown = function (e) {
    if ((e.altKey && e.keyCode == 'V'.charCodeAt(0))) {
        var input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {
            readSingleFile(e);
        };

        input.click();
        return false;
    } else if ((e.altKey && e.keyCode == 'C'.charCodeAt(0))) {
        changePartToURL(prompt('link to chapter', ""));
    }
}

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementsByClassName("textBodyText")[0].innerHTML = "\t" + parseAdditions(e.target.result);
        document.getElementsByClassName("textBodyHeaderName")[0].innerHTML = "Текст с диска";

        document.getElementById("index").setAttribute("hidden", "true");
        document.getElementById("main").removeAttribute("hidden");
    };
    reader.readAsText(file);
}

function changePartToURL(link) {
    if (link) {
        fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/" + link)
            .then(function (response) {
                response.text().then(function (text) {

                    document.getElementsByClassName("textBodyText")[0].innerHTML = "\t" + parseAdditions(text);
                    document.getElementsByClassName("textBodyHeaderName")[0].innerHTML = partList[partIndex][1];

                    document.getElementById("index").setAttribute("hidden", "true");
                    document.getElementById("main").removeAttribute("hidden");
                });
            });
    }
}