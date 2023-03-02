import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import root from './login.module.scss'
import { LogoSVG  } from '../../image/logo'
import Button from '../../components/Button'
import { Checkbox, MenuProps, message } from 'antd'
import DropDown from '../../components/DropDown'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/configfb'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchUser } from '../../redux/slice/userSlice'
import { logIn } from '../../firebase/userAuth'

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [ login, setLogin ] = useState({
    email: '',
    password: ''
  });
  const [ error, setError ] = useState(false);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
   if(user) {
    navigate('/store')
   }
  }, [navigate])

  const handleClickLogin = async (e: any) => {
    e.preventDefault();
    
    try {
      await logIn(login.email, login.password)
      .then(res => {
          dispatch(fetchUser({uid: res.user.uid}))
          message.success("Đăng nhập thành công")
          navigate('/store');
        })
    } catch(error: any) {
      setError(true)
      message.error("Đăng nhập thất bại")
    }
  }

  const handleChangeValueToLogin = (e: any) => {
    const name: string = e.name;
    const value: string = e.value

    setLogin(prev => {
      return {
          ...login,
          [name]: value
      }
  })
  }

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1'
    },
    {
      label: '2nd menu item',
      key: '2'
    },
    {
      label: '3rd menu item',
      key: '3',
    },
    {
      label: '4rd menu item',
      key: '4',
    },
  ];
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleClickToForgotPasswordPage = () => {
    navigate("reset-password")
  }
  
  return (
    <div className={root.login}>
        <div>
          <LogoSVG />
        </div>
        {pathname === '/login/reset-password' ? <Outlet /> :
          <>
            <h3>Đăng nhập</h3>
            <form action="">
              <div>
                <p>Tên đăng nhập: </p>
                <Input width={471} type="text" setValue={handleChangeValueToLogin} name="email" />
              </div>
              <div>
                <p>Password: </p>
                <Input width={471} type="password" setValue={handleChangeValueToLogin} name="password"/>
              </div>
              {error && <p style={{color: '#FF4747', marginTop: 7}}>Sai tên đăng nhập hoặc mật khẩu</p>}
              <div>
                <Checkbox><p>Ghi nhớ đăng nhập</p></Checkbox>
              </div>
              <div className={root.formBtn}>
                <Button type='secondary' heightProps={56} widthProps={208} contentProps="Đăng nhập" onClick={handleClickLogin} />
              </div>
            </form>
            <div className={root.forgotPassword}>
              <h5 onClick={handleClickToForgotPasswordPage}>Quên mật khẩu?</h5>
            </div>
            <div className={root.selectLanguage}>
              <DropDown menuProps={menuProps} />
            </div>
          </>
        }
    </div>
  )
}

export default Login