import { MenuProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DropDown from '../../../../components/DropDown'
import InputSearch from '../../../../components/InputSearch'
import Loading from '../../../../components/Loading'
import CustomTable from '../../../../components/Table'
import { db } from '../../../../firebase/configfb'
import { usePaymentsCollection } from '../../../../hooks/useSnapshot'
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
  const { payments, loading} = usePaymentsCollection('contract');
  

  // listen 
  // When data changes on firestore, we receive that update here in this
  // callback and then update the UI based on current state 
  useEffect(() => {
    setListContract(payments)
  }, [payments])


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

          const statusobj: any = {
            new: <p><RxDotFilled color="green" />Mới</p>,
            active: <p><RxDotFilled color="blue" />Còn thời hạn</p>,
            expired: <p><RxDotFilled color="gray" />Đã hết hạn</p>,
            canceled: <p><RxDotFilled color="red" />Đã hủy</p>
          }
          
      
          return <>
            {statusobj[status]}
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
        render: (_, { id }) => {
  
          return <Link to={`detail/${id}`}>Xem chi Tiết</Link>
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
        {loading ? <Loading /> : 
          <div>
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
          </div>
        }
      </>
  )
}

export default AuthorizedContractTab