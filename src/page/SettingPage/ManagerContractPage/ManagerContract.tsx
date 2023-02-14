import React from 'react'
import { ColumnsType } from 'antd/es/table'
import { MdDateRange } from 'react-icons/md'
import { GiNotebook } from 'react-icons/gi'
import FeatureInPage from '../../../components/FeatureInPage'
import CustomTable from '../../../components/Table'
import root from '../setting.module.scss'

interface DataType {
  key: number,
  stt: number,
  contractType: string,
  revenue: number
}

function ManagerContractPage() {

  const dataSource: DataType[] = [
    {
      key: 1,
      stt: 1,
      contractType: 'Trọn gói',
      revenue: 20
    },
    {
      key: 2,
      stt: 2,
      contractType: 'Giá trị bài hát/lượt phát',
      revenue: 20
    },
  ]
  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Loại hợp đồng',
      dataIndex: 'contractType',
      key: 'contractType'
    },
    {
      title: 'Doanh thu VCMVC/Hợp đồng (Đơn vị: %)',
      dataIndex: 'revenue',
      key: 'revenue'
    }
  ]
  const featureProps = [
    {
      icon: GiNotebook,
      text: 'Chỉnh sửa loại hợp đồng'
    },
    {
      icon: MdDateRange,
      text: 'Chỉnh sửa cảnh báo hết hạn'
    },

  ]
  return (
    <div className={root.managerContract}>
      <h3>Loại hợp đồng</h3>
      <div className={root.containerContent}>
        <div>
          <CustomTable dataSrouce={dataSource} columns={columns} heightProps={20} />
        </div>
        <div className={root.warning}>
            <h4>Cảnh báo hết hạn khai thác tác phẩm</h4>
            <h5>Hợp đồng được cảnh báo trước thời gian hết hạn: 365 ngày</h5>
        </div>
      </div>
      <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default ManagerContractPage