import React, { useState } from 'react'
import './App.css';

import MyProfile from './MyProfile'

function ChangeProfile(props) {

   const [pfp, setPfp] = useState('')
   const [credentials, setCredentials] = useState({
      firstName: "",
      lastName: ""
   })

   const patchPfp = async () => {
      if (pfp == '') {
         alert("Please fill out the form!")
         return
      }

      const fd = new FormData()
      fd.append("file", pfp)

      try {
         let bearer = 'Bearer ' + localStorage.getItem("instapptoken")
         const headers = { 'Authorization': bearer, }
         const response = await fetch('http://localhost:3000/api/profile', {
            method: 'POST',
            headers: headers,
            body: fd
         })

         if (response.ok) {
            alert("przeslano zdjecie profilowe")
            props.updateProfile()
            props.changeMode(<MyProfile setSubPage={props.changeMode} />)
         } else {
            console.log(await response.text())
         }
      } catch (ex) {
         console.log(ex)
      }
   }

   const patchCredentials = async () => {
      if (credentials == '') {
         alert("Please fill out the form!")
         return
      }

      let body = JSON.stringify(credentials)

      try {
         let bearer = 'Bearer ' + localStorage.getItem("instapptoken")
         const headers = { 'Authorization': bearer, }
         const response = await fetch('http://localhost:3000/api/profile', {
            method: 'PATCH',
            headers: headers,
            body: body
         })

         if (response.ok) {
            alert("przeslano nowe dane")
            props.updateProfile()
            props.changeMode(<MyProfile setSubPage={props.changeMode} />)
         } else {
            console.log(await response.text())
         }
      } catch (ex) {
         console.log(ex)
      }
   }

   const creadentialsChange = (e, type) => {
      let oldstate = credentials
      if (type == "fname"){
         oldstate.firstName = e.target.value
      } else if(type == "lname") {
         oldstate.lastName = e.target.value
      }

      setCredentials(oldstate)
   }

   return (
      <>
         <main className="profile2" >
            <p>PFP : <input
               className='float-right'
               type="file" name="file"
               onChange={(e) => setPfp(e.target.files[0])} />
            </p>
            <button className="button" onClick={patchPfp} >Add new PFP</button>
         </main>

         <main className="profile2" >
            <p>FIRST NAME : <input className='float-right' type="text" onChange={(e) => { creadentialsChange(e, "fname") }} /></p>
            <p>LAST NAME : <input className='float-right' type="text" onChange={(e) => { creadentialsChange(e, "lname") }} /></p>

            <button className="button" onClick={patchCredentials} >Change your credentials</button>
         </main>
      </>
   )
}

export default ChangeProfile;