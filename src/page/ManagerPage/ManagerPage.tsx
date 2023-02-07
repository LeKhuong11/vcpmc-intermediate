import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Authorized from './AuthorizedPartner/Authorized'
import root from './manager.module.scss'
import ManagerContract from './ManagerContract/ManagerContract'
import ManagerDevice from './ManagerDevice/ManagerDevice'


function ManagerPage() {
  return (
    <div className={root.managerPage}>
        Trang chu   &gt  root
        <Routes>
            <Route index path='manager/contract' element={<ManagerContract />} />
            <Route path='manager/device' element={<ManagerDevice />} />
            <Route path='manager/authorized-partner' element={<Authorized />} />
        </Routes>
    </div>
  )
}

export default ManagerPage