import React, { useEffect, useState } from "react";
import DataTable from "../../../components/admin-components/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "../../../hooks/useForm";
import InpoutComponent from "../../../components/inpout-component/InpoutComponent";
import { minValidator } from "../../../validators/rules";

export default function Menus() {
  const [allMenu, setAllMenu] = useState([]);
  const [menuParent , setMenuParent]=useState('-1')
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [formState , onInputHandler]=useForm({
    title:{
      value:'',
      isValid:false
    },
    href:{
      value:'',
      isValid:false
    }

  },false)


  //get all menu
  function getAllMenu() {
    fetch(`http://localhost:4000/v1/menus/all`)
      .then((res) => res.json())
      .then((data) => {
        setAllMenu(data);
      });
  }

  useEffect(() => {
    getAllMenu();
  }, []);


  //delete menu
  const deleteMenu = (menuID) => {
    swal({
      title: "آیا از حذف منو اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/menus/${menuID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorageData}` },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "منو مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllMenu();
            });
          }
        });
      }
    });
  };

  //craete new menu
  const createMenu = (event)=>{
    event.preventDefault()

    const menuInfo= {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent: menuParent === '-1' ? undefined : menuParent
    }

    fetch(`http://localhost:4000/v1/menus`,{
      method:'POST',
      headers:{
        Authorization:`Bearer ${localStorageData}`,
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(menuInfo)
    }).then(res=>{
      if(res.ok){
        swal({
          title:'منو مورد نظر با موفقیت اضافه شد',
          icon:'success',
          buttons:'تایید'
        }).then(()=>{
          getAllMenu()
        })
      }
    })
  }
  return (
    <>
      <div class="container">
        <div class="home-title">
          <span>افزودن منو جدید</span>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">عنوان</label>
              <InpoutComponent
                element="input"
                onInputHandler={onInputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                validations={[minValidator(5)]}
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="name input">
              <label class="input-title">لینک</label>
              <InpoutComponent
                element="input"
                onInputHandler={onInputHandler}
                id="href"
                type="text"
                isValid="false"
                validations={[minValidator(5)]}
                placeholder="لطفا لینک را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="name input">
              <label class="input-title">منو اصلی</label>
              <select
                class="select"
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">منوی اصلی را انتخاب کنید</option>
                {allMenu.map((menu) => (
                  <>
                    {!Boolean(menu.parent) && (
                      <option value={menu._id}>{menu.title}</option>
                    )}
                  </>
                ))}
              </select>
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={createMenu} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title={"منو ها"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>زیر مجموعه</th>

              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allMenu.map((menu, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{menu.title}</td>
                  <td>{menu.href}</td>
                  <td>{menu.parent ? menu.parent.title : "منو اصلی"}</td>
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
                        deleteMenu(menu._id);
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
