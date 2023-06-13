import React, { useState } from 'react'
import './App.css';

import MyProfile from './MyProfile'

function ChangeProfile(props) {

   console.log("PROPS : ", props)

   const [pfp, setPfp] = useState('')
   const [credentials, setCredentials] = useState('')

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
            <p>FIRST NAME : <input className='float-right' type="text" name="text" /></p>
            <p>LAST NAME : <input className='float-right' type="text" name="text" /></p>
            <p>EMAIL : <input className='float-right' type="text" name="text" /></p>
            <button className="button" >Change your credentials</button>
         </main>
      </>
   )
}

export default ChangeProfile;