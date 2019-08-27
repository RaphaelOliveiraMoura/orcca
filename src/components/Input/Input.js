import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import types from './validators';

import './styles.css';

export default function Input(props) {
  const [invalidMessage, setInvalidMessage] = useState(false);

  useEffect(() => {
    setInvalidMessage(!!props.error);
  }, [props.error]);

  function handleInputChange(event) {
    const $input = event.target;
    const text = $input.value;
    props.setValue(text);
    if ($input.validity.valid) setInvalidMessage(false);
  }

  function handleInvalidInput(event) {
    event.preventDefault();
    setInvalidMessage(true);
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
        value={props.value}
        spellCheck="false"
        onInvalid={handleInvalidInput}
        required
      />
      <span className={props.value ? 'placeholder active' : 'placeholder'}>
        {props.placeholder}
      </span>
      {invalidMessage && (
        <span className="invalid">
          {props.errorMessage || 'Campo Inválido'}
        </span>
      )}
    </div>
  );
}
