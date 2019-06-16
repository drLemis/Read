var partIndex = 0;
var partStyle = "";

var partList = [];

function getPartList() {
    fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/partList.txt")
        .then(function (response) {
            response.text().then(function (text) {
                var parts = text.split("\n");

                var indexList = document.getElementsByClassName("indexList")[0];

                var result = "";

                parts.forEach(part => {
                    if (part != "") {
                        if (part.includes("@")) {
                            partList.push(part.split("@"));

                            if (partList.length > 1 && partList[partList.length - 1].length < 2)
                                partList[partList.length - 1].push("");

                            if (partList.length > 1 && partList[partList.length - 1].length < 3)
                                partList[partList.length - 1].push(partList[partList.length - 2][2]);
                            else if (partList[partList.length - 1].length < 3)
                                partList[partList.length - 1].push("");

                            var eOnClick = "onclick=\"changePartTo('" + partList[partList.length - 1][0] + "')\"";
                            var eText = partList[partList.length - 1][1];

                            result += "<li " + eOnClick + " > " + eText + " </li>"
                        } else if (part.includes("#")){
                            var params = part.split("#");
                            console.log(params)

                            var eStyle = "";

                            if (params.length > 1) {
                                var eColorBack = "#" + params[1]
                                var eColorText = "#" + params[2]
                                eStyle = "style='background-color:" + eColorBack + ";color:" + eColorText + ";'"
                            }

                            if (partList.length > 0) {
                                result += "</ul></div><div " + eStyle + ">" + params[0].trim() + "<ul>"
                            } else {
                                result += "<div " + eStyle + ">" + params[0].trim() + "<ul>"
                            }
                        }
                    }
                });

                indexList.innerHTML = result + "</ul></div>"

                if (getCookie("lastPart")) {
                    changePart(getCookie("lastPart"));
                } else {
                    loadIndex();
                }
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

function loadIndex() {
    changeStyle("");

    document.getElementById("main").setAttribute("hidden", "true");
    document.getElementById("index").removeAttribute("hidden");
}