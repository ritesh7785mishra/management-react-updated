import React,{useContext} from 'react'
import './Card.css'
import deleteIcon from "../images/delete-bin-7-line.png"
import { Context } from '../Context'
import headShot from '../images/girl-photo.jpg'


function Card({firstName,lastName,designation,id,image}) {

const {removeUser} = useContext(Context)

  return (
    <div className='card'>
        <img className='card__mainImg' src={image?image:headShot} alt="" />
        <h4 className="card__name">{firstName} {lastName}</h4>
        <p className='card__designation'>{designation}</p>
        <button onClick={() => {
          removeUser(id)
          }} className='card__deleteBtn'>
            <img className='card__deleteImg' src={deleteIcon} alt="" />
        </button>
    </div>
  )
}


export default Card