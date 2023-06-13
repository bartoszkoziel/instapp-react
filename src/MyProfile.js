import React, { useEffect, useState } from 'react'
import ChangeProfile from './ChangeProfile'

export default function MyProfile(props) {

   console.log(props)

   const [userData, setUserData] = useState(JSON.stringify({
      firstName: "",
      lastName: "",
      email: "",
      pfpUrl: ""
   }))

   const getProfileData = async () => {
      console.log("BANG BANG!")
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
               pfpUrl: "http://localhost:3000/api/profile/pfp/" + data.id + `?timestamp=${ Date.now() }`
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
      console.log("---- USE EFFECT!!! ----")
      getProfileData()
   }, [])

   const logout = () => {
      localStorage.removeItem("instapptoken")
      window.location.pathname = "/login"
   }

   const update = () => {
      console.log("---UPDATE EXECUTED---")
      setUserData(JSON.stringify({
         firstName: "",
         lastName: "",
         email: "",
         pfpUrl: ""
      }))
   }

   return (
      <>
         <main className="profile" >
            <img height={180} width={180} src={userData.pfpUrl} alt={userData.pfpUrl} />
            <div className="profile-data">
               <p>Imie <input readOnly className="float-right" type="text" value={userData.firstName} /> </p>
               <p>Nazwisko <input readOnly className="float-right" type="text" value={userData.lastName} /> </p>
               <p>Email <input readOnly className="float-right" type="text" value={userData.email} /> </p>
            </div>
         </main>
         <div className='center'>
            <button
               onClick={() => props.setSubPage(<ChangeProfile changeMode={props.setSubPage} updateProfile={update} />)}
               className="button" >
               CHANGE PROFILE
            </button>
         </div>
      </>
   )
}