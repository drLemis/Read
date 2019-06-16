var partIndex = 0;
var partStyle = "";

var partList = [];

function changePart(partDelta) {
    if (!partDelta)
        partDelta = 0;

    partIndex += parseInt(partDelta, 10);

    if (partIndex < 0)
        partIndex = 0;
    else if (partIndex > [partList.length - 1])
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

        fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/" + partIndexNew + ".html")
            .then(function (response) {
                response.text().then(function (text) {
                    document.getElementsByClassName("textBodyText")[0].innerHTML = text;
                    document.getElementsByClassName("textBodyHeaderName")[0].innerHTML = partList[partIndex][1];

                    if (partStyleNew != partStyle)
                        changeStyle(partStyleNew);

                    setCookie("lastPart", partIndex);
                });
            });
    }
}

function getPartList() {
    fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/partList.txt")
        .then(function (response) {
            response.text().then(function (text) {
                var parts = text.split("\n");
                parts.forEach(part => {
                    partList.push(part.split("@"));

                    if (partList.length > 1 && partList[partList.length - 1].length < 2)
                        partList[partList.length - 1].push("");

                    if (partList.length > 1 && partList[partList.length - 1].length < 3)
                        partList[partList.length - 1].push(partList[partList.length - 2][2]);
                    else if (partList[partList.length - 1].length < 3)
                        partList[partList.length - 1].push("");
                });

                changePart(getCookie("lastPart"));
                changeStyle("");
            });
        });
}

function changeStyle(name) {
    var oldlink = document.getElementsByTagName("link").item(2);
    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", "css/styleTextColors" + name + ".css");

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);

    partStyle = name;
}