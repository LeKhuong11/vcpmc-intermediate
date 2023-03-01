import { useState, useEffect } from 'react'
import { message, Modal, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FaTimes } from 'react-icons/fa'
import FeatureInPage from '../../../components/FeatureInPage'
import InputSearch from '../../../components/InputSearch'
import CustomTable from '../../../components/Table'
import root from '../manager.module.scss'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase/configfb'
import { DataTypeUnitUsed, fetchUnitUsed } from '../../../redux/slice/unitUsedSlice'
import { useAppDispatch } from '../../../redux/store'
import { Link } from 'react-router-dom'
import { usePaymentsCollection } from '../../../hooks/useSnapshot'
import Loading from '../../../components/Loading'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function UnitUsedPage() {
    const dispatch = useAppDispatch();
    const [ removeUnitUsed, setRemoveUnitUsed ] = useState<DataTypeUnitUsed[]>([])
    const { payments, loading } = usePaymentsCollection('unit-used');
    const [ listUnitUsed, setListUnitUsed ] = useState<DataTypeUnitUsed[]>(payments)


    useEffect(() => {
      dispatch(fetchUnitUsed())
      setListUnitUsed(payments)
    }, [payments])

    const handleClickRemoveDevice = () => {
        if(removeUnitUsed.length) {

            confirm({
                title: 'Xóa thiết bị',
                icon: <ExclamationCircleOutlined />,
                content: <p>Bạn có chắc chắn muốn xoá các thiết bị này? Hành động này không thể hoàn tác.</p>,
                onOk() {
                    //remove item by list id 
                    removeUnitUsed.forEach(async (item)   => {
                        const docRef = doc(db, 'unit-used', `${item.id}`)
                        await deleteDoc(docRef)
                    })
                },
                onCancel() {
                  console.log('Cancel');
                },
              });

         return
        }
        message.warning("Bạn chưa chọn đơn vị sử dụng")
    }

    const rowSelection = {
        onChange: (selectedRowKeys: number, selectedRows: any, ) => {
            setRemoveUnitUsed(selectedRows)
        }
    };

    
    const dataSource: DataTypeUnitUsed[] = listUnitUsed
    const columns: ColumnsType<DataTypeUnitUsed> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_, {}, index) => (
                <p>{index + 1}</p>
            )
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
            key: 'admin'
        },
        {
            title: 'Người dùng',
            dataIndex: 'userAmount',
            key: 'userAmount'
        },
        {
            title: 'Thiết bị được chỉ định',
            dataIndex: 'deviceAmount',
            key: 'deviceAmount'
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
            render: (_, {id}) => (
                <Link to={`detail/${id}`}>Xem chi tiết</Link>
            )
        },
    ]

    
    const featureProps = [
        {
            icon: FaTimes,
            text: 'Xóa', 
            event: handleClickRemoveDevice
        }
    ]
  return (
    <>
        {loading ? <Loading /> : 
            <div className={root.unitUsed}>
                <h3>Đơn vị sử dụng</h3>
                <div>
                    <InputSearch placehoder='Tài khoản giá trị, số hợp đồng,...' />
                </div>
                <div>
                    <CustomTable 
                        rowSelection={rowSelection} 
                        columns={columns} 
                        dataSrouce={dataSource} 
                        heightProps={70} 
                        pagination={{pageSize: 8}}
                    />
                </div>
                <FeatureInPage featureProps={featureProps} />
            </div>
        }
    </>
  )
}

export default UnitUsedPage