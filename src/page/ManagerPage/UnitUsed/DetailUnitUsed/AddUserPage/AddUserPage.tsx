import { message } from 'antd';
import { collection, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import Button from '../../../../../components/Button';
import Input from '../../../../../components/Input';
import CustomSelect from '../../../../../components/Select';
import { getDocFireBase } from '../../../../../hooks/getDoc';
import { updateDocConfig } from '../../../../../hooks/updateDoc';
import {  DataTypeUser } from '../../../../../redux/slice/unitUsedSlice';



const ContainerStyled = styled.div`
    position: fixed;
    left: 45px;
    width: 100%;
    & .content {
        display: flex;
        justify-content: space-between;
        width: 75%;

        &>div {
            &>span {
                display: flex;
                margin: 7px 0;
                & h5 {
                    display: flex;
                    align-items: center;
                    min-width: 140px;
    
                    & i {
                        color: #FF4747;
                    }
                }
            }
        }
    }

    & .btn {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
`

function AddUserPageUnitUsed() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ currentUnitUsed, setCurrentUnitUsed ] = useState<any>();
    const [ addUser, setAddUser ] = useState<DataTypeUser>({
        key:  Math.floor(Math.random() * 10000),
        userName: '',
        email: '',
        fullName: '',
        password: '',
        role: '',
        status: true,
        update: '03/07/2021',
    });
    const [ valueSelect, setValueSelect ] = useState('Chọn vai trò')


    //khi load đầu tiên trang lấy danh sách user trên db
    useEffect(() => {
        const getData = async () => {
            const data: any = await getDocFireBase({id: id, name: 'unit-used'})
            if(data) {
                setCurrentUnitUsed(data)
            }
           }
            
           getData();
    }, [])

    const handleChangeSetUAddUser = (e: any) => {
        const name = e.name;
        const value = e.value;

        setAddUser({
            ...addUser,
            [name]: value
        })
    }

    const handleClickAddUser = async () => {
        //lấy danh sách user hiện tại trên db theo id unit-used, thêm user vừa nhập vào mảng user cũ
        //update lại listUser theo id vào firestore
        const newListUser = currentUnitUsed.listUser
        newListUser.push(addUser)
        
        const params = {
            documentName: 'unit-used',
            id: id,
            data: {
                listUser: newListUser
            }
        }

        const update = await updateDocConfig(params)
        if(update) {
            message.success("Thêm nguòi dùng thành công")
            navigate(`../unit-used/detail/${id}`)
        }
        else {
            message.error("Thêm nguòi dùng thất bại")
        }
        
    }

    const breadcrumb = [
        {
            key: 1 ,
            path: '',
            namePage: 'Quản lý' 
        },
        {
            key: 2,
            path: '../unit-used',
            namePage: 'Đơn vị sử dụng'
        },
        {
            key: 3,
            path: `../unit-used/detail/${id}`,
            namePage: 'Chi tiết'
        },
        {
            key: 4,
            path: '',
            namePage: 'Thêm người dùng'
        }
      ]

    const select = {
        items: ['QA', 'QC', 'Content Manager', 'Admin'],
        onChange: (value: string) => {
            setValueSelect(value)
            setAddUser({
                ...addUser,
                role: value
            })
        }
    }

  return (
    <ContainerStyled>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Thêm người dùng</h3>
        </div>
        <div className='content'>
            <div>
                <span>
                    <h5>Tên người dùng<i>*</i></h5>
                    <Input 
                        type='text' 
                        width={300} 
                        name="fullName"
                        setValue={handleChangeSetUAddUser}
                    />
                </span>
                <span>
                    <h5>Email<i>*</i></h5>
                    <Input 
                        type='email' 
                        width={300} 
                        name="email"
                        setValue={handleChangeSetUAddUser}
                    />
                </span>
                <span>
                    <h5>Vai trò<i>*</i></h5>
                    <CustomSelect 
                        value={valueSelect}
                        items={select.items}
                        onChange={select.onChange}
                        width={160}
                    />
                </span>
            </div>
            <div>
                <span>
                    <h5>Tên đăng nhập<i>*</i></h5>
                    <Input 
                        type='text' 
                        width={300} 
                        name="userName"
                        setValue={handleChangeSetUAddUser}
                    />
                </span>
                <span>
                    <h5>Mật khẩu<i>*</i></h5>
                    <Input 
                        type='password' 
                        width={300} 
                        name="password"
                        setValue={handleChangeSetUAddUser}
                    />
                </span>
                <span>
                    <h5>Nhập lại mật khẩu<i>*</i></h5>
                    <Input 
                        type='password' 
                        width={300}  
                        name="password"
                        setValue={handleChangeSetUAddUser}
                    />
                </span>
            </div>
        </div>
        <div className='btn'>
            <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={() => navigate(`../unit-used/detail/${id}`)} />
            <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickAddUser} />
        </div>
    </ContainerStyled>
  )
}

export default AddUserPageUnitUsed