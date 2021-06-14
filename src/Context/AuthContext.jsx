import React,{useState} from 'react';

const CRMAuthContext = React.createContext();

const AuthContext = ({children}) => {
  const [auth,setAuth] = useState({
    auth: false,
    token: '',
    user: ''
  });

  return (
    <CRMAuthContext.Provider value={{auth,setAuth}}>
      {children}
    </CRMAuthContext.Provider>
  )
}

export { AuthContext,CRMAuthContext }
