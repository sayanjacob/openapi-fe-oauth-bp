import  { useEffect } from "react"
import { useNavigate } from "react-router";
import './SignIn.css';
function SignIn(props) {

  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('JWT') !== null) {
      return nav("/home")
    }
  }, [])
  return (
    <div className="container-fluid" style={{ minHeight: '100vh', backgroundColor: '#181818' }}>
      <div className="row mx-auto pt-3 d-flex flex-row justify-content-center">
        <div className="col-6">
          <div className="row pb-5 px-0 mx-0">
            <div className="col-auto">
              <img src="src\assets\logo.png" alt="" className="img-fluid" style={{ width: '2.5vw' }} />
            </div>
            <div className="col">
              <h5 className="mb-0 mx-0 pt-1">OpenAPI</h5>
            </div>
          </div>

          <div className="row d-flex flex-row justify-content-center mt-5">
            <button className="btun" onClick={(e) => props.login(e)} >
              <img
                style={{ width: "2rem" }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google Logo"
              />  Log in With Google
            </button>
          </div>


        </div>
        <div className="col-6 mt-5">
          <h2 className="text-light text-center ">Dive into OpenAPI</h2>
          <div className="row">
            <p className="px-4 pt-4">Given any text prompt, the API will return a text completion,
              attempting to match the pattern you gave it.
              You can “program” it by showing it just a few examples of what you’d like it to do; its success generally varies depending on how complex the task is.
              The API also allows you to hone performance on specific tasks by training on a dataset (small or large) of examples you provide,
              or by learning from human feedback provided by users or labelers.

              
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default SignIn;