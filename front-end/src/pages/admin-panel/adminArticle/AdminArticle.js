import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/admin-components/DataTable/DataTable'


export default function AdminArticle() {
  const [allArticle, setAllArticle]= useState([])
  const localStorageData= JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
    fetch(`http://localhost:4000/v1/articles`,{
      headers:{'Authorization' : `Bearer ${localStorageData}`}
    })
    .then(res=>res.json())
    .then(result=>{
      setAllArticle(result)
    })
  
  },[])
  return (
    <>
    <DataTable title={'مقاله ها'}>
      <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان مقاله</th>
              <th>لینک</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allArticle.map((article, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{article.title}</td>
                  <td>{article.shortName}</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger delete-btn"
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
  )
}
