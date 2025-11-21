import React from 'react'
import './SideBar.css'

export default function SaidBar() {
  return (
    <div className='col-3'>
        <div className='sidebar'>
            <ul className='sidebar-ul'>
                <li className='sidebar-li'>
                    <a href="">جزییات حساب کاربری</a>
                </li>
                <li className='sidebar-li'>
                    <a href="">دوره های خریداری شده</a>
                </li>
                <li className='sidebar-li'>
                    <a href="">تیکت های پشتیبانی</a>
                </li>
                <li className='sidebar-li'>
                    <a href="">خروج از حساب</a>
                </li>
            </ul>
        </div>
    </div>
  )
}
