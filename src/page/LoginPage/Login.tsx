import React from 'react'
import Input from '../../components/Input'
import root from './login.module.scss'
import { LogoSVG  } from '../../image/logo'
import Button from '../../components/Button'
import { Checkbox, MenuProps, message } from 'antd'
import DropDown from '../../components/DropDown'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  const handleClick = (e: any): void => {
    e.preventDefault();
    navigate('/store');
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

  return (
    <div className={root.login}>
        <div>
          <LogoSVG />
        </div>
        <h3>Đăng nhập</h3>
        <form action="">
          <div>
            <p>Tên đăng nhập: </p>
            <Input width={471} type="text" />
          </div>
          <div>
            <p>Password: </p>
            <Input width={471} type="password" />
          </div>
          <div>
            <Checkbox><p>Ghi nhớ đăng nhập</p></Checkbox>
          </div>
          <div className={root.formBtn}>
            <Button widthProps={208} contentProps="Đăng nhập" onClick={handleClick} />
          </div>
        </form>
        <div className={root.selectLanguage}>
          <DropDown menuProps={menuProps} />
        </div>
    </div>
  )
}

export default Login