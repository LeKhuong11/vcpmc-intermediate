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
import { updateDocConfig } from '../../../../../../../hooks/useUpdateDoc'
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
            message.success("Cập nhật thành công")
            return
        }
        message.success("Cập nhật thất bạibại")
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
          namePage: 'Quản lý'
        },
        {
          key: 2,
          path: '../../manager/contract',
          namePage: 'Quản lý hợp đồng'
        },
        {
          key: 3,
          path: `../contract/detail-authorized-contract/${id}`,
          namePage: 'Chi tiết'
        },
        {
            key: 4,
            path: '',
            namePage: 'Chỉnh sửa thông tin'
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
                    <h3>Hợp đồng uỷ quyền bài hát - {contract.contractID}</h3>
                </div>
                <div className='content'>
                    <div>
                        <div>
                            <span>
                                <h5>Số hợp đồng:</h5>
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
                                <h5>Tên hợp đồng:</h5>
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
                                <h5>Ngày hiệu lực:</h5>
                                <InputDate width={220} name="startDay" onChange={handleChangeDateInput} />
                            </span>
                            <span>
                                <h5>Ngày hết hạn:</h5>
                                <InputDate width={220} name="date" onChange={handleChangeDateInput} />
                            </span>
                            <span>
                                <h5>Tình trạng:</h5>
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
                                <h5 className='h5-special'>Đính kèm tệp:</h5>
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
                                        name="gender" 
                                        id='person'
                                        onChange={onChangeRadio}
                                        
                                    />
                                    <label htmlFor="person">Cá nhân</label>
                                    <input 
                                        type="radio" 
                                        value="organization" 
                                        name="gender" 
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
                                    value={contract.fullName}  
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
                                    /> Nữ
                                </form>
                            </span>
                            <span>
                                <h5>Quốc tịch:<i>*</i></h5>
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
                                <h5>Số điện thoại:*</h5>
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
                                <h5>Ngày cấp:<i>*</i></h5>
                                <InputDate width={220} name="dateOfIssue" onChange={handleChangeDateInput} />
                            </span>
                            <span>
                                <h5>Nơi cấp:<i>*</i></h5>
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
                                <h5>Mã số thuế:</h5>
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
                                <h5>Nơi cư trú:</h5>
                                <textarea defaultValue={contract.address} />
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
                                <h5>Tên đăng nhập:<i>*</i></h5>
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
                                <h5>Mật khẩu:<i>*</i></h5>
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
                                <h5>Số tài khoản:</h5>
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
                                <h5>Ngân hàng:</h5>
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
                        <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={handleClickCancelEditContract} />
                        <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickUpdateContract}/>
                    </div>
                </div>
            </ContainerStyled>    
        }
    </>
  )
}
 
export default EditContractPage