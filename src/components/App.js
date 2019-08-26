import React from 'react';

// import Button from './Button/Button';
import Input from './Input/Input';
import Loader from './Loader/Loader';

import './styles.css';

function App() {
  return (
    <>
      <Loader />
      <form onSubmit={e => e.preventDefault()}>
        <Input placeholder="Digite seu cep" type="cep" />
        <Input placeholder="Digite sua cpf" type="cpf" />
        <Input placeholder="Digite sua telefone" type="phone" />
        <Input placeholder="Digite seu email" type="email" />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
