import { message } from 'antd'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { db } from '../../../../firebase/configfb'
import { updateDocConfig } from '../../../../hooks/updateDoc'

const ContainerStyled = styled.div`
    position: fixed;
    left: 45px;
    width: 100%;
    .content {
        display: flex;
        width: 80%;
        justify-content: space-between;
        & span {
            display: flex;
            margin: 8px 0;
            & h5 {
                display: flex;
                align-items: center;
                min-width: 160px;

                & i {
                    color: #FF4747;
                }
            }
        }
    }

    & .button {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
`
function DetailAuthorizedPartnerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ detailAuthorizedPartner, setDetailAuthorizedPartner ] = useState<any>(false);
    const [ updateAuthorizedPartner, setUpdateAuthorizedPartner ] = useState<any>()


    //get id in on firestore in detail page
    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "authorized-partner", `${id}`);
            try {
                //get a document follow uid
                await getDoc(docRef)            
                .then((res) => {
                    setDetailAuthorizedPartner(res.data())
                    setUpdateAuthorizedPartner(res.data())
                })
                
            } catch(err) {
                console.log(err);
            }
        }
        getData()
    }, [])

    const handleClickUpdateAuthorizedPartnerToFireStore = async () => {
        const params = {
            documentName: 'authorized-partner',
            id: id,
            data: updateAuthorizedPartner
        }
        
        const update = await updateDocConfig(params)

        if(update) {
            navigate(`../authorized-partner`);
            message.success("Cập nhật thông tin thành công")
        }
        else {
            message.error("Cập nhật thông tin thất bại")
        }
    }

    //onChange in Input component
    const handleChangeInputUpdateUser = (e: any) => {
        const name = e.name;
        const value = e.value;

        setUpdateAuthorizedPartner({
            ...updateAuthorizedPartner,
            [name]: value
        })
    }

    //handle radio status
    const onChangeRadio = (e: any) => {

    }
    
    const breadcrumb = [
        {
          key: 1,
          path: '',
          namePage: 'Quản lý'
        },
        {
          key: 2,
          path: '../authorized-partner',
          namePage: 'Đối tác uỷ quyền'
        },
        {
          key: 3,
          path: '',
          namePage: 'Cập nhật thông tin người dùng'
        }
      ]
  return (
    <>
        {detailAuthorizedPartner && <ContainerStyled>
            <div>
                <Breadcrumbs crumbs={breadcrumb} />
            </div>
            <div>
                <h3>Cập nhật thông tin</h3>
            </div>
            <div className='content'>
                <div>
                    <span>
                        <h5>Tên người dùng: <i>*</i></h5>
                        <Input 
                            type='text' 
                            width={300} 
                            value={detailAuthorizedPartner.fullName}  
                            name="fullName"
                            setValue={handleChangeInputUpdateUser}
                        />
                    </span>
                    <span>
                        <h5>Số điện thoại: <i>*</i></h5>
                        <Input 
                            type='text' 
                            width={300} 
                            value={detailAuthorizedPartner.numberPhone}  
                            name="numberPhone"
                            setValue={handleChangeInputUpdateUser}
                        />
                    </span>
                    <span>
                        <h5>Email: <i>*</i></h5>
                        <Input 
                            type='text' 
                            width={200} 
                            value={detailAuthorizedPartner.email} 
                            name="email"
                            setValue={handleChangeInputUpdateUser}
                        />
                    </span>
                    <span>
                        <h5>Vai trò: <i>*</i></h5>
                        <Input type='text' width={300} value="QA" />
                    </span>
                </div>
                <div>
                    <span>
                        <h5>Tên đăng nhập: <i>*</i></h5>
                        <Input 
                            type='text'
                            width={300} 
                            value={`${detailAuthorizedPartner.userName}`} 
                            name="userName"
                            setValue={handleChangeInputUpdateUser}
                        />
                    </span> 
                    <span>
                        <h5>Mật khẩu: <i>*</i></h5>
                        <Input 
                            type='password' 
                            width={300} 
                            value={'12345678'}
                        />
                    </span>
                    <span>
                        <h5>Nhập lại mật khẩu: <i>*</i></h5>
                        <Input type='password' width={300} value={'12345678'} />
                    </span>
                    <span>
                        <h5>Trạng thái: <i>*</i></h5>
                        <div>
                        <form action="">
                            <input 
                                type="radio" 
                                value="person" 
                                name="authorizedPerson" 
                                id='person'
                                onChange={onChangeRadio}
                                checked={detailAuthorizedPartner.status ? true : false}
                            />
                            <label htmlFor="person">Đã kích hoạt</label>
                            <input 
                                type="radio" 
                                value="organization" 
                                name="authorizedPerson" 
                                id='organization'
                                onChange={onChangeRadio}
                                checked={detailAuthorizedPartner.status ? false : true}
                            /> 
                            <label htmlFor="organization">Ngưng kích hoạt</label>
                        </form>
                        </div>
                    </span>
                </div>
            </div>
            <div className='button'>
                <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={() => navigate('../../manager/authorized-partner')} />
                <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickUpdateAuthorizedPartnerToFireStore}/>
            </div>
        </ContainerStyled>}
    </>
  )
}

export default DetailAuthorizedPartnerPage