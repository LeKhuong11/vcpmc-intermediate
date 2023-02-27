import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { RxDotFilled } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import FeatureInPage from '../../../../components/FeatureInPage'
import InputSearch from '../../../../components/InputSearch'
import CustomTable from '../../../../components/Table'
import { usePaymentsCollection } from '../../../../hooks/useSnapshot'
import { DataTypeContract } from '../../../../redux/slice/contractSlice'
import { useAppSelector } from '../../../../redux/store'



function MiningContractTab() {
  const navigate = useNavigate();
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

  const columns: ColumnsType<DataTypeContract> = [
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
      title: 'Khách hàng',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'startDay',
      key: 'startDay'
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
      dataIndex: 'status',
      key: 'status',
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
      title: '',
      dataIndex: '',
      key: '',
      render: (_, {id}) => {
        const handleClickToDetailContract = () => {
          navigate(`detail-mining-contract/${id}`)
        }
        return <a onClick={handleClickToDetailContract}>Xem chi tiết</a>
      }
    }
    
  ]


  const featureProp = [
    {
      icon: MdAdd,
      text: 'Thêm hợp đồng',
      event: () => navigate('')
    }
  ]
  
  return (
    <>
        <div>
            <InputSearch placehoder='Tên hợp đồng, tác giả, ...' />
        </div>
        <div>
            <CustomTable 
              columns={columns} 
              dataSrouce={DataSource} 
              heightProps={60} 
              pagination={{pageSize: 8}}
            />
        </div>
        <FeatureInPage featureProps={featureProp} />
    </>
  )
}

export default MiningContractTab