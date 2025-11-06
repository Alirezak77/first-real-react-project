import React from 'react'
import './Index.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin-components/sidebar/SideBar'
import Topbar from '../../components/admin-components/top-bar/TopBar'

export default function index() {
  return (
    <>
    <div id='content'>
      <Sidebar/>
      <div id='home' className='col-10'>
        <Topbar/>
      </div>
    </div>

      <Outlet/>
    </>
  )
}
