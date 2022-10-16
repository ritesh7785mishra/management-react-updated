import React,{useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import headShot from './images/girl-photo.jpg'


const Context = React.createContext();

function ContextProvider({children}){
    const [userData, setUserData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [user , setUser] = useState(null)
    const [error, setError] = useState(null)
    const [editUserData, setEditUserData] = useState(null)
    const [globalImage, setGlobalImage] = useState(headShot)
   
    useEffect(()=>{
        const abortCntr = new AbortController();
        fetch("http://localhost:8000/data" , {signal:abortCntr.signal})
            .then( (res) =>{
                if(!res.ok){
                    throw Error("Unable to fetch data")
                }
                return res.json()
            } )
            .then( (data)=> {
                setUserData(data)
                setIsPending(false)
                setError(null)

            }).catch((error) => {
                if(error.name === "AbortError"){

                }else{
                    console.log(error.message)
                    setError(error.message)
                } 
            }
            )
            return () => abortCntr.abort()
            
    },[])

    function retrieveData(id){
        setEditUserData(user)
    }


    function currentUserFound(currentUser){
       setUser(currentUser)    
    }

    function removeUser(id){
        fetch('http://localhost:8000/data/' + id, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"}
        }).then(() => {
            const newUserData = userData.filter(user => user.id !== id)
            setUserData(newUserData)
        })
        
    }


    function addUser(userToAdd){
    //    const nature =  userData.some(user => user.id === userToAdd.id)

        if(userData.some(user => user.id === userToAdd.id)){
             const newUserData = userData.filter(user => user.id !== userToAdd.id)
             const updatedUserData = [...newUserData,userToAdd]
             setUserData(updatedUserData);
             console.log('updating part was called')

             fetch('http://localhost:8000/data/' + userToAdd.id, {
                method: 'PATCH',
                body: JSON.stringify(userToAdd),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
             


        }else{
            const newUserWithId = {...userToAdd, id: uuidv4()}
            const newUserData = [...userData, newUserWithId]
            // setEditUserData({...newUserWithId})
            setUserData(newUserData)

            fetch("http://localhost:8000/data",{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(newUserWithId)
            })
            .then(()=>{
                setUserData(newUserData)
                setUser(newUserWithId)
            })
        }
        
    }

    
    return (
        <Context.Provider value={{
            userData,
            isPending,
            currentUserFound,
            user,
            addUser,
            error,
            removeUser,
            retrieveData,
            editUserData,
            setGlobalImage,
            globalImage
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}