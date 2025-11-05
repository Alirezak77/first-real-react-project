import React from 'react'
import './CoursBox.css'
import { Link } from 'react-router-dom'

export default function CoursBox(prop) {
  return (
    <div className='col-4' style={{width: `${prop.isSlider && '100%'}`}}>

        <div class="course-box">
                  <Link to= {`/course-info/${prop.shortName}`}>
                    <img src={prop.cover} alt="Course img" class="course-box__img" />
                  </Link>
                  <div class="course-box__main">
                    <Link to={`/course-info/${prop.shortName}`} class="course-box__title">{prop.name}</Link>

                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                        <a href="w" class="course-box__teacher-link">رضا دولتی</a>
                      </div>
                      <div class="course-box__rating">
                        <img src="/images/svgs/star.svg" alt="rating" class="course-box__star"/>
                        <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star"/>
                        <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star"/>
                        <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star"/>
                        <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star"/>
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users-icon"></i>
                        <span class="course-box__users-text">500</span>
                      </div>
                      <span class="course-box__price">{prop.price === 0 ? 'رایگان' : prop.price.toLocaleString() +' '+'تومان'}</span>
                    </div>
                  </div>

                  <div class="course-box__footer">
                    <Link to={`/course-info/${prop.shortName}`} class="course-box__footer-link">
                      مشاهده اطلاعات
                      <i class="fas fa-arrow-left course-box__footer-icon"></i>
                    </Link>
                  </div>

                </div>
    </div>
  )
}
