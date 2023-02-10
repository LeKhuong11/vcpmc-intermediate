import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import root from './manager.module.scss'
import Breadcrumbs from '../../components/Breadcrumbs'

function ManagerPage() {
  const navigate = useNavigate();

    React.useEffect(() => {
        navigate('contract')
    }, [])
  
  return (
    <div className={root.managerPage}>
        <Breadcrumbs />
        
        <Outlet />
    </div>
  )
}

export default ManagerPage