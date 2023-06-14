import React, { useEffect, useState } from 'react'
import ChangeProfile from './ChangeProfile'

export default function MyProfile(props) {

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
      getProfileData()
   }, [])

   const logout = () => {
      localStorage.removeItem("instapptoken")
      window.location.pathname = "/login"
   }

   const update = () => {
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
               <p>Imie:  <span className="float-right">{userData.firstName}</span> </p>
               <p>Nazwisko: <span className="float-right">{userData.lastName}</span> </p>
               <p>Email: <span className="float-right">{userData.email}</span> </p>
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