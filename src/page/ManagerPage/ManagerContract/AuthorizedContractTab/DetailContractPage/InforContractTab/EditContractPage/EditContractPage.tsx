import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Breadcrumbs from '../../../../../../../components/Breadcrumbs'
import Input from '../../../../../../../components/Input'
import { DatePickerProps, message,Upload, UploadProps } from 'antd'
import Button from '../../../../../../../components/Button'
import { UploadOutlined } from '@ant-design/icons';
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../../../../firebase/configfb'
import Loading from '../../../../../../../components/Loading'
import { updateDocConfig } from '../../../../../../../hooks/updateDoc'
import InputDate from '../../../../../../../components/InputDate'

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
            width: 90%;

            
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

const props: UploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      
    ],
  };

function EditContractPage() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [radio, setRadio] = React.useState(1);
    const [ contract, setContract ] = useState<any>({})
    const [ loading, setLoading ] = useState(false);
    const [ contractUpdate, setConTractUpdate ] = useState<any>(contract)

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            const docRef = doc(db, "contract", `${id}`);
            try {
                //get a document follow uid
                await getDoc(docRef)            
                .then((res) => {
                    setContract(res.data())
                    setLoading(false)
                    setConTractUpdate(res.data())
                })
                
            } catch(err) {
                console.log(err);
            }
        }
        getData()
    }, [])

    const handleChangeSetValueNewContract = (e: any) => {
        setConTractUpdate({...contractUpdate, [e.name]: e.value})
    } 
    
    const handleChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(dateString);
      };

    const handleClickUpdateContract = async () => {
        const data = {
            documentName: 'contract',
            id: id,
            data: contractUpdate
        }
       const updating = await updateDocConfig(data)
        if(updating) {
            navigate(`../contract/detail-authorized-contract/${id}`)
            message.success("C???p nh???t th??nh c??ng")
            return
        }
        message.error("C???p nh???t th???t b???i")
    }

    const handleClickCancelEditContract = () => {
        navigate(`../contract/detail-authorized-contract/${id}`)
    }
    
    const onChangeRadio = (e: any) => {
        console.log('radio checked', e.target.value);
    };

    const handleChangeDateInput = (e: any) => {
        const name = e.name;
        const value = e.value;

        setConTractUpdate({
            ...contractUpdate,
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
          path: '../../manager/contract',
          namePage: 'Qu???n l?? h???p ?????ng'
        },
        {
          key: 3,
          path: `../contract/detail-authorized-contract/${id}`,
          namePage: 'Chi ti???t'
        },
        {
            key: 4,
            path: '',
            namePage: 'Ch???nh s???a th??ng tin'
        },
    ]

  return (
    <>
        {loading ? <Loading /> : 
            <ContainerStyled>
                <div>
                    <Breadcrumbs crumbs={breadcrumb} />
                </div>
                <div>
                    <h3>H???p ?????ng u??? quy???n b??i h??t - {contract.contractID}</h3>
                </div>
                <div className='content'>
                    <div>
                        <div>
                            <span>
                                <h5>S??? h???p ?????ng:</h5>
                                <Input 
                                    type='text' 
                                    width={220} 
                                    height={35} 
                                    value={`${contract.contractID}`}  
                                    name="contractID"
                                    setValue={handleChangeSetValueNewContract}
                                />
                            </span>
                            <span>
                                <h5>T??n h???p ?????ng:</h5>
                                <Input 
                                    type='text' 
                                    width={220} 
                                    height={35} 
                                    name="contractName" 
                                    value={contract.contractName}
                                    setValue={handleChangeSetValueNewContract}
                                />
                            </span>
                            <span>
                                <h5>Ng??y hi???u l???c:</h5>
                                <InputDate width={220} name="startDay" onChange={handleChangeDateInput} />
                            </span>
                            <span>
                                <h5>Ng??y h???t h???n:</h5>
                                <InputDate width={220} name="date" onChange={handleChangeDateInput} />
                            </span>
                            <span>
                                <h5>T??nh tr???ng:</h5>
                                <Input 
                                    type='text' 
                                    width={220} 
                                    height={35} 
                                    value={contract.status}
                                />
                            </span>
                        </div>
                        <div>
                            <span>
                                <h5 className='h5-special'>????nh k??m t???p:</h5>
                                <div style={{display: 'block'}}>
                                    <Upload {...props}>
                                        <Button heightProps={35} widthProps={120} type='primary' contentProps='Upload' icon={<UploadOutlined />} />
                                    </Upload>
                                    <p>hetthuongcannho.doc</p>
                                    <p>hetthuongcannho.doc</p>
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
                                        name="gender" 
                                        id='person'
                                        onChange={onChangeRadio}
                                        
                                    />
                                    <label htmlFor="person">C?? nh??n</label>
                                    <input 
                                        type="radio" 
                                        value="organization" 
                                        name="gender" 
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
                                    value={contract.fullName}  
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
                                        name="gender" 
                                        checked={contract.sex === 1 ? true : false} 
                                        onChange={onChangeRadio}
                                    /> Nam
                                    <input 
                                        type="radio" 
                                        value="0" 
                                        name="gender" 
                                        checked={contract.sex === 0 ? true : false} 
                                        onChange={onChangeRadio}
                                    /> N???
                                </form>
                            </span>
                            <span>
                                <h5>Qu???c t???ch:<i>*</i></h5>
                                <Input 
                                    type='text' 
                                    width={220} 
                                    height={35} 
                                    value={contract.nationality}  
                                    name="nationality"
                                    setValue={handleChangeSetValueNewContract}
                                />
                            </span>
                            <span>
                                <h5>S??? ??i???n tho???i:*</h5>
                                <Input 
                                    type='text' 
                                    width={220} 
                                    height={35} 
                                    value={contract.numberPhone}  
                                    name="numberPhone"
                                    setValue={handleChangeSetValueNewContract}
                                />
                            </span>
                        </div>
                        <div>
                            <span>
                                <h5>CMND/ CCCD:<i>*</i></h5>
                                <Input 
                                    type='number' 
                                    width={220} 
                                    height={35} 
                                    value={contract.personID} 
                                    name="personID"
                                    setValue={handleChangeSetValueNewContract}
                                />  
                            </span>
                            <span>
                                <h5>Ng??y c???p:<i>*</i></h5>
                                <InputDate width={220} name="dateOfIssue" onChange={handleChangeDateInput} />
                            </span>
                            <span>
                                <h5>N??i c???p:<i>*</i></h5>
                                <Input 
                                    type='text' 
                                    width={220} 
                                    height={35} 
                                    value={contract.place}  
                                    name="place"
                                    setValue={handleChangeSetValueNewContract}
                                />
                            </span>
                            <span>
                                <h5>M?? s??? thu???:</h5>
                                <Input 
                                    type='number' 
                                    width={220} 
                                    height={35} 
                                    value={contract.taxID}  
                                    name="taxID"
                                    setValue={handleChangeSetValueNewContract}
                                />
                            </span>
                            <span>
                                <h5>N??i c?? tr??:</h5>
                                <textarea 
                                    defaultValue={contract.address} 
                                    name='address'
                                    onChange={handleChangeSetValueNewContract}
                                />
                            </span>
                        </div>
                        <div>
                            <span>
                                <h5>Email:</h5>
                                <Input 
                                    type='text' 
                                    width={220} 
                                    height={35} 
                                    value={contract.email}  
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
                                    value={contract.userName}  
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
                                    value={contract.pasword}  
                                    name="pasword"
                                    setValue={handleChangeSetValueNewContract}
                                />
                            </span>
                            <span>
                                <h5>S??? t??i kho???n:</h5>
                                <Input 
                                    type='text' 
                                    width={220} 
                                    height={35} 
                                    value={contract.accountNumber}  
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
                                    value={contract.bank}  
                                    name="bank"
                                    setValue={handleChangeSetValueNewContract}
                                />
                            </span>
                        </div>
                    </div>
                    <div className='btn'>
                        <Button type='primary' heightProps={38} widthProps={148} contentProps="H???y" onClick={handleClickCancelEditContract} />
                        <Button type='secondary' heightProps={38} widthProps={148} contentProps="L??u" onClick={handleClickUpdateContract}/>
                    </div>
                </div>
            </ContainerStyled>    
        }
    </>
  )
}
 
export default EditContractPage