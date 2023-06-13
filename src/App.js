import './App.css';
import Login from './Login'
import Register from './Register'
import Navbar from './Navbar';

function App() {
  if (window.location.pathname === "/" && localStorage.getItem("instapptoken") === null) window.location.pathname = "/login"
  else if (window.location.pathname === "/login") return (<Login />)
  else if (window.location.pathname === "/register") return (<Register />)
  else if (window.location.pathname === "/" && localStorage.getItem("instapptoken") !== null) return (<Navbar />)
}

export default App;