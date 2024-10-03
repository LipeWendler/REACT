const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// GET callback function returns a response message
app.get('/', (req, res) => {
    res.send('Bem vindo ao Servidor Express! Altere a URL para http://localhost:/api/data')
})

app.get('/api/data', (req, res) => {
    fs.readFile('./info.json', function (err, data) { // Função para leitura do arquivo .json criado
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(data); // Escreve a resposta HTTP de volta ao cliente
    })
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})