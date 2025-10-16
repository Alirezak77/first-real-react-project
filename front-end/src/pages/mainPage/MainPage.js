import React from 'react'
import './MainPage.css'
import Header from '../../components/header/Header'
import LastCourses from '../../components/last-courses/LastCourses'
import AboutUs from '../../components/about-us/AboutUs'
import PopularCourses from '../../components/popular-courses/PopularCourses'
import PreSellCourses from '../../components/pre-sell-courses/PreSellCourses'
import LasrArticles from '../../components/last-articles/LasrArticles'
import Footer from '../../components/footer/Footer'

export default function MainPage() {
  return (
    <div>
      <Header/>
      <LastCourses/>
      <AboutUs/>
      <PopularCourses/>
      <PreSellCourses/>
      <LasrArticles/>
      <Footer/>
    </div>
  )
}
