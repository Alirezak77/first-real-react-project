import React, { useEffect, useState } from 'react'
import './LastCourses.css'
import CoursesHeader from '../coureses-header/CoursesHeader'
import CoursBox from '../cours-box/CoursBox'

export default function LastCourses() {
  const [allCourses , setAllCourses]= useState([])

  useEffect(()=>{
    const localStorageData= JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/courses` , {
      method: 'GET',
      headers: {Authorization: `Bearer ${localStorageData === null ? null : localStorageData}`,}
    }).then(res=> res.json()).then(courses=> setAllCourses(courses)
    )
    
    
  },[])

  return (
    <div class="courses">
      <div class="container">
        <CoursesHeader title={'جدید ترین دوره ها'} desc={'سکوی پرتاپ شما به سمت موفقیت'} btnTitle={'همه دوره ها'} btnHref={'all-courses'}/>
        <div className='row'>
          {allCourses.slice(0 , 6).map(course=>(
            <CoursBox {...course}/>
          ))}
          
        </div>

        </div>
      </div>
    

    
  )
}
