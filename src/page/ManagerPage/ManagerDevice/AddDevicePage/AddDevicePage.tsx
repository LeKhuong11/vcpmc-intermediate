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
let today: any = new Date();
    today = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();

function AddDevicePage() {
    const navigate = useNavigate()
    const { devices } = useAppSelector(state => state.devices)
    const [ newDevice, setNewDevice ] = useState<DataTypeDevice>({
        key: Math.floor(Math.random() * 10000),
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
        time: today,
        desc: ''
    })

    const breadcrumb = [
        {
          key: 1,
          path: '../device',
          namePage: 'Danh s??ch thi???t b???'
        },
        {
          key: 3,
          path: '',
          namePage: 'Th??m thi???t b??? m???i'
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
                    message.success("Th??m thi???t b??? th??nh c??ng")
                    navigate('../device')
                })
        } catch(err) {
            console.log(newDevice);
            
            message.error("Th??m thi???t b??? th???t b???i")
        }
    }
    
  return (
    <ContainerStyled>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Th??m thi???t b??? m???i</h3>
        </div>
        <div className='content'>
            <div>
                <span>
                    <h5>T??n thi???t b???:</h5>
                    <Input width={280} height={35} type="text" name='nameDevice' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>SKU/ID:</h5>
                    <Input width={280} height={35} type="text" name='sku' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>?????a ch??? Mac:</h5>
                    <Input width={280} type="text" name='MacAddress' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>Th???i h???n b???o h??nh:</h5>
                    <InputDate name='duration' width={200} onChange={handleChangeDateInput} />
                </span>
                <span>
                    <h5>Ghi ch??: </h5>
                    <textarea name="" id="" cols={34} rows={4} onChange={(e) => setNewDevice({...newDevice, desc: e.target.value})}></textarea>
                </span>
                
            </div>
            <div>
                <span>
                    <h5>Memory:</h5>
                    <Input width={280} type="text" name='memory' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>Dung l?????ng:</h5>
                    <Input width={280} type="text" name='capacity' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>T??n ????ng nh???p:</h5>
                    <Input width={280} height={35} type="text" name='userName' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>M???t kh???u:</h5>
                    <Input width={280}  height={35} type="password" name='password' setValue={handleChangeSetNewDevice} />
                </span>
                <span>
                    <h5>V??? tr??:</h5>
                    <textarea name="" id="" cols={34} rows={4} onChange={(e) => setNewDevice({...newDevice, address: e.target.value})}></textarea>
                </span>
            </div>
        </div>
        <div className='btn'>
            <Button type='primary' heightProps={38} widthProps={148} contentProps="H???y" onClick={() => navigate("../device")} />
            <Button type='secondary' heightProps={38} widthProps={148} contentProps="L??u" onClick={handleClickAddNewDeviceToDB} />
        </div>
    </ContainerStyled>
  )
}

export default AddDevicePage