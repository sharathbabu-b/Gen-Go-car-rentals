import { useSelector } from "react-redux"
export default function Account(){
    const {userData}=useSelector((state)=>{
        return state.user
    })
    console.log(userData)
    if(!userData){
        return false
    }
    return(
        <div>
            <h1>Account Information</h1>
            <p>Name:{userData.Name}</p>
            <p>Email:{userData.email}</p>
            <p>Role:{userData.role}</p>
            <p>PhoneNumber:{userData.phone}</p>
            </div>
    )
}