import  { useRef } from 'react'


 const  ExportRef = () => {
  let nameRef = useRef(null);
  let emailRef = useRef(null);
  let phoneRef = useRef(null);
  let passRef = useRef(null);
  return {
   nameRef,
   emailRef,
   phoneRef,
   passRef
  }
}


export default ExportRef 