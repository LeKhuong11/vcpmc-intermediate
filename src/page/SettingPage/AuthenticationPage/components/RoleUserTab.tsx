import React from 'react'
import { ColumnsType } from 'antd/es/table'
import FeatureInPage from '../../../../components/FeatureInPage'
import CustomTable from '../../../../components/Table'
import { FiUsers } from "react-icons/fi";
import { message } from 'antd';
import { useAppSelector } from '../../../../redux/store';

interface DataType {
    key: number,
    stt: number,
    groupName: string,
    numberOfPerson: number,
    role: string,
    description: string,
    del: boolean
}

function RoleUserTab() {
    const { user } = useAppSelector(state => state.user)
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
            render: (_, {}) => {

                return user.isAdmin ? <a>Chỉnh sửa</a> : ''
            }
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            render: (_, {del}) => {

                return user.isAdmin ? <a>{del ? "Xóa" : ''}</a> : ''
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
            del: false
        },
        {
            key: 2,
            stt: 2,
            groupName: 'Group Admin',
            numberOfPerson: 1,
            role: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            del: false
        },
        {
            key: 3,
            stt: 3,
            groupName: 'Sub - user',
            numberOfPerson: 6,
            role: 'System Admin',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            del: false
        },
        {
            key: 4,
            stt: 4,
            groupName: 'Content manager',
            numberOfPerson: 33,
            role: 'Lisences',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            del: false
        },
        {
            key: 5,
            stt: 5,
            groupName: 'QC',
            numberOfPerson: 5,
            role: 'Lisences',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            del: false
        },
        {
            key: 6,
            stt: 6,
            groupName: 'Kế toán',
            numberOfPerson: 8,
            role: 'Lisences',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            del: true
        },
    ]
    const featureProps = [
        {
            icon: FiUsers,
            text: "Thêm vai trò",
            event: () => {
                user.isAdmin || message.warning('Chức năng này chỉ dành cho người quản lý')
            },
            unActive: user.isAdmin ? false : true
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