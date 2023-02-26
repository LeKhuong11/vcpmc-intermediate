import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import root from '../login.module.scss'

function ResetPasswordPage() {
  const navigate = useNavigate();
    const handleChangeValueToLogin = () => {

    }

  return (
    <div className={root.resetPassword}>
        <div className={root.content}>
          <h3>Khôi phục mật khẩu</h3>
          <p>Vui lòng nhập địa chỉ email đã đăng ký để yêu cầu khôi phục mật khẩu</p>
          <form action="">
              <div>
                  <p>Tên đăng nhập: </p>
                  <Input width={471} type="email" setValue={handleChangeValueToLogin} name="email" />
              </div>
          </form>
          <div className={root.button}>
            <Button type='secondary' heightProps={56} widthProps={208} contentProps="Xác nhận" />
          </div>
          <div className={root.backToLogin}>
            <h5 onClick={() => navigate('..')}>Quay lại đăng nhập</h5>
          </div>
        </div>
    </div>
  )
}

export default ResetPasswordPage