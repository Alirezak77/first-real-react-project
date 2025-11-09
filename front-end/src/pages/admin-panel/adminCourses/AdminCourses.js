import React, { useEffect, useState } from "react";
import DataTable from "../../../components/admin-components/DataTable/DataTable";
import swal from "sweetalert";
import "./AdminCourses.css";
import { useForm } from "../../../hooks/useForm";
import InpoutComponent from "../../../components/inpout-component/InpoutComponent";
import {
  requiredValidator,
  maxValidator,
  minValidator,
} from "../../../validators/rules";


export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [categories, setCategories] = useState([]);
  const [courseCategory, setCourseCategory] = useState("");
  const [courseStatus, setCourseStatus]=useState('start')
  const [courseCover , setCourseCover]=useState({})
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCourses();
    getAllCategories();
  }, []);

  function getAllCategories() {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        console.log(allCategories);
        setCategories(allCategories);
      });
  }

  function getAllCourses() {
    fetch(`http://localhost:4000/v1/courses`, {
      headers: { Authorization: `Bearer ${localStorageData}` },
    })
      .then((res) => res.json())
      .then((courses) => {
        console.log(courses);
        setCourses(courses);
      });
  }

  const deleteCourse = (courseID) => {
    swal({
      title: "آیا از حذف این دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/courses/${courseID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorageData}` },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "دوره با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllCourses();
            });
          } else {
            swal({
              title: "در حذف دوره مشکلی پیش آمد",
              icon: "error",
              buttons: "تایید",
            });
          }
        });
      }
    });
  };

  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };

  const addNewCourse= (event)=>{
    event.preventDefault()
    
    
    let formData = new FormData()
    formData.append('name' , formState.inputs.name.value)
    formData.append('description' , formState.inputs.description.value)
    formData.append('shortName' , formState.inputs.shortName.value)
    formData.append('price' , formState.inputs.price.value)
    formData.append('support' , formState.inputs.support.value)
    formData.append('categoryID' , courseCategory)
    formData.append('status' , courseStatus)
    formData.append('cover' , courseCover)
console.log(courseCover);
    fetch(`http://localhost:4000/v1/courses` ,{
      method:'POST',
      headers:{'Authorization' : `Bearer ${localStorageData}`},
      body: formData
    }).then(res=>{
      if(res.ok){
        swal({
          title:'دوره جدید با موفقیت اضافه شد',
          icon:'success',
          buttons:'تایید'
        }).then(()=>{
          getAllCourses()
        })
      }
    })
  }
  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن محصول جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>
                <InpoutComponent
                  id="name"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(4)]}
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت دوره</label>
                <InpoutComponent
                id='price'
                  element='input'
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات دوره</label>
                <InpoutComponent
                id='description'
                element='input'
                onInputHandler={onInputHandler}
                validations={[minValidator(8)]}
                  type="text"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">پشتیبانی دوره</label>
                <InpoutComponent
                id='support'
                element='input'
                onInputHandler={onInputHandler}
                validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا پشتیبانی را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">url دوره</label>
                <InpoutComponent
                id='shortName'
                element='input'
                onInputHandler={onInputHandler}
                validations={[minValidator(4)]}
                  type="text"
                  placeholder="لطفا url محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس محصول</label>
                <input type="file" id="file" onChange={(event)=>{

                  setCourseCover(event.target.files[0])
                }}/>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={(event) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          checked
                          onInput={(event) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={addNewCourse} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دوره ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>

              <th>مبلغ</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>
                    {course.price === 0
                      ? "رایگان"
                      : course.price.toLocaleString() + " " + "تومان"}
                  </td>
                  <td>
                    {course.isComplete === 0 ? "در حال برگذاری" : "تکمیل شده"}
                  </td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger delete-btn"
                      onClick={() => {
                        deleteCourse(course._id);
                      }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
