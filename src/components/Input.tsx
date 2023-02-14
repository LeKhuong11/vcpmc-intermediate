import React from 'react'
import styled from 'styled-components'
import { Input as InputAntd } from 'antd';

interface IInputprops {
  plahoder?: string;
  width: number;
  type: string;
  disabled?: boolean;
  value?: any;
  setValue?: any,
  height?: number,
}

const InputStyled = styled(InputAntd)`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 11px 24px 13px 16px;
    height: 40px;
    background: #33334D;
    color: var(--white);
    border: none;
    margin-top: 6px;
  `

function Input({plahoder, width, height, type, disabled = false, value,  setValue}: IInputprops) {

  return (
        <InputStyled 
          onChange={(e) => setValue(e.target.value)} 
          type={type} 
          style={{width: width, height: height}} 
          placeholder={plahoder} 
          disabled={disabled} 
          defaultValue={value}
        />
  )
}

export default Input