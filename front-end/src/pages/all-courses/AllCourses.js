import React, { useEffect, useState } from "react";
import "./AllCourses.css";
import TopBar from "../../components/top-bar/TopBar";
import NavBar from "../../components/nav-bar/NavBar";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Footer from "../../components/footer/Footer";
import CoursBox from "../../components/cours-box/CoursBox";
import Pagenation from "../../components/pagenation/Pagenation";

export default function AllCourses() {
  const [allcourses, setAllCourses]= useState([])
  const [showCourses, setShowCourses]=useState([])
  useEffect(()=>{
    fetch(`http://localhost:4000/v1/courses`).then(res=>res.json()).then(courses=> setAllCourses(courses))
  },[])



  return (
    <>
      <TopBar />
      <NavBar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "/" },
          { id: 1, title: "همه دوره ها", to: "/all-courses" },
        ]}
      />
      <div className="courses">
        <div className="container">
          <div className="row">
            {showCourses.map(course=>{
              return <CoursBox {...course}/>
            })}
          </div>
        </div>
      </div>

      <Pagenation 
      items={allcourses}
      itemCount={2}
      pathname={"/all-courses"}
      setShowCourses={setShowCourses}
      />

      <Footer />
    </>
  );
}
