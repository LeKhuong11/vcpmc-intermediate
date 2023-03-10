import { message } from 'antd'
import { useState, useEffect } from 'react'
import { FiUserX } from 'react-icons/fi'
import { RiKey2Line } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import Button from '../../../../components/Button'
import CustomDatePicker from '../../../../components/DatePicker'
import FeatureInPage from '../../../../components/FeatureInPage'
import Input from '../../../../components/Input'
import Loading from '../../../../components/Loading'
import CustomSelect from '../../../../components/Select'
import { getDocFireBase } from '../../../../hooks/getDoc'
import { updateDocConfig } from '../../../../hooks/updateDoc'
import { DataTypeUsers } from '../../../../redux/slice/listUserSlice'


const ContaierStyled = styled.div`
    position: fixed;
    left: 45px;
    height: 90vh;
    width: 100%;
    position: relatieve;

    & .content {
        display: flex;
        justify-content: space-between;
        width: 55%;

        & span {
            margin: 5px 0;
        }
        &>div {
            
            &>div {
                margin: 10px 0;
            }
        }

        & i {
            color: #FF4747;
        }

        & form {
            & label {
                margin-right: 15px;
            }
        }
    }

    & .btn {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;   
        bottom: 30px; 
    }
`

function EditInforUserPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ valueSelect, setValueSelect ] = useState('')
    const [ detailUser, setDetailUser ] = useState<DataTypeUsers>();
    const [ updateUser, setUpdateUser] = useState<any>(null);
    const [ loading, setLoding ] = useState(false)

    useEffect(() => {
        setLoding(true)
        const getData = async () => {
             const data: any = await getDocFireBase({id: id, name: 'user'})
             if(data) {
                setDetailUser(data)
                setLoding(false)
                setValueSelect(data?.role)
             }
        }
         
        getData();
     }, [])

    const handleChangeSetValueToAddUser = (e: any) => {
        const name = e.name;
        const value = e.value;

        setUpdateUser({
            ...updateUser,
            [name]: value
        })
    }

    const onChangeRadio = (e: any) => {
        const value = e.target.value;
        value === 'true' ? 
        setUpdateUser({
            ...updateUser,
            status: true
        }) : 
        setUpdateUser({
            ...updateUser,
            status: false
        })
    }

    const handleClickUpdateUser = async () => {
        if(updateUser) {
            const params = {
                documentName: 'user',
                id: id,
                data: updateUser
            }
            
            const updateDoc = await updateDocConfig(params)
            if(updateDoc) {
                message.success('Ch???nh s???a th??nh c??ng');
                navigate("../../setting/authentication")
                return 
            }
            message.error('Ch???nh s???a th???t b???i');
        }
        else {
            message.warning('B???n ch??a ch???nh s???a');
        }
    }

    const handleClickRemoveUser = async () => {
        // try {
        //     await deleteDoc(doc(db, "user", `${id}`));
        //     navigate('../../setting/authentication');
        //     message.success("X??a ng?????i d??ng th??nh c??ng")
        // } catch(err) {
        //     message.error("X??a ng?????i d??ng th???t b???i")            
        // }
    }
   
    
    const breadcrumb = [
        {
            key: 1 ,
            path: '',
            namePage: 'C??i ?????t' 
        },
        {
            key: 2,
            path: '../authentication',
            namePage: 'Ph??n quy???n ng?????i d??ng'
        },
        {
            key: 3,
            path: '',
            namePage: 'Ch???nh s???a'
        }
    ]

    const featureProps = [
        {
            icon: FiUserX,
            text: 'X??a ng?????i d??ng',
            event: handleClickRemoveUser,
            unActive: true
        },
        {
            icon: RiKey2Line,
            text: 'Kh??i ph???c m???t kh???u',
            unActive: true
        },
    ] 
    const select = {
        items: ['Group Admin', 'System Admin', 'Super Admin', 'Lisences', 'Account'],
        onChange: (value: string) => {
            setValueSelect(value)
            setUpdateUser({
                ...updateUser,
                role: value
            })
        }
    }
    
  return (
    <>
        {loading ? <Loading /> : 
            <ContaierStyled>
                <div>
                    <Breadcrumbs crumbs={breadcrumb} />
                </div>
                <div>
                    <h3>Ch???nh s???a th??ng tin ng?????i d??ng</h3>
                </div>
                <div className='content'>
                    <div>
                        <div>
                            <h5>T??n ng?????i d??ng:<i>*</i></h5>
                            <Input 
                                type='text'
                                width={330}
                                name="displayName"
                                setValue={handleChangeSetValueToAddUser}
                                value={detailUser?.displayName}
                            />
                        </div>
                        <div>
                            <h5>S??? ??i???n tho???i:</h5>
                            <Input 
                                type='text'
                                width={330}
                                name="phone"
                                setValue={handleChangeSetValueToAddUser}
                                value={detailUser?.phone}
                            />
                        </div>
                        <div>
                            <h5>Ng??y h???t h???n:</h5>
                            <CustomDatePicker />
                        </div>
                        <div>
                            <h5>Vai tr??:<i>*</i></h5>
                            <CustomSelect 
                                items={select.items}
                                onChange={select.onChange}
                                width={330}
                                value={valueSelect}
                            />
                        </div>
                        <p><i>*</i>l?? nh???ng tr?????ng th??ng tin b???t bu???c</p>
                    </div>
                    <div>
                        <div>
                            <h5>Email:<i>*</i></h5>
                            <Input 
                                type='text'
                                width={330}
                                name="email"
                                setValue={handleChangeSetValueToAddUser}
                                value={detailUser?.email}
                            />
                        </div>
                        <div>
                            <h5>T??n ????ng nh???p:<i>*</i></h5>
                            <Input 
                                type='text'
                                width={330}
                                name="userName"
                                setValue={handleChangeSetValueToAddUser}
                                value={detailUser?.userName}
                            />
                        </div>
                        <div>
                            <h5>M???t kh???u:<i>*</i></h5>
                            <Input 
                                type='password'
                                width={330}
                                name="password"
                                setValue={handleChangeSetValueToAddUser}
                                value={'password'}
                            />
                        </div>
                        <div>
                            <h5>Tr???ng th??i:<i>*</i></h5>
                            <form action="">
                                    <input 
                                        type="radio" 
                                        value="true" 
                                        name="status" 
                                        id='active'
                                        onChange={onChangeRadio}
                                        
                                    />
                                    <label htmlFor="active">??ang ho???t ?????ng</label>
                                    <input 
                                        type="radio" 
                                        value="false" 
                                        name="status" 
                                        id='unActive'
                                        onChange={onChangeRadio}
                                    /> 
                                    <label htmlFor="unActive"> Ng???ng ho???t ?????ng</label>
                                </form>
                        </div>
                    </div>
                </div>
                <div className='btn'>
                    <Button type='primary' heightProps={38} widthProps={148} contentProps="H???y" onClick={() => navigate(`../../setting/authentication`)} />
                    <Button type='secondary' heightProps={38} widthProps={148} contentProps="L??u" onClick={handleClickUpdateUser} />
                </div>
                <FeatureInPage featureProps={featureProps} />
            </ContaierStyled>
        }
    </>
  )
}

export default EditInforUserPage