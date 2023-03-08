import React from 'react'
import { ColumnsType } from 'antd/es/table'
import FeatureInPage from '../../../../components/FeatureInPage'
import CustomTable from '../../../../components/Table'
import { FiUsers } from "react-icons/fi";

interface DataType {
    key: number,
    stt: number,
    groupName: string,
    numberOfPerson: number,
    role: string,
    description: string,
    update: string,
    del: boolean
}

function RoleUserTab() {

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
            key: 'role'
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
            render: (_, {del}) => {

                return <a>{del ? "Xóa" : ''}</a>
            }
        },
    ]
    const dataSource: DataType[] = [
        {
            key: 1,
            stt: 1,
            groupName: 'Super Admin',
            numberOfPerson: 1,
            role: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            del: false
        },
        {
            key: 2,
            stt: 2,
            groupName: 'Group Admin',
            numberOfPerson: 1,
            role: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            del: false
        },
        {
            key: 3,
            stt: 3,
            groupName: 'Sub - user',
            numberOfPerson: 6,
            role: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            del: false
        },
        {
            key: 4,
            stt: 4,
            groupName: 'Content manager',
            numberOfPerson: 33,
            role: 'Lisences',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            del: false
        },
        {
            key: 5,
            stt: 5,
            groupName: 'QC',
            numberOfPerson: 5,
            role: 'Lisences',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            del: false
        },
        {
            key: 6,
            stt: 6,
            groupName: 'Kế toán',
            numberOfPerson: 8,
            role: 'Lisences',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            update: 'Cập nhật',
            del: true
        },
    ]
    const featureProps = [
        {
            icon: FiUsers,
            text: "Thêm vai trò",
            unActive: true
        }
    ]
  return (
    <>
        <CustomTable columns={columns} dataSrouce={dataSource} heightProps={70} />
        <FeatureInPage featureProps={featureProps} />
    </>
  )
}

export default RoleUserTab