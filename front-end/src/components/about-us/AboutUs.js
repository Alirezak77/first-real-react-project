import React from "react";
import "./AboutUs.css";
import AboutUsBox from "../abou-us-box/AboutUsBox";
import CoursesHeader from "../coureses-header/CoursesHeader";

export default function AboutUs() {
  return (
    <div class="about-us">
      <div class="container">
        <CoursesHeader title={'ما چه کمکی بهتون میکنیم؟'} desc={'از اونجایی که سبز لرن یک آکادمی خصوصی هست'}/>
        <div className="row">
            <AboutUsBox title={'دوره های اختصاصی'} desc={'!با پشتیبانی و کیفیت بالا ارائه میده '} icon={`far fa-copyright about-us__icon`}/>
            <AboutUsBox title={'اجازه تدریس'} desc={'!به هر مدرسی رو نمیده. چون کیفیت براش مهمه  '} icon={`fas fa-leaf about-us__icon`}/>
            <AboutUsBox title={'دوره پولی و رایگان'} desc={'!براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده '} icon={`fas fa-gem about-us__icon`}/>
            <AboutUsBox title={'اهمیت به کاربر'} desc={'!اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست '} icon={`fas fa-crown about-us__icon`}/>

        </div>
      </div>
    </div>
  );
}
