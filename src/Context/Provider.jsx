import React, {useState} from 'react'

const CRMContext = React.createContext();


const Provider = ({children}) => {

  const [stateKey, setKey] = useState("");

  return (
    <CRMContext.Provider value={{ stateKey, setKey}}>
      {children}
    </CRMContext.Provider>
  )
}

export {Provider,CRMContext}
