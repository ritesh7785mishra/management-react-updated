import React,{useContext,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { Context } from '../Context'
import lock from '../images/lock-fill.png'

function Login() {
  
  const [loggin, setLoggin] = useState({
    currentEmail:'',
    currentPassword:''
  })

  const {currentEmail, currentPassword} = loggin
  const {userData,currentUserFound} = useContext(Context)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  
  function handleChange(e){
    setLoggin({...loggin,
      [e.target.name]:e.target.value
    })
  }

  function findCurrentUser(){

    const currentUser = userData.find( user => user.email === currentEmail)

    if(currentEmail==="admin" && currentPassword==="admin"){
      navigate('/admin')
    }else if(currentUser){
      
         if(currentUser.password !== currentPassword){
           
            alert('Wrong Password')
            
          }else{
            currentUserFound(currentUser)
            navigate('/home')
          }
    }else{

      if(currentEmail.includes("@")){
        currentUserFound("")
        navigate('/edit')
      }else{
        alert('Input Valid Email')
      }
     
    }
  }

  return (

    <div className='login'>
        
            <h3 className="login__text">Employee and Admin login/ Signup</h3><br/>
            <input required type="text" value={currentEmail} name="currentEmail" id="" placeholder='Email' onChange={(e)=>handleChange(e)}/><br/>

             <div className="input__lock">
                <input type={showPassword ? 'text':'password'} value={currentPassword} name="currentPassword" id="" placeholder='Password' onChange={(e)=>handleChange(e)}>    
                </input>
                <span className='lock' onClick={() => setShowPassword(preVal => !preVal)}><img src={lock} alt="" /></span><br/>
             </div> 
          
            
            <button className='login__btn' onClick={()=>findCurrentUser()}>Login/Signup</button>
        
    </div>
  )
}

export default Login