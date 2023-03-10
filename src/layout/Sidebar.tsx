import React, {useState} from 'react'
import root from './Sidebar.module.scss'
import { FaWindowRestore } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SiGoogletagmanager } from "react-icons/si";
import { TbReportMoney } from "react-icons/tb";
import { MdPlaylistPlay } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import { MdContactSupport } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link, NavLink } from 'react-router-dom';
import { LogoSVG } from '../image/logo';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Sidebar() {
  const [ toggleSidebar, setToggleSidebar ] = useState(false)

  const handleClickToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar)
  }
  return (
    <div className={toggleSidebar ? `${root.sidebar} ${root.active}` : `${root.sidebar}`}>
      <div className={root.logo}>
        <LogoSVG />
      </div>
      <div className={root.menu}>
        
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
            <div>
              <NavLink to=""><SiGoogletagmanager /><p>Quản lý</p></NavLink>
            </div>
            <div className={root.dot}>
              <BiDotsVerticalRounded />
            </div>
            <div className={root.navigateChild}>
              <Link to="manager/contract">Quản lí hợp đồng</Link>
              <Link to="manager/device">Quản lí thiết bị</Link>
              <Link to="manager/authorized-partner">Đối tác uỷ quyền</Link>
              <Link to="manager/unit-used">Đơn vị sử dụng</Link>
            </div>
          </li>
          <li>
            <div>
              <TbReportMoney /><p>Doanh thu</p>
            </div>
            <div className={root.dot}>
              <BiDotsVerticalRounded />
            </div>
            <div className={root.navigateChild}>
              <Link to="revenue/report-revenue">Báo cáo doanh thu</Link>
              <Link to="revenue/revenue-distribution">Phân phối doanh thu</Link>
              <Link to="revenue/history-for-control">Lịch sử đối soát</Link>
            </div>
          </li>
          <li>
            <div>
              <SlSettings /><p>Cài đặt</p>
            </div>
            <div className={root.dot}>
              <BiDotsVerticalRounded />
            </div>
            <div className={root.navigateChild}>
              <Link to="setting/authentication">Phân quyền người dùng</Link>
              <Link to="setting/configuration">Cấu hình</Link>
              <Link to="setting/manager-contract">Quản lí hợp đồng</Link>
              <Link to="setting/edit-information">Thông tin tác phẩm</Link>
              <Link to="setting/cycle-for-control">Chu kì đối soát</Link>
            </div>
          </li>
          <li>
            <div>
              <MdContactSupport /><p>Hỗ trợ</p>
            </div>
            <div className={root.dot}>
              <BiDotsVerticalRounded />
            </div>
            <div className={root.navigateChild}>
              <Link to="support/user-manual">Hướng dẫn sử dụng</Link>
              <Link to="support/download">Tải app</Link>
              <Link to="support/feedback">Feedback</Link> 
            </div>
          </li>
        </ul>
      </div>
      <div className={root.btnClickToggleSidebar} onClick={handleClickToggleSidebar}>
        {toggleSidebar ? <IoIosArrowForward size={15} /> : <IoIosArrowBack size={15}/>}
        
      </div>
    </div>
  )
}

export default Sidebar