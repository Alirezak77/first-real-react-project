import React from "react";
import "./AllCourses.css";
import TopBar from "../../components/top-bar/TopBar";
import NavBar from "../../components/nav-bar/NavBar";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Footer from "../../components/footer/Footer";
import CoursBox from "../../components/cours-box/CoursBox";
import Pagenation from "../../components/pagenation/Pagenation";

export default function AllCourses() {
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
            <CoursBox />
            <CoursBox />
            <CoursBox />
            <CoursBox />
            <CoursBox />
          </div>
        </div>
      </div>

      <Pagenation />

      <Footer />
    </>
  );
}
