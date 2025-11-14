import React, { useEffect, useState } from "react";
import InpoutComponent from "../../../components/inpout-component/InpoutComponent";
import { useForm } from "../../../hooks/useForm";
import { requiredValidator } from "../../../validators/rules";
import swal from "sweetalert";
import DataTable from "../../../components/admin-components/DataTable/DataTable";

export default function Discount() {
  const [allCourses, setAllCourses] = useState([]);
  const [courseID, setCourseID] = useState("-1");
  const [allDiscounts, setAllDiscounts] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [formState, onInputHandler] = useForm(
    {
      code: {
        value: "",
        isValid: false,
      },
      percent: {
        value: "",
        isValid: false,
      },
      maxUsage: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //get all courses
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((data) => {
        setAllCourses(data);
      });
    getAllDiscounts();
  }, []);

 //get all discount
  function getAllDiscounts() {
    fetch(`http://localhost:4000/v1/discounts`, {
      headers: { Authorization: `Bearer ${localStorageData}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllDiscounts(data);
      });
  }

  //creat new discount code
  const addNewDiscountCode = (event) => {
    event.preventDefault();
    const discountCodeInfo = {
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      maxUsage: formState.inputs.maxUsage.value,
      courseId: courseID,
    };
    fetch(`http://localhost:4000/v1/discounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData}`,
      },
      body: JSON.stringify(discountCodeInfo),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "کد تخفیف با موفقیت اضافه شد",
          icon: "success",
          buttons: "تایید",
        });
      }
    });
  };

  const deleteDiscount= (discountID)=>{
      swal({
        title:'آیا از حذف کد تخفیف اطمینان دارید؟',
        icon:'warning',
        buttons:['خیر','بله']
      }).then(result=>{
        if(result){
          fetch(`http://localhost:4000/v1/discounts/${discountID}`,{
            method:'DELETE',
            headers:{Authorization : `Bearer ${localStorageData}`}
          }).then(res=>{
            if(res.ok){
              swal({
                title:'کد تخفیف با موفقیت حذف شد',
                icon:'success',
                buttons:'تایید'
              }).then(()=>{
                getAllDiscounts()
              })
            }
          })
        }
      })
  }

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن کد تخفیف جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">کد تخفیف</label>
                <InpoutComponent
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="code"
                  validations={[requiredValidator]}
                  placeholder="لطفا کد تخفیف را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">درصد تخفیف</label>
                <InpoutComponent
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="percent"
                  validations={[requiredValidator]}
                  placeholder="لطفا درصد تخفیف را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">حذاکثر استفاده</label>
                <InpoutComponent
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="maxUsage"
                  validations={[requiredValidator]}
                  placeholder="لطفا حداکثر استفاده از کد تخفیف را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-6">
              <div class="price input">
                <label class="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  class="select"
                  onChange={(event) => setCourseID(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>

                  {allCourses.map((course) => {
                    return <option value={course._id}>{course.name}</option>;
                  })}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={addNewDiscountCode}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title={"تخفیف ها"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کد تخفیف</th>
              <th>درصد تخفیف</th>
              <th>دوره</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده</th>

              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allDiscounts.map((discount, index) => {
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{discount.code}</td>
                  <td>{discount.percent}</td>
                  <td>{discount.course.name}</td>
                  <td>{discount.maxUsage}</td>
                  <td>{discount.usedCount}</td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn" onClick={()=>deleteDiscount(discount._id)}>
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
