import { async } from '@firebase/util'
import { message, Modal } from 'antd'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { GiNotebook } from 'react-icons/gi'
import { RxDotFilled } from 'react-icons/rx'
import { SlNote } from 'react-icons/sl'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import FeatureInPage from '../../../../../../components/FeatureInPage'
import Loading from '../../../../../../components/Loading'
import { db } from '../../../../../../firebase/configfb'
import { updateDocConfig } from '../../../../../../hooks/useUpdateDoc'

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

const ModalStyled = styled(Modal)`
    &&& {
        .ant-modal-content {
            background-color: #3E3E5B;
            height: 40vh;
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
`

function InforContractTab() {   
    const navigate = useNavigate();
    const { id } = useParams();
    const [ contract, setContract ] = useState<any>({})
    const [ loading, setLoading ] = useState(false)
    const [ openModal, setOpenModal ] = useState(false)

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
 
    
    const featureInPage = [
        {
            icon: SlNote,
            text: 'Chỉnh sửa hợp đồng',
            event: () => navigate('edit')
            
        },
        {
            icon: GiNotebook,
            text: 'Gia hạn hợp đồng'
        },
        {
            icon: FaTimes,
            text: 'Hủy hợp đồng',
            event: () => setOpenModal(true)
        },
    ]

    const statusobj: any = {
        new: <p><RxDotFilled color="green" />Mới</p>,
        active: <p><RxDotFilled color="blue" />Còn thời hạn</p>,
        expired: <p><RxDotFilled color="gray" />Đã hết hạn</p>,
        canceled: <p><RxDotFilled color="red" />Đã hủy</p>
      }

      const handleOk = async () => {
        setOpenModal(false);
        const status = {
            status: 'canceled'
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
        setOpenModal(false);
    };
    
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
                        <p>{0}%</p>
                    </span>
                    <span>
                        <p>Quyền của nhà sản xuất:</p>
                        <p>  {0}%</p>
                    </span>
                </div>
            </div>
            <div>
                <div className='authorized'>
                    <h4 style={{color: '#FFAC69', marginTop: -30}}>Thông tin pháp nhân uỷ quyền</h4>
                    <span>
                        <h5>Pháp nhân uỷ quyền:</h5>
                        <p>{contract.authorizedPerson}</p>
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
                        <p>{contract.sex}</p>
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
            <ModalStyled
                title="Hủy hợp đồng khai thác"
                open={openModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <textarea placeholder='Cho chúng tôi biết lý do bạn muốn huỷ hợp đồng khai thác này...' />
            </ModalStyled>
        </ContainerStyled>
        }
    </>
  )
}

export default InforContractTab