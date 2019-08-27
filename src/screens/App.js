import React, { useState } from 'react';

// import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Loader from '../components/Loader/Loader';

import './styles.css';

function App() {
  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
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
          errorMessage="Seu cep está em um formato inválido"
        />
        <Input
          placeholder="Digite seu cpf"
          type="cpf"
          value={cpf}
          setValue={setCpf}
          errorMessage="Seu cpf está em um formato inválido"
        />
        <Input
          placeholder="Digite seu telefone"
          type="phone"
          value={phone}
          setValue={setPhone}
          errorMessage="Seu telefone está em um formato inválido"
        />
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          setValue={setEmail}
          errorMessage="Seu email está em um formato inválido"
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
