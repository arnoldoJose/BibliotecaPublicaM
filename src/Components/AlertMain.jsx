import React, {useRef} from 'react'
import '../Css/estilosAlert.css';
const AlertMain = () => {
const windowRef = useRef(null);
let iconMain = useRef(null);

const closeWindow = () => {
 
  let ar = [...iconMain.current.classList]
  if (ar.includes("content-icono-error") || ar.includes("content-icono-success")){
    iconMain.current.classList.remove("content-icono-error")
    iconMain.current.classList.remove("content-icono-success");
    windowRef.current.style.display = "none";
  }
} 
 
  return (
    <div className='alert-main' ref={windowRef} style={{display: 'none'}}>
      <section className="container-alert">
        <div className="card">
         <div className="container-close">
            <span className='close-btn' onClick={closeWindow} >X</span>
         </div>
         <div className="container-utils">
           <div className="icon-main" ref={iconMain}>
             <span className='content-error-x' >
               <span className='span-left' ></span>
               <span className='span-right' ></span>
             </span>
           </div>
           <div className="container-message-info">
             <h4 className='message-info-util'> </h4>
           </div>
         </div>
        </div>
      </section>
    </div>
  )
}

export default AlertMain
