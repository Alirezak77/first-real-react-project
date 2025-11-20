import React from 'react'
import './MainUser.css'
import NavBar from '../../components/nav-bar/NavBar'
import SaidBar from '../../components/user-panel/sidebar/SaidBar'

export default function MainUser() {
  return (
    <>
    <NavBar/>

    <section className='content'>
        <div className='content-header'>
            <div className='container'>
                <span className='content-header-title'>حساب کاربری من</span>
                <span className='content-header-subtitle'>پیشخوان</span>
            </div>
        </div>
        <div className='content-main'>
            <div className='container'>
                <div className='row'>
                    <SaidBar/>
                </div>
            </div>

        </div>
    </section>
    </>
  )
}
