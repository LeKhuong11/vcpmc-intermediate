import { Checkbox, message, Modal, Upload } from 'antd'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { GiNotebook } from 'react-icons/gi'
import { RxDotFilled } from 'react-icons/rx'
import { SlNote } from 'react-icons/sl'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../../../../../components/Button'
import FeatureInPage from '../../../../../../components/FeatureInPage'
import InputDate from '../../../../../../components/InputDate'
import Loading from '../../../../../../components/Loading'
import CustomModal from '../../../../../../components/Modal'
import { db } from '../../../../../../firebase/configfb'
import { updateDocConfig } from '../../../../../../hooks/useUpdateDoc'
import { UploadOutlined } from '@ant-design/icons';
import Input from '../../../../../../components/Input'

const ModalStyled = styled(Modal)`
    &&& {
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-modal  {
            left: -100px;
        }
        .ant-modal-content {
            background-color: #3E3E5B;
            height: 60vh;
            width: 800px;
        }
        .ant-modal-title {
            text-align: center;
            color: var(--white);
            background-color: #3E3E5B;
            font-size: 23px;
        }
        .ant-modal-footer {
            display: flex;
            justify-content: center;
        }
        .ant-btn {
            width: 100px;
            border: 1.5px solid var(--orange);
            color: var(--orange);
            background-color: #3E3E5B;
        }
        .ant-checkbox-wrapper {
            display: flex;
            align-items: center;
            margin-top: 4px;
        }
        .ant-btn-primary {
            background-color: var(--orange);
            color: var(--white);
        }
        & textarea {
            width: 100%;
            height: 120px;
            background-color: #2B2B3F;
            color: var(--white);
            border-radius: 8px;
            border: none;
            font-family: 'Montserrat';
            padding: 12px;
        }
    }
    & .contentModal {
        display: flex;

        &>div {
            width: 50%;
            &>div {
                margin-bottom: 20px;
            }
            & p {
                margin: 6px 0;
                display: flex;
                align-items: center;
            }

            & .date {
                display: flex;

                &>p {
                    margin-right: 10px;
                }
            }
            & .upload {
                display: flex;
                
                & h5 {
                    margin-right: 15px;
                }
            }
            & .checkbox-child {
                margin-left: 20px;
                border-left: 2px solid #727288; 
                padding: 7px;
            }
            & .royalties {
                display: flex;
            }
            & p {
                display: flex;
                align-items: center;
            }
        }
    }

`

const ContainerStyled = styled.div`
    width: 86%;
    &>div {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    &>div:nth-child(1) {
        & h5 {
            margin-right: 20px;
            min-width: 100px;
            font-size: 13px;
        }
    }
    &>div:nth-child(2) {
        margin-top: 60px;

        & h5 {
            margin-right: 20px;
            min-width: 110px;
            font-size: 13px;
        }
        & .authorized {
            & h5 {
                min-width: 150px;
            }
        }
    }
    & span {
        display: flex;
        padding-bottom: 7px;
        max-width: 350px;
       
        & p {
            display: flex;
            align-items: center;
            font-size: 13px;
        }
    }
`


function InforContractTab() {   
    const navigate = useNavigate();
    const { id } = useParams();
    const [ contract, setContract ] = useState<any>({})
    const [ loading, setLoading ] = useState(false)
    const [ openModalCancelContract, setOpenModalCancelContract ] = useState(false)
    const [ openModalContractExtension, setOpenModalContractExtension ] = useState(false)
    const [ cancelReason, setCancelReason ] = useState('');
    const [checked, setChecked] = useState(true);
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
                })
                
            } catch(err) {
                console.log(err);
            }
        }
        getData()
    }, [])
 
    const handleClickSetOpenModalCancelContract = () => {
        if(contract.status === 'canceled') {
            setOpenModalCancelContract(false)
            message.warning("Hợp đồng đã được hủy")
            return
        }
        setOpenModalCancelContract(true)
    }   

    const handleClickSetOpenModalContractExtension = () => {
        setOpenModalContractExtension(true)
    }
    
    const featureInPage = [
        {
            icon: SlNote,
            text: 'Chỉnh sửa hợp đồng',
            event: () => navigate('edit')
            
        },
        {
            icon: GiNotebook,
            text: 'Gia hạn hợp đồng',
            event: handleClickSetOpenModalContractExtension
        },
        {
            icon: FaTimes,
            text: 'Hủy hợp đồng',
            event: handleClickSetOpenModalCancelContract
        },
    ]

    const statusobj: any = {
        new: <p><RxDotFilled color="green" />Mới</p>,
        active: <p><RxDotFilled color="blue" />Còn thời hạn</p>,
        expired: <p><RxDotFilled color="gray" />Đã hết hạn</p>,
        canceled: <p><RxDotFilled color="red" />Đã hủy</p>
    }

    const handleOk = async () => {
        setOpenModalCancelContract(false);
        const status = {
            status: 'canceled',
            reason: cancelReason
        }
        const params = {
            documentName: 'contract',
            id: id,
            data: status
        }
        const updateDoc = await updateDocConfig(params)
        if(updateDoc) {
            navigate('../../manager/contract')
            message.success("Hủy hợp đồng thành công")
            return
        }
        message.success("Hủy hợp đồng thất bại")
    };
    
    const handleCancel = () => {
        setOpenModalCancelContract(false);
        setOpenModalContractExtension(false);
    };

    const handleClickUpdateContractExtension = () => {

    }
    
  return (
    <>
        {loading ? <Loading /> : 
            <ContainerStyled>
            <div>
                <div>
                    <span>
                        <h5>Số hợp đồng:</h5>
                        <p>{contract.contractID}</p>
                    </span>
                    <span>
                        <h5>Tên hợp đồng:</h5>
                        <p>{contract.contractName}</p>
                    </span>
                    <span>
                        <h5>Ngày hiệu lực:</h5>
                        <p>{contract.startDay}</p>
                    </span>
                    <span>
                        <h5>Ngày hết hạn:</h5>
                        <p>{contract.date}</p>
                    </span>
                    <span>
                        <h5>Tình trạng:</h5>
                        <p>{statusobj[contract.status]}</p>
                    </span>
                </div>
                <div>
                    <span>
                        <h5>Đính kèm tệp:</h5>
                        <div style={{display: 'block'}}>
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
                <div className='authorized'>
                    <h4 style={{color: '#FFAC69', marginTop: -30}}>Thông tin pháp nhân uỷ quyền</h4>
                    <span>
                        <h5>Pháp nhân uỷ quyền:</h5>
                        <p>{contract.authorizedPerson === 'person' ? 'Cá nhân' : 'Tổ chức'}</p>
                    </span>
                    <span>
                        <h5>Tên người uỷ quyền:</h5>
                        <p>{contract.fullName}</p>
                    </span>
                    <span>
                        <h5>Ngày sinh:</h5>
                        <p>{contract.birthDay}</p>
                    </span>
                    <span>
                        <h5>Giới tính:</h5>
                        <p>{contract.sex ? 'Nam' : 'Nữ'}</p>
                    </span>
                    <span>
                        <h5>Quốc tịch:</h5>
                        <p>{contract.nationality}</p>
                    </span>
                    <span>
                        <h5>Số điện thoại:</h5>
                        <p>{contract.numberPhone}</p>
                    </span>
                </div>
                <div>
                    <span>
                        <h5>Số CMND/ CCCD:</h5>
                        <p>{contract.personID}</p>
                    </span>
                    <span>
                        <h5>Ngày cấp:</h5>
                        <p>{contract.dateOfIssue}</p>
                    </span>
                    <span>
                        <h5>Nơi cấp:</h5>
                        <p>{contract.place}</p>
                    </span>
                    <span>
                        <h5>Mã số thuế:</h5>
                        <p>{contract.taxID}</p>
                    </span>
                    <span>
                        <h5>Nơi cư trú:</h5>
                        <p>{contract.address}</p>
                    </span>
                </div>
                <div>   
                    <span> 
                        <h5>Email:</h5>
                        <p>{contract.email}</p>
                    </span>
                    <span>
                        <h5>Tài khoản:</h5>
                        <p>{contract.userName}</p>
                    </span>
                    <span>
                        <h5>Mật khẩu:</h5>
                        <p>{contract.pasword}</p>
                    </span>
                    <span>
                        <h5>Số tài khoản:</h5>
                        <p>{contract.accountNumber}</p>
                    </span>
                    <span>
                        <h5>Ngân hàng:</h5>
                        <p>{contract.bank}</p>
                    </span>
                </div>
            </div>
            <FeatureInPage featureProps={featureInPage} />
            <CustomModal 
                title="Hủy hợp đồng ủy quyền"
                openModal={openModalCancelContract} 
                handleOk={handleOk} 
                handleCancel={handleCancel} 
                content={<textarea onChange={(e) => setCancelReason(e.target.value)} placeholder='Cho chúng tôi biết lý do bạn muốn huỷ hợp đồng uỷ quyền này...'></textarea>} 
            />
            <ModalStyled
                title="Gia hạn uỷ quyền tác phẩm"
                open={openModalContractExtension} 
                onOk={handleClickUpdateContractExtension} 
                onCancel={handleCancel} 
            >
                <div className='contentModal'>
                    <div>
                        <div>
                            <h5>Thời gian gia hạn<i>*</i></h5>
                            <p>Từ ngày: 02/08/2021</p>
                            <div className='date'>
                                <p>Đến ngày:</p> 
                                <InputDate width={120} name="date" onChange={() => {}} />
                            </div>
                            <p style={{fontSize: 12, color: '#FFD0AB'}}>Lưu ý: Thời gian bắt đầu gia hạn hợp đồng mới được tính sau ngày hết hạn hợp đồng cũ một ngày.</p>
                        </div>
                        <div className='upload'>
                            <h5 className='h5-special'>Đính kèm tệp:</h5>
                            <div style={{display: 'block'}}>
                                <Upload>
                                    <Button heightProps={35} widthProps={120} type='primary' contentProps='Upload' icon={<UploadOutlined />} />
                                </Upload>
                                <p>hetthuongcannho.doc</p>
                                <p>hetthuongcannho.doc</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5>Mức nhuận bút<i>*</i></h5>
                        <div className='royalties'>
                            <Checkbox onChange={() => {}}>
                                <p>Quyền tác giả </p>
                            </Checkbox>
                            <Input 
                                type='text' 
                                width={70} 
                                height={28} 
                                name="contractName" 
                            /><p>%</p>
                        </div>
                        <div>
                            <Checkbox onChange={() => {}}>
                                <p>Quyền liên quan: </p>
                            </Checkbox>
                            <div className='checkbox-child'>
                               <div className='royalties'>
                                    <Checkbox onChange={() => {}}>
                                        <p>Quyền của người biểu diễn</p>
                                    </Checkbox>
                                    <Input 
                                        type='text' 
                                        width={70} 
                                        height={28} 
                                        name="contractName" 
                                    /> <p>%</p>
                               </div>
                               <div className='royalties'>
                                    <Checkbox onChange={() => {}}>
                                        <p>Quyền của nhà sản xuất</p>
                                    </Checkbox>
                                    <Input 
                                        type='text' 
                                        width={70} 
                                        height={28} 
                                        name="contractName" 
                                    /> <p>%</p>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalStyled>
        </ContainerStyled>
        }
    </>
  )
}

export default InforContractTab