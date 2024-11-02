import React, { useState, useEffect } from "react";
import { db, auth } from './firebaseConnection';
import './App.css';
import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [image, setImage] = useState('');
  const [post, setPost] = useState([]);
  const [idPost, setIdPost] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [usuario, setUsuario] = useState(false);
  const [detalhesUsuario, setDetalhesUsuario] = useState({});

  useEffect(() => {
    // Função para carregar os posts em tempo real
    const carregarPosts = () => {
      const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
        let listaPost = [];
        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
            image: doc.data().image
          });
        });
        setPost(listaPost);
      });
      return () => unsubscribe(); // Limpar o ouvinte ao desmontar o componente
    };

    carregarPosts();
  }, []);

  // Verificação de login
  useEffect(() => {
    const verificarLogin = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(true);
        setDetalhesUsuario({
          uid: user.uid,
          email: user.email
        });
      } else {
        setUsuario(false);
        setDetalhesUsuario({});
      }
    });
    return () => verificarLogin();
  }, []);

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        alert('Usuário cadastrado com sucesso!');
        setEmail('');
        setSenha('');
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert('Senha muito fraca!');
        } else if (error.code === 'auth/email-already-in-use') {
          alert('Email já cadastrado!');
        }
      });
  }

  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        alert('Usuário logado com sucesso!');
        setUsuario(true);
        setDetalhesUsuario({
          uid: value.user.uid,
          email: value.user.email
        });
        setEmail('');
        setSenha('');
      })
      .catch(() => {
        alert('Erro ao fazer o login!');
      });
  }

  async function fazerLogout() {
    await signOut(auth);
    setUsuario(false);
    setDetalhesUsuario({});
  }

  // CREATE
  async function adicionarPosts() {
    // Verifica se todos os campos estão preenchidos
    if (!titulo.trim() || !autor.trim() || !image.trim()) {
      alert('Por favor, preencha todos os campos (Título, Autor, Imagem).');
      return;
    }
  
    if (idPost) {
      editarPost(); // Se tiver ID, chama a função de edição
    } else {
      await addDoc(collection(db, 'posts'), {
        titulo: titulo,
        autor: autor,
        image: image
      }).then(() => {
        alert('Cadastro realizado com sucesso!');
        setAutor('');
        setTitulo('');
        setImage('');
      }).catch((error) => {
        console.log(error);
      });
    }
  }  

  // UPDATE
  async function editarPost() {
    if (!idPost) {
      alert("Selecione um post para editar.");
      return;
    }
    const postEditado = doc(db, 'posts', idPost);
    await updateDoc(postEditado, {
      titulo: titulo,
      autor: autor,
      image: image
    })
      .then(() => {
        alert('Post editado com sucesso!');
        setIdPost('');
        setTitulo('');
        setAutor('');
        setImage('');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // DELETE
  async function excluirPost(id) {
    const postExcluido = doc(db, 'posts', id);
    await deleteDoc(postExcluido)
      .then(() => {
        alert('Post excluído com sucesso!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Função para carregar os dados do post nos inputs para edição
  function carregarPostParaEdicao(post) {
    setIdPost(post.id);
    setTitulo(post.titulo);
    setAutor(post.autor);
    setImage(post.image);
  }

  return (
    <div className="main-container">
      <h1>ReactJS + Firebase</h1>

      {/* ÁREA USUÁRIOS ============================================*/}
      <div className="user-container">
        {usuario && (
          <div>
            <strong>Seja bem-vindo(a)</strong>
            <br />
            <span>Email: {detalhesUsuario.email}</span>
            <br />
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
      </div>
      <hr />
      {/* ÁREA POSTS =======================================================*/}
      <div className="posts-container">
        <label>Título: </label>
        <textarea type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <label>Autor:</label>
        <textarea type="text" placeholder="Autor do Post" value={autor} onChange={(e) => setAutor(e.target.value)} />

        <label>Imagem (URL):</label>
        <textarea type="text" placeholder="URL da Imagem" value={image} onChange={(e) => setImage(e.target.value)} />

        <button onClick={adicionarPosts}>{idPost ? "Atualizar" : "Inserir"}</button>

        <ul>
          {post.map((value) => (
            <li className="post-container" key={value.id}>
              <span> Título: {value.titulo}</span>
              <span> Autor: {value.autor}</span>
              <img className="post-image" src={value.image} alt={value.titulo} />
              <button onClick={() => carregarPostParaEdicao(value)}>Editar</button>
              <button onClick={() => excluirPost(value.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
