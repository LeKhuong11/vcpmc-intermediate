import React from 'react'
import { Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import FeatureInPage from '../../../../components/FeatureInPage'
import CustomTable from '../../../../components/Table'
import { DataTypeUsers } from '../../../../redux/slice/listUserSlice'
import { useAppSelector } from '../../../../redux/store'


function ListUserTab() {
    const navigate = useNavigate();
    const { users } = useAppSelector(state => state.users)


    const columns: ColumnsType<DataTypeUsers> = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            render: (_,{} ,index) => <p>{index + 1}</p>
        },
        {
            title: 'Họ tên',
            dataIndex: 'displayName',
            key: 'displayName'
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, {status}) => {
                return <>
                {status ? 
                  <p><Switch defaultChecked={status ? true : false}/>Đang kích hoạt</p> : 
                  <p><Switch defaultChecked={status ? true : false} />Ngừng kích hoạt</p> }
              </>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            render: (_, {id}) => {
                return <Link to={`edit-user/${id}`}>Xem Chi tiết</Link>
            }
        },
    ]
    const dataSource: DataTypeUsers[] = users

    const featureProps = [
        {
            icon: AiOutlineUserAdd,
            text: "Thêm người dùng",
            event: () => navigate('add-user')
        }
    ]
  return (
    <>
        <CustomTable 
            dataSrouce={dataSource} 
            columns={columns} 
            heightProps={70}
            pagination={{pageSize: 10}}
        />
        <FeatureInPage featureProps={featureProps} />
    </>
  )
}

export default ListUserTab