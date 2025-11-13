import React, { useEffect, useState } from "react";
import DataTable from "../../../components/admin-components/DataTable/DataTable";

export default function Menus() {
  const [allMenu, setAllMenu] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus/all`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllMenu(data);
      });
  }, []);
  return (
    <>
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
                    <button type="button" class="btn btn-danger delete-btn">
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
