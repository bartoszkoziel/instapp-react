import './App.css';
import Login from './Login'
import Register from './Register'

function App() {
  if(window.location.pathname === "/") window.location.pathname = "/login"
  else if(window.location.pathname === "/login") return(<Login />)
  else if(window.location.pathname === "/register") return(<Register />)
}

export default App;