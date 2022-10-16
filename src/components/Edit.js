import React,{useState,useContext} from 'react'
import './Edit.css'
import headShot from '../images/girl-photo.jpg'
import pencilIcon from '../images/pencil-dark.png'
import deleteIcon from '../images/delete-dark.png'
import indianFlag from "../images/indian-flag.png"
import cameraIcon from '../images/camera-fill.png'
import {Context} from '../Context'
import {useNavigate} from 'react-router-dom'
import * as filestack from 'filestack-js';




function Edit() {

    let today = new Date();
    function getDate(){
        
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

       
    
        if (dd < 10) {
            dd = '0' + dd;
            console.log('new dd', dd)
        }
    
        if (mm < 10) {
            mm = '0' + mm;
            console.log('new mm', mm)
        } 
        
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today)
    }
    

    
    const navigate = useNavigate()
    const {addUser,currentUserFound,editUserData,setGlobalImage} = useContext(Context)
    const [cameraBtn, setCameraBtn] = useState(false)
    const [warning, setWarning] = useState(false)
    const [userToAdd, setUserToAdd] = useState({...editUserData})

    console.log(userToAdd, 'this is the user we are adding')
   
    let {firstName,lastName,designation,dateOfBirth,gender,phoneNumber,address,city,state,zipCode,country,email,password,image} = userToAdd
    
   
    function handleChange(e){
        setUserToAdd({
            ...userToAdd,
            image:headShot,
            [e.target.name] : e.target.value
        })
    }

    function SubmitButton(){
        if (firstName && lastName && designation && dateOfBirth && gender &&
            phoneNumber && address && city && state && zipCode && country && email && password){
          return  <button className="save" onClick={addDetail}>
                    Save
                  </button>
        } else {
          return  <button className="disabled__save" onClick={warningMessage}>
                     Save
                  </button>
        };
      };

    function warningMessage(){
        setWarning(true)
    }
    function addDetail(){
        
        if(email.includes("@")){
            addUser(userToAdd)
            currentUserFound(userToAdd)
            navigate('/home')
        }else{
            alert('Input Valid Email')
        }
       
    }


    function handleImageUploading(){
        const client = filestack.init('ALTULfjmTCykqtAU0Ptwoz');
        
        const options = {
            onFileUploadFinished(file){
                console.log(file,"this is the uploaded file")
                const imgUrl= file.url
                setUserToAdd({
                    ...userToAdd,
                    image:imgUrl
                })
                setGlobalImage(imgUrl)
            }//provides functionality of call back function
        }
        client.picker(options).open()//opens up the filestack file upload picker
    }

    function handleImageDelete(){
        setUserToAdd({
            ...userToAdd,
            image:headShot
        })

        setGlobalImage(headShot)
    }

  return (
    <div className="edit">
         <div className="headbar">
            <h3 className="title">
                Management System
            </h3>
            <div className="img__container">
                <img className="header__img" src={image?image:headShot} alt="" />
            </div>
         </div>

         <div className="edit__content">
            <div className="left__section">
               <p className="imgWarning">
                  Image size should not be larger than 1MB 
               </p> 
                <div className="img__editContainer">
                    <div className="img__container fun">
                        <img className="main__img" src={image?image:headShot} alt="" />
                        <button className='camera__btn' onClick={() => setCameraBtn(preVal => !preVal)}><img src={cameraIcon} alt="" /></button>
                    </div>
                    <div className="edDel__box" style={{visibility: cameraBtn ? 'visible':'hidden'}}>
                        <div className="edit__box" onClick={()=>handleImageUploading()}>
                            <img src={pencilIcon} alt="" className="" />
                            <p>Edit</p>
                        </div>
                    <hr/>
                        <div className="delete__box" onClick={()=> handleImageDelete()}>
                            <img src={deleteIcon} alt="" className="" />
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
                
                <div className="name">
                    <input type="text" name="firstName" value={firstName} id="" placeholder='First Name' onChange={(e)=>handleChange(e)}/>
                    <input type="text" name="lastName" value={lastName} id="" placeholder='Last Name' onChange={(e)=>handleChange(e)} />
                </div>
                <input type="text" name="designation" value={designation} id="" placeholder='Designation' onChange={(e)=>handleChange(e)}/>
                <input type="email" name="email" value={email} id="" placeholder='Email' onChange={(e)=>handleChange(e)}/>
            </div>
            <hr/>
            <div className="right__section">
                <div className="dob__gender">
                    <div className="input__dob">
                        <input onClick={getDate()}  max={today} type="date" name="dateOfBirth" value={dateOfBirth} placeholder="Date of birth" onChange={(e)=>handleChange(e)}/> 
                    </div>
                    <div className="input__gender">
                       
                       <select onChange={(e)=>handleChange(e)} name="gender" value={gender}>
	                        <option value="none" selected>Gender</option>
	                        <option value="male">Male</option>
	                        <option value="female">Female</option>
	                        <option value="other">Other</option>
                        </select>
                 
                    </div>
                </div>
                <div className="phone__number">
                    <img src={indianFlag} alt="" className="flag" />
                    <input className="small__number" type="number" name="phoneNumber"  value={phoneNumber} id="" placeholder='Phone number' onChange={(e)=>handleChange(e)} />
                </div>
                <input type="text" name="address" value={address} placeholder='Address 1' onChange={(e)=>handleChange(e)}/>
                <div className="city__state">
                    <input type="text" placeholder='City' name='city' value={city} onChange={(e)=>handleChange(e)}/>
                    <input type="text" name="state" id="" placeholder='State' value={state} onChange={(e)=>handleChange(e)} />
                </div>
                <div className="zip__country">
                    <input className='zipCode' maxLength="10" type="number" name="zipCode" id="" placeholder='Zip Code' value={zipCode} onChange={(e)=>handleChange(e)}/>
                    <input type="text" name="country" id="" placeholder='Country' value={country} onChange={(e)=>handleChange(e)}/>
                </div>
                <input type="text" name="password" id="" placeholder='Set password' value={password} onChange={(e)=>handleChange(e)}/>
                <p style={{visibility: warning?'visible':'hidden'}} className="warning__text">
                    *All fields are compulsory
                </p>
                <div className="save__cancel">
                   <button className="cancel">
                    Cancel
                   </button>
                    <SubmitButton/>
                </div>
            </div>
         </div>
    </div>
  )
}

export default Edit