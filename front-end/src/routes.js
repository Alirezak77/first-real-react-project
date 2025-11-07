import MainPage from "./pages/mainPage/MainPage"
import CoursInfo from "./pages/coursInfo/CoursInfo"
import Category from "./pages/category/Category"
import ArticleInfo from "./pages/articleInfo/ArticleInfo"
import AllCourses from "./pages/all-courses/AllCourses"
import Login from "./pages/login-page/Login"
import Register from "./pages/login-page/register-page/Register"
import Article from "./pages/article/Article"
import Search from "./pages/search/Search"
import Index from "./pages/admin-panel/Index"
import Users from "./pages/admin-panel/users/Users"
import AdminCourses from "./pages/admin-panel/adminCourses/AdminCourses"
import Menus from "./pages/admin-panel/menus/Menus"
import AdminArticle from "./pages/admin-panel/adminArticle/AdminArticle"
import AdminCategory from "./pages/admin-panel/admin-category/AdminCategory"


const routes =[

    //Paths for the client site
    {path : '/',  element:<MainPage/>},
    {path : '/course-info/:coursName' , element: <CoursInfo/>},
    {path : '/article-info/:articleName' , element: <ArticleInfo/>},
    {path : '/category-info/:categoryName/:page' , element: <Category/>},
    {path : '/all-courses/:page' , element: <AllCourses/>},
    {path : '/login' , element: <Login/>},
    {path : '/register' , element: <Register/>},
    {path : '/article/:page' , element: <Article/>},
    {path : '/search/:value' , element : <Search/>},


    //Paths for the admin panel
    {path : '/admin-panel/*' , element : <Index/> , children: [
        {path : 'users' , element : <Users/>},
        {path : 'courses' , element : <AdminCourses/>},
        {path : 'menus' , element : <Menus/>},
        {path : 'article' , element : <AdminArticle/>},
        {path : 'category' , element : <AdminCategory/>}
    ]}
]

export default routes