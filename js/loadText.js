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

        fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/" + partIndexNew + ".html")
            .then(function (response) {
                response.text().then(function (text) {
                    document.getElementsByClassName("textBodyText")[0].innerHTML = text;
                    document.getElementsByClassName("textBodyHeaderName")[0].innerHTML = partList[partIndex][1];

                    if (partStyleNew != partStyle)
                        changeStyle(partStyleNew);

                    setCookie("lastPart", partIndex);

                    document.getElementById("index").setAttribute("hidden", "true");
                    document.getElementById("main").removeAttribute("hidden");
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