import { render } from '@testing-library/react'
import React, { useEffect, useState } from 'react'

export default function Home() {

   const [mode, setMode] = useState('view')
   const [userData, setUserData] = useState(JSON.stringify({
      firstName: "",
      lastName: "",
      email: "",
      pfpUrl: ""
   }))

   const getProfileData = async () => {
      try {
         let bearer = 'Bearer ' + localStorage.getItem("instapptoken")
         const headers = { 'Content-Type': 'application/json', 'Authorization': bearer, }
         const response = await fetch('http://localhost:3000/api/profile', {
            method: 'GET',
            headers: headers
         })

         if (response.ok) {
            let data = await response.json()
            console.log(data)

            setUserData({
               firstName: data.firstName,
               lastName: data.lastName,
               email: data.email,
               pfpUrl: "http://localhost:3000/api/profile/pfp/" + data.id
            })
         } else {
            alert(await response.text())
            logout()
         }
      } catch (error) {
         console.error('An error occurred', error)
      }
   }

   useEffect(() => {
      getProfileData()
   }, [])

   const logout = () => {
      localStorage.removeItem("instapptoken")
      window.location.pathname = "/login"
   }

   const myReadOnly = (prop) => {
      if (mode == "view") return prop
   }

   const changeMode = () => {
      if (mode == "view") {
         setMode("edit")
      }
      else {
         setMode("view")
      }
   }

   return (
      <>
         <main className="profile" >
            <img src={userData.pfpUrl} alt={userData.pfpUrl} />
            <div className="profile-data">
               <p>Imie <input className="float-right" type="text" value={myReadOnly(userData.firstName)} /> </p>
               <p>Nazwisko <input className="float-right" type="text" value={myReadOnly(userData.lastName)} /> </p>
               <p>Email <input className="float-right" type="text" value={myReadOnly(userData.email)} /> </p>
            </div>
         </main>
         <div className='center'>
            <button className="button" onClick={changeMode}>CHANGE PROFILE</button>
            { <button className="button" >SEND</button> }
         </div>
      </>
   )
}