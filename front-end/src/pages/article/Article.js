import React, { useEffect, useState } from 'react'
import './Article.css'
import TopBar from '../../components/top-bar/TopBar'
import NavBar from '../../components/nav-bar/NavBar'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import Footer from '../../components/footer/Footer'
import Pagenation from '../../components/pagenation/Pagenation'
import ArticleBox from '../../components/article-box/ArticleBox'

export default function Article() {
    const[allArticles , setAllArticles ]=useState([])
    const [showArticles, setShowArticles]=useState([])

    useEffect(()=>{
        const localStorageData= JSON.parse(localStorage.getItem('user'))
      fetch(`http://localhost:4000/v1/articles`,{
        method:'GET',
        headers:{Authorization: `Bearer ${localStorageData === null ? null : localStorageData}`,}
      }).then(res=>res.json()).then(article=>setAllArticles(article))
    },[])
  return (
    <>
        <TopBar/>
        <NavBar/>
        <Breadcrumb links={[
          { id: 1, title: "خانه", to: "/" },
          { id: 1, title: "همه مقاله ها", to: "/article" },
        ]}/>

        <div className="courses">
                <div className="container">
                  <div className="row">
                    {showArticles.map(article=>{
                      return <ArticleBox {...article}/>
                    })}
                  </div>
                </div>
              </div>
              <Pagenation items={allArticles} itemCount={2} pathname={'/article'} setShowCourses={setShowArticles}/>
              {console.log(showArticles)
              }
        <Footer/>
    </>
  )
}
