import React, {useContext,useEffect,useRef} from 'react'
import '../Css/layaoutstyle.css';
import logo from '../Img/logo.png';
import styled from 'styled-components';

import AlertMain from './AlertMain';

import { showsOcult } from './Function/change'
import { CRMAuthContext } from '../Context/AuthContext';
import { CRMContext } from '../Context/Provider';
import { NavLink, withRouter,useHistory } from 'react-router-dom';



const StyledLogo = styled.div`
.logo{
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo > img {
  position: relative;
  top: 0.2em;
}
`

const Layout = ({children}) => {

  
  const { auth, setAuth} = useContext(CRMAuthContext);
  const { stateKey, setKey } =  useContext(CRMContext);
  let { location,replace } = useHistory();
  
  const refBook = useRef(null);
  const refSesion = useRef(null);
  const refLoans = useRef(null);
  

  useEffect(() => {
    showsOcult(location.pathname,stateKey,refBook,refSesion,refLoans);

  }, [stateKey,setKey,location.pathname])

  const changeUrl = (e) => {
    setKey(Number(e.target.parentElement.id))
  }
  
  const closeSesion = () => {
    setKey(2);
    setAuth({auth:false,token: "",user: ""});
    replace("/login");
  }
  
  return (
    <div className="App">
      <AlertMain/>
      <header className="App-header">
        <StyledLogo>
          <div className="logo">
            <img src={logo} height="110" width="105" alt="" />
          </div>
        </StyledLogo>
        <nav className='navigate'>
          <ul className='list-navigate'>
            <li id='1' onClick={changeUrl} ref={refBook}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                  <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
              </span>

              <NavLink className='span-url' to="/BibliotecaPublicaM">
                Libros
              </NavLink>
          
            </li>
            {(!auth.auth) ?
            (null) :
           (<li id='3' onClick={changeUrl} ref={refLoans}>
              <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-calendar-date-fill" viewBox="0 0 16 16">
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                    <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z" />
                  </svg>
              </span>

                <NavLink className='span-url' to="/loans">
                  Mis prestamos
                </NavLink>
              
            </li>
           )}

          { (!auth.auth) ? 
              (<li id='2'  onClick={changeUrl} ref={refSesion}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </span>
                <NavLink className='span-url' to="/login">
                Iniciar sesion
              </NavLink>
            
            </li>)
            :
            (<li onClick={closeSesion}>
              <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
              </span>
                  <NavLink className='span-url' to="/login">
                  Cerrar sesion
                </NavLink>
              
            </li>)
            }
          </ul>
        </nav>
      </header>

      <main>
        <section className='title-layaout'><h1>Biblioteca Publica La Merced</h1></section>

        <div className="container-data">
          {children}
        </div>
      </main>

      <footer></footer>
    </div>
  )
}

export default withRouter(Layout)

