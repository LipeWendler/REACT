import React, { useState, useEffect } from "react";
import { db, auth } from './firebaseConnection';

import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [post, setPost] = useState([]);
  const [idPost, setIdPost] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [usuario, setUsuario] = useState(false);
  const [detalhesUsuario, setDetalhesUsuario] = useState({});


  useEffect(() => {
    //Função para Carregar os Posts armazenados no DB.
    async function carregarPosts() {
      //onSnapshot parâmetros = 1º Coleção onde estãos os dados do DB e a 2º o método.
      const dados = onSnapshot(collection(db, 'posts'), (snapshot) => {
        let listaPost = [];

        //Percorre os dados do banco através da quantidade de objetos na collection.
        snapshot.forEach((doc) => {
          //Adiciona os itens na listaPost.
          listaPost.push(
            {
              id: doc.id,
              titulo: doc.data().titulo, //Colocar ".data()" para pegar as dados em formato "string".
              autor: doc.data().autor
            }
          );
        });
        setPost(listaPost); //Envia os dados da lista para o DB.
      })
    }
    carregarPosts(); //Chama a função e carrega os dados do DB.
  }, [])


  // Função para verificar se o usuário logou com sucesso
  useEffect(() => {
    async function verificarLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //Tem usuário logado
          setUsuario(true);
          setDetalhesUsuario({
            uid: user.uid,
            email: user.email
          });
        }
        else {
          //Não possui usuário logado
          setUsuario(false);
          setDetalhesUsuario({});
        }
      })
    }
    verificarLogin();
  }, [])

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      //Depois que cadastrou usuário faz Alert e zera variáveis:
      .then(() => {
        alert('Usuário cadastrado com sucesso!')
        setEmail('');
        setSenha('');
      })
      //Verificações email e senha
      .catch((error) => {
        //Verifica se senha muito fraca
        if (error.code === 'auth/weak-password') {
          alert('Senha muito fraca!')
        }
        //Verifica se email já esta cadastrado
        else if (error.code === 'auth/email-already-in-use') {
          alert('Email já cadastrado!')
        }
      })
  }

  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)
      //Depois que usuário logado
      .then((value) => {
        alert('Usuário logado com sucesso!')
        setUsuario(true);
        setDetalhesUsuario({
          uid: value.user.uid,
          email: value.user.email
        });

        //Após login com sucesso, limpa email e senha
        setEmail('');
        setSenha('');
      })
      //Erro ao logar 
      .catch(() => {
        alert('Erro fazer o login!')
      })
  }

  async function fazerLogout() {
    await signOut(auth)
    setUsuario(false);
    setDetalhesUsuario({});
  }




  //C - CREATE =============================================================================
  async function adicionarPosts() {
    await addDoc(collection(db, 'posts'), {
      titulo: titulo,
      autor: autor
    }).then(() => { //THEN é executado quando a função é executada corretamente.
      alert('Cadastro realizado com sucesso!')
      setAutor(''); //Define o SET como vázio após a adição.
      setTitulo('');
    }).catch((error) => { //CATCH é executado quando ocorre algum erro.
      console.log(error);
    })
  }

  //R - READ ===============================================================================
  async function buscarPost() {
    const config = collection(db, 'posts');
    await getDocs(config)
      .then((snapshot) => { //THEN é executado quando a função é executada corretamente.
        let lista = [];
        //Percorre os dados do banco através da quantidade de objetos na collection.
        snapshot.forEach((doc) => {
          //Adiciona os itens na listaPost.
          lista.push(
            {
              id: doc.id,
              titulo: doc.data().titulo, //Colocar ".data()" para pegar as dados em formato "string".
              autor: doc.data().autor
            }
          );
        });
        setPost(lista); //Executa a função de busca
      })
      .catch((error) => { //CATCH é executado quando ocorre algum erro.
        console.log(error);
      });
  }

  //U - UPDATE ===============================================================================
  async function editarPost() {
    const postEditado = doc(db, 'posts', idPost);
    await updateDoc(postEditado, {
      titulo: titulo, //Titulo do DB recebe Titulo do update
      autor: autor
    })
      .then(() => { //THEN é executado quando a função é executada corretamente.
        alert('Post editado com sucesso!');
        setIdPost('');
        setTitulo('');
        setAutor('');
      })
      .catch((error) => { //CATCH é executado quando ocorre algum erro.
        console.log(error);
      });
  }

  //D - DELETE ===============================================================================
  async function excluirPost(id) {
    const postExcluido = doc(db, 'posts', id)
    await deleteDoc(postExcluido)
      .then(() => { //THEN é executado quando a função é executada corretamente.
        alert('Post excluido com sucesso!')
      })
      .catch((error) => { //CATCH é executado quando ocorre algum erro.
        console.log(error);
      });
  }


  // ====== APRESENTAÇÃO NA TELA =============================================================
  return (
    <div>
      <h1>ReactJS + Firebase</h1>

      {/*--------- ÁREA USUÁRIOS ----------------------------------------------------------*/}

      {usuario && (
        <div>
          <strong>Seja bem-vindo(a)</strong>
          <br/>
          <span>ID: {detalhesUsuario.uid}</span>
          <br/>
          <span>Email: {detalhesUsuario.email}</span>
          <br/>
          <button onClick={fazerLogout}>Sair</button>
        </div>
      )}

      <h2>Usuários</h2>
      <label>Email:</label>
      <textarea type="email" placeholder="Digite um email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Senha:</label>
      <textarea type="password" placeholder="Digite uma senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

      <button onClick={novoUsuario}>Cadastrar</button>
      <button onClick={logarUsuario}>Login</button>

      <hr/>
      {/*--------- ÁREA POSTS ----------------------------------------------------------*/}
      <label>ID do Post</label>
      <input placeholder="ID do Post" value={idPost} onChange={(e) => setIdPost(e.target.value)}></input>

      <label>Título: </label>
      <textarea type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

      <label>Autor:</label>
      <textarea type="text" placeholder="Autor do Post" value={autor} onChange={(e) => setAutor(e.target.value)} />

      <button onClick={adicionarPosts}>Inserir</button>
      <button onClick={buscarPost}>Buscar</button>
      <button onClick={editarPost}>Atualizar</button>

      <ul>
        {post.map(
          (value) => {
            <li key={value.id}>
              <strong>ID: {value.id}</strong>
              <span>Título: {value.titulo}</span> 
              <span>Autor: {value.autor}</span>
              <button onClick={() => excluirPost(value.id)}>Editar</button>
            </li>
          }
        )}
      </ul>
    </div>
  )
}