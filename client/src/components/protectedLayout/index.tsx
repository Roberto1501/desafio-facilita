import { useAuth } from "../../context/AuthProvider/useAuth"

export const ProtectedLayout = ({children}:{children:JSX.Element}) =>{

    const auth = useAuth()
    if (!auth.data || !auth.data.name) {
        return <h2>You don't have access to this route</h2>;
      }

    return children

}