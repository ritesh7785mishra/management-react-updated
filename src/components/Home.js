import React,{useContext} from 'react'
import './Home.css'
import headShot from '../images/girl-photo.jpg'
import pencilIcon from '../images/pencil-line.png'
import deleteIcon from '../images/delete-bin-7-line.png'
import {Context} from '../Context'
import {useNavigate} from "react-router-dom"
function Home() {

    const navigate = useNavigate()
    const {user,removeUser,retrieveData,userData} = useContext(Context) 

    function handleDeleteRedirect(){
        removeUser(user.id)
        navigate('/')
    }

    console.log(userData)//

  return (
    <div className='home'>
        <div className="headbar">
            <h3 className="title">
                Management System
            </h3>
            <div className="img__container">
                <img className="header__img" src={user.image? user.image: headShot} alt="" />
            </div>
        </div>
        <div className="home__content">
            <div className="pencil__icon" onClick={()=>{
                retrieveData(user.id)
                navigate('/edit')
                }}>
                <img src={pencilIcon} className="pencil" alt="" />
            </div>
            <div className="delete__icon"  onClick={() => handleDeleteRedirect()}>
                <img src={deleteIcon} alt="" className='delete' />
            </div>

            <div className="top__details">
                <div className="img__container">
                    <img className="main__img" src={user.image? user.image: headShot} alt="" />
                </div>
                <h1 className="empl__name">
                    {user.firstName} {user.lastName}
                </h1>
                <p className="designation">
                    {user.designation}
                </p>
            </div>
            <div className="low__details">
                <div className="gender">
                    <p className="light__text">
                        Gender
                    </p>
                    <p className="dark__text">
                        {user.gender}
                    </p>
                </div>
                
                <div className="dob">
                    <p className="light__text">
                        DOB
                    </p>
                    <p className="dark__text">
                        {user.dateOfBirth}
                    </p>
                </div>

                <div className="nationality">
                    <p className="light__text">
                        Nationality
                    </p>
                    <p className="dark__text">
                        {user.country}
                    </p>
                </div>
            </div>
          
        </div>
    </div>
  )
}

export default Home