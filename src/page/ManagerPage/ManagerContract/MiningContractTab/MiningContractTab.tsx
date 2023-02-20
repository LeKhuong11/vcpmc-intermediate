import { ColumnsType } from 'antd/es/table'
import React from 'react'
import InputSearch from '../../../../components/InputSearch'
import CustomTable from '../../../../components/Table'



interface DataType {
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

function MiningContractTab() {
    

  const DataSourceTabIndex2: DataType[] = [
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
  const columnTabIndex2: ColumnsType<DataType> = [
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
    <>
        <div>
            <InputSearch placehoder='Tên hợp đồng, tác giả, ...' />
        </div>
        <div>
            <CustomTable columns={columnTabIndex2} dataSrouce={DataSourceTabIndex2} heightProps={60} />
        </div>
    </>
  )
}

export default MiningContractTab