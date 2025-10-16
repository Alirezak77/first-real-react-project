import React from 'react'
import './TopBar.css'

export default function TopBar() {
  return (
    <div className='top_bar'>
        <div className='top_bar-tight'>
            <ul className='top_bar-tight-ul'>
                <li className='top_bar-tight-li'>
                    <a href="w" className='top_bar-link'>آموزش html</a>
                </li>
                <li className='top_bar-tight-li'>
                    <a href="w" className='top_bar-link'>آموزش css</a>
                </li>
                <li className='top_bar-tight-li'>
                    <a href="w" className='top_bar-link'>آموزش ریکت</a>
                </li>
                <li className='top_bar-tight-li'>
                    <a href="w" className='top_bar-link'>آموزش جاوا اسکریپت</a>
                </li>
                <li className='top_bar-tight-li'>
                    <a href="w" className='top_bar-link'>آموزش بوت استرپ</a>
                </li>
                <li className='top_bar-tight-li'>
                    <a href="w" className='top_bar-link'>آموزش پایتون</a>
                </li>
            </ul>
        </div>
        <div className='top_bar-left'>
            <div className='top_bar-left_email'>
                <a href="w" className='top_bar-left_email-text'>sabz.learn@gmail.com</a>
                <i class="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div className='top_bar-left_phone'>
                <a href="w" className='top_bar-left_phone-text'>09216944714</a>
                <i class="fas fa-phone top-bar__phone-icon"></i>
            </div>
        </div>
    </div>
  )
}
