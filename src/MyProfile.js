import React, { useEffect, useState } from 'react'

export default function Home() {

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

   return (
      <main>
         <p>Imie <input type="text" value={userData.firstName} /> </p>
         <p>Nazwisko <input type="text" value={userData.lastName} /> </p>
         <p>Email <input type="text" value={userData.email} /> </p>
         <img src={userData.pfpUrl} alt={userData.pfpUrl} />
      </main>
   )
}