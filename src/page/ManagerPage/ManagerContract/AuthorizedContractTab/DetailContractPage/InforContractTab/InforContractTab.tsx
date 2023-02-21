import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { GiNotebook } from 'react-icons/gi'
import { SlNote } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import FeatureInPage from '../../../../../../components/FeatureInPage'

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
            text: 'Hủy hợp đồng'
        },
    ]
  return (
    <ContainerStyled>
        <div>
            <div>
                <span>
                    <h5>Số hợp đồng:</h5>
                    <p>BH123</p>
                </span>
                <span>
                    <h5>Tên hợp đồng:</h5>
                    <p>Hợp đồng uỷ quyền tác phẩm âm nhạc</p>
                </span>
                <span>
                    <h5>Ngày hiệu lực:</h5>
                    <p>01/05/2021</p>
                </span>
                <span>
                    <h5>Ngày hết hạn:</h5>
                    <p>01/12/2021</p>
                </span>
                <span>
                    <h5>Tình trạng:</h5>
                    <p>Còn thời hạn</p>
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
                    <p>Cá nhân</p>
                </span>
                <span>
                    <h5>Tên người uỷ quyền:</h5>
                    <p>Nguyễn Văn A</p>
                </span>
                <span>
                    <h5>Ngày sinh:</h5>
                    <p>10/01/1984</p>
                </span>
                <span>
                    <h5>Giới tính:</h5>
                    <p>Nam</p>
                </span>
                <span>
                    <h5>Quốc tịch:</h5>
                    <p>Việt Nam</p>
                </span>
                <span>
                    <h5>Số điện thoại:</h5>
                    <p>(+84) 345 678 901</p>
                </span>
            </div>
            <div>
                <span>
                    <h5>Số CMND/ CCCD:</h5>
                    <p>123456789012</p>
                </span>
                <span>
                    <h5>Ngày cấp:</h5>
                    <p>10/07/2011</p>
                </span>
                <span>
                    <h5>Nơi cấp:</h5>
                    <p>Tp.HCM, Việt Nam</p>
                </span>
                <span>
                    <h5>Mã số thuế:</h5>
                    <p>Mã số thuế:</p>
                </span>
                <span>
                    <h5>Nơi cư trú:</h5>
                    <p>69/53, Nguyễn Gia Trí, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh</p>
                </span>
            </div>
            <div>
                <span>
                    <h5>Email:</h5>
                    <p>nguyenvana@gmail.com</p>
                </span>
                <span>
                    <h5>Tài khoản:</h5>
                    <p>nguyenvana@gmail.com</p>
                </span>
                <span>
                    <h5>Mật khẩu:</h5>
                    <p>*******</p>
                </span>
                <span>
                    <h5>Số tài khoản:</h5>
                    <p>1231123312211223</p>
                </span>
                <span>
                    <h5>Ngân hàng:</h5>
                    <p>ACB - Ngân hàng Á Châu</p>
                </span>
            </div>
        </div>
        <FeatureInPage featureProps={featureInPage} />
    </ContainerStyled>
  )
}

export default InforContractTab