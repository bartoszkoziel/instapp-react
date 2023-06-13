import React, { useState } from 'react';

export default function Login() {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault();

      if(email === "" || password === "" || firstName === "" || lastName === "") {
         alert("PLEASE FILL OUT THE FORM!")
         return
      }

      try {
         const response = await fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               firstName: firstName,
               lastName: lastName,
               email: email,
               password: password
            }),
         });

         if (response.ok) {
            // Login successful
            alert("ACCOUNT HAS BEEN CREATED" + await response.text())
            console.log('Login successful');
            window.location.pathname = "/login"
         } else {
            // Login failed, handle the error
            alert(await response.text())
            console.log(response)
         }
      } catch (error) {
         console.error('An error occurred', error);
      }
   }

   return (
      <div className="container">
         <h1>CREATE ACCOUNT!</h1>
         <form onSubmit={handleSubmit}>
            <div>
               <label>email: </label>
               <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>
            <div>
               <label>password: </label>
               <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>
            <div>
               <label>firstName: </label>
               <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
               />
            </div>
            <div>
               <label>lastName: </label>
               <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
               />
            </div>
            <button className="button" onClick={handleSubmit}>REGISTER</button>
         </form>
         <a href="/login">LOGIN</a>
      </div>
   )
}