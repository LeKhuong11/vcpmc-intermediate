import { ColumnsType } from 'antd/es/table'
import React from 'react'
import CustomTable from '../../../../components/Table'

interface DataType {
    key: number,
    stt: number,
    fullName: string,
    userName: string,
    role: string,
    status: boolean,
    email: string,
    numberPhone: string,
    date: string,
    edit: string

}

function TabIndex1() {


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
            stt: 1,
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
            stt: 2,
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
            stt: 3,
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
            stt: 4,
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
            stt: 5,
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
            stt: 6,
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
            stt: 7,
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
            stt: 8,
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
  return (
    <>
        <CustomTable dataSrouce={dataSource} columns={columns} heightProps={70} />
    </>
  )
}

export default TabIndex1