import React, { useState } from 'react'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import Input from '../../../../components/Input'
import { message, Upload } from 'antd';
import Button from '../../../../components/Button';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import InputDate from '../../../../components/InputDate';
import { DataTypeContract } from '../../../../redux/slice/contractSlice';
import { useAppSelector } from '../../../../redux/store';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/configfb';
import { useNavigate } from 'react-router-dom';

const ContainerStyled = styled.div`
    width: 96%;
    left: 45px;
    position: fixed;
    & .content {
        overflow: auto;
        height: 80vh;
        &>div {
            display: flex;
            justify-content: space-between;
            width: 96%;

            
            & .info {
                & h5 {
                    min-width: 170px;
                }
            }
        }
       
        &>div:first-child {
            border-bottom: 1px solid gray;
            margin-bottom: 40px;
            padding-bottom: 30px;
        }
        & h4 {
            color: #FFAC69;
        }


        & span {
           display: flex;
           margin: 10px;
           & h5 {
            display: flex;
            align-items: center;
            min-width: 130px;
           }
            & p {
               padding-right: 10px;
            }
            
            & i {
                color: #FF4747;
            }
            & textarea {
                width: 217px; 
                height: 80px;
                color: var(--white);
                font-family: 'Montserrat';
                border: none;
                border-radius: 8px;
                padding: 7px 0 0 7px;
                background: #33334D;
            }

            & .h5-special {
                display: flex;
                align-items: center;
                height: 58px;
            }
        }
        & .btn {
            display: flex;
            justify-content: center;
        }
        

    }
`

type royalties = {
    coppyRight: number,
    perform: number,
    producer: number
}


function AddContractPage() {
    const { contracts } = useAppSelector(state => state.contracts)
    const navigate = useNavigate();

    const [ newContract, setNewContract ] = useState<DataTypeContract>({
        key: contracts.length + 1,
        contractID: '',
        contractName: '',
        fullName: '',
        authorizedPerson: '',
        accountNumber: '',
        bank: '',
        birthDay: '',
        email: '',
        role: 'Người biểu diễn',
        sex: 1,
        startDay: '',
        status: '',
        userName: '',
        nationality: '',
        numberPhone: '',
        pasword: '',
        personID: '',
        date: '',
        place: '',
        taxID: 0,
        address: '',
    });

    const handleChangeSetValueNewContract = (e: any) => {
        const name = e.name;
        const value = e.value;

        setNewContract({
            ...newContract,
            [name]: value
        })

    }

    const onChangeRadio = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        setNewContract({
            ...newContract,
            [name]: value
        })
    }
   
    const handleChangeTextArea = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setNewContract({
            ...newContract,
            [name]: value
        })
    }

    const handleClickUpdateContract = async () => {

        const docRef = doc(collection(db, "contract"))
        try {
            await setDoc(docRef, newContract);
            navigate('../contract');
            message.success("Thêm hợp đồng thành công")
        } catch(err) {
            message.error("Thêm hợp đồng thất bại")            
        }
    }


    const handleChangeDateInput = (e: any) => {
        const name = e.name;
        const value = e.value;

        setNewContract({
            ...newContract,
            [name]: value
        })
    }
    const breadcrumb = [
        {
          key: 1,
          path: '',
          namePage: 'Quản lý'
        },
        {
          key: 2,
          path: '../contract',
          namePage: 'Quản lý hợp đồng'
        },
        {
          key: 3,
          path: '',
          namePage: 'Thêm hợp đồng'
        }
      ]
  return (
    <ContainerStyled>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Thêm hợp đồng ủy quyền mới</h3>
        </div>
        <div className='content'>
            <div>
                <div>
                    <span>
                        <h5>Số hợp đồng:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="contractID"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Tên hợp đồng:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="contractName" 
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Ngày hiệu lực:<i>*</i></h5>
                        <InputDate width={220} name="startDay" onChange={handleChangeDateInput} />
                    </span>
                    <span>
                        <h5>Ngày hết hạn:<i>*</i></h5>
                        <InputDate width={220} name="date" onChange={handleChangeDateInput} />
                    </span>
                </div>
                <div>
                    <span>
                        <h5 className='h5-special'>Đính kèm tệp:</h5>
                        <div style={{display: 'block'}}>
                            <Upload>
                                <Button heightProps={35} widthProps={120} type='primary' contentProps='Upload' icon={<UploadOutlined />} />
                            </Upload>
                        </div>
                    </span>      
                </div>
                <div>
                    <h4 style={{color: '#FFAC69'}}>Mức nhuận bút</h4>
                    <span>
                        <h5>Quyền tác giả:</h5>
                        <p>0%</p>
                    </span>
                    <span>
                        <h5>Quyền liên quan:</h5>
                    </span>
                    <span>
                        <p>Quyền của người biểu diễn:</p>
                        <p>50%</p>
                    </span>
                    <span>
                        <p>Quyền của nhà sản xuất:</p>
                        <p>50%</p>
                    </span>
                </div>
            </div>
            <div>
                <div className='info'>
                    <h4>Thông tin pháp nhân uỷ quyền</h4>
                    <span>
                        <h5>Pháp nhân ủy quyền:</h5>
                        
                        <form action="">
                            <input 
                                type="radio" 
                                value="person" 
                                name="authorizedPerson" 
                                id='person'
                                onChange={onChangeRadio}
                            />
                            <label htmlFor="person">Cá nhân</label>
                            <input 
                                type="radio" 
                                value="organization" 
                                name="authorizedPerson" 
                                id='organization'
                                onChange={onChangeRadio}
                            /> 
                            <label htmlFor="organization"> Tổ chức</label>
                        </form>
                    </span>
                    <span>
                        <h5>Tên người uỷ quyền:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35}  
                            name="fullName"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Mã số thuế:</h5>
                        <Input 
                            type='number' 
                            width={220} 
                            height={35} 
                            name="taxID"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    
                    <span>
                        <h5>Số tài khoản:</h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="accountNumber"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Ngân hàng:</h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="bank"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Địa chỉ:</h5>
                        <textarea name='address' onChange={handleChangeTextArea} ></textarea>
                    </span>
                    
                </div>
                <div>
                    <span>
                        <h5>Người đại diện:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="fullName"
                            setValue={handleChangeSetValueNewContract}
                        />  
                    </span>
                    <span>
                        <h5>Ngày sinh:<i>*</i></h5>
                        <InputDate width={220} name="birthDay" onChange={handleChangeDateInput} />
                    </span>
                    <span>
                        <h5>Giới tính:<i>*</i></h5>
                        <form action="">
                            <input 
                                type="radio" 
                                value="1" 
                                name="sex" 
                                onChange={onChangeRadio}
                            /> Nam
                            <input 
                                type="radio" 
                                value="0" 
                                name="sex" 
                                onChange={onChangeRadio}
                            /> Nữ
                        </form>
                    </span>
                    <span>
                        <h5>CMND/ CCCD:<i>*</i></h5>
                        <Input 
                            type='number' 
                            width={220} 
                            height={35} 
                            name="personID"
                            setValue={handleChangeSetValueNewContract}
                        />  
                    </span>
                    <span>
                        <h5>Ngày cấp:<i>*</i></h5>
                        <InputDate width={220} name="dateOfIssue"  onChange={handleChangeDateInput} />
                    </span>
                    <span>
                        <h5>Nơi cấp:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="place"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Quốc tịch:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="nationality"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                </div>
                <div>
                    <span>
                        <h5>Nơi cư trú:</h5>
                        <textarea />
                    </span>
                    <span>
                        <h5>Số điện thoại:</h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="numberPhone"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Email:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="email"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Tên đăng nhập:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="userName"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Mật khẩu:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="pasword"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                </div>
            </div>
            <div className='btn'>
                <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" />
                <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickUpdateContract}/>
            </div>
        </div>
    </ContainerStyled>
  )
}

export default AddContractPage