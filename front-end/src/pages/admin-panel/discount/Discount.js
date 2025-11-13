import React from "react";
import InpoutComponent from "../../../components/inpout-component/InpoutComponent";
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../validators/rules";

export default function Discount() {
  const [formState, onInputHandler] = useForm({
    code:{
        value:'',
        isValid:false
    },
    persent:{
        value:'',
        isValid:false
    },
    max:{
        value:'',
        isValid:false
    },
  }, false);
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
                  validations={[minValidator(5)]}
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
                  id="persent"
                  validations={[minValidator(5)]}
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
                  id="max"
                  validations={[minValidator(5)]}
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
                  
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  
                    {/* <option >
                      
                    </option> */}
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
    </>
  );
}
