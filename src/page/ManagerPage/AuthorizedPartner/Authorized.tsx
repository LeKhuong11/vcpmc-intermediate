import { Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import InputSearch from '../../../components/InputSearch'
import CustomTable from '../../../components/Table'
import root from '../manager.module.scss'


interface DataType {
  stt: number,
  key: number,
  fullName: string,
  userName: string,
  email: string,
  date: string,
  phone: string,
  status: boolean,
  update: string
}

function Authorized() {

  const dataSoure: DataType[] = [
    {
      stt: 1,
      key: 1,
      fullName: 'Any Ngọc',
      userName: 'phm_L@gmail.com',
      email: 'phm_L@gmail.com',
      date: '21/04/2021',
      phone: '021 593 1214',
      status: true,
      update: 'Cập nhật'
    },
    {
      stt: 2,
      key: 2,
      fullName: 'Zachary Hoàng',
      userName: 'Thi@hotmail.com',
      email: 'Thi@hotmail.com',
      date: '21/04/2021',
      phone: '021 593 1214',
      status: true,
      update: 'Cập nhật'
    },
    {
      stt: 3,
      key: 3,
      fullName: 'Bernadette Tô PhD',
      userName: 'V.Vinh50@yahoo.com',
      email: 'V.Vinh50@yahoo.com',
      date: '21/04/2021',
      phone: '021 593 1214',
      status: false,
      update: 'Cập nhật'
    },
    {
      stt: 4,
      key: 4,
      fullName: 'Moses Lâm',
      userName: 'H.Trinh68@gmail.com',
      email: 'H.Trinh68@gmail.com',
      date: '21/04/2021',
      phone: '021 593 1214',
      status: true,
      update: 'Cập nhật'
    },
    {
      stt: 5,
      key: 5,
      fullName: 'Maurice Nhân',
      userName: 'Lm_c@hotmail.com',
      email: 'Lm_c@hotmail.com',
      date: '21/04/2021',
      phone: '021 593 1214',
      status: false,
      update: 'Cập nhật'
    },
    {
      stt: 6,
      key: 6,
      fullName: 'Any Ngọc',
      userName: 'phm_L@gmail.com',
      email: 'phm_L@gmail.com',
      date: '21/04/2021',
      phone: '021 593 1214',
      status: true,
      update: 'Cập nhật'
    },
    {
      stt: 7,
      key: 7,
      fullName: 'Any Ngọc',
      userName: 'phm_L@gmail.com',
      email: 'phm_L@gmail.com',
      date: '21/04/2021',
      phone: '021 593 1214',
      status: false,
      update: 'Cập nhật'
    },
    {
      stt: 8,
      key: 8,
      fullName: 'Any Ngọc',
      userName: 'phm_L@gmail.com',
      email: 'phm_L@gmail.com',
      date: '21/04/2021',
      phone: '021 593 1214',
      status: true,
      update: 'Cập nhật'
    }
  ]
  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, {status}) => {
        return <>
          {status ? 
            <p><Switch defaultChecked />Đang kích hoạt</p> : 
            <p><Switch />Ngừng kích hoạt</p> }
        </>
      }
    },
    {
      title: '',
      dataIndex: 'update',
      key: 'update',
      render: (_, {update}) => {
        return <a>{update}</a>
      }
    }
  ]
  
  return (
    <div className={root.authorized}>
      <h3>Danh sách đối tác ủy quyền</h3>
        <div>
          <InputSearch placehoder='Họ tên, tên đăng nhập, email,...' />
        </div>
        <div>
          <CustomTable columns={columns} dataSrouce={dataSoure} heightProps={70} />
        </div>
    </div>
  )
}

export default Authorized