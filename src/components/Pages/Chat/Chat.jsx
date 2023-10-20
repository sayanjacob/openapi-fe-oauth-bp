import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import axios from 'axios';
import Resp from './Resp';
import API_URL from '../../../Urls/urls';

const LoggedIn = () => {
  // State variables
  const [auth, setAuth] = useState(null); // User authentication data
  const [input, setInput] = useState(''); // User input in the chat
  const [response1, setResponse1] = useState([{ "user_input": "", "response": " Ask Open API?" }]); // Chat responses
  const [history, setHistory] = useState([]); // Chat history from the database
  const nav = useNavigate();   // React Router navigation


  // Load chat history from the database when a response is received
  useEffect(() => {
    async function historydb() {
      try {
        const response = await axios.get(`${API_URL.BACKEND_APIURL}${API_URL.GET_HISTORY}`);
        setHistory(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    historydb();
  }, [response1]);

  // Start a new chat session
  const newchat = async () => {
    if (response1.length >= 2) {
      try {
        const body = response1;
        const response = await axios.post(`${API_URL.BACKEND_APIURL}${API_URL.SAVE_HISTORY}`, body);
        console.log(response);
        setInput('');
        setResponse1([{ "user_input": "", "response": " Ask Open API?" }]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Send a user query to the chatbot
  const sendQuery = async () => {
    if (input === '') {
      alert("The Input is Empty,Please provide a valid Input ");
    } else {
      const body = { "user_input": input };
      try {
        const response = await axios.post(`${API_URL.BACKEND_APIURL}${API_URL.CHAT}`, body);
        setInput('');
        setResponse1([...response1, response.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };


  // Check user authentication on component mount
  useEffect(() => {
    if (localStorage.getItem('JWT') == null) {
      return nav("/");
    } else {
      Axios.get(`${API_URL.BACKEND_APIURL}${API_URL.HOME}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('JWT')}`
        }
      })
        .then((res) => {
          console.log(res);
          setAuth(res.data);
          const token = JSON.stringify(res.data);
          console.log(token);
          sessionStorage.setItem('token', token);
        })
        .catch((err) => console.log(err));
    }
  }, [nav]);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendQuery();
    }
  }

  // Handle user logout
  const handleLogout = () => {
    alert("You are about to Log Out");
    localStorage.removeItem('JWT');
    return nav("/");
  };

  // Render the component
  return (
    <div className="container-fluid">
      {/* Main layout */}
      <div className="row" style={{ height: '100vh' }}>
        {/* Sidebar */}
        <div className="col-sm-12 col-md-6 col-lg-1 d-none d-md-block pt-2 d-flex flex-column justify-content-center"
          style={{ backgroundColor: '#090909', width: '4vw' }}>

          <div className='pt-2  d-flex flex-row justify-content-center'>
            <img className=''
              src="src\assets\openai.png"
              alt="Avatar"
              style={{ width: '2rem', borderRadius: '50px', backgroundColor: '#E7FE4D', padding: '5px' }} />
          </div>
          <div className='d-flex flex-row justify-content-center ' style={{ position: 'absolute', bottom: '4vh' }}>
            <img src="src\assets\logout.png"
              onClick={() => handleLogout()}
              className='btn' alt=""
              style={{ width: '2rem', borderRadius: '10px', backgroundColor: '#1B30BD', padding: '7px' }} />
          </div>
        </div>

        {/* Chat History */}
        <div className="col-sm-12 col-md-6 col-lg-2 d-none d-md-block pt-2" style={{ width: '22vw' }}>
          <div className="row d-flex flex-row justify-content-center">
            <div className="col-6 pt-2">
              <h3>Chats</h3>
            </div>

            <div className="col-3 pt-2">
              <button className='btn'
                style={{ borderRadius: '10px', backgroundColor: '#DCE0D9', padding: '2px 8px 2px 8px' }}>
                <img className=''
                  src="src\assets\write.png"
                  alt=""
                  style={{ width: '1.7rem' }}
                  onClick={newchat} />
              </button>
            </div>

            <div className="col-2 pt-2">
              <img src="src\assets\menu-dots-vertical.png" alt="" style={{ width: '2.1rem' }} />
            </div>
          </div>
          <div className="mt-1" style={{ height: '85vh', overflowY: 'auto' }}>
            <p style={{ fontSize: '10px', fontWeight: '700', color: 'gray' }}>Today</p>
            {history.map(chat => (
              <div key={chat._id} className='historydiv mt-2 px-3 pt-3 pb-1' 
              onClick={() => {
                const allChatData = chat.chatd.map(dat => dat);
                setResponse1(allChatData);
              }}>
                <p className='large-paragraphtitle'
                  style={{ fontSize: '13px', fontWeight: '600' }}>{chat.chatd[chat.chatd.length - 1].user_input}</p>
                <p className='large-paragraph'
                  style={{ fontSize: '10px', fontWeight: '500' }}>{chat.chatd[chat.chatd.length - 1].response}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Response */}
        <div className="col-sm-12 col-md-6 col-lg-6 responsecon">
          <div className="row" style={{ overflowY: 'auto', height: '86vh' }}>
            <Resp res={response1} />
          </div>
          <div className="row mx-1">
            <div className="" style={{ backgroundColor: '#181818', borderRadius: '10px', display: 'flex', justifyContent: 'center' }}>
              <input
                type="text"
                className="inputfi"
                placeholder="Type a message"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                style={{
                  backgroundColor: 'transparent',
                  fontSize: '14px',
                  fontWeight: '600',
                  flex: '1',
                  border: 'none',
                  outline: 'none',
                  textAlign: 'left',
                  color: 'white',
                }}
              />

              <button
                className='btn my-1 mx-0 ms-2 '
                onClick={sendQuery} style={{ float: 'right' }}>
                <img src="src\assets\paper-plane-top.png" alt="" style={{ width: '2.5rem', borderRadius: '10px', backgroundColor: '#1B30BD', padding: '5px' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="col-sm-12 col-md-6 col-lg-3 d-none d-md-block pt-2 mb-1" style={{ width: '23vw' }}>
          <div style={{ height: '71vh' }} className="container-fluid" >
            <h4 style={{ color: 'gray' }} className='pt-4 '>Trending Topics</h4>
            <button className='trending' onClick={() => setInput('SCJ Values?')}> SCJ Values? <img src="src\assets\arrow.png" alt="" style={{ width: '1.5rem' }} /></button>
            <button className='trending' onClick={() => setInput('SCJ Brands?')}>SCJ Brands? <img src="src\assets\arrow.png" alt="" style={{ width: '1.5rem' }} /></button>
            <button className='trending' onClick={() => setInput('SCJ Sustainability?')}> SCJ Sustainability? <img src="src\assets\arrow.png" alt="" style={{ width: '1.5rem' }} /></button>
            <button onClick={() => setInput('What is SC Johnsons most well-known product?')} className='text-start trending'>What is SC Johnson's most well-known product?<img src="src\assets\arrow.png" alt="" style={{ width: '1.5rem' }} /></button>
            <button className='trending' onClick={() => setInput(' Latest AI trends')}> Latest Market trends<img src="src\assets\arrow.png" alt="" style={{ width: '1.5rem' }} /></button>
          </div>
          <div className=" justify-content-center profilediv pt-3 pb-2 mt-4" >
            <div className=" d-flex flex-row justify-content-evenly ">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={auth?.picture || ""}
                  className=""
                  alt="Avatar"
                  style={{ width: '60px', borderRadius: '50px' }}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center text-center">
                <p style={{ fontWeight: '600' }} className=" ">{auth ? auth["name"] : ""}</p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <img src="src\assets\setting.png" className="" alt="Avatar" style={{ width: '35px', borderRadius: '10px' }} />
              </div>
            </div>
            <div className='row mx-5 '>
              <button className='trending text-center align-content-center' style={{ fontSize: '10px' }}>Report An Issue?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoggedIn;
