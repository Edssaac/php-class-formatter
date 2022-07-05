const btnCriar = document.getElementById("btnCriar");
const btnCopiar = document.getElementById("btnCopiar");
const btnBaixar = document.getElementById("btnBaixar");
const btnLimpar = document.getElementById("btnLimpar");
const txtNamespace = document.getElementById("txtNamespace");
const txtClass = document.getElementById("txtClass");
const txtAtributos = document.getElementById("txtAtributos");
const corpoCodigo = document.getElementById("corpoCodigo");
const cbxConstructor = document.getElementById("cbxConstructor");
const cbxGetter = document.getElementById("cbxGetter");

var atributosArray = [];

btnCriar.addEventListener("click", () => {
    if (txtAtributos.value.length > 0) {
        criarClasse();
    }
});

btnLimpar.addEventListener("click", () => {
    txtNamespace.value = "";
    txtClass.value = "";
    txtAtributos.value = "";
    corpoCodigo.innerHTML = "";
    corpoCodigo.classList.remove("hljs");
    btnCopiar.classList.add("invisible");
    btnBaixar.classList.add("invisible");
});

btnCopiar.addEventListener("click", () => {
    var codigo = corpoCodigo.innerText;
    var input = document.createElement('textarea');

    document.body.appendChild(input);
    input.value = codigo;
    input.focus();
    input.select();
    document.execCommand('Copy');

    input.remove();
});

btnBaixar.addEventListener("click", () => {
    var codigo = corpoCodigo.innerText;
    var link = document.createElement("a");
    var className = txtClass.value.trim();

    className = (className == "") ? "ClasseExemplo" : capitalizeFirst(className);
    link.href = window.URL.createObjectURL(new Blob([codigo], { type: "text/php" }));
    link.download = className + ".php";
    link.click();
});

function criarClasse() {
    atributosArray = criarAtributos();

    var className = txtClass.value.trim();
    var namespace = txtNamespace.value.trim();

    namespace = (namespace == "") ? "Pasta\\Subpasta" : namespace;
    className = (className == "") ? "ClasseExemplo" : capitalizeFirst(className);

    var estrutura =
        [
            "&lt;?php",
            "<br>",
            "\tnamespace " + namespace + ";",
            "<br>",
            "<br>",
            "\tclass " + className + " {",
            "<br>",
            "<br>",
            getAtributos(),
            "<br>",
            getConstructor(),
            "<br>",
            getSetters(),
            getGetters(),
            "\t}",
            "<br>",
            "?>",
        ];

    corpoCodigo.innerHTML = "";

    for (var i = 0; i < estrutura.length; i++) {
        corpoCodigo.innerHTML += estrutura[i];
    }

    sintaxHighlight();
    btnCopiar.classList.remove("invisible");
    btnBaixar.classList.remove("invisible");
}

function criarAtributos() {
    atributosArray = null;
    var atributos = txtAtributos.value.trim();

    atributos = atributos.replaceAll(" ", "\n");
    atributos = atributos.split("\n");

    return atributos;
}

function getAtributos() {
    var atributos = "";

    for (var i = 0; i < atributosArray.length; i++) {
        atributos += "\t\tprivate $" + atributosArray[i] + ";<br>";
    }

    return atributos;
}

function getConstructor() {
    if (!cbxConstructor.checked) {
        return "";
    }

    var constructor = "";

    constructor += "\t\tpublic function __construct("

    for (var i = 0; i < atributosArray.length; i++) {
        constructor += "$" + atributosArray[i] + " = ''" + ((i + 1) < atributosArray.length ? ", " : "");
    }

    constructor += ") {";

    for (var i = 0; i < atributosArray.length; i++) {
        constructor += "<br>\t\t\t$this->" + atributosArray[i] + " = $" + atributosArray[i] + ";";
    }

    constructor += "<br>\t\t}<br>";

    return constructor;
}

function getGetters() {
    if (!cbxGetter.checked) {
        return "";
    }

    var getter = "";

    for (var i = 0; i < atributosArray.length; i++) {
        var name = capitalizeFirst(atributosArray[i]);
        getter += "\t\tpublic function get" + name + "() {<br>";
        getter += "\t\t\treturn $this->" + atributosArray[i] + ";<br>";
        getter += "\t\t}<br><br>";
    }

    return getter;
}

function getSetters() {
    if (!document.getElementById("cbxSetter").checked) {
        return "";
    }

    var setter = "";

    for (var i = 0; i < atributosArray.length; i++) {
        var name = capitalizeFirst(atributosArray[i]);
        setter += "\t\tpublic function set" + name + "($" + atributosArray[i] + "){<br>";
        setter += "\t\t\t$this->" + atributosArray[i] + " = $" + atributosArray[i] + ";";
        setter += "<br>\t\t}<br><br>";
    }


    return setter;
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function sintaxHighlight() {
    block = document.getElementsByTagName("code");

    for (var i = 0; i < block.length; i++) {
        hljs.highlightBlock(block[i])
    }
}


