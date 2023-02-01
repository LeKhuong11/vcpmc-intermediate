import React from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 8px;
  height: 56px;
  background: #FF7506;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 17px;
  cursor: pointer;
`
interface IProps {
  widthProps: number;
  contentProps: string;
  onClick: any
}
function Button({widthProps, contentProps, onClick}: IProps) {
  return (
    <ButtonStyled style={{width: widthProps}} onClick={onClick}> 
      {contentProps}
    </ButtonStyled>
  )
}

export default Button