// Constantes necessárias para o projeto:
const btnCreate = document.getElementById("btnCreate");
const btnCopy = document.getElementById("btnCopy");
const btnDownload = document.getElementById("btnDownload");
const btnClear = document.getElementById("btnClear");
const txtNamespace = document.getElementById("txtNamespace");
const txtClass = document.getElementById("txtClass");
const txtAttributes = document.getElementById("txtAttributes");
const bodyCode = document.getElementById("bodyCode");
const cbxConstructor = document.getElementById("cbxConstructor");
const cbxGetter = document.getElementById("cbxGetter");
const cbxSetter = document.getElementById("cbxSetter"); // Adicionei a constante para o checkbox de setters

// Array de atributos passados pelo usuário:
let attributesArray = [];

// Event listeners
btnCreate.addEventListener("click", () => {
    if (txtAttributes.value.trim()) {
        createClass();
    }
});

// Função para limpar os campos
const clearFields = () => {
    txtNamespace.value = "";
    txtClass.value = "";
    txtAttributes.value = "";
    bodyCode.innerHTML = "";
    bodyCode.classList.remove("hljs");
    btnCopy.classList.add("invisible");
    btnDownload.classList.add("invisible");
}

// Função para copiar o código para o clipboard
const copyToClipboard = () => {
    const codigo = bodyCode.innerText;
    const input = document.createElement('textarea');

    document.body.appendChild(input);
    input.value = codigo;
    input.focus();
    input.select();
    document.execCommand('Copy');
    input.remove();
}

// Função para baixar o código gerado
const downloadCode = () => {
    const codigo = bodyCode.innerText;
    const link = document.createElement("a");
    let className = txtClass.value.trim() || "ClasseExemplo";

    className = capitalizeFirst(className);
    link.href = window.URL.createObjectURL(new Blob([codigo], { type: "text/php" }));
    link.download = `${className}.php`;
    link.click();
}

// Função responsável pela criação da classe PHP
const createClass = () => {
    attributesArray = createAttributes();

    const className = capitalizeFirst(txtClass.value.trim() || "ClasseExemplo");
    const namespace = txtNamespace.value.trim() || "Pasta\\Subpasta";

    const structure = [
        "&lt;?php",
        `\tnamespace ${namespace};`,
        "",
        `\tclass ${className} {`,
        "",
        getAttributes(),
        "",
        getConstructor(),
        getSetters(),
        getGetters(),
        "\t}",
        "?>",
    ];

    bodyCode.innerHTML = structure.join("<br>");
    syntaxHighlight();
    btnCopy.classList.remove("invisible");
    btnDownload.classList.remove("invisible");
}

// Função responsável pela criação dos atributos em formato PHP
const createAttributes = () => {
    return txtAttributes.value
        .trim()
        .replaceAll(" ", "\n")
        .split("\n");
}

// Função responsável por obter os atributos passados pelo usuário
const getAttributes = () => {
    return attributesArray.map(attr => `\t\tprivate $${attr};`).join("<br>");
}

// Função responsável pela criação do método construtor da classe
const getConstructor = () => {
    if (!cbxConstructor.checked) {
        return "";
    }

    const params = attributesArray.map(attr => `$${attr} = ''`).join(", ");
    const body = attributesArray.map(attr => `\t\t\t$this->${attr} = $${attr};`).join("<br>");

    return `\t\tpublic function __construct(${params}) {<br>${body}<br>\t\t}<br>`;
}

// Função responsável pela criação dos métodos getters
const getGetters = () => {
    if (!cbxGetter.checked) {
        return "";
    }

    return attributesArray.map(attr => {
        const name = capitalizeFirst(attr);
        return `\t\tpublic function get${name}() {<br>\t\t\treturn $this->${attr};<br>\t\t}<br>`;
    }).join("<br>");
}

// Função responsável pela criação dos métodos setters
const getSetters = () => {
    if (!cbxSetter.checked) {
        return "";
    }

    return attributesArray.map(attr => {
        const name = capitalizeFirst(attr);
        return `\t\tpublic function set${name}($${attr}) {<br>\t\t\t$this->${attr} = $${attr};<br>\t\t}<br>`;
    }).join("<br>");
}

// Função responsável por alterar a primeira letra de uma string para maiúscula
const capitalizeFirst = string => string.charAt(0).toUpperCase() + string.slice(1);

// Função responsável por aplicar o highlight para o código
const syntaxHighlight = () => {
    document.querySelectorAll("code").forEach(block => {
        hljs.highlightBlock(block);
    });
}

btnClear.addEventListener("click", clearFields);

btnCopy.addEventListener("click", copyToClipboard);

btnDownload.addEventListener("click", downloadCode);