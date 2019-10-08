import React from 'react';

import './styles.css';
import logo from '../../assets/orcca-logo.png';

export default function App() {
  return (
    <header>
      <img src={logo} alt="logo orcca" />
      <ul>
        <li>Cadastro</li>
        <li>Agenda</li>
        <li>Relatórios</li>
      </ul>
      <div className="logout-button">
        <span>Sair</span>
        <i className="material-icons">input</i>
      </div>
    </header>
  );
}
