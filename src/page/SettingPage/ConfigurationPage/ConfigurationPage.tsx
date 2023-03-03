import { useState } from 'react'
import styled from 'styled-components';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CustomSelect from '../../../components/Select';
const theme1 = require('../../../image/theme1.png');
const theme2 = require('../../../image/theme2.png');
const theme3 = require('../../../image/theme3.png');
const theme4 = require('../../../image/theme4.png');

const ContainerDiv = styled.div`

  & .content {
    width: 100%;
    &>div:first-child{
      display: flex;
      width: 100%;
    }
    & .main-theme {
      margin-right: 30px;
      & img { 
        width: 350px;
        height: 200px;
        border-radius: 8px;
      }
    }
  
    & .select-theme {
      display: flex;
      margin-left: 40px;
      cursor: pointer;
      & img {
        margin: 10px;
        width: 200px;
        height: 120px;
      }
    }

    & .select-langeuage {
      display: flex;
      margin-top: 40px;

      & h5 {
        display: flex;
        align-items: center;
        margin-right: 20px;
      }
    }
  }
`

function ConfigurationPage() {
  const [ valueSelect, setValueSelect ] = useState('Tiếng Việt');
  const breadcrumb = [
    {
      key: 1,
      path: '',
      namePage: 'Cài đặt'
    },
    {
      key: 2,
      path: '',
      namePage: 'Cài đặt hệ thống'
    }
  ]

  const select = {
    items: ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Nhật', 'Tiếng Thái'],
    onChange: (value: string) => {
        setValueSelect(value)
    }
}
  return (
    <ContainerDiv>
      <div>
        <Breadcrumbs crumbs={breadcrumb} />
      </div>
      <div> 
        <h3>Cài đặt cấu hình</h3>
      </div>
      <div className='content'>
        <div>
          <div className='main-theme'>
            <img src={theme1} alt="" />
          </div>
          <div className='select-theme'>
              <img src={theme2} alt="" />
              <img src={theme3} alt="" />
              <img src={theme4} alt="" />
          </div>
        </div>
        <div className='select-langeuage'>
          <h5>Ngôn ngữ hiển thị</h5>
          <CustomSelect 
            value={valueSelect}
            items={select.items}
            onChange={select.onChange}
            width={160}
          />
        </div>
      </div>
    </ContainerDiv>
  )
}

export default ConfigurationPage