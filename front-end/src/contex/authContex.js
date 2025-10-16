import { createContext } from "react";

const AuthContex = createContext({
    isLogedIn : false,
    token: null,
    userInfos: null,
    login : ()=> {},
    logout: ()=> {}
})

export default AuthContex