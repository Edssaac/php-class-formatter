const container = document.getElementById("day-night");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const stars = document.getElementById("stars");
const water = document.getElementById("water");

container.addEventListener("click", () => {

    if (container.classList.contains("night")) {
        nightToDay();

        document.querySelector("body").classList.toggle("bg-light", true);
        document.querySelector("body").classList.toggle("bg-dark", false);

        changeTextClass("text-success", "text-primary");
        changeTextClass("text-light", "text-dark");


    } else {
        dayToNight();

        document.querySelector("body").classList.toggle("bg-light", false);
        document.querySelector("body").classList.toggle("bg-dark", true);

        changeTextClass("text-primary", "text-success");
        changeTextClass("text-dark", "text-light");
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


function changeTextClass(oldClass, newClass) {
    var textos = document.querySelectorAll("." + oldClass);

    for (var i = 0; i < textos.length; i++) {
        textos[i].classList.remove(oldClass);
        textos[i].classList.add(newClass);
    }
}