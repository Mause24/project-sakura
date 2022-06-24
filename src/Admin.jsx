import React from "react"
import { useNavigate } from 'react-router-dom'
import { auth } from "../firebase"
import Registros from "./Registros"



const Admin = (props) => {
const navegate = useNavigate()
const [user, setUser] = React.useState(null)
React.useEffect(()=>{
  if(auth().currentUser){
    setUser(auth().currentUser)
    console.log('usuario existee')
  }else{
    console.log('usuario no existe')
    navegate("/login")
  }
},[navegate])

  return (
  <div>
    {
        user && (
         
      <Registros user ={user}/>
        )
      }
  </div>

    
  )
}

export default Admin