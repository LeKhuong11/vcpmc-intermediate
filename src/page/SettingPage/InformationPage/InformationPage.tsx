import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Button from '../../../components/Button'
import FeatureInPage from '../../../components/FeatureInPage'
import Input from '../../../components/Input'
import Loading from '../../../components/Loading'
import CustomTable from '../../../components/Table'
import { usePaymentsCollection } from '../../../hooks/useSnapshot'
import root from '../setting.module.scss'
import { IUpdate, updateDocConfig } from '../../../hooks/updateDoc'
import { message } from 'antd'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useAppSelector } from '../../../redux/store'

interface IUpdateInforProduct {
    id?: string
    type: string
    desc: string
    key: number
}

function EditInformationPage() {
    const { user } = useAppSelector(state => state.user)
    const [ editingRow, setEditingRow ] = React.useState<any>('')
    const [ inforProducts, setInforProducts ] = useState<IUpdateInforProduct[]>([])
    const [ updateValue, setUpdateValue ] = React.useState<IUpdateInforProduct>({
        key: 0,
        type: '',
        desc: '',
        id: ''
    });
    const { payments, loading } = usePaymentsCollection('infor-products');
  
    //set lại dữ liệu ngay khi dữ liệu trên store thay đổi
    useEffect(() => {
        setInforProducts(payments)
    }, [payments])

    const handleChangeSetUpdateInforProduct = (e: any) => {
        const name = e.name;
        const value = e.value;

        setUpdateValue({
            ...updateValue,
            [name]: value
        })
    }

    const handleClickUpdateInforProduct = async () => {
        const params: IUpdate = {
            documentName: 'infor-products',
            //editingRow is the ID of the current line being editting
            id: editingRow,
            data: updateValue
        }

        const update = await updateDocConfig(params)
        if(update) {
            message.success('Cập nhật thành công')
            setEditingRow('')
            return 
        }
        message.error("Cập nhật thất bại")
    }

    const handleClickSetEditingRow = (items: any) => {
        if(user.isAdmin) {
            //if editting row === current key
            //show input
            setEditingRow(items.id)
            
            setUpdateValue({
                type: items.type,
                desc: items.desc,
                key: items.key,
            })
        }
    }


    const dataSource: IUpdateInforProduct[] = inforProducts

    const columns: ColumnsType<IUpdateInforProduct> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_, {}, index) => <p>{index + 1}</p>
        },
        {
            title: 'Tên thể loại',
            dataIndex: 'type',
            key: 'type',
            render: (_, items) => {

                if(editingRow === items.id){
                    return <form action="">
                        <Input 
                            type='text' 
                            width={123} 
                            name='type'
                            setValue={handleChangeSetUpdateInforProduct} 
                            value={items.type} 
                        />
                    </form>
                }
                else {
                    return <p onClick={() => handleClickSetEditingRow(items)}>{items.type}</p>
                }
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (_, items) => {
                if(editingRow === items.id){
                    return <form action="">
                        <Input 
                            type='text' 
                            width={700} 
                            name='desc'
                            setValue={handleChangeSetUpdateInforProduct} 
                            value={items.desc} 
                        />
                    </form>
                }
                else {
                    return <p onClick={() => handleClickSetEditingRow(items)}>{items.desc}</p>
                }
            }
        },
        
    ]
    const featureProps = [
        {
            icon: AiOutlinePlus,
            text: 'Thêm mới',
            event: () => {
                user.isAdmin || message.warning('Chức năng này chỉ dành cho người quản lý')
            },
            unActive:  user.isAdmin ? false : true
        }
    ]

    const breadcrumb = [
        {
          key: 1,
          path: '',
          namePage: 'Cài đặt'
        },
        {
          key: 2,
          path: '',
          namePage: 'Thông tin tác phẩm'
        }
      ]
  return (
    <>
        {loading ? <Loading /> : 
            <div className={root.editInformation}>
                <div>
                    <Breadcrumbs crumbs={breadcrumb} />
                </div>
                <h3>Thông tin tác phẩm</h3>
                <div>
                    <h4>Thể loại tác phẩm</h4>
                    <CustomTable dataSrouce={dataSource} columns={columns} heightProps={65} />
                </div>
                <div className={root.buttons}>
                    {editingRow ? 
                    <>
                        <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={() => setEditingRow('')}/>
                        <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickUpdateInforProduct}/>
                    </>: ''}
                </div>
                <FeatureInPage featureProps={featureProps} />
            </div>
        }
    </>
  )
}

export default EditInformationPage