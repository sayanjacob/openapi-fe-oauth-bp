import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import Loggedin from "./components/Pages/Chat/Chat";
import { Routes, Route, Outlet} from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router";
import SignIn from './components/Pages/SignIn/SignIn';
import API_URL from './Urls/urls'


function App() {
  const nav = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    Axios.get(`${API_URL.BACKEND_APIURL}${API_URL.LOGIN}`, {
      headers: {
        "Access-Control-Allow-Origin": "* ",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
      .then((res) => {
        window.location.assign(res.data.auth_url);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem('JWT') == null) {
      const query = new URLSearchParams(window.location.search);
      const token = query.get('jwt');
      if (token) {
        localStorage.setItem('JWT', token);
        return nav('/home');
      }
    }
  }, [nav]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn login={handleClick} />} default />
        <Route path="/home" element={<Loggedin />} />
        <Route path="/*" element={<Outlet />} />
      </Routes>
    </>
  );
}

export default App;
