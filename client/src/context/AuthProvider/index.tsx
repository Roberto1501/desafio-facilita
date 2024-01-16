import  {createContext, useEffect, useState} from "react";
import { IAuthProvider, Icontext } from "./types";
import { ILoginResponse, LoginRequest, Register, getUserLocalStorage, setUserLocalStorage } from "./util";
import { IUserData } from "./util";

export const AuthContext =createContext<Icontext>({} as Icontext)


export const AuthProvider = ({children}:IAuthProvider) =>{
    const [user,setUser] = useState<ILoginResponse|null>()

    useEffect(()=>{
        const user = getUserLocalStorage()
        if(user){
            setUser(user)
        }
    },[])

    async function authenticate(email: string, password: string): Promise<ILoginResponse | undefined> {
        try {
          const response = await LoginRequest(email, password);
      
          if (response !== null && response !== undefined) {
            const payload: { user: ILoginResponse } = { user: response };
            setUser(payload.user);
            setUserLocalStorage(payload.user);
            return response;
          } else {
            // Handle the case where LoginRequest returns null or undefined
            console.error("Authentication failed: Response is null or undefined");
            return undefined;
          }
        } catch (error) {
          // Handle other errors, e.g., show a message to the user
          console.error("Authentication failed:", error);
          return undefined;
        }
      }
      
    async function register(name: string, email: string, password: string): Promise<IUserData | undefined> {
        try {
            const response = await Register(name, email, password);
    
            if (response !== null) {
                const payload: { user: IUserData } = { user: response };
                return payload.user;
            } else {
                // Handle the case where Register returns null
                console.error("Registration failed: response is null");
                return undefined;
            }
        } catch (error) {
            // Handle other errors, e.g., show a message to the user
            console.error("Registration failed:", error);
            return undefined;
        }
    }
    

    function logout(){
        setUser(null)
        setUserLocalStorage(null)
    }

    return (
        <AuthContext.Provider value={{...user,authenticate,logout,register}}>
        {children}
        </AuthContext.Provider>
    )
  
}
