import React, { useEffect, useState } from "react";
import DataTable from "../../../components/admin-components/DataTable/DataTable";
import swal from "sweetalert";

export default function Users() {
  const [users, setUsers] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));

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

  return (
    <>
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
                    <button type="button" class="btn btn-danger delete-btn">
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
