import React, { useEffect, useState } from "react";
import TopBar from "../../components/top-bar/TopBar";
import NavBar from "../../components/nav-bar/NavBar";
import Footer from "../../components/footer/Footer";
import CoursesHeader from "../../components/coureses-header/CoursesHeader";
import { useParams } from "react-router-dom";
import CoursBox from "../../components/cours-box/CoursBox";
import ArticleBox from "../../components/article-box/ArticleBox";

export default function Search() {
  const [resultCourses, setResultCourses] = useState([]);
  const [resultArticles, setResultArticles] = useState([]);
  const { value } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((result) => {
        setResultCourses(result.allResultCourses);
        setResultArticles(result.allResultArticles);
      });
  }, []);
  
  return (
    <>
      <TopBar />
      <NavBar />

      <div className="courses-content">
        <div className="container">
            <CoursesHeader title={'نتایج برای دوره ها'} desc={'سکوی پرتاپ شما به سمت موفقیت'}/>
          <div className="row">
            {resultCourses.length === 0 ? (
                <>
                <div className="alert alert-warning">دوره ایی ایی مطابق با جستجوی شما یافت نشد</div>
                </>
            ) : (
                <>
                {resultCourses.map(course =>{
                   return <CoursBox {...course} key={course._id}/>
                })}
                </>
            )}

          </div>
          <CoursesHeader title={'نتایج برای مقاله ها'} desc={'پیش به سوی ارتقای دانش'}/>
          <div className="row">
            {resultArticles.length===0 ? (
                <><div className="alert alert-warning">نتیجه ایی برای مقاله ها یافت نشد</div></>
            ) : (
                <>{
                    resultArticles.map(article=>{
                      return  <ArticleBox {...article} key={article._id}/>
                    })
                }</>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
