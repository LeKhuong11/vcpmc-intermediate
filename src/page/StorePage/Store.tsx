import React from 'react'
import Input from 'antd/es/input';
import styled from 'styled-components';

const { Search } = Input;
const SearchStyled = styled(Search)`
  &&& {
    :where(.css-dev-only-do-not-override-1n7nwfa).ant-input-group-wrapper {
      width: 40%;
    }
    .ant-input {
      background-color: #515170;
      border: none;
      color: #fff;
      padding: 5px;
    }m
    .ant-btn {
      background-color: #515170;
      border: none;

      .anticon {
        color: #fff;
      }
    }
  }
`
function Store() {
  return (
    <div className='store'>
      <h2>Kho Ban Ghi</h2>
      <div>
        <div>
          <SearchStyled placeholder="Ten ban ghi, ca si,... "  />
        </div>
        <div>
          <div className="options">
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store