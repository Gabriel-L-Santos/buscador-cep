import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { BsLinkedin } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});


  async function handleSearch(){
    // 86430000/json/

    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }catch{
      alert("Erro ao buscar: CEP inválido");
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>
      )}

      <div className="footer">
        <footer>
          <p>Gabriel Leme dos Santos - 2023</p>
        </footer>
      </div> 

      <div className="button-footer">  
        <button className="buttonSearchFooter">
        <a href="https://www.linkedin.com/in/gabriel-leme-dos-santos-7b220b197/"><BsLinkedin size={25} color="#FFF"/></a>
        </button>

        <button className="buttonSearchFooter">
        <a href="https://github.com/Gabriel-L-Santos"><BsGithub size={25} color="#FFF"/></a>
        </button>
      </div>     
      
    </div>
  );
}

export default App;
