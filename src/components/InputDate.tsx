import React from 'react'
import styled from 'styled-components'


const InputStyled = styled.input`
    width: 160px;
    border: 1px solid var(--orange);
    height: 35px;
    background: #33334D;
    border-radius: 4px;
    padding: 5px;
    color: var(--white);

    & :placeholder {
        background-color: var(--orange);
    }
`
interface IInputDate {
    width: number
    onChange?: any
    name: string
}

function InputDate({width, onChange, name}: IInputDate) {
  return (
    <InputStyled 
        type="date" 
        style={{width: width}} 
        name={name}
        onChange={(e) => onChange(e.target)} 
    />
  )
}

export default InputDate