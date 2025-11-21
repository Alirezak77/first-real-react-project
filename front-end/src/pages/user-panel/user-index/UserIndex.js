import React from 'react'
import IndexBox from '../../../components/user-panel/index-box/IndexBox'

export default function UserIndex() {
  return (
    <div className='col-9'>
        <div className='main'>
            <div className='main-title'>
                <div className='main-title-text'>سلام علیرضا</div>
            </div>
            <p className='main-desc'>از طریق پیشخوان میتوانید جزییات حساب کاربری خود و دوره های خریداری شده را مشاهده کنید و یا اطلاعات حساب خود را ویرایش کنید </p>
            <div className='main-links'>
                <div className='row links'>
                    <IndexBox title={'سفارش'} href={'orders'}/>
                    <IndexBox title={'دوره های خریداری شده'} href={'courses'}/>
                    <IndexBox title={'جزییات حساب کاربری'} href={'detail'}/>
                    <IndexBox title={'تیکت های پشتیبانی'} href={'tikets'}/>
                </div>
            </div>
        </div>
    </div>
  )
}
