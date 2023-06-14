import React, { useState } from 'react'

export default function Albums() {

   const [album, setAlbum] = useState('')
   const [imgTab, setImgTab] = useState('')

   const showAlbum = async () => {
      if (album == '') {
         alert("Please fill out the form!")
         return
      }

      try {
         const response = await fetch('http://localhost:3000/api/photos', {
            method: 'GET'
         })

         if (response.ok) {
            let tab = await response.json()
            displayImages(album, tab)

         } else {
            console.log("WRONG RESPONSE")
         }
      } catch (ex) {
         console.log(ex)
      }
   }

   const displayImages = (album, photosTab) => {
      let idsToDisplay = []

      photosTab.forEach(el => {
         if (el.album == album) {
            let tempUrl = "http://localhost:3000/api/getfile/" + el.id
            idsToDisplay.push(<img height={180} width={180} src={tempUrl} alt='zdjecie slepaku' />)
         }
      })

      setImgTab(idsToDisplay)
   }

   const handleAlbumChange = (e) => {
      setAlbum(e.target.value)
   }

   return (
      <main className="container2" >
         <h1 style={{ marginBottom: "20px" }}>Show albym by its name</h1>
         <span>
            <span style={{ marginRight: "10px" }}> Name: </span>
            <input style={{ marginRight: "10px" }} onChange={(e) => { handleAlbumChange(e) }} type="text" />
            <button onClick={showAlbum} >SHOW</button>
         </span>

         <div className='albumBook'>{imgTab}</div>

      </main>
   )
}