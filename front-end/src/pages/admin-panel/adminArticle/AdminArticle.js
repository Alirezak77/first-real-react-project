import React, { useEffect, useState } from "react";
import DataTable from "../../../components/admin-components/DataTable/DataTable";
import swal from "sweetalert";

export default function AdminArticle() {
  const [allArticle, setAllArticle] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  function getAllArticle() {
    fetch(`http://localhost:4000/v1/articles`, {
      headers: { Authorization: `Bearer ${localStorageData}` },
    })
      .then((res) => res.json())
      .then((result) => {
        setAllArticle(result);
      });
  }

  useEffect(() => {
    getAllArticle();
  }, []);

  const removeArticle = (articleID) => {
    swal({
      title: "آیا از حذف مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/articles/${articleID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorageData}` },
        })
          .then((res) => {
            if (res.ok) {
              swal({
                title: "مقاله مورد نظر با موفقیت حذف شد",
                icon: "success",
                buttons: "تایید",
              });
            } else {
              swal({
                title: "در حذف مقاله مشکلی پیش آمد",
                buttons: "تایید",
              });
            }
          })
          .then(() => {
            getAllArticle();
          });
      }
    });
  };
  return (
    <>
      <DataTable title={"مقاله ها"}>
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
                      onClick={() => {
                        removeArticle(article._id);
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
