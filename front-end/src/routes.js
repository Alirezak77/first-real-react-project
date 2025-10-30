import MainPage from "./pages/mainPage/MainPage"
import CoursInfo from "./pages/coursInfo/CoursInfo"
import Category from "./pages/category/Category"
import ArticleInfo from "./pages/articleInfo/ArticleInfo"
import AllCourses from "./pages/all-courses/AllCourses"
import Login from "./pages/login-page/Login"
import Register from "./pages/login-page/register-page/Register"


const routes =[
    {path : '/',  element:<MainPage/>},
    {path : '/course-info/:coursName' , element: <CoursInfo/>},
    {path : '/article-info/:articleName' , element: <ArticleInfo/>},
    {path : '/category-info/:categoryName/:page' , element: <Category/>},
    {path : '/all-courses/:page' , element: <AllCourses/>},
    {path : '/login' , element: <Login/>},
    {path : '/register' , element: <Register/>}
]

export default routes