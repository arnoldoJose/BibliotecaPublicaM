import React, { useContext,useState,useRef } from 'react'

import '../Css/login.css';
import Card from './Card';
import clienteAxios from '../Config/config';

import { CRMAuthContext } from '../Context/AuthContext';
import { useHistory,NavLink } from 'react-router-dom';
import { messageError } from '../Utils/alertFuntional';
import Swal from 'sweetalert2';

import Layout from './Layout';

const Login = () => {

  const [userData,setData] = useState({});
  const [statePass,changeState] = useState(false);

  let history = useHistory();
  const {setAuth} = useContext(CRMAuthContext); 
  let emailRef = useRef(null);
  let passRef = useRef(null);

  const saveDataUser = (e) => {
    let {name,value} = e.target;
    setData({ ...userData, [name]: value });
  }


    const loginUser = async (e) => {
      e.preventDefault();
      if (!emailRef.current.value || !passRef.current.value) {
        messageError("los campos no pueden estar vacios")
        return;
      }

      try {
        let data = await clienteAxios.post("login/user", userData);
        setAuth({ auth: true, token: data.data.token, user: data.data.user });
        localStorage.setItem("token", data.data.token);

        if (data.status === 200) history.push("/BibliotecaPublicaM");
      } catch (error) {
        messageError(error.response.data.message);
      }
    };

  const verify = () => {
    if (emailRef.current.value.indexOf("@") === -1) emailRef.current.setCustomValidity("el correo no es valido falta @")
    else emailRef.current.setCustomValidity("");

    // if(passRef.current.value.length <= 7) passRef.current.setCustomValidity("su contraseña debe tener 8 digitos");
    // else passRef.current.setCustomValidity("")
  }

  const viewPassword = () => {
    if (!statePass) {
      passRef.current.removeAttribute("type");
      changeState(true);
    } else {
      passRef.current.setAttribute("type", "password");
      changeState(false)
    }
  }
 
  return (
    <Layout>
      <Card>
       <form  onSubmit={loginUser} className='login-form'>
         <div className="form-group form-group-login">
           
           <div className="container-input">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
                <input type="text" ref={emailRef} name='email' onBlur={verify} onChange={saveDataUser} className="form-control" placeholder='Correo@correo' />
              
           </div>
           </div>
           <div className="form-group form-group-login">
             
             <div className="container-input">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <div className="container-ref">
             <input type="password" ref={passRef} name='password' onBlur={verify} onChange={saveDataUser} className="form-control" placeholder='Contraseña' />
               <div className="content-svg">
                  <button type='button' onClick={viewPassword} className='btn btn-dark'>
                    {
                      (!statePass) ?
                        (
                          <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16" >
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                          </svg>
                        ) :
                        (
                          <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16" >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                          </svg>
                        )
                    }
                  </button>
               </div>
              </div>
             </div>
             </div>
          <div className="d-grid gap-2 col-6 mx-auto">
           <input type="submit" className='btn btn-primary' value="Ingresar" />
          </div>
          <div className="link-regis">
          <label htmlFor="">Si no tienes una cuenta </label>
             <NavLink to="/registrate" >
              Registrate
            </NavLink>
          </div>
       </form>
      </Card>
    </Layout>
  ); 
}
export default Login 