import { MenuProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DropDown from '../../../../components/DropDown'
import InputSearch from '../../../../components/InputSearch'
import CustomTable from '../../../../components/Table'
import { db } from '../../../../firebase/configfb'
import { DataTypeContract } from '../../../../redux/slice/contractSlice'
import { useAppSelector } from '../../../../redux/store'



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

function AuthorizedContractTab() {
  const { contracts } = useAppSelector(state => state.contracts)
  const [ listContract, setListContract ] = useState<DataTypeContract[]>(contracts)
  


  useEffect(() => {
    const colRef = collection(db, "contract")
    //real time update
    const unsub = onSnapshot(colRef, (snapshot: any) => {
        const items: DataTypeContract[] = []
        snapshot.docs.forEach((doc: any) => {
          items.push({...doc.data(), id: doc.id})
        })
        setListContract(items)
    })
 
    return () => {
      unsub()
    };
}, [])


    const DataSource: DataTypeContract[] = listContract
    const columnTab: ColumnsType<DataTypeContract> = [
      {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        render: (_, {}, index) => {

          return <p>{index + 1}</p>
        }
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
        dataIndex: 'fullName',
        key: 'fullName'
      },
      {
        title: 'Quyền sở hữu',
        dataIndex: 'role',
        key: 'role'
      },
      {
        title: 'Hiệu lực hợp đồng',
        dataIndex: 'timeActive',
        key: 'timeActive',
        render: (_, {status}) => {

          const statusobj = {
            new: <p><RxDotFilled color="green" />Mới</p>,
            avtive: <p><RxDotFilled color="blue" />Còn thời hạn</p>,
            expired: <p><RxDotFilled color="gray" />Đã hết hạn</p>,
            canceled: <p><RxDotFilled color="red" />Đã hủy</p>
          }
          
      
          return <>
            {status ? 
              <p><RxDotFilled color="blue" />Còn thời hạn</p> : 
              <p><RxDotFilled color="gray" />Đã hủy</p>}
          </>
        }
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'date',
        key: 'date'
      },
      {
        title: '',
        dataIndex: 'detail',
        key: 'detail',
        render: (_, { }) => {
  
          return <Link to="">Xem chi Tiết</Link>
        }
      },
      {
        title: '',
        dataIndex: 'cancel',
        key: 'cancel',
        render: (_, { status }) => {
  
          return <a>{status ? '' : "Lý do hủy"}</a>
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

export default AuthorizedContractTab