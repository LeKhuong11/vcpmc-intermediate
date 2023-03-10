import React from 'react'
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import root from '../revenue.module.scss'
import InputSearch from '../../../components/InputSearch';
import { ColumnsType } from 'antd/es/table';
import CustomTable from '../../../components/Table';
import { MdOutlineLogout } from 'react-icons/md';
import FeatureInPage from '../../../components/FeatureInPage';
import CustomDatePicker from '../../../components/DatePicker';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store';
import { message } from 'antd';


interface DataType {
  key: number,
  stt: number,
  contractID: string,
  company: string,
  date: string,
  contractType: string,
  totalRun: number,
  totalRevenue: number,
  undistributedRevenue: string | number,
  dayClosed: string,
  detail: string
}

function HistoryForControlPage() {
  const { user } = useAppSelector(state => state.user)

  const disabledDateProps: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  //Format Money 
 

  const dataSource: DataType[] = [
    {
      key: 1,
      stt: 1,
      contractID: 'HĐ123',
      company: 'Cty TNHH TM DV ABCEDEF',
      date: '10/07/2020 - 10/07/2021 ',
      contractType: 'Trọn gói',
      totalRun: 365,
      totalRevenue: 365000000,
      undistributedRevenue: 1000000,
      dayClosed: '10/07/2021', 
      detail: 'Xem chi tiết'
    },
    {
      key: 2,
      stt: 2,
      contractID: 'HĐ123',
      company: 'Cty TNHH TM DV ABCEDEF',
      date: '10/07/2020 - 10/07/2021 ',
      contractType: 'Trọn gói',
      totalRun: 365,
      totalRevenue: 365000000,
      undistributedRevenue: 0,
      dayClosed: '10/07/2021', 
      detail: 'Xem chi tiết'
    },
    {
      key: 3,
      stt: 3,
      contractID: 'HĐ123',
      company: 'Cty TNHH TM DV ABCEDEF',
      date: '10/07/2020 - 10/07/2021 ',
      contractType: 'Trọn gói',
      totalRun: 365,
      totalRevenue: 365000000,
      undistributedRevenue: 1000000,
      dayClosed: '10/07/2021', 
      detail: 'Xem chi tiết'
    },
    {
      key: 4,
      stt: 4,
      contractID: 'HĐ123',
      company: 'Cty TNHH TM DV ABCEDEF',
      date: '10/07/2020 - 10/07/2021 ',
      contractType: 'Trọn gói',
      totalRun: 365,
      totalRevenue: 365000000,
      undistributedRevenue: '-',
      dayClosed: '10/07/2021', 
      detail: 'Xem chi tiết'
    },
    {
      key: 5,
      stt: 5,
      contractID: 'HĐ123',
      company: 'Cty TNHH TM DV ABCEDEF',
      date: '10/07/2020 - 10/07/2021 ',
      contractType: 'Trọn gói',
      totalRun: 365,
      totalRevenue: 365000000,
      undistributedRevenue: 1000000,
      dayClosed: '10/07/2021', 
      detail: 'Xem chi tiết'
    },
    {
      key: 6,
      stt: 6,
      contractID: 'HĐ123',
      company: 'Cty TNHH TM DV ABCEDEF',
      date: '10/07/2020 - 10/07/2021 ',
      contractType: 'Trọn gói',
      totalRun: 365,
      totalRevenue: 365000000,
      undistributedRevenue: 0,
      dayClosed: '10/07/2021', 
      detail: 'Xem chi tiết'
    }
  ]
  const colums: ColumnsType<DataType> = [
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
      title: 'Đơn vị khai thác',
      dataIndex: 'company',
      key: 'company'
    },
    {
      title: 'Thời hạn hợp đồng',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Loại hợp đồng',
      dataIndex: 'contractType',
      key: 'contractType'
    },
    {
      title: 'Tổng lượt phát',
      dataIndex: 'totalRun',
      key: 'totalRun'
    },
    {
      title: 'Tổng doanh thu',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue'
    },
    {
      title: 'Doanh thu chưa phân phối',
      dataIndex: 'undistributedRevenue',
      key: 'undistributedRevenue'
    },
    {
      title: 'Ngày chốt đối soát',
      dataIndex: 'dayClosed',
      key: 'dayClosed'
    },
    {
      title: '',
      dataIndex: 'detail',
      key: 'detail',
      render: (_, {detail}) => (
        <Link to="detail/213">{detail}</Link>
      )
    },
  ]

  const featureProps = [
    {
      icon: MdOutlineLogout,
      text: 'Xuất file',
      event: () => {
        user.isAdmin || message.warning('Chức năng này chỉ dành cho người quản lý')
      },
      unActive:  user.isAdmin ? false : true
    }
  ]

  return (
    <div className={root.historyForControl}>
        <h3>Lịch sử đối soát doanh thu</h3>
        <div className={root.timeAndSearch}>
            <div>
              <h5>Thời gian thực hiện: </h5>
              <CustomDatePicker disabledDate={disabledDateProps} />
            </div>
            <div>
              <InputSearch placehoder='Nhập tên tài khoản quản trị' />
            </div>
        </div>
        <div>
          <h4>Danh sách hợp đồng khai thác đã đối soát</h4>
        </div>
        <div>
          <CustomTable 
            columns={colums} 
            dataSrouce={dataSource} 
            heightProps={65} 
            pagination={{pageSize: 5}}
          />
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default HistoryForControlPage