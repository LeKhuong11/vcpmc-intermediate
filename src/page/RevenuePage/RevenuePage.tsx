import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import root from './revenue.module.scss'

function RevenuePage() {
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate('history-for-control')
    }, [])

  return (
    <div className={root.revenue}>
        <Outlet />
    </div>
  )
}

export default RevenuePage