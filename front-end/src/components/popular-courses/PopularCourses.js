import React , {useState , useEffect} from 'react'
import './PopularCourses.css'
import CoursesHeader from '../coureses-header/CoursesHeader'
import CoursBox from '../cours-box/CoursBox';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

export default function PopularCourses() {
  const [popularCourses, setPopularllCourses] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:4000/v1/courses`)
        .then((res) => res.json())
        .then((presell) => setPopularllCourses(presell));
    }, []);
  return (
    <div class="popular">
      <div class="container">
        <div className="row">
        <CoursesHeader title={"محبوب ترین دوره ها"} desc={'دوره های محبوب بر اساس نظر دانشجویان'}/>
          
          <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={2}
            pagination={{ clickable: true }}
            navigation = {true}
          >
            {popularCourses.map((presell) => {
              return (
                <SwiperSlide>
                  <CoursBox {...presell} isSlider={true} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      </div>
    
  )
}
