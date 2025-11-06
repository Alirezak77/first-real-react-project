import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin-components/sidebar/SideBar'

export default function index() {
  return (
    <>
    <div id='content'>
      <Sidebar/>
    </div>
      <Outlet/>
    </>
  )
}
