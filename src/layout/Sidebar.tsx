import React from 'react'
import './Sidebar.scss'
import { FaWindowRestore } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SiGoogletagmanager } from "react-icons/si";
import { TbReportMoney } from "react-icons/tb";
import { MdPlaylistPlay } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import { MdContactSupport } from "react-icons/md";
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='side-bar'>
      <div>
        <img src='' alt="" />
      </div>
      <div className='menu'>
        
        <ul>
          <li>
            <NavLink to="store"><FaWindowRestore /><p>Kho bản ghi</p></NavLink>
          </li>
          <li>
            <NavLink to='play-list'><MdPlaylistPlay /><p>Playlist</p></NavLink>
          </li>
          <li>
            <NavLink to='create-list'><FaRegCalendarAlt /><p>Lập lịch phát</p></NavLink>
          </li>
          <li>
            <NavLink to={'manager'}><SiGoogletagmanager /><p>Quản lý</p></NavLink>
          </li>
          <li>
            <NavLink to={'revenue'}><TbReportMoney /><p>Doanh thu</p></NavLink>
          </li>
          <li>
            <NavLink to={'setting'}><SlSettings /><p>Cài đặt</p></NavLink>
          </li>
          <li>
            <NavLink to={'support'}><MdContactSupport /><p>Hỗ trợ</p></NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar