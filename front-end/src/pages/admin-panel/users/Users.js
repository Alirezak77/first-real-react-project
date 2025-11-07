import React, { useEffect, useState } from "react";
import DataTable from "../../../components/admin-components/DataTable/DataTable";
import swal from "sweetalert";
import InpoutComponent from "../../../components/inpout-component/InpoutComponent";
import {
  requiredValidator,
  maxValidator,
  minValidator,
  emailValidator,
} from "../../../validators/rules";
import { useForm } from "../../../hooks/useForm";

export default function Users() {
  const [users, setUsers] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  function getAllUsers() {
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        Authorization: `Bearer ${localStorageData}`,
      },
    })
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = (userID) => {
    swal({
      title: "آیا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/${userID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorageData}` },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllUsers();
            });
          }
        });
      }
    });
  };

  const banUser = (userID) => {
    swal({
      title: "آیا از مسدود کردن کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorageData}` },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت مسدود شد",
              icon: "success",
              buttons: "تایید",
            });
          }
        });
      }
    });
  };

  const registerNewUser = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    };

    fetch("http://localhost:4000/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    }).then((res) => {
      console.log(res);
      // res.json();
      if (res.ok) {
        swal({
          title: "کاربر با موفقیت اضافه شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          getAllUsers();
        });
      }
    });
  };

  return (
    <>
      <div class="home-content-edit">
        <div class="back-btn">
          <i class="fas fa-arrow-right"></i>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">نام و نام خانوادگی</label>
              <InpoutComponent
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(3),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="family input">
              <label class="input-title">نام کاربری</label>
              <InpoutComponent
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(3),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="email input">
              <label class="input-title">ایمیل</label>
              <InpoutComponent
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(5),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">رمز عبور</label>
              <InpoutComponent
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="phone input">
              <label class="input-title">شماره تلفن</label>
              <InpoutComponent
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="کاربران">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>

              <th>ایمیل</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>مسدود کردن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger delete-btn"
                      onClick={() => deleteUser(user._id)}
                    >
                      حذف
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger delete-btn"
                      onClick={() => {
                        banUser(user._id);
                      }}
                    >
                      مسدود کردن
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
