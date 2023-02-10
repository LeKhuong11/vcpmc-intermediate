import { Checkbox, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { RxDotFilled } from 'react-icons/rx'
import FeatureInPage from '../../../components/FeatureInPage'
import InputSearch from '../../../components/InputSearch'
import CustomTable from '../../../components/Table'
import root from '../manager.module.scss'

interface DataType {
    key: number,
    checkbox: any,
    stt: number,
    userRoot: string,
    contractID: string,
    admin: number,
    user: number,
    device: number,
    date: string,
    status: boolean,
    detail: string
}

function UnitUsedPage() {
    
    const dataSource: DataType[] = [
        {
            key: 1,
            checkbox: '',
            stt: 1,
            userRoot: 'Cty TNHH TM DV ABCEDEF',
            contractID: 'HD123',
            admin: 1,
            user: 21,
            device: 15,
            date: '21/04/2021',
            status: true,
            detail: 'Xem chi tiết'
        },
        {
            key: 2,
            checkbox: '',
            stt: 2,
            userRoot: 'Cty TNHH TM DV ABCEDEF',
            contractID: 'HD123',
            admin: 2,
            user: 21,
            device: 15,
            date: '21/04/2021',
            status: true,
            detail: 'Xem chi tiết'
        },
        {
            key: 3,
            checkbox: '',
            stt: 3,
            userRoot: 'Cty TNHH TM DV ABCEDEF',
            contractID: 'HD123',
            admin: 3,
            user: 21,
            device: 34,
            date: '21/04/2021',
            status: false,
            detail: 'Xem chi tiết'
        },
        {
            key: 4,
            checkbox: '',
            stt: 4,
            userRoot: 'Cty TNHH TM DV ABCEDEF',
            contractID: 'HD123',
            admin: 4,
            user: 21,
            device: 15,
            date: '21/04/2021',
            status: false,
            detail: 'Xem chi tiết'
        },
        {
            key: 5,
            checkbox: '',
            stt: 5,
            userRoot: 'Cty TNHH TM DV ABCEDEF',
            contractID: 'HD123',
            admin: 5,
            user: 21,
            device: 15,
            date: '21/04/2021',
            status: true,
            detail: 'Xem chi tiết'
        },
        {
            key: 6,
            checkbox: '',
            stt: 6,
            userRoot: 'Cty TNHH TM DV ABCEDEF',
            contractID: 'HD123',
            admin: 6,
            user: 21,
            device: 15,
            date: '21/04/2021',
            status: true,
            detail: 'Xem chi tiết'
        },
        {
            key: 7,
            checkbox: '',
            stt: 7,
            userRoot: 'Cty TNHH TM DV ABCEDEF',
            contractID: 'HD123',
            admin: 7,
            user: 21,
            device: 15,
            date: '21/04/2021',
            status: true,
            detail: 'Xem chi tiết'
        },
        {
            key: 8,
            checkbox: '',
            stt: 8,
            userRoot: 'Cty TNHH TM DV ABCEDEF',
            contractID: 'HD123',
            admin: 1,
            user: 21,
            device: 15,
            date: '21/04/2021',
            status: false,
            detail: 'Xem chi tiết'
        },
    ]
    const columns: ColumnsType<DataType> = [
        {
            title: '',
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (_, ) => {

                return <Checkbox />
              }
        },
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Tên tài khoản quản trị',
            dataIndex: 'userRoot',
            key: 'userRoot'
        },
        {
            title: 'Số hợp đồng',
            dataIndex: 'contractID',
            key: 'contractID'
        },
        {
            title: 'Admin',
            dataIndex: 'admin',
            key: 'admin',
            render: (_, {admin}) => (
                <p>Admin {admin}</p>
            )
        },
        {
            title: 'Người dùng',
            dataIndex: 'user',
            key: 'user'
        },
        {
            title: 'Thiết bị được chỉ định',
            dataIndex: 'device',
            key: 'device'
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, {status}) => (
                <>
                  {status ? 
                    <p><Switch defaultChecked />Đang kích hoạt</p> : 
                    <p><Switch />Ngừng kích hoạt</p> }
                </>
            )
        },
        {
            title: '',
            dataIndex: 'detail',
            key: 'detail',
            render: (_, {detail}) => (
                <a>{detail}</a>
            )
        },
    ]

    const featureProps = [
        {
            icon: FaTimes,
            text: 'Xóa'
        }
    ]
  return (
    <div className={root.unitUsed}>
        <h3>Đơn vị sử dụng</h3>
        <div>
            <InputSearch placehoder='Tài khoản giá trị, số hợp đồng,...' />
        </div>
        <div>
            <CustomTable columns={columns} dataSrouce={dataSource} heightProps={70} />
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default UnitUsedPage