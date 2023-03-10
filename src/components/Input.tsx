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
  name?: string
  require?: boolean
}

const InputStyled = styled(InputAntd)`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 11px 24px 13px 16px;
    height: 40px;
    border: none;
    margin-top: 6px;

    &&& {
      :where(.css-dev-only-do-not-override-1n7nwfa).ant-input-disabled, ant-input[disabled] {
        color: var(--white);
        background: #33334D;
      }
    }
  `

function Input({plahoder, width, height, type, disabled = false, value, require = false, setValue, name}: IInputprops) {

  return (
        <InputStyled 
          onChange={(e) => setValue(e.target)} 
          type={type} 
          style={{width: width, height: height, color: '#C8C8DB', background: '#33334D'}} 
          placeholder={plahoder} 
          disabled={disabled} 
          defaultValue={value}
          name={name}
          required={require}
        />
  )
}

export default Input