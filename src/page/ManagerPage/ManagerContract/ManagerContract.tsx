import { Breadcrumb, MenuProps } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { IoIosArrowForward } from "react-icons/io";
import DropDown from '../../../components/DropDown'
import InputSearch from '../../../components/InputSearch'
import root from '../manager.module.scss'
import FeatureInPage from '../../../components/FeatureInPage';
import { MdAdd } from 'react-icons/md';


const BreadcrumbItemStyled = styled(Breadcrumb)`
  &&& {
    .ant-breadcrumb-link {
      color: var(--white);
      font-size:  16px;
    }
    .ant-breadcrumb-separator {
      color: var(--orange);
    }
  }
`

function ManagerContract() {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname)


  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1'
    },
    {
      label: '2nd menu item',
      key: '2'
    },
    {
      label: '3rd menu item',
      key: '3',
    },
    {
      label: '4rd menu item',
      key: '4',
    },
  ];
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  
  const featureProp = [
    {
      icon: MdAdd,
      text: 'Thêm hợp đồng'
    }
  ]

  return (
    <div className={root.managerContract}>
        <nav className={root.navigate}> 
          <BreadcrumbItemStyled separator={<IoIosArrowForward />}>
            <Breadcrumb.Item>Quản lý</Breadcrumb.Item>
            <Breadcrumb.Item>Quản lý hợp đồng</Breadcrumb.Item>
          </BreadcrumbItemStyled>
        </nav>
        <h2>Danh sách hợp đồng</h2>
        <div>
          <div></div>
          <div className={root.dropdownAndSearch}>
            <div>
              <div>
                <p>Quyền sở hữu:</p>
                <DropDown menuProps={menuProps} orange />
              </div>
              <div>
                <p>Hiệu lực hợp đồng:</p>
                <DropDown menuProps={menuProps} orange />
              </div>
            </div>
            <div>
              <InputSearch placehoder="Tên hợp đồng, số hợp đồng, người ủy quyền,..." />
            </div>
          </div>
        </div>
        <FeatureInPage featureProps={featureProp} />
    </div>
  )
}

export default ManagerContract