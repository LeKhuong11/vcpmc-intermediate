import React from 'react'
import { Outlet } from 'react-router-dom'
import root from './manager.module.scss'
import Breadcrumbs from '../../components/Breadcrumbs'

function ManagerPage() {
  
  return (
    <div className={root.managerPage}>
        <Breadcrumbs />
        
        <Outlet />
    </div>
  )
}

export default ManagerPage