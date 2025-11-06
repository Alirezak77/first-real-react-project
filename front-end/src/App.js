import routes from './routes';
import { useRoutes } from 'react-router-dom';
import './App.css';
import AuthContex from './contex/authContex';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const router = useRoutes(routes)
  const [isLogedIn, setIsLogedIn]= useState(false)
  const [token , setToken]= useState(false)
  const [userInfos, setUserInfos]= useState({})

  const login = (userInfo,token)=>{
    setToken(token)
    setIsLogedIn(true)
    setUserInfos(userInfo)
    localStorage.setItem('user' , JSON.stringify(token))
  };

  const logout = useCallback(()=>{
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  },[])


  useEffect(()=>{
    const localStorageData= JSON.parse(localStorage.getItem('user'))
    if(localStorageData){
      fetch(`http://localhost:4000/v1/auth/me` , {
        headers:{
          Authorization : `Bearer ${localStorageData}`
        }
      }).then(res => res.json()).then(userData=>{
        setIsLogedIn(true)
        setUserInfos(userData)
      })
    }
    else{
      setIsLogedIn(false)
    }
    
    
  },[login , logout])

  return (
    <AuthContex.Provider className="App" 
      value={{
        isLogedIn,
        token,
        userInfos,
        login,
        logout
      }}
    >
      {router}
    </AuthContex.Provider>
  );
}

export default App;
