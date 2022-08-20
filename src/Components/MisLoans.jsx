import React, { useState,useContext, useEffect } from 'react';

import  '../Css/estilosLoans.css';
import styled from 'styled-components';

import clienteAxios from '../Config/config';
import Layout from './Layout';
import imgT from '../Img/img-tiket.png';
import Spinner from '../Styled/Spinner';
// import Swal from 'sweetalert2';
import { messageSucces } from '../Utils/alertFuntional'
import { CRMAuthContext } from '../Context/AuthContext';
import { jsPDF } from 'jspdf'

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
  const { auth } = useContext(CRMAuthContext);

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
    messageSucces(`${data.data.message}`);
   
    setStatus(true);
  }

  const generatePdf = (datos) => {
    
    let year = new Date().getFullYear(),
      month = new Date().getMonth() + 1,
      day = new Date().getDate();
    let fecha = `${year}-${month <= 9 ? "0" + month : month}-${day <= 9 ? "0" + day : day}`;


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

    if (fecha.split("-")[2] > datos.return_date.split("-")[2]) {
      pdf.setFontSize(20);
      pdf.text(40, 198, "Aviso:");
      pdf.text(110, 198, "devolucion retrasada",);
    }
    pdf.setFontSize(40);
    pdf.text(40, 250, "Ticket de Devolucion");
    pdf.save("print.pdf")

  }
  

  return ( 
    <Layout>
      <>
      <div className="container" style={{textAlign:"center"}}>
        <h3>Mis Prestamos</h3>
      </div>
     {(!loan.length) ? (<Spinner />) :(

     <StyledUl className="list-group">
       <div className="table-responsive">

           <table  className="table" >
             <thead className="table-dark">
                  <tr>
                    <th scope="col">Portada</th>
                    <th scope="col">Libro</th>
                    <th scope="col">Fecha Prestamo</th>
                    <th scope="col">Fecha a Devolver</th>
                    <th scope='col'>Acciones</th>
                  </tr>
             </thead>
             <tbody>
           {
            loan.map((item) => (
              <tr>
              <td>
              <img src={item.image_book} width="110" height="130" alt="" />
              </td>

            <td>{item.name_book}</td>
            <td>{item.date_loan}</td>
            <td>{item.return_date}</td>
            <td><button className="btn btn-success btn-sm" onClick={() => devolution(item)} >Devolver</button></td>
             </tr>
            ))
         
           }
               </tbody>
           </table >
         </div>
     </StyledUl>)}
    </>
    </Layout>
  )
}

export default MisLoans




