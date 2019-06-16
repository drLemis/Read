var partIndex = 0;
var partStyle = "";

var partList = [];

function getPartList() {
    fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/partList.txt")
        .then(function (response) {
            response.text().then(function (text) {
                var parts = text.split("\n");

                var indexList = document.getElementsByClassName("indexList")[0];

                parts.forEach(part => {
                    if (!part.includes("@")) {
                        if (indexList.length > 0)
                            indexList.innerHTML += "</ul>" + part + "<ul>"
                        else
                            indexList.innerHTML += part + "<ul>"
                    } else {

                        partList.push(part.split("@"));

                        if (partList.length > 1 && partList[partList.length - 1].length < 2)
                            partList[partList.length - 1].push("");

                        if (partList.length > 1 && partList[partList.length - 1].length < 3)
                            partList[partList.length - 1].push(partList[partList.length - 2][2]);
                        else if (partList[partList.length - 1].length < 3)
                            partList[partList.length - 1].push("");

                        indexList.innerHTML += "<li>" + partList[partList.length - 1][1] + "</li>"
                    }
                });

                indexList.innerHTML += "</ul>"

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