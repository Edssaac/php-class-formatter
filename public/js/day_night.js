const controls = document.querySelectorAll(".form-control");
const container = document.getElementById("day-night");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const stars = document.getElementById("stars");
const water = document.getElementById("water");

container.addEventListener("click", () => {

    if (container.classList.contains("night")) {
        nightToDay();

        changeClass("body", "body-dark", "body-light");
        changeClass(".text-success", "text-success", "text-primary");
        changeClass(".text-dark-dark", "text-dark-dark", "text-dark");
        changeClass(".jumbotron", "jumbotron-dark", "jumbotron-light");
        changeClass(".form-control", "form-control-dark", "");

    } else {
        dayToNight();

        changeClass("body", "body-light", "body-dark");
        changeClass(".text-primary", "text-primary", "text-success");
        changeClass(".text-dark", "text-dark", "text-dark-dark");
        changeClass(".jumbotron", "jumbotron-light", "jumbotron-dark");
        changeClass(".form-control", "", "form-control-dark");

    }

});

function nightToDay() {
    container.style.background = "#e9786b";
    sun.style.opacity = 1;
    sun.style.top = "26px";
    moon.style.top = "-50px";
    moon.style.left = "120%";
    water.style.background = "#71baf2";

    container.classList.remove("night");
}

function dayToNight() {
    container.style.background = "#2a2c36";
    sun.style.opacity = 0;
    sun.style.top = "50px";
    moon.style.top = "15px";
    moon.style.left = "20px";
    water.style.background = "#7fa1bb";

    container.classList.add("night");
}

function changeClass(search, oldClass, newClass) {
    var elements = document.querySelectorAll(search);

    for (var i = 0; i < elements.length; i++) {
        if (oldClass != "") {
            elements[i].classList.remove(oldClass);
        }
        if (newClass != "") {
            elements[i].classList.add(newClass);
        }
    }
}