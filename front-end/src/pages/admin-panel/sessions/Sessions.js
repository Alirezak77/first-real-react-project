import React, { useEffect, useState } from "react";
import InpoutComponent from "../../../components/inpout-component/InpoutComponent";
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../validators/rules";
import swal from "sweetalert";

export default function Sessions() {
  const [courses, setCourses] = useState([]);
  const [sessionCours, setSessionCourse]= useState('-1')
  const [sessionVideo , setSessionVideo]= useState({})
  const localStorageData = JSON.parse(localStorage.getItem('user'))
  const [formState, onInputHandler] = useForm({
    title: {
        value : '',
        isValid: false
    },
    time: {
        value : '',
        isValid: false
    }
  }, false);


  //add new session
  const addSession = (event)=>{
    event.preventDefault()
    let formData = new FormData()
    formData.append('title' , formState.inputs.title.value)
    formData.append('time' , formState.inputs.time.value)
    formData.append('video' , sessionVideo)

    fetch(`http://localhost:4000/v1/courses/${sessionCours}/sessions`,{
        method:'POST',
        headers:{Authorization : `Bearer ${localStorageData}`},
        body: formData
    }).then(res=>{
        if(res.ok){
            swal({
                title:'جلسه مورد نظر با موفقیت اضافه شد',
                icon:'success',
                buttons:'تایید'
            })
        }
    })

  }  


  //Getting course data to display in a checkbox
  useEffect(()=>{
    fetch(`http://localhost:4000/v1/courses`)
    .then(res=>res.json())
    .then(result=>{setCourses(result)})
  },[])
  return (
    <div class="container-fluid" id="home-content">
      <div class="container">
        <div class="home-title">
          <span>افزودن جلسه جدید</span>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">عنوان جلسه</label>
              <InpoutComponent
                element="input"
                onInputHandler={onInputHandler}
                type="text"
                id="title"
                validations={[minValidator(5)]}
                placeholder="لطفا نام جلسه را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="price input">
              <label class="input-title">مدت زمان جلسه</label>
              <InpoutComponent
                element="input"
                onInputHandler={onInputHandler}
                type="text"
                id="time"
                validations={[minValidator(5)]}
                placeholder="لطفا مدت زمان جلسه را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="price input">
              <label class="input-title" style={{ display: "block" }}>
                دوره
              </label>
              <select
                class="select"
                onChange={(event) => setSessionCourse(event.target.value)}
              >
                <option value="-1">دوره مدنظر را انتخاب کنید</option>
                {courses.map((course) => (
                  <option value={course._id} key={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              <span class="error-message text-danger"></span>
            </div>
          </div>
           <div class="col-6">
            <div class="price input">
              <label class="input-title" style={{ display: "block" }}>
                فیلم جلسه
              </label>
                <input type="file" onChange={event=> setSessionVideo(event.target.files[0])}/>
              <span class="error-message text-danger"></span>
            </div>
          </div>

          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={addSession}/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
