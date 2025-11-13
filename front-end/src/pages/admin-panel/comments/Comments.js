import React, { useEffect, useState } from "react";
import DataTable from "../../../components/admin-components/DataTable/DataTable";
import swal from "sweetalert";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  function getAllComments() {
    fetch(`http://localhost:4000/v1/comments`)
      .then((res) => res.json())
      .then((data) => {
        setAllComments(data);
      });
  }
  useEffect(() => {
    getAllComments();
  }, []);

  const showComment = (commentBody) => {
    swal({
      title: commentBody,
      buttons: "تایید",
    });
  };

  const deleteComment = (commentID) => {
    swal({
      title: "آیا از حذف کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/${commentID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorageData}` },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کامنت با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllComments();
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

  const toggleApproval = (commentID, currentStatus) => {
    // تغییر وضعیت به مخالف وضعیت فعلی
    swal({
      title: "آیا از تایید/رد کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageData}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isApproved: !currentStatus }),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "عملیات با موفقیت انجام شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title={"منو ها"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>دوره</th>
              <th>مشاهده</th>

              

              <th>حذف</th>
              <th>بن</th>
              <th>تایید/رد</th>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{comment.creator.name}</td>
                  <td>{comment.course.shortName}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary edit-btn"
                      onClick={() => {
                        showComment(comment.body);
                      }}
                    >
                      مشاهده
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      class="btn btn-danger delete-btn"
                      onClick={() => {
                        deleteComment(comment._id);
                      }}
                    >
                      حذف
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger edit-btn"
                      onClick={() => {
                        banUser(comment.creator._id);
                      }}
                    >
                      مسدود کردن
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`btn ${
                        comment.isApproved ? "btn-danger" : "btn-success"
                      }`}
                      onClick={() =>
                        toggleApproval(comment._id, comment.isApproved)
                      }
                    >
                      {comment.isApproved ? "رد" : "تأیید"}
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
