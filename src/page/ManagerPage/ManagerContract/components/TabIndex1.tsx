import { MenuProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RxDotFilled } from 'react-icons/rx'
import styled from 'styled-components'
import DropDown from '../../../../components/DropDown'
import InputSearch from '../../../../components/InputSearch'
import CustomTable from '../../../../components/Table'

interface DataType {
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

const ContainerStyled = styled.div`
        display: flex;
        justify-content: space-between;
        width: 93%;

        &>div {
            display: flex;
            
            &>div {
                margin-right: 25px;
                display: flex;
                align-items: center;
            }
}
`

function TabIndex1() {

    const DataSource: DataType[] = [
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
      const columnTab: ColumnsType<DataType> = [
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
  return (
    <>
        <ContainerStyled>
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
        </ContainerStyled>
        <CustomTable columns={columnTab} dataSrouce={DataSource} heightProps={60}/>
    </>
  )
}

export default TabIndex1