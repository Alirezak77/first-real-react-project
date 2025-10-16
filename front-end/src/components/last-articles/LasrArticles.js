import React from "react";
import "./LasrArticles.css";
import CoursesHeader from "../coureses-header/CoursesHeader";
import ArticleBox from "../article-box/ArticleBox";
export default function LasrArticles() {
  return (
    <section class="articles">
      <div class="container">
        <CoursesHeader
          title={"جدید ترین مقاله ها"}
          desc={"پیش به سوی ارتقای دانش"}
          btnTitle={"تمامی مقاله ها"}
        />
        <div class="articles__content">
          <div class="row">
            <ArticleBox title={'نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'} desc={'زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...'} img={'images/blog/3.jpeg'}/>
            <ArticleBox title={'نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'} desc={'زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...'} img={'images/blog/3.jpeg'}/>
            <ArticleBox title={'نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'} desc={'زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...'} img={'images/blog/3.jpeg'}/>
          </div>
        </div>
      </div>
    </section>
  );
}
