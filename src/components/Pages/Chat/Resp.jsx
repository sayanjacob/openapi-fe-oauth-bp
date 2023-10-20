/* eslint-disable react/prop-types */

const Resp = ({res}) => {
  // Retrieve the user's token from sessionStorage and parse it as JSON
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);

  return (
    <>
      {/* Map through the 'res' prop, which is an array of messages */}
      {res.map((item, index) => (
        <div key={index} className='container-fluid pt-2 fontc' style={{ overflowY: 'auto' }}>
          {/* Render the user's input if it's not empty */}
          {item.user_input !== '' && (
            <div className='row m-1 p-1' style={{ backgroundColor: "#19191A", borderRadius: '10px' }}>
              <div className="col-1 pt-3">
                {/* Display the user's profile picture */}
                <img src={userToken.picture} alt="Avatar" style={{ width: '30px', borderRadius: '50px' }} />
              </div>
              <div className="col-11">
                <h6 className='pt-3 pb-0' style={{ fontSize: '8px', fontWeight: '500' }}>
                  {userToken.name}
                </h6>
                {/* Display the user's input message */}
                <p style={{ fontWeight: '600', fontSize: '13px' }} className="p-0 pe-3">
                  {item.user_input}
                </p>
              </div>
            </div>
          )}
          {/* Always render the response message */}
          <div className='row m-1 mt-3 p-1' style={{ backgroundColor: "#181719", borderRadius: '10px' }}>
            <div className="col-1 pt-3">
              {/* Display the OpenAI's profile picture */}
              <img src="src\assets\openai.png" alt="Avatar" style={{ width: '30px', borderRadius: '50px', backgroundColor: '#E7FE4D', padding: '5px' }} />
            </div>
            <div className="col-11">
              <h6 className='pt-3' style={{ fontSize: '8px', fontWeight: '700' }}>OPENAPI</h6>
              {/* Display the response message */}
              <p style={{ fontWeight: '500', fontSize: '12px', color: 'gray' }} className='typing-demo text-start pe-3'>
                {item.response}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Resp;
