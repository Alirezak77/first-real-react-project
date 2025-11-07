import React, { useEffect, useState } from "react";
import DataTable from "../../../components/admin-components/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "../../../hooks/useForm";
import InpoutComponent from "../../../components/inpout-component/InpoutComponent";
import { minValidator, maxValidator } from "../../../validators/rules";
import "./AdminCAtegory.css";

export default function AdminCategory() {
  const [allCategory, setAllCategory] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        console.log(allCategories);
        setAllCategory(allCategories);
      });
  }

  const createNewCategory = (event) => {
    event.preventDefault();

    const newCategoryInfo = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortname.value,
    };

    fetch("http://localhost:4000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData}`,
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        swal({
          title: "دسته بندی مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllCategories();
        });
      });
  };

  const deleteCategory = (categryID) => {
    swal({
      title: "آیا از حذف این دسته بندی اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/category/${categryID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorageData}` },
        })
          .then((res) =>{
            if(res.ok){
                swal({
                    title:'دسته بندی با موفقیت حذف شد',
                    icon:'success',
                    buttons:'تایید'
                }).then(()=>{
                    getAllCategories()
                })
            }
          } )
          
      }
    });
  };

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان</label>
                <InpoutComponent
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">اسم کوتاه</label>
                <InpoutComponent
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="shortname"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title={"دسته بندی"}>
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
            {allCategory.map((category, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{category.title}</td>
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
                        deleteCategory(category._id);
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
