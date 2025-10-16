import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import InpoutComponent from '../../components/inpout-component/InpoutComponent'
import { useForm } from '../../hooks/useForm'
import Button from '../../components/buttons/Button'

import { requiredValidator , minValidator , maxValidator , emailValidator } from '../../validators/rules'

export default function Login() {
    
    const userLogin = (event)=>{
        event.preventDefault()
    }
    
    const [formState , onInputHandler] = useForm({
        username: {
            value: '',
            isValid: false
        },
        password: {
            value : '',
            isValid: false
        }
    }, false)


    console.log(formState);
    
  return (
    
      <section class="login-register">
        <div class="login">
          <span class="login__title">ورود به حساب کاربری</span>
          <span class="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div class="login__new-member">
            <span class="login__new-member-text">کاربر جدید هستید؟</span>
            <Link class="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" class="login-form">
            <div class="login-form__username">
                <InpoutComponent
                type= 'text'
                element = 'input'
                className="login-form__username-input"
                id = 'username'
                placeholder = 'نام کاربری یا آدرس ایمیل'
                validations = {[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                    // emailValidator()

                ]}
                onInputHandler = {onInputHandler}
                />
              <i class="login-form__username-icon fa fa-user"></i>
            </div>
            <div class="login-form__password">

                <InpoutComponent
                type='password'
                element= 'input'
                className='login-form__password-input'
                id = 'password'
                placeholder= 'رمز عبور'
                validations = {[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(16),
                ]}
                onInputHandler={onInputHandler}
                />
              <i class="login-form__password-icon fa fa-lock-open"></i>
            </div>
            
            <Button className={`login-form__btn ${formState.isFormValid ? 'login-form__btn-success' : 'login-form__btn-error'}`} type='submit' onClick={userLogin} disabled={!formState.isFormValid}>

              <i class="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span class="login-form__btn-text">ورود</span>
            </Button>
            <div class="login-form__password-setting">
              <label class="login-form__password-remember">
                <input class="login-form__password-checkbox" type="checkbox" />
                <span class="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label class="login-form__password-forget">
                <a class="login-form__password-forget-link" href="w">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
          </form>
          <div class="login__des">
            <span class="login__des-title">سلام کاربر محترم:</span>
            <ul class="login__des-list">
              <li class="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li class="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li class="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>
  )
}
