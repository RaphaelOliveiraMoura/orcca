import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import types from './validators';

import './styles.css';

export default function Input(props) {
  const [inputText, setInputText] = useState('');

  function handleInputChange(event) {
    const text = event.target.value;
    const $input = event.target;
    setInputText(text);

    if ($input.validity.valid) $input.classList.remove('invalid');
  }

  function handleInvalidInput(event) {
    event.preventDefault();

    const $input = event.target;
    $input.classList.add('invalid');
  }

  return (
    <div className="input-container">
      <InputMask
        mask={props.mask}
        pattern={props.pattern}
        {...types[props.type]}
        className="input"
        type={'text'}
        onChange={handleInputChange}
        value={inputText}
        spellCheck="false"
        onInvalid={handleInvalidInput}
        required
      />
      <span className={inputText ? 'placeholder active' : 'placeholder'}>
        {props.placeholder}
      </span>
      <span className="invalid">Campo Inválido</span>
    </div>
  );
}
