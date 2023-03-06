import { MenuProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { RxDotFilled } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DropDown from '../../../../components/DropDown'
import FeatureInPage from '../../../../components/FeatureInPage'
import InputSearch from '../../../../components/InputSearch'
import Loading from '../../../../components/Loading'
import CustomModal from '../../../../components/Modal'
import CustomTable from '../../../../components/Table'
import { useSearch } from '../../../../hooks/useSearch'
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
  const navigate = useNavigate();
  const { contracts } = useAppSelector(state => state.contracts)
  const [ listContract, setListContract ] = useState<DataTypeContract[]>(contracts)
  const { payments, loading} = usePaymentsCollection('contract');
  const [ openModal, setOpenModal ] = useState({
    open: false,
    reason: ''
  })
  const [ search, setSearch ] = useSearch(contracts, 'contractID');

  //listen to 'search' change returned from useSearch();
  useEffect(() => {
    setListContract(search)
  }, [search])
  
  // listen 
  // When data changes on firestore, we get that update here in this section immediately
  // callback and then update the UI based on current state 
  useEffect(() => {
    setListContract(payments)
  }, [payments])


   const handleChangeSetSearchValue = (e: any) => {
    const value = e.value;
    setSearch(value)
  }

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
  
          return <Link to={`detail-authorized-contract/${id}`}>Xem chi Tiết</Link>
        }
      },
      {
        title: '',
        dataIndex: 'cancel',
        key: 'cancel',
        render: (_, { status, reason }) => {
            //see details of cancellation reason
            const handleClickSeeDetailCanceled = (reason: any) => {
              setOpenModal(prev => {
                return {
                  ...openModal,
                  open: true,
                  reason: reason
                }
              })
            }
            
          return <>
            {status === 'canceled' ? <a onClick={() => handleClickSeeDetailCanceled(reason)}>Lý do hủy</a> : ''}
          </>
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

      
    const featureProp = [
      {
        icon: MdAdd,
        text: 'Thêm hợp đồng',
        event: () => navigate('add-contract')
      }
    ]
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
                <InputSearch 
                  placehoder="Tìm kiếm theo số hợp đồng,..." 
                  setValue={handleChangeSetSearchValue}
                />
            </div>
            </ContainerStyled>
            <CustomTable 
              columns={columnTab} 
              dataSrouce={DataSource} 
              heightProps={60}
              pagination={{pageSize: 8}}
            />
            <CustomModal
              title={`Lý do hủy hợp đồng`}
              openModal={openModal.open}
              handleCancel={() => setOpenModal({...openModal, open: false})}
              handleOk={() => {setOpenModal({...openModal, open: false})}}
              content={<textarea>{openModal.reason}</textarea>}
            />
             <FeatureInPage featureProps={featureProp} />
          </div>
        }
      </>
  )
}

export default AuthorizedContractTab