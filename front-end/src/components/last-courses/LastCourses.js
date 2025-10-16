import React from 'react'
import './LastCourses.css'
import CoursesHeader from '../coureses-header/CoursesHeader'
import CoursBox from '../cours-box/CoursBox'

export default function LastCourses() {
  return (
    <div class="courses">
      <div class="container">
        <CoursesHeader title={'جدید ترین دوره ها'} desc={'سکوی پرتاپ شما به سمت موفقیت'} btnTitle={'همه دوره ها'} btnHref={'all-courses'}/>
        <div className='row'>
          

           <CoursBox/> 
           <CoursBox/> 
           <CoursBox/> 
           <CoursBox/> 
           <CoursBox/> 
          
        </div>

        </div>
      </div>
    

    
  )
}
