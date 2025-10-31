import React ,{useState , useEffect}from "react";
import "./LasrArticles.css";
import CoursesHeader from "../coureses-header/CoursesHeader";
import ArticleBox from "../article-box/ArticleBox";
export default function LasrArticles() {

    const [allArticles, setAllArticles]= useState([])
    useEffect(()=>{
      const localStorageData= JSON.parse(localStorage.getItem('user'))
      fetch(`http://localhost:4000/v1/articles`,{
        method:'GET',
        headers:{Authorization: `Bearer ${localStorageData === null ? null : localStorageData}`,}
      }).then(res=>res.json()).then(article=>{
        console.log(article);
        setAllArticles(article)
        
      })
    },[])
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
            {allArticles.slice(0,3).map((article)=>{
              return <ArticleBox title={article.title} desc={article.description} img={article.cover} shortName={article.shortName}/>
            })}
            
          </div>
        </div>
      </div>
    </section>
  );
}
