var partIndex = 0;

var partList = [];

function changePart(partDeta)
{
    partIndex += partDeta;

    console.log(partList)

    if (partIndex < 0)
        partIndex = 0;
    else if (partIndex > [partList.length - 1])
        partIndex = partList.length - 1;

    var partIndexVar = partIndex;

    if (partList[partIndex] && partList[partIndex].length > 1)
        partIndexVar = partList[partIndex][1];

    fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/" + partIndexVar)
        .then(function (response) {
            response.text().then(function (text) {
                document.getElementsByClassName("textBodyText")[0].innerHTML = text;
                document.getElementsByClassName("textBodyHeaderName")[0].innerHTML = partList[partIndex][0];

            });
        });
}

function getPartList()
{
    fetch("https://raw.githubusercontent.com/drLemis/Read/master/text/partList")
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