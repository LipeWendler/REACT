const http = require('http'); //importação do HTTP
const fs = require('fs'); // importação Files System



const requestListener = function (req, res) {
    if (req.url === "/") {
        res.writeHead(200); //Define o código de status HTTP da resposta como 200 (OK)
        res.end("Voce esta na pagina inicial"); // Escreve a resposta HTTP de volta ao cliente  
    }
    else if (req.url === '/sobre') {
        fs.readFile('./sobre.txt', function (err, data) { // Função para leitura do arquivo .txt criado
            res.writeHead(200, {'Content-Type': 'text/txt'}); //Define o código de status HTTP da resposta como 200 (OK)
            res.end(data); // Escreve a resposta HTTP de volta ao cliente
        })

    }
    else { // Para qualquer outro URL, retorna "Página não encontrada"
        res.writeHead(200); //Define o código de status HTTP da resposta como 200 (OK)
        res.end("Pagina nao encontrada"); // Escreve a resposta HTTP de volta ao cliente
    }
};

const server = http.createServer(requestListener); // Cria um novo servidor
server.listen(8000, 'localhost', () => { // Vincula o servidor a uma porta e host, e define uma função de callback a ser chamada quando o servidor começar a escutar
    console.log("Servidor está rodando em http://localhost:8000");
});
