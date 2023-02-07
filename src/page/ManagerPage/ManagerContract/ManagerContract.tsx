import { Breadcrumb, MenuProps } from 'antd'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { IoIosArrowForward } from "react-icons/io";
import DropDown from '../../../components/DropDown'
import InputSearch from '../../../components/InputSearch'
import root from '../manager.module.scss'
import FeatureInPage from '../../../components/FeatureInPage';
import { MdAdd } from 'react-icons/md';
import Table from './components/Table';
import TableTab2 from './components/TableTab2';


const BreadcrumbStyled = styled(Breadcrumb)`
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
  const [toggleState, setToggleState] = useState(1);


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

  const storeTab1 = [
    {
      stt: 1,
      id: 1,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Vương Anh Tú',
      autho: 'Người biểu diễn',
      timeActive: true,
      created: '01/04/2021',
      status: 'Xem chi tiết'
    },
    {
      stt: 2,
      id: 2,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Khắc Hưng',
      autho: 'Người biểu diễn',
      timeActive: true,
      created: '01/04/2021',
      status: 'Xem chi tiết'
    },
    {
      stt: 3,
      id: 3,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Châu Đăng Khoa',
      autho: 'Người biểu diễn',
      timeActive: true,
      created: '01/04/2021',
      status: 'Xem chi tiết'
    }, 
    {
      stt: 4,
      id: 4,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Vương Anh Tú',
      autho: 'Người biểu diễn',
      timeActive: false,
      created: '01/04/2021',
      status: 'Xem chi tiết'
    },
    {
      stt: 5,
      id: 5,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Phan Mạnh Quỳnh',
      autho: 'Người biểu diễn',
      timeActive: false,
      created: '01/04/2021',
      status: 'Xem chi tiết'
    }, 
    {
      stt: 6,
      id: 6,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Vương Anh Tú',
      autho: 'Người biểu diễn',
      timeActive: true,
      created: '01/04/2021',
      status: 'Xem chi tiết'
    }, 
    {
      stt: 7,
      id: 7,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Karik',
      autho: 'Người biểu diễn',
      timeActive: false,
      created: '01/04/2021',
      status: 'Xem chi tiết'
    }, 
    {
      stt: 8,
      id: 8,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Đen Vâu',
      autho: 'Người biểu diễn',
      timeActive: true,
      created: '01/04/2021',
      status: 'Xem chi tiết'
    }
  ]
  const columnTab1 = ['STT', 'Số hợp đồng', 'Tên hợp đồng', 'Người ủy quyền', 'Quyền sở hữu', 'Hiệu lực hợp đồng', 'Ngày tạo']

  const storetab2 = [
    {
      stt: 1,
      id: 1,
      contractID: 'HD123',
      customerName: 'Hợp đồng kinh doanh 1',
      created: '01/04/2021',
      startDay: '02/12/2021',
      date: '02/12/2022',
      timeActive: 'Còn hiệu lực',
      status: 'Xem chi tiết',
      status2: 'Sao chép hợp đồng'
    },
    {
      stt: 2,
      id: 2,
      contractID: 'HD123',
      customerName: 'Hợp đồng kinh doanh 1',
      created: '01/04/2021',
      startDay: '02/12/2021',
      date: '02/12/2022',
      timeActive: 'Còn hiệu lực',
      status: 'Xem chi tiết',
      status2: 'Sao chép hợp đồng'
    },
    {
      stt: 3,
      id: 3,
      contractID: 'HD123',
      customerName: 'Hợp đồng kinh doanh 1',
      created: '01/04/2021',
      startDay: '02/12/2021',
      date: '02/12/2022',
      timeActive: 'Còn hiệu lực',
      status: 'Xem chi tiết',
      status2: 'Sao chép hợp đồng'
    },
    {
      stt: 4,
      id: 4,
      contractID: 'HD123',
      customerName: 'Hợp đồng kinh doanh 1',
      created: '01/04/2021',
      startDay: '02/12/2021',
      date: '02/12/2022',
      timeActive: 'Còn hiệu lực',
      status: 'Xem chi tiết',
      status2: 'Sao chép hợp đồng'
    },
    {
      stt: 5,
      id: 5,
      contractID: 'HD123',
      customerName: 'Hợp đồng kinh doanh 1',
      created: '01/04/2021',
      startDay: '02/12/2021',
      date: '02/12/2022',
      timeActive: 'Còn hiệu lực',
      status: 'Xem chi tiết',
      status2: 'Sao chép hợp đồng'
    },
  ]
  const columnTab2 = ['STT', 'Số hợp đồng', 'Khách hàng', 'Ngày tạo', 'Ngày hiệu lực', 'Ngày hết hạn', 'Hiệu lực hợp đồng']

  return (
    <div className={root.managerContract}>
        <nav className={root.navigate}> 
          <BreadcrumbStyled separator={<IoIosArrowForward />}>
            <Breadcrumb.Item>Quản lý</Breadcrumb.Item>
            <Breadcrumb.Item>Quản lý hợp đồng</Breadcrumb.Item>
          </BreadcrumbStyled>
        </nav>
        <h2>Danh sách hợp đồng</h2>
        <div>
          <div className={root.blockTabs}>
              <button className={toggleState === 1 ? root.active : ''} onClick={() => setToggleState(1)}>Hợp đồng ủy quyền</button>
              <button className={toggleState === 2 ? root.active : ''} onClick={() => setToggleState(2)}>Hợp đồng khai thác</button>
          </div>
          
          <div className={root.contentTabs} >
            <div className={toggleState === 1 ? root.activeContent : root.content} >
              {/* TAB 1 */}
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
              <Table column={columnTab1} store={storeTab1} heightProp={60} />
            </div>
            <div className={toggleState === 2 ? root.activeContent : root.content} >
              {/* TAB 2 */}
              <div>
                <InputSearch placehoder='Tên hợp đồng, tác giả, ...' />
              </div>
              <div>
                <TableTab2 column={columnTab2} store={storetab2} heightProp={60} />
              </div>
            </div>
          </div>
        </div>
        <FeatureInPage featureProps={featureProp} />
    </div>
  )
}

export default ManagerContract