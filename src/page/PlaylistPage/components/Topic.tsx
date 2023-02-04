import React from 'react'
import styled from 'styled-components'

interface ITopic {
    texts: string[]
}
const TopicStyled = styled.span`
    margin: 2px 4px;
    border: 1px solid var(--white);
    border-radius: 3px;
    padding: 3px;
    font-size: 12px;
`
function Topic({texts} :ITopic) {
  return (
    <>
        {texts.map((item, index) => (
            <TopicStyled key={item}>
                {index > 4 ? '...' : item}
            </TopicStyled>
        ))}
    </>
  )
}

export default Topic