import React, { useState } from 'react';

// import Button from '../componentsButton/Button';
import Input from '../components/Input/Input';
// import Loader from '../components/Loader/Loader';

import './styles.css';

function App() {
  const [cep, setCep] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      {/* <Loader /> */}
      <form onSubmit={e => e.preventDefault()}>
        <Input
          placeholder="Digite seu cep"
          type="cep"
          value={cep}
          setValue={setCep}
        />
        <Input
          placeholder="Digite sua cpf"
          type="cpf"
          value={cpf}
          setValue={setCpf}
        />
        <Input
          placeholder="Digite sua telefone"
          type="phone"
          value={phone}
          setValue={setPhone}
        />
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
