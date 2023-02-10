import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import root from './setting.module.scss'


function SettingPage() {
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate('authentication')
    }, [])

  return (
    <div className={root.setting}>
        <Breadcrumbs />

        <Outlet />
    </div>
  )
}

export default SettingPage