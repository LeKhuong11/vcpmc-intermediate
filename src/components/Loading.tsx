import { Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'

const LoadingStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
`

function Loading() {
  return (
    <LoadingStyled>
        <Spin />
    </LoadingStyled>
  )
}

export default Loading