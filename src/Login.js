import React, { useState } from 'react';

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
         });

         if (response.ok) {
            // Login successful, perform necessary actions
            console.log('Login successful');
         } else {
            // Login failed, handle the error
            console.error('Login failed');
         }
      } catch (error) {
         console.error('An error occurred', error);
      }
   }

   return (
      <div className='container'>
         <img className='welcomeImg' src={require('./welcomePhoto.jpeg')} />
         <h1>Login</h1>
         <form onSubmit={handleSubmit}>
            <div>
               <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>
            <div>
               <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>
            <button type="submit">Login</button>
            <a href="/register">CREATE AN ACCOUNT</a>
         </form>
      </div>
   );
}