import React, { useState } from 'react'

export default function Home() {

   const [file, setFile] = useState('')
   const [album, setAlbum] = useState('')

   const postFileToServer = async () => {

      if (file == '' || album == '') {
         alert("Please fill out the form!")
         return
      }

      const fd = new FormData()
      fd.append("file", file)
      fd.append("album", album)

      try {
         let result = await fetch("http://localhost:3000/api/photos", { method: "POST", body: fd })
         if (result.ok) {
            alert("przeslano zdjecie")
         }
      } catch (ex) {
         console.log(ex)
      }
   }

   return (
      <main>
         <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
         <input type="text" name="text" onChange={(e) => setAlbum(e.target.value)} />
         <button onClick={postFileToServer}>Add Photo to album</button>
      </main>
   )
}