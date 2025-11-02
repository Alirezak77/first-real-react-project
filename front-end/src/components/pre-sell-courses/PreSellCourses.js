import React, { useEffect, useState } from "react";
import "./PreSellCourses.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CoursesHeader from "../coureses-header/CoursesHeader";
import CoursBox from "../cours-box/CoursBox";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

export default function PreSellCourses() {
  const [presellCourses, setPresellCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((presell) => setPresellCourses(presell));
  }, []);
  return (
    <div class="presell">
      <div class="container">
        <div className="row">
          <CoursesHeader title={"دوره های در حال پیش فروش"} desc={""} />

          <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={2}
            pagination={{ clickable: true }}
            navigation = {true}
          >
            {presellCourses.map((presell) => {
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
  );
}
