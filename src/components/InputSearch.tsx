import { Input } from 'antd';
import React from 'react'
import styled from 'styled-components'


const { Search } = Input;
const SearchStyled = styled(Search)`
    margin: 7px 0;
  &&& {
    :where(.css-dev-only-do-not-override-1n7nwfa).ant-input-group-wrapper {
      width: 453px;
    }
    .ant-input {
      background-color: #2B2B3F;
      border: none;
      color: #fff;
      padding: 5px;
    }
    .ant-input::placeholder {
        color: var(--white);
    }
    .ant-btn, .ant-btn-default {
      background-color: #2B2B3F;
      border: none;

      .anticon {
        color: #fff;
      }
    }
  }
`
interface Iprops {
    placehoder: string
}

function InputSearch(props: Iprops) {
    return (
        <SearchStyled placeholder={props.placehoder} />
    )
}

export default InputSearch