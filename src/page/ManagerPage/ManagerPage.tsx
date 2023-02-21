import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import root from './manager.module.scss'

function ManagerPage() {
  const navigate = useNavigate();

    React.useEffect(() => {
        navigate('contract')
    }, [])

  
  return (
    <div className={root.managerPage}>
        <Outlet />
    </div>
  )
}

export default ManagerPage