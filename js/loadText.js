var partIndex = 0;
var partStyle = "";

var partList = [];

function changePart(partDeta) {
    partIndex += partDeta;

    if (partIndex < 0)
        partIndex = 0;
    else if (partIndex > [partList.length - 1])
        partIndex = partList.length - 1;

    var partIndexNew = partIndex;
    var partStyleNew = partStyle;

    //Точная ссылка на главу
    if (partList[partIndex] && partList[partIndex].length > 1)
        partIndexNew = partList[partIndex][1];

    //Особый стиль главы
    if (partList[partIndex] && partList[partIndex].length > 2)
        partStyleNew = partList[partIndex][2];

    fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/" + partIndexNew + ".html")
        .then(function (response) {
            response.text().then(function (text) {
                document.getElementsByClassName("textBodyText")[0].innerHTML = text;
                document.getElementsByClassName("textBodyHeaderName")[0].innerHTML = partList[partIndex][0];

                if (partStyleNew != "" && partStyleNew != partStyle)
                    changeStyle(partStyleNew);
            });
        });
}

function getPartList() {
    fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/partList.txt")
        .then(function (response) {
            response.text().then(function (text) {
                var parts = text.split("\n");
                parts.forEach(part => {
                    partList.push(part.split("@"));
                });

                changePart(0);
            });
        });
}

function changeStyle(name) {
    var oldlink = document.getElementsByTagName("link").item(0);
    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", "css/styleTextColors" + name + ".css");

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}