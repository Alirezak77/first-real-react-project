import React, { useEffect, useState } from "react";
import "./UserCourses.css";
import { Link } from "react-router-dom";

export default function UserCourses() {
  const localSrorageData = JSON.parse(localStorage.getItem("user"));
  const [registeredCourses, setRegisteredCourses] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/my-courses`, {
      headers: { Authorization: `Bearer ${localSrorageData}` },
    })
      .then((res) => res.json())
      .then((data) => setRegisteredCourses(data));
  }, []);
  return (
    <div className="col-9">
      <div className="courses">
        <div className="courses-header">
          <span className="course-header-text">دوره های خریداری شده</span>
        </div>
        {registeredCourses.map((course) => {
          return (
            <div className="main">
              <div className="row">
                <div className="col-12">
                  <div className="main-box">
                    <div className="main-box-right">
                      <Link to={`/course-info/${course.shortName}`} className="main-box-img-link">
                        <img src={course.cover} alt="" className="main-box-img" />
                      </Link>
                    </div>
                    <div className="main-box-left">
                      <Link to={`/course-info/${course.shortName}`} className="main-box-title">
                        {course.name}
                      </Link>
                      <div className="main-box-buttom">
                        <div className="main-box-all">
                          <span className="main-box-all-text">وضعیت :</span>
                          <span className="main-box-all-value">
                                {course.isCompleted === 1 ? 'تکمیل شده' :'درحال برگزاری'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
