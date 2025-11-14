import React, { useEffect, useState } from "react";
import InpoutComponent from "../../../components/inpout-component/InpoutComponent";
import { useForm } from "../../../hooks/useForm";
import { requiredValidator } from "../../../validators/rules";
import swal from "sweetalert";

export default function Discount() {
  const [allCourses, setAllCourses] = useState([]);
  const [courseID, setCourseID] = useState("-1");
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
  }, []);

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
    </>
  );
}
