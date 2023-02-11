import React from 'react'
import styled from 'styled-components'

const ContainerStyledBtn = styled.div`
  
  & button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid #FF7506;
    font-size: 17px;
    cursor: pointer;
  }
  .secondary {
    color: white;
    background: #FF7506;
  }
  .primary {
    color: white;
    background: transparent;
    color: #FF7506;
  }
`
interface IProps {
  widthProps: number;
  heightProps: number;
  type: string;
  contentProps: string;
  onClick?: any,
}
function Button({widthProps, heightProps, contentProps, type, onClick}: IProps) {
  return (
    <ContainerStyledBtn > 
      <button className={type} style={{width: widthProps, height: heightProps}} onClick={onClick} >
        {contentProps}
      </button>
    </ContainerStyledBtn>
  )
}

export default Button