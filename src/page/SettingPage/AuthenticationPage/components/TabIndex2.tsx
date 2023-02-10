import { ColumnsType } from 'antd/es/table'
import React from 'react'
import CustomTable from '../../../../components/Table'

interface DataType {
    key: number,
    stt: number,
    groupName: string,
    numberOfPerson: number,
    rolo: string,
    description: string,
    update: string,
    delete: boolean
}

function TabIndex2() {

    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Tên nhóm người dùng',
            dataIndex: 'groupName',
            key: 'groupName'
        },
        {
            title: 'Số lượng người dùng',
            dataIndex: 'numberOfPerson',
            key: 'numberOfPerson'
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'rolerole'
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: '',
            dataIndex: 'update',
            key: 'update',
            render: (_, {update}) => {

                return <a>{update}</a>
            }
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            render: (_, ) => {

                return <a>Xóa</a>
            }
        },
    ]
    const dataSource: DataType[] = [
        {
            key: 1,
            stt: 1,
            groupName: 'Super Admin',
            numberOfPerson: 1,
            rolo: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            delete: false
        },
        {
            key: 2,
            stt: 2,
            groupName: 'Group Admin',
            numberOfPerson: 1,
            rolo: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            delete: false
        },
        {
            key: 3,
            stt: 3,
            groupName: 'Sub - user',
            numberOfPerson: 6,
            rolo: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            delete: false
        },
        {
            key: 4,
            stt: 4,
            groupName: 'Content manager',
            numberOfPerson: 33,
            rolo: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            delete: false
        },
        {
            key: 5,
            stt: 5,
            groupName: 'QC',
            numberOfPerson: 5,
            rolo: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            delete: false
        },
        {
            key: 6,
            stt: 6,
            groupName: 'Kế toán',
            numberOfPerson: 8,
            rolo: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            delete: false
        },
    ]
  return (
    <>
        <CustomTable columns={columns} dataSrouce={dataSource} heightProps={70} />
    </>
  )
}

export default TabIndex2