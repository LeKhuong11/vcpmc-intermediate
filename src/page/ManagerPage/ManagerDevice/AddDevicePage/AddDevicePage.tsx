import { async } from '@firebase/util'
import { message } from 'antd'
import { collection, doc, setDoc } from 'firebase/firestore'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import InputDate from '../../../../components/InputDate'
import { db } from '../../../../firebase/configfb'
import { DataTypeDevice } from '../../../../redux/slice/deviceSlice'
import { useAppSelector } from '../../../../redux/store'


const ContainerStyled = styled.div`
    position: fixed;
    left: 45px;
    width: 100%;
    & .content {
        display: flex;
        width: 100%;
        &>div {
            width: 50%;
            margin-top: 30px;

            & span {
                margin: 8px;
                display: flex;
                
                & h5 {
                    display: flex;
                    align-items: center;
                    min-width: 150px;
                }
                
            }
        }
       
    }
    & .btn {
        display: flex;
        justify-content: center;
        margin-top: 35px;   
    }

`

function AddDevicePage() {
    const navigate = useNavigate()
    const { devices } = useAppSelector(state => state.devices)
    const [ newDevice, setNewDevice ] = useState<DataTypeDevice>({
        key: devices ? devices.length + 1 : 1,
        MacAddress: '',
        address: '',
        capacity: 0,
        duration: '',
        memory: '',
        nameDevice: '',
        password: '',
        sku: '',
        status: 'active',
        userName: '',
        time: '',
        desc: ''
    })

    const breadcrumb = [
        {
          key: 1,
          path: '',
          namePage: 'Danh sách thiết bị'
        },
        {
          key: 2,
          path: '../device',
          namePage: 'Chi tiết thiết bị'
        },
        {
          key: 3,
          path: '',
          namePage: 'Thêm thiết bị mới'
        }
      ]
    const handleChangeSetNewDevice = (e: any) => {
        const name = e.name;
        const value = e.value;

        setNewDevice({
            ...newDevice,
            [name]: value
        })
    }

    const handleChangeDateInput = (e: any) => {
        const name = e.name;
        const value = e.value;

        setNewDevice({
            ...newDevice,
            [name]: value
        })
    }

    const handleClickAddNewDeviceToDB = async () => {
        const docRef = doc(collection(db, "device"))
        try{
            await setDoc(docRef, newDevice)
                .then((res) => {
                    message.success("Thêm hợp đồng thành công")
                    navigate('../device')
                })
        } catch(err) {
            console.log(newDevice);
            
            message.error("Thêm hợp đồng thất bại")
        }
    }
    
  return (
    <ContainerStyled>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Thêm thiết bị mới</h3>
        </div>
        <div className='content'>
            <div>
                <span>
                    <h5>Tên thiết bị:</h5>
                    <Input width={280} height={35} type="text" name='nameDevice' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>SKU/ID:</h5>
                    <Input width={280} height={35} type="text" name='sku' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>Địa chỉ Mac:</h5>
                    <Input width={280} type="text" name='MacAddress' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>Thời hạn bảo hành:</h5>
                    <InputDate name='duration' width={200} onChange={handleChangeDateInput} />
                </span>
                <span>
                    <h5>Label:</h5>
                    <Input width={280} type="text" setValue={handleChangeSetNewDevice}  />
                </span>
                <span>
                    <h5>Thông tin:</h5>
                    <Input width={280} type="text" setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>Ghi chú: </h5>
                    <textarea name="" id="" cols={34} rows={4} onChange={(e) => setNewDevice({...newDevice, desc: e.target.value})}></textarea>
                </span>
                
            </div>
            <div>
                <span>
                    <h5>Memory:</h5>
                    <Input width={280} type="text" name='memory' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>Dung lượng:</h5>
                    <Input width={280} type="text" name='capacity' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>Tên đăng nhập:</h5>
                    <Input width={280} height={35} type="text" name='userName' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>Mật khẩu:</h5>
                    <Input width={280}  height={35} type="password" name='password' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>Nhập lại mật khẩu:</h5>
                    <Input width={280} type="password" name='' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>Vị trí:</h5>
                    <textarea name="" id="" cols={34} rows={4} onChange={(e) => setNewDevice({...newDevice, address: e.target.value})}></textarea>
                </span>
            </div>
        </div>
        <div className='btn'>
            <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={() => navigate("../device")} />
            <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickAddNewDeviceToDB} />
        </div>
    </ContainerStyled>
  )
}

export default AddDevicePage