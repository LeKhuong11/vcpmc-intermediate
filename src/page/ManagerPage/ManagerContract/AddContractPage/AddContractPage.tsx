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
        role: 'Ng?????i bi???u di???n',
        sex: 1,
        startDay: '',
        status: 'new',
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

    const handleClickAddContract = async () => {

        const docRef = doc(collection(db, "contract"))
        try {
            await setDoc(docRef, newContract);
            navigate('../contract');
            message.success("Th??m h???p ?????ng th??nh c??ng")
        } catch(err) {
            message.error("Th??m h???p ?????ng th???t b???i")            
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
          namePage: 'Qu???n l??'
        },
        {
          key: 2,
          path: '../contract',
          namePage: 'Qu???n l?? h???p ?????ng'
        },
        {
          key: 3,
          path: '',
          namePage: 'Th??m h???p ?????ng'
        }
      ]
  return (
    <ContainerStyled>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Th??m h???p ?????ng ???y quy???n m???i</h3>
        </div>
        <div className='content'>
            <div>
                <div>
                    <span>
                        <h5>S??? h???p ?????ng:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="contractID"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>T??n h???p ?????ng:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="contractName" 
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Ng??y hi???u l???c:<i>*</i></h5>
                        <InputDate width={220} name="startDay" onChange={handleChangeDateInput} />
                    </span>
                    <span>
                        <h5>Ng??y h???t h???n:<i>*</i></h5>
                        <InputDate width={220} name="date" onChange={handleChangeDateInput} />
                    </span>
                </div>
                <div>
                    <span>
                        <h5 className='h5-special'>????nh k??m t???p:</h5>
                        <div style={{display: 'block'}}>
                            <Upload>
                                <Button heightProps={35} widthProps={120} type='primary' contentProps='Upload' icon={<UploadOutlined />} />
                            </Upload>
                        </div>
                    </span>      
                </div>
                <div>
                    <h4 style={{color: '#FFAC69'}}>M???c nhu???n b??t</h4>
                    <span>
                        <h5>Quy???n t??c gi???:</h5>
                        <p>0%</p>
                    </span>
                    <span>
                        <h5>Quy???n li??n quan:</h5>
                    </span>
                    <span>
                        <p>Quy???n c???a ng?????i bi???u di???n:</p>
                        <p>50%</p>
                    </span>
                    <span>
                        <p>Quy???n c???a nh?? s???n xu???t:</p>
                        <p>50%</p>
                    </span>
                </div>
            </div>
            <div>
                <div className='info'>
                    <h4>Th??ng tin ph??p nh??n u??? quy???n</h4>
                    <span>
                        <h5>Ph??p nh??n ???y quy???n:</h5>
                        
                        <form action="">
                            <input 
                                type="radio" 
                                value="person" 
                                name="authorizedPerson" 
                                id='person'
                                onChange={onChangeRadio}
                            />
                            <label htmlFor="person">C?? nh??n</label>
                            <input 
                                type="radio" 
                                value="organization" 
                                name="authorizedPerson" 
                                id='organization'
                                onChange={onChangeRadio}
                            /> 
                            <label htmlFor="organization"> T??? ch???c</label>
                        </form>
                    </span>
                    <span>
                        <h5>T??n ng?????i u??? quy???n:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35}  
                            name="fullName"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>M?? s??? thu???:</h5>
                        <Input 
                            type='number' 
                            width={220} 
                            height={35} 
                            name="taxID"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    
                    <span>
                        <h5>S??? t??i kho???n:</h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="accountNumber"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Ng??n h??ng:</h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="bank"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>?????a ch???:</h5>
                        <textarea name='address' onChange={handleChangeTextArea} ></textarea>
                    </span>
                    
                </div>
                <div>
                    <span>
                        <h5>Ng?????i ?????i di???n:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="fullName"
                            setValue={handleChangeSetValueNewContract}
                        />  
                    </span>
                    <span>
                        <h5>Ng??y sinh:<i>*</i></h5>
                        <InputDate width={220} name="birthDay" onChange={handleChangeDateInput} />
                    </span>
                    <span>
                        <h5>Gi???i t??nh:<i>*</i></h5>
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
                            /> N???
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
                        <h5>Ng??y c???p:<i>*</i></h5>
                        <InputDate width={220} name="dateOfIssue"  onChange={handleChangeDateInput} />
                    </span>
                    <span>
                        <h5>N??i c???p:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="place"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>Qu???c t???ch:<i>*</i></h5>
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
                        <h5>N??i c?? tr??:</h5>
                        <textarea />
                    </span>
                    <span>
                        <h5>S??? ??i???n tho???i:</h5>
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
                        <h5>T??n ????ng nh???p:<i>*</i></h5>
                        <Input 
                            type='text' 
                            width={220} 
                            height={35} 
                            name="userName"
                            setValue={handleChangeSetValueNewContract}
                        />
                    </span>
                    <span>
                        <h5>M???t kh???u:<i>*</i></h5>
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
                <Button type='primary' heightProps={38} widthProps={148} contentProps="H???y" onClick={() => navigate('../contract')} />
                <Button type='secondary' heightProps={38} widthProps={148} contentProps="L??u" onClick={handleClickAddContract}/>
            </div>
        </div>
    </ContainerStyled>
  )
}

export default AddContractPage