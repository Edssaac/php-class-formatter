// Constantes necessárias para o projeto:
const controls = document.querySelectorAll(".form-control");
const container = document.getElementById("day-night");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const stars = document.getElementById("stars");
const water = document.getElementById("water");

// Função para alternar entre modos
const toggleMode = () => {
    const isNight = container.classList.contains("night");

    setStyles(isNight ? 'day' : 'night');
    toggleClasses(isNight ? 'day' : 'night');
    localStorage.setItem('selected-theme', getCurrentTheme());
};

// Função para definir estilos
const setStyles = (mode) => {
    const styles = {
        day: {
            containerBg: "#e9786b",
            sunOpacity: 1,
            sunTop: "26px",
            moonTop: "-50px",
            moonLeft: "120%",
            waterBg: "#71baf2",
            removeClass: 'night'
        },
        night: {
            containerBg: "#2a2c36",
            sunOpacity: 0,
            sunTop: "50px",
            moonTop: "15px",
            moonLeft: "20px",
            waterBg: "#7fa1bb",
            addClass: 'night'
        }
    };

    const currentStyles = styles[mode];

    container.style.background = currentStyles.containerBg;
    sun.style.opacity = currentStyles.sunOpacity;
    sun.style.top = currentStyles.sunTop;
    moon.style.top = currentStyles.moonTop;
    moon.style.left = currentStyles.moonLeft;
    water.style.background = currentStyles.waterBg;

    if (currentStyles.removeClass) container.classList.remove(currentStyles.removeClass);
    if (currentStyles.addClass) container.classList.add(currentStyles.addClass);
};

// Função para alternar classes
const toggleClasses = (mode) => {
    const classChanges = {
        day: [
            { element: 'body', remove: 'body-dark', add: 'body-light' },
            { element: '.text-success', remove: 'text-success', add: 'text-primary' },
            { element: '.text-dark-dark', remove: 'text-dark-dark', add: 'text-dark' },
            { element: '.jumbotron', remove: 'jumbotron-dark', add: 'jumbotron-light' },
            { element: '.form-control', remove: 'form-control-dark', add: '' }
        ],
        night: [
            { element: 'body', remove: 'body-light', add: 'body-dark' },
            { element: '.text-primary', remove: 'text-primary', add: 'text-success' },
            { element: '.text-dark', remove: 'text-dark', add: 'text-dark-dark' },
            { element: '.jumbotron', remove: 'jumbotron-light', add: 'jumbotron-dark' },
            { element: '.form-control', remove: '', add: 'form-control-dark' }
        ]
    };

    classChanges[mode].forEach(change => {
        document.querySelectorAll(change.element).forEach(elem => {
            if (change.remove) {
                elem.classList.remove(change.remove);
            }

            if (change.add) {
                elem.classList.add(change.add);
            }
        });
    });
};

// Obtendo a escolha atual:
const getCurrentTheme = () => document.body.classList.contains('body-dark') ? 'dark' : 'light';

// Verificando se já foi selecionado pelo usuário:
const selectedTheme = localStorage.getItem('selected-theme');

if (selectedTheme && selectedTheme === 'dark') {
    setStyles('night');
    toggleClasses('night');
}

// Verificando se o botão de modo noturno/diário foi clicado:
container.addEventListener("click", toggleMode);