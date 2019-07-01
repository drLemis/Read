window.onload = checkboxesCheckSet(), inputValueSet(), getPartList();

function checkboxesCheckSet() {
    var array = document.getElementsByName("checkbox");

    array.forEach(element => {
        if (getCookie(element.value))
            element.checked = true;
    });
}

function inputValueSet() {
    var array = document.getElementsByName("tabSize");

    array.forEach(element => {
        var cookie = getCookie(element.name);
        if (cookie != null) {
            element.value = cookie;
            document.body.style.tabSize = cookie;
        }
    });
}