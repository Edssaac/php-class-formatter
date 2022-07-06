// Constantes necessárias para o projeto:
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

// Array de atributos passados pelo usuário:
var attributesArray = [];

// Esperando o evento de clique do botão de criar:
btnCriar.addEventListener("click", () => {
    if (txtAtributos.value.length > 0) {
        createClass();
    }
});

// Esperando o evento de clique do botão de limpar:
btnLimpar.addEventListener("click", () => {
    txtNamespace.value = "";
    txtClass.value = "";
    txtAtributos.value = "";
    corpoCodigo.innerHTML = "";
    corpoCodigo.classList.remove("hljs");
    btnCopiar.classList.add("invisible");
    btnBaixar.classList.add("invisible");
});

// Esperando o evento de clique do botão de copiar:
btnCopiar.addEventListener("click", () => {
    var codigo = corpoCodigo.innerText;
    var input = document.createElement('textarea');

    btnCopiar.appendChild(input);
    input.value = codigo;
    input.focus();
    input.select();
    document.execCommand('Copy');

    input.remove();
});

// Esperando o evento de clique do botão de baixar:
btnBaixar.addEventListener("click", () => {
    var codigo = corpoCodigo.innerText;
    var link = document.createElement("a");
    var className = txtClass.value.trim();

    className = (className == "") ? "ClasseExemplo" : capitalizeFirst(className);
    link.href = window.URL.createObjectURL(new Blob([codigo], { type: "text/php" }));
    link.download = className + ".php";
    link.click();
});

// Função responsável pela criação da classe PHP:
function createClass() {
    attributesArray = createAttributes();

    var className = txtClass.value.trim();
    var namespace = txtNamespace.value.trim();

    namespace = (namespace == "") ? "Pasta\\Subpasta" : namespace;
    className = (className == "") ? "ClasseExemplo" : capitalizeFirst(className);

    var structure =
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

    for (var i = 0; i < structure.length; i++) {
        corpoCodigo.innerHTML += structure[i];
    }

    sintaxHighlight();
    btnCopiar.classList.remove("invisible");
    btnBaixar.classList.remove("invisible");
}

// Função responsável pela criação dos atributos em formato PHP:
function createAttributes() {
    attributesArray = null;
    var atributos = txtAtributos.value.trim();

    atributos = atributos.replaceAll(" ", "\n");
    atributos = atributos.split("\n");

    return atributos;
}

// Função responsável por obter os atributos passados pelo usuário:
function getAtributos() {
    var atributos = "";

    for (var i = 0; i < attributesArray.length; i++) {
        atributos += "\t\tprivate $" + attributesArray[i] + ";<br>";
    }

    return atributos;
}

// Função responsável pela criação do método construtor da classe:
function getConstructor() {
    if (!cbxConstructor.checked) {
        return "";
    }

    var constructor = "";

    constructor += "\t\tpublic function __construct("

    for (var i = 0; i < attributesArray.length; i++) {
        constructor += "$" + attributesArray[i] + " = ''" + ((i + 1) < attributesArray.length ? ", " : "");
    }

    constructor += ") {";

    for (var i = 0; i < attributesArray.length; i++) {
        constructor += "<br>\t\t\t$this->" + attributesArray[i] + " = $" + attributesArray[i] + ";";
    }

    constructor += "<br>\t\t}<br>";

    return constructor;
}

// Função responsável pela criação do método get dos atributos:
function getGetters() {
    if (!cbxGetter.checked) {
        return "";
    }

    var getter = "";

    for (var i = 0; i < attributesArray.length; i++) {
        var name = capitalizeFirst(attributesArray[i]);
        getter += "\t\tpublic function get" + name + "() {<br>";
        getter += "\t\t\treturn $this->" + attributesArray[i] + ";<br>";
        getter += "\t\t}<br><br>";
    }

    return getter;
}

// Função responsável pela criação do método set dos atributos:
function getSetters() {
    if (!document.getElementById("cbxSetter").checked) {
        return "";
    }

    var setter = "";

    for (var i = 0; i < attributesArray.length; i++) {
        var name = capitalizeFirst(attributesArray[i]);
        setter += "\t\tpublic function set" + name + "($" + attributesArray[i] + "){<br>";
        setter += "\t\t\t$this->" + attributesArray[i] + " = $" + attributesArray[i] + ";";
        setter += "<br>\t\t}<br><br>";
    }


    return setter;
}

// Função responsável por alterar a primeira letra de uma string para caixa alta:
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função responsável por aplicar o highlight para o código:
function sintaxHighlight() {
    block = document.getElementsByTagName("code");

    for (var i = 0; i < block.length; i++) {
        hljs.highlightBlock(block[i])
    }
}