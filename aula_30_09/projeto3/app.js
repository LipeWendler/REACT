const fs = require("fs");
const load = require("readline-sync");

var usuarios = [];

function read(array, file) {
    return array = JSON.parse(fs.readFileSync(file));
}


function show() {
    console.clear();
    console.log(".....................................");
    console.log("Nome:" + nome);
    console.log(".....................................");
    console.log("Idade: " + idade);
    console.log(".....................................");
    console.log("Valor em conta: " + valor);
    console.log(".....................................");
    console.log("Chave pix: " + chave);
    console.log(".....................................");
}

function create(array, nome, idade, valor, chave) {
    array.push({
        "nome": nome,
        "idade": idade,
        "Valor": valor,
        "chave": chave
    },);
    update("bd.json", usuarios);
}

function update(file, array) {
    save(file);
    read(array, file);
}

function save(file) {
    fs.writeFileSync(file, JSON.stringify(usuarios));
}

function del(array, nome) {

    for (let index = 0; index < array.length; index++) {
        if (array[index].nome === nome) {
            array.splice(index, 1);
        }
    }
    update("bd.json", usuarios);
}

var loop = true;
while (loop) {
    console.log("---------------------------------------------");
    console.log("Bem vindo ao Armazenamento de Clientes.");
    console.log("O que deseja fazer?");
    console.log("1 - Mostrar Usuários");
    console.log("2 - Criar Usuário");
    console.log("3 - Deletar Usuário");

    var escolha = load.question("Escolha um numero: ");

    if (escolha === '1') {
        show();
    }

    else if (escolha === '2') {
        var nome = load.question("Informe o nome: ")
        var idade = load.question("Informe a idade: ")
        var valor = load.question("Informe o valor: ")
        var chave = load.question("Informe a chave pix: ")

        create(usuarios, nome, idade, valor, chave)

        show();
    }

    else if (escolha === '3') {

    }
}