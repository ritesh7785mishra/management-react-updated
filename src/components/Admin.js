import React,{useContext} from 'react'
import './Admin.css'
import Card from './Card'
import addIcon from "../images/add-line.png"
// import data from '../data'
import { Context } from '../Context'
import {useNavigate} from "react-router-dom"

function Admin() {
  const navigate = useNavigate()
  const {userData,isPending,error} = useContext(Context)
  // const [isPending , setIsPending] = useState(true)

  const cardElements =  userData && userData.map(user => (
    <Card key={user.id} id={user.id} firstName={user.firstName} lastName={user.lastName} designation={user.designation} image={user.image}/>
  ))

  return (
    <div className="admin">
         <div className="headbar">
            <h3 className="title">
                Management System
            </h3>
            <p>Admin</p>
         </div>
         <div className="admin__content">
            <p className="list__heading">List of Employees</p>
            <div className="list__elements">
                {error && <div>Unable to fetch the resource</div>}
                {isPending && <div>Loading Users.....</div>}
                {cardElements}
                <div className='card btn__config'>
                    <div className='add__btn' onClick={() => {
                      navigate('/edit')}}>
                        <img className='bgClr' src={addIcon} alt="" />
                        <h4 className="card__name">Add Employee</h4>
                    </div>
                </div>
            </div>
         </div>
    </div>
  )
}

export default Admin