window.onload = checkboxesCheckSet(), inputValueSet(), getPartList(), getLastNews();

function checkboxesCheckSet() {
    var array = document.getElementsByName("checkbox");

    array.forEach(element => {
        if (getCookie(element.value) == "true")
            element.checked = true;
    });
}

function inputValueSet() {
    var array = document.getElementsByName("tabSize");

    array.forEach(element => {
        var cookie = getCookie(element.name);
        if (cookie > 0) {
            element.value = cookie;
            document.body.style.tabSize = cookie;
        }
    });
}

function getLastNews() {
    fetch("https://api.github.com/repos/drLemis/Read/commits?page=1&per_page=5")
        .then(function (response) {
            response.text().then(function (text) {
                var object = JSON.parse(text);

                document.getElementsByClassName("lastNewsLabel")[0].innerHTML = "";

                object.forEach(element => {
                    var message = element.commit.message;
                    var date = formatDate(new Date(element.commit.author.date));

                    document.getElementsByClassName("lastNewsLabel")[0].innerHTML += "<br>" + date + " => " + message;
                });
            });
        });
}

function formatDate(dateObj) {
    var year = dateObj.getFullYear().toString();
    var month = (["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"])[dateObj.getMonth()];
    var day = dateObj.getDate().toString().padStart(2, "0");
    var hour = dateObj.getHours().toString().padStart(2, "0");
    var minute = dateObj.getMinutes().toString().padStart(2, "0");
    var second = dateObj.getSeconds().toString().padStart(2, "0");

    return year + " " + month + " " + day + ", " + hour + ":" + minute + ":" + second;
}