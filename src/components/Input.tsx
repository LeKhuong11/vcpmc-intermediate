import React from 'react'
import styled from 'styled-components'
import { Input as InputAntd } from 'antd';

interface Iprops {
  plahoder?: string;
  width: number;
  type: string;
  disabled?: boolean;
  value?: string | number;
  setValue?: any
}

const InputStyled = styled(InputAntd)`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 11px 24px 13px 16px;
    height: 40px;
    background: rgb(47,47,65, 0.7);
    color: var(--white);
    border: none;
  `

function Input({plahoder, width, type, disabled = false, value, setValue}: Iprops) {

  return (
        <InputStyled onChange={(e) => setValue(e.target.value)} type={type} style={{width: width}} placeholder={plahoder} disabled={disabled} value={value}/>
  )
}

export default Input