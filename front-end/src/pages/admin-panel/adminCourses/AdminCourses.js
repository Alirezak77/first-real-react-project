import React, { useEffect, useState } from "react";
import DataTable from "../../../components/admin-components/DataTable/DataTable";
import swal from "sweetalert";

export default function AdminCourses() {
  const [courses , setCourses] = useState([])
  const localStorageData= JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
    getAllCourses()
  },[])

  function getAllCourses(){
    fetch(`http://localhost:4000/v1/courses`,{
      headers:{ Authorization : `Bearer ${localStorageData}`} 
    }).then(res=>res.json()).then(courses=>{
      console.log(courses);
      setCourses(courses)

      
    })
  }

  const deleteCourse =(courseID)=>{
    swal({
      title: 'آیا از حذف این دوره اطمینان دارید؟',
      icon : 'warning',
      buttons: ['خیر','بله']
    }).then(result=>{
      if(result){
        fetch(`http://localhost:4000/v1/courses/${courseID}`,{
          method: 'DELETE',
          headers: {'Authorization': `Bearer ${localStorageData}`}
        }).then(res=>{
          if(res.ok){
            swal({
              title:'دوره با موفقیت حذف شد',
              icon:'success',
              buttons:'تایید'
            }).then(()=>{
              getAllCourses()
            })
          }else{
            swal({
              title:'در حذف دوره مشکلی پیش آمد',
              icon:'error',
              buttons:'تایید'
            })
          }
        })
      }
    })
  }
  return (
    <>
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
            {courses.map((course , index)=>{
              return <tr>
              <td>{index + 1}</td>
              <td>{course.name}</td>
              <td>{course.price ===0 ? 'رایگان' : course.price.toLocaleString()+' ' + 'تومان'}</td>
              <td>{course.isComplete ===0 ? 'در حال برگذاری': 'تکمیل شده'}</td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={()=>{deleteCourse(course._id)}}>
                  حذف
                </button>
              </td>
            </tr>
            })}
            
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
