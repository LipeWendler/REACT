/*Importação das Bibliotecas necessárias*/
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import './App.css';


/*--------------INÍCIO DO ARQUIVO APP----------------------------------------------------------------------------------------------------*/

/*Definição das constantes para gravar os dados necessários*/
export const App = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([])


  /*--------------Conexão com o Firestore + Coleta de Dados da Collection (Tabela) do DB----------------------------------------------------*/

  /*Dados para conexão com o DB do Firestore*/
  const firebaseConfig = initializeApp({
    /*Chaves exclusivas do projeto, fornecidas pelo Firebase*/
    apiKey: "AIzaSyDG4aVj1ET67Mu-qQUR0Utw-JrfdQ9F65g",
    authDomain: "reactfirebase-89e8f.firebaseapp.com",
    projectId: "reactfirebase-89e8f",
  });



  /*Conexão com o DB do Firestore*/
  const db = getFirestore(firebaseConfig);
  /*Constante para coleta de dados da tabela "users" presente no DB*/
  const userCollectionRef = collection(db, "users");



  /*Função para coleta de dados dos usuários no DB*/
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      /*Map direto para onde armazena a info dos users*/
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);



  /*--------------Funções para Definir e Manipular os dados do DB---------------------------------------------------------------------------*/

  /*Função para Criar Usuário*/
  async function createUser() {
    /*Função "addDoc" própria do Firestore para adicionar dados no DB através da collection (tabela do DB)*/
    const user = await addDoc(userCollectionRef, { name, email });
  }



  /*Função para Deletar Usuário*/
  async function deleteUser(id) {
    /*Encontra os dados do usuário pelo caminho no "doc()"*/
    const userDoc = doc(db, 'users', id);
    /*Função "deleteDoc" própria do Firestore para remover dados do DB*/
    await deleteDoc(userDoc);
  }



  /*--------------Apresentação das informações na tela--------------------------------------------------------------------------------------*/

  return (
    <div className="mainContainer">
      <h1>CADASTRO DE USUÁRIOS + VINCULAÇÃO FIREBASE</h1>
      <div className="formsContainer">
        <div className="inputContainer">
          <label className="inputTitle">Nome</label>
          <input className="inputRegister" type="text" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="inputContainer">
          <label className="inputTitle">Email</label>
          <input className="inputRegister" type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="btn-register" onClick={createUser}>Criar Conta</button>
      </div>

      <div className="usersContainer">
        <ul>
          {/*Retorna valores armazenados da tabela "users" do DB do Firestore, procurando cada user pelo ID*/}
          {users.map(user => {
            return (
              <div className="userCard" key={user.id}>
                <label className="userInfo">Nome:</label>
                <li>{user.name}</li>
                <label className="userInfo">Email:</label>
                <li>{user.email}</li>
                <button className="btn-delete" onClick={() => deleteUser(user.id)}>Deletar</button>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

/*--------------FINAL DO ARQUIVO APP------------------------------------------------------------------------------------------------------*/