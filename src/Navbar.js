import React, { useState } from 'react'
import Home from './Home';
import AddPost from './AddPost'
import MyPosts from './MyPosts'
import MyProfile from './MyProfile'

export default function Navbar() {

   const [subPage, setSubPage] = useState(<Home />);

   const logout = () => {
      localStorage.removeItem("instapptoken")
      window.location.pathname = "/login"
   }

   return (
      <nav>
         <ul className='navbar1'>
            <li onClick={() => setSubPage(<Home />)}>Home</li>
            <li onClick={() => setSubPage(<AddPost />)}>Add Post</li>
            <li onClick={() => setSubPage(<MyPosts />)}>My Posts</li>
            <li onClick={() => setSubPage(<MyProfile setSubPage={setSubPage} />)}>My Profile</li>
            <li onClick={logout}>Logout</li>
         </ul>
         {subPage}
      </nav>
   )
}