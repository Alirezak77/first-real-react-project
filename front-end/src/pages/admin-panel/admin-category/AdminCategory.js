import React, { useEffect, useState } from 'react'
import DataTable from "../../../components/admin-components/DataTable/DataTable";

export default function AdminCategory() {
    const [allCategory, setAllCategory] = useState([])
    function getAllCategory (){
        fetch(`http://localhost:4000/v1/category`).then(res=>res.json()).then(result=>{
            console.log(result);
            setAllCategory(result)
            
        })
    }
    useEffect(()=>{
        getAllCategory()
    },[])
  return (
    <>
    <DataTable title={'دسته بندی'}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>

              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allCategory.map((category , index)=>{
              return <tr>
              <td>{index + 1}</td>
              <td>{category.title}</td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn">
                  حذف
                </button>
              </td>
            </tr>
            })}
            
          </tbody>
          </table>
    </DataTable>
    </>
  )
}
