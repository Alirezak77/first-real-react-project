import React, { useEffect, useState } from "react";
import DataTable from "../../../components/admin-components/DataTable/DataTable";
import swal from "sweetalert";
import InpoutComponent from "../../../components/inpout-component/InpoutComponent";
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../validators/rules";

export default function AdminArticle() {
  const [allArticle, setAllArticle] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState("-1");
  const [articleCover, setArticleCover] = useState({});
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
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
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
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
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <InpoutComponent
                  element="input"
                  type="text"
                  id="title"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(8)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <InpoutComponent
                  element="input"
                  type="text"
                  id="shortName"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                <InpoutComponent
                  element="textarea"
                  type="text"
                  id="description"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  className="article-textarea"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setArticleCover(event.target.files[0]);
                  }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
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
