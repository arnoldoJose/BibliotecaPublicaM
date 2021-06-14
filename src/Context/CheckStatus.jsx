import react, {useState} from 'react'

const CRMSBookContext = react.createContext();

const ProviderBook = ({children}) => {
  const [book, setBook] = useState("");
  return (
    <CRMSBookContext.Provider value={{book,setBook}}>
      {children}
    </CRMSBookContext.Provider>
  )
}

export { ProviderBook, CRMSBookContext }
