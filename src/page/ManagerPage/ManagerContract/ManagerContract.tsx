import { MenuProps } from 'antd'
import React, { useState } from 'react'
import DropDown from '../../../components/DropDown'
import InputSearch from '../../../components/InputSearch'
import root from '../manager.module.scss'
import FeatureInPage from '../../../components/FeatureInPage';
import { MdAdd } from 'react-icons/md';
import { ColumnsType } from 'antd/es/table'
import CustomTable from '../../../components/Table'
import { RxDotFilled } from 'react-icons/rx'

interface DataTypeTabIndex1 {
      stt: number,
      key: number,
      contractID: string,
      contractName: string,
      authorized: string,
      author: string,
      timeActive: boolean,
      createAt: string,
      detail: string,
      cancel: boolean
}

interface DataTypeTabIndex2 {
      stt: number,
      key: number,
      contractID: string,
      customerName: string,
      created: string,
      startDay: string,
      date: string,
      timeActive: string,
      detail: string,
      copyContract: string
}

function ManagerContract() {
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

 
  const DataSourceTabIndex1: DataTypeTabIndex1[] = [
    {
      stt: 1,
      key: 1,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Vương Anh Tú',
      author: 'Người biểu diễn',
      timeActive: true,
      createAt: '01/04/2021',
      detail: 'Xem chi tiết',
      cancel: true
    },
    {
      stt: 2,
      key: 2,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Khắc Hưng',
      author: 'Người biểu diễn',
      timeActive: true,
      createAt: '01/04/2021',
      detail: 'Xem chi tiết',
      cancel: true
    },
    {
      stt: 3,
      key: 3,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Châu Đăng Khoa',
      author: 'Người biểu diễn',
      timeActive: true,
      createAt: '01/04/2021',
      detail: 'Xem chi tiết',
      cancel: true
    }, 
    {
      stt: 4,
      key: 4,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Vương Anh Tú',
      author: 'Người biểu diễn',
      timeActive: false,
      createAt: '01/04/2021',
      detail: 'Xem chi tiết',
      cancel: false
    },
    {
      stt: 5,
      key: 5,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Phan Mạnh Quỳnh',
      author: 'Người biểu diễn',
      timeActive: false,
      createAt: '01/04/2021',
      detail: 'Xem chi tiết',
      cancel: false
    }, 
    {
      stt: 6,
      key: 6,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Vương Anh Tú',
      author: 'Người biểu diễn',
      timeActive: true,
      createAt: '01/04/2021',
      detail: 'Xem chi tiết',
      cancel: true
    }, 
    {
      stt: 7,
      key: 7,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Karik',
      author: 'Người biểu diễn',
      timeActive: false,
      createAt: '01/04/2021',
      detail: 'Xem chi tiết',
      cancel: false
    }, 
    {
      stt: 8,
      key: 8,
      contractID: 'HD123',
      contractName: 'Hợp đồng ủy quyền bài hát',
      authorized: 'Đen Vâu',
      author: 'Người biểu diễn',
      timeActive: true,
      createAt: '01/04/2021',
      detail: 'Xem chi tiết',
      cancel: true
    }
  ]
  const columnTabIndex1: ColumnsType<DataTypeTabIndex1> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Số hợp đồng',
      dataIndex: 'contractID',
      key: 'contractID'
    },
    {
      title: 'Tên hợp đồng',
      dataIndex: 'contractName',
      key: 'contractName'
    },
    {
      title: 'Người ủy quyền',
      dataIndex: 'authorized',
      key: 'authorized'
    },
    {
      title: 'Quyền sở hữu',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Hiệu lực hợp đồng',
      dataIndex: 'timeActive',
      key: 'timeActive',
      render: (_, {timeActive}) => {

        return <>
          {timeActive ? 
            <p><RxDotFilled color="blue" />Còn thời hạn</p> : 
            <p><RxDotFilled color="gray" />Đã hủy</p>}
        </>
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      key: 'createAt'
    },
    {
      title: '',
      dataIndex: 'detail',
      key: 'detail',
      render: (_, { detail }) => {

        return <a>{detail}</a>
      }
    },
    {
      title: '',
      dataIndex: 'cancel',
      key: 'cancel',
      render: (_, { timeActive,cancel }) => {

        return <a>{timeActive ? '' : "Lý do hủy"}</a>
      }
    },
  ]


  const DataSourceTabIndex2: DataTypeTabIndex2[] = [
    {
      stt: 1,
      key: 1,
      contractID: 'HD123',
      customerName: 'Hợp đồng kinh doanh 1',
      created: '01/04/2021',
      startDay: '02/12/2021',
      date: '02/12/2022',
      timeActive: 'Còn hiệu lực',
      detail: 'Xem chi tiết',
      copyContract: 'Sao chép hợp đồng'
    },
    {
      stt: 2,
      key: 2,
      contractID: 'HD123',
      customerName: 'Hợp đồng kinh doanh 1',
      created: '01/04/2021',
      startDay: '02/12/2021',
      date: '02/12/2022',
      timeActive: 'Còn hiệu lực',
      detail: 'Xem chi tiết',
      copyContract: 'Sao chép hợp đồng'
    },
    {
      stt: 3,
      key: 3,
      contractID: 'HD123',
      customerName: 'Hợp đồng kinh doanh 1',
      created: '01/04/2021',
      startDay: '02/12/2021',
      date: '02/12/2022',
      timeActive: 'Còn hiệu lực',
      detail: 'Xem chi tiết',
      copyContract: 'Sao chép hợp đồng'
    },
    {
      stt: 4,
      key: 4,
      contractID: 'HD123',
      customerName: 'Hợp đồng kinh doanh 1',
      created: '01/04/2021',
      startDay: '02/12/2021',
      date: '02/12/2022',
      timeActive: 'Còn hiệu lực',
      detail: 'Xem chi tiết',
      copyContract: 'Sao chép hợp đồng'
    },
    {
      stt: 5,
      key: 5,
      contractID: 'HD123',
      customerName: 'Hợp đồng kinh doanh 1',
      created: '01/04/2021',
      startDay: '02/12/2021',
      date: '02/12/2022',
      timeActive: 'Còn hiệu lực',
      detail: 'Xem chi tiết',
      copyContract: 'Sao chép hợp đồng'
    },
  ] 
  const columnTabIndex2: ColumnsType<DataTypeTabIndex2> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Số hợp đồng',
      dataIndex: 'contractID',
      key: 'contractID'
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created',
      key: 'created'
    },
    {
      title: 'Ngày hiệu lực',
      dataIndex: 'startDay',
      key: 'startDay'
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Hiệu lực hợp đồng',
      dataIndex: 'timeActive',
      key: 'timeActive'
    },
    {
      title: '',
      dataIndex: 'detail',
      key: 'detail',
      render: (_, { detail }) => {

        return <a>{detail}</a>
      }
    },
    {
      title: '',
      dataIndex: 'cancel',
      key: 'cancel',
      render: (_, { copyContract }) => {

        return <a>{copyContract}</a>
      }
    },
  ]
  

  return (
    <div className={root.managerContract}>
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
              <CustomTable columns={columnTabIndex1} dataSrouce={DataSourceTabIndex1} heightProps={60}/>
            </div>
            <div className={toggleState === 2 ? root.activeContent : root.content} >
              {/* TAB 2 */}
              <div>
                <InputSearch placehoder='Tên hợp đồng, tác giả, ...' />
              </div>
              <div>
                <CustomTable columns={columnTabIndex2} dataSrouce={DataSourceTabIndex2} heightProps={60} />
              </div>
            </div>
          </div>
        </div>
        <FeatureInPage featureProps={featureProp} />
    </div>
  )
}

export default ManagerContract