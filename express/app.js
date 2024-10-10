const express = require('express');
const app = express();
const porta = 8080;
const bodyParser = require('body-parser');

//Configurar EJS como mecanismo de visualização
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Configurar os arquivos da pasta public
app.use(express.static('public'));

//Configurar o processamento de dados do forms
app.use(bodyParser.urlencoded({ extended: true }));


//Dados =================================================
const posts = [
    {
        id: '1',
        titulo: 'Primeiro Post',
        conteudo: 'Conteúdo do post 1'
    },
    {
        id: '2',
        titulo: 'Segundo Post',
        conteudo: 'Conteúdo do post 2'
    }
];

// Rota Principal =================================================================
app.get('/', (req, res) => {
    res.render('index', { posts });
});

//Rota para exibir os detalhes de um post =================================================================
app.get('/post/:id', (req, res) => {
    const id = req.params.id; //Coleta o id do post
    const post = post.find(post => post.id === parseInt(id)); //Procura o post pelo id

    if (!post) { //Se post não encontrado
        return res.status(404).send('Post não encontrado');
    }

    res.render('post', { post });
});

//Rota para exibir o formulario de addition =================================================================
app.get('/add', (req, res) => {
    res.render('add');
});

//Rota para processar o formulario de addition =================================================================
app.post('/add', (req, res) => {
    const { titulo, conteudo } = req.body; //Coleta os dados do formulario
    const id = posts.length + 1; //Auto increment do id

    posts.push({ id, titulo, conteudo }); //Adiciono o novo post

    res.redirect('/'); //Redireciona para a página inicial
});

//Iniciando o servidor
app.listen(porta, () => {
    console.log(`Servidor rodando na porta https://localhost:${porta}`);
});



