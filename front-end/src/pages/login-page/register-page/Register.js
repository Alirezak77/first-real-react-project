import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import Button from '../../../components/buttons/Button'
import InpoutComponent from '../../../components/inpout-component/InpoutComponent'
import { useForm } from '../../../hooks/useForm'
import { requiredValidator , minValidator , maxValidator , emailValidator } from '../../../validators/rules'
import AuthContex from '../../../contex/authContex'
import { useContext } from 'react'

export default function Register() {
  const authContex = useContext(AuthContex)
  const [formState , onInputHandler] = useForm({
    name:{
      value:'',
      isValid:false
    },
    userName:{
      value:'',
      isValid:false
    },
    phone:{
      value:'',
      isValid:false
    },
    email:{
      value:'',
      isValid:false
    },
    password:{
      value:'',
      isValid:false
    }
  },false)
  const userLogin= (event)=>{
    event.preventDefault()
    const newUserInfos = {
      name: formState.inputs.name.value,
      username: formState.inputs.userName.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    }
    fetch(`http://localhost:4000/v1/auth/register` , {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUserInfos),
    }).then(res => res.json()
    ).then(result => {
      console.log(result);
      
      authContex.login(result.user , result.accessToken)})

      console.log(authContex);
      
  }


  return (
    
      <section class="login-register">
        <div class="login register-form">
          <span class="login__title">ساخت حساب کاربری</span>
          <span class="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
          <div class="login__new-member">
            <span class="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link class="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" class="login-form">
            <div class="login-form__username">

                <InpoutComponent
                type= 'text'
                element = 'input'
                className="login-form__username-input"
                placeholder='نام و نام خانوادگی'
                id='name'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(4),
                  maxValidator(20)
                ]
                }
                />
              <i class="login-form__username-icon fa fa-user"></i>
            </div>
            <div class="login-form__username">

                <InpoutComponent
                type= 'text'
                element = 'input'
                className="login-form__username-input"
                placeholder='شماره تماس'
                id='phone'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(10),
                  maxValidator(12)
                ]}
                />
              <i class="login-form__username-icon fa fa-user"></i>
            </div>
            <div class="login-form__username">

                <InpoutComponent
                type= 'text'
                element = 'input'
                className="login-form__username-input"
                placeholder='نام کاربری'
                id='userName'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(3),
                  maxValidator(15)
                ]}
                />
              <i class="login-form__username-icon fa fa-user"></i>
            </div>
            <div class="login-form__password">

                <InpoutComponent
                type='text'
                element='input'
                className='login-form__password-input'
                placeholder='آدرس ایمیل'
                id='email'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  emailValidator()

                ]}
                />
              <i class="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div class="login-form__password">
                <InpoutComponent
                type='password'
                element='input'
                className='login-form__password-input'
                placeholder='رمز عبور'
                id='password'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20)
                ]}
                />
              <i class="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button className={`login-form__btn ${formState.isFormValid ? 'login-form__btn-success' : 'login-form__btn-error'}`} type='submit' onClick={userLogin} disabled={!formState.isFormValid}>
            
                          <i class="login-form__btn-icon fas fa-sign-out-alt"></i>
                          <span class="login-form__btn-text">عضویت</span>
              </Button>
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
