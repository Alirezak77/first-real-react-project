import React, { useContext } from 'react'
import './SideBar.css'
import swal from 'sweetalert'
import AuthContex from '../../../contex/authContex'
import { Link, useNavigate } from 'react-router-dom'

export default function SaidBar() {

    const authContex = useContext(AuthContex)
    const navigate= useNavigate()


    const logOutUser = (event)=>{
        event.preventDefault()
        swal({
            title:'آیا از خارج شدن اطمینان دارید؟',
            icon:'warning',
            buttons:['خیر','بله']
        }).then(result=>{
            if(result){
                swal({
                    title:"با موفقیت خارج شدید",
                    icon:'success',
                    buttons:'تایید'
                }).then(()=>{
                    authContex.logout()
                    navigate('/')
                })
            }
        })
    }
  return (
    <div className='col-3'>
        <div className='sidebar'>
            <ul className='sidebar-ul'>
                <li className='sidebar-li'>
                    <a href="">جزییات حساب کاربری</a>
                </li>
                <li className='sidebar-li'>
                    <Link to={'courses'}>دوره های خریداری شده</Link>
                </li>
                <li className='sidebar-li'>
                    <a href="">تیکت های پشتیبانی</a>
                </li>
                <li className='sidebar-li' onClick={logOutUser}>
                    <a href="">خروج از حساب</a>
                </li>
            </ul>
        </div>
    </div>
  )
}
