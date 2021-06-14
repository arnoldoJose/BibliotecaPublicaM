import React, { useState,useContext, useEffect } from 'react';
import { CRMAuthContext } from '../Context/AuthContext';
import { jsPDF } from 'jspdf'
import clienteAxios from '../Config/config';
import Layout from './Layout';
import imgT from '../Img/img-tiket.png';
import Spinner from '../Styled/Spinner';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const StyledUl = styled.ul`
 li > p > .portada {
   position: relative;
   bottom: 4em;
 }
 p {
   height: 9em;
 }
`;


const MisLoans = () => {

  const [status,setStatus] = useState(true)
  const [loan,setLoans] = useState([]);
  const { auth } = useContext(CRMAuthContext)
  let { _id } = auth.user;

  useEffect(() => {
    if(status){
      let getLoans = async () => {
        let data = await clienteAxios.get(`get/user/loans?id=${_id}`);
        setLoans(data.data);
      }
      getLoans();//imprimir el mensaje que viene del servidor
      setStatus(false)
    }
  }, [_id,status])


  const devolution = async (dat) => {
     let data = await clienteAxios.put(`update/loan/${dat._id}`);
     generatePdf(dat)  
    Swal.fire(`${data.data.message}`, 'You clicked the button!', 'success');
   
    setStatus(true);
  }

  const generatePdf = (datos) => {
    let pdf = new jsPDF()
    pdf.setFontSize(40);
    pdf.text(10, 20, "Biblioteca Publica La Merced");
    pdf.addImage(imgT, "PNG", 70, 30, 65, 65);
    pdf.setFontSize(20);
    pdf.text(40, 125, "Nombre Libro:");
    pdf.text(40, 140, "Nombre Persona:");
    pdf.text(40, 156, "Fecha Prestamo:");
    pdf.text(40, 170, "Fecha devolucion:");
    pdf.text(40, 186, "Estado:");

    pdf.setFontSize(20);
    pdf.text(110, 125, `${datos.name_book}`);
    pdf.text(110, 140, `${auth.user.username}`);
    pdf.text(110, 156, `${datos.date_loan}`);
    pdf.text(110, 170, `${datos.return_date}`);
    pdf.text(110, 186, "Devolucion");

    pdf.setFontSize(40);
    pdf.text(40, 250, "Ticket de Devolucion");

    pdf.autoPrint({ variant: "non-conform" });
    pdf.save("print.pdf")
  }

  return ( 
    <Layout>
      <>
      <div className="container">
        <h3>Mis Prestamos</h3>
      </div>
     {(!loan.length) ? (<Spinner />) :(

     <StyledUl className="list-group">
       {
         loan.map((item) => (
          
             <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
               <p>
               <span className="portada">Portada:</span>
                 {" "}
                 <img src={item.image_book} width="110" height="130" alt="" />
               </p> 
               <p>
               <span>Libro:</span>
               {" "}
               {item.name_book}
               </p>
               <p>
                 <span>Fecha prestamo:</span>
                 {" "}
                 {item.date_loan}
               </p>
               <p>
                 <span>Fecha a devolver:</span>
                 {" "}
                 {item.return_date}
               </p>
               <p>
                 <button className="btn btn-success btn-sm" onClick={() => devolution(item)} >Devolver</button>
               </p>
              </li>
         
         ))}
     </StyledUl>)}
    </>
    </Layout>
  )
}

export default MisLoans
