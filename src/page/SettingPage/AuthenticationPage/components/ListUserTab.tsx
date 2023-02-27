import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import FeatureInPage from '../../../../components/FeatureInPage'
import CustomTable from '../../../../components/Table'

interface DataType {
    key: number,
    fullName: string,
    userName: string,
    role: string,
    status: boolean,
    email: string,
    numberPhone: string,
    date: string,
    edit: string

}

function ListUserTab() {


    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            render: (_,{} ,index) => <p>{index + 1}</p>
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
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'numberPhone',
            key: 'numberPhone'
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            render: (_, {edit}) => {
                return <a>{edit}</a>
            }
        },
    ]
    const dataSource: DataType[] = [
        {
            key: 1,
            fullName: 'Phan Mạnh Quỳnh',
            userName: 'PMQ_01',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 2,
            fullName: 'Chillies',
            userName: 'C-CHILI',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 3,
            fullName: 'Đen Vâu',
            userName: 'DEN',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 4,
            fullName: 'Vũ Cát Tường',
            userName: 'VCT_012',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 5,
            fullName: 'Phan Mạnh Quỳnh',
            userName: 'PMQ_01',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 6,
            fullName: 'Phan Mạnh Quỳnh',
            userName: 'PMQ_01',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 7,
            fullName: 'Phan Mạnh Quỳnh',
            userName: 'PMQ_01',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 8,
            fullName: 'Phan Mạnh Quỳnh',
            userName: 'PMQ_01',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 9,
            fullName: 'Phan Mạnh Quỳnh',
            userName: 'PMQ_01',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 10,
            fullName: 'Phan Mạnh Quỳnh',
            userName: 'PMQ_01',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 11,
            fullName: 'Phan Mạnh Quỳnh',
            userName: 'PMQ_01',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
        {
            key: 12,
            fullName: 'Phan Mạnh Quỳnh',
            userName: 'PMQ_01',
            role: 'Group Admin',
            status: true,
            email: 'pmq@gmail.com',
            numberPhone: '029 8131 6743',
            date: '02/12/2022',
            edit: 'Chỉnh sửa'
        },
    ]
    const featureProps = [
        {
            icon: AiOutlineUserAdd,
            text: "Thêm người dùng"
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