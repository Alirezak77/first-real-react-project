import React, { useEffect, useState } from "react";
import "./Category.css";
import NavBar from "../../components/nav-bar/NavBar";
import TopBar from "../../components/top-bar/TopBar";
import Footer from "../../components/footer/Footer";
import CoursBox from "../../components/cours-box/CoursBox";
import Pagenation from "../../components/pagenation/Pagenation";
import { useParams } from "react-router-dom";

export default function Category() {
  const [courses, setCourses] = useState([]);
  const { categoryName } = useParams();
  const [showCourses, setShowCourses]=useState([])
  const [status , setStatus]= useState('default')
  const [orderedCourses , setOrderedCourses]=useState([])
  const [statusTitle , setStatusTitle] = useState('مرتب سازی پیش فرض')




  useEffect(() => {
    if (categoryName) {
      fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
        .then((res) => {
          // اگر سرور 404 برگرداند، خطا نمی‌دهد، بلکه یک پاسخ با پیغام می‌دهد.
          if (!res.ok) {
            throw new Error("Server response not OK");
          }
          return res.json();
        })
        .then((course) => {
          console.log(course);
          setCourses(course);
        })
        .catch((error) => {
          console.error("Fetching category courses failed:", error);
          setCourses([]); // در صورت خطا، لیست دوره‌ها خالی شود
        });
    }
  }, [categoryName]);

  useEffect(()=>{
    let coursesToSort = [...courses]
    const filteredCourse = coursesToSort.filter(course=> Number(course.price) > 0)
  switch(status){
    case 'free' : {
      const freeCourses= coursesToSort.filter(course=> course.price === 0)
      setOrderedCourses(freeCourses)
      break
    }
    case 'first' : {
      const firstCourses = coursesToSort.reverse()
      setOrderedCourses(firstCourses)
      break
    }
    case 'last' : {
      setOrderedCourses(courses)
      break
    }
    case 'cheap' :{
      const cheapSort = filteredCourse.sort((a , b)=>
        Number(a.price) - Number(b.price)
      )
      setOrderedCourses(cheapSort)
      break
    }
    case 'expensive' : {
      
      const expensiveCourse = filteredCourse.sort((a , b)=>
        Number(b.price) - Number(a.price)
      )
      setOrderedCourses(expensiveCourse)
      break
    }
    default: {
      setOrderedCourses(courses)
    }
  }
},[status , courses , categoryName])

const statusTitleHandler = (event)=>{
    setStatusTitle(event.target.textContent)

}

  return (
    <div>
      <TopBar />
      <NavBar />
      <section class="courses">
        <div class="container">
          
        </div>
      </section>
      <div class="courses-content">
        <div class="container">
          <div class="row">
            {courses.length === 0 ? (
              <div className="alert alert-warning">
                هنوز هیچ دوره ایی برای این دسته بندی وجود ندارد
              </div>
            ) : (
              <>
                <div class="courses-top-bar">
                  <div class="courses-top-bar__right">
                    <div class="courses-top-bar__row-btn courses-top-bar__icon--active">
                      <i class="fas fa-border-all courses-top-bar__icon"></i>
                    </div>
                    <div class="courses-top-bar__column-btn">
                      <i class="fas fa-align-left courses-top-bar__icon"></i>
                    </div>

                    <div class="courses-top-bar__selection">
                      <span class="courses-top-bar__selection-title">
                        {statusTitle}
                        <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
                      </span>
                      <ul class="courses-top-bar__selection-list">
                        <li class="courses-top-bar__selection-item courses-top-bar__selection-item--active" onClick={(event)=>{setStatus('default')
                          statusTitleHandler(event)
                        }}>
                          مرتب سازی پیش فرض
                        </li>
                        <li class="courses-top-bar__selection-item" onClick={(event)=>{setStatus('free')
                          statusTitleHandler(event)
                        }}>
                          مرتب سازی بر اساس دوره های رایگان
                        </li>
                        <li class="courses-top-bar__selection-item" onClick={(event)=>{setStatus('first')
                          statusTitleHandler(event)
                        }}>
                          مرتب سازی بر اساس اولین دوره ها
                        </li>
                        <li class="courses-top-bar__selection-item" onClick={(event)=>{setStatus('last')
                          statusTitleHandler(event)
                        }}>
                          مرتب سازی بر اساس آخرین دوره ها
                        </li>
                        <li class="courses-top-bar__selection-item" onClick={(event)=>{setStatus('cheap')
                          statusTitleHandler(event)
                        }}>
                          مرتب سازی بر اساس ارزان ترین
                        </li>
                        <li class="courses-top-bar__selection-item" onClick={(event)=>{setStatus('expensive')
                          statusTitleHandler(event)
                        }}>
                          مرتب سازی بر اساس گران ترین
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="courses-top-bar__left">
                    <form action="#" class="courses-top-bar__form">
                      <input
                        type="text"
                        class="courses-top-bar__input"
                        placeholder="جستجوی دوره ..."
                      />
                      <i class="fas fa-search courses-top-bar__search-icon"></i>
                    </form>
                  </div>
                </div>
                {orderedCourses.map((course) => (
                  <CoursBox {...course} />
                ))}
                <Pagenation items={orderedCourses} itemCount={6} pathname={`/category-info/${categoryName}`} setShowCourses={setShowCourses}/>
              </>
            )}
          </div>
        </div>
      </div>
      

      <Footer />
    </div>
  );
}
