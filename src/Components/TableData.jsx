import React, { useState,useContext,useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import clienteAxios from '../Config/config';

import imgT from '../Img/img-tiket.png';
// import Swal from 'sweetalert2';

import { messageError,messageSucces } from '../Utils/alertFuntional';
import { CRMAuthContext } from '../Context/AuthContext'
import { CRMSBookContext } from '../Context/CheckStatus';
import { removeAttribute } from './Function/removeAtt';
import { getMon,getDate,dayLast } from './Function/FunctionalData';

const TableData = ({item}) => {

  const { auth } = useContext(CRMAuthContext)
  const {book,setBook} = useContext(CRMSBookContext);
  const [dataUser,setDataUser] = useState("");

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const dateRef = useRef(null);

 

  useEffect(() => {
    if(!auth.auth){
    removeAttribute();
    }
  },[auth])

  
  const getId = async (e) => {
    let id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    
    if (!auth.auth) {
      messageError('Para hacer un prestamos inicia sesion o registrate');
    }else{
      let data = await clienteAxios.get(`get/book/${id}`);
      setBook(data.data.data);
    }

  }

  let createReservation = async (data) => {    
 
  let datos = {
    book_id: data._id,
    user_id: auth.user._id,
    name_user: auth.user.username,
    mobile_user:auth.user.mobile,
    image_book: data.book_cover,
    name_book: data.name,
    return_loan: "",
  }
 
    let dataR = await clienteAxios.post("create/loan",datos);
    console.log(dataR);
  }
  
  const reservation = async (e) => {
    let id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    if (!auth.auth) {
      // Swal.fire({icon:"error",title:"opppps",text:"error"})
      messageError('Para hacer una reservacion inicia sesion o registrate');
    }else{
      let data = await clienteAxios.get(`get/book/${id}`);
      if (data.status === 200) messageSucces("Reservacion procesada");
      createReservation(data.data.data);
    }
    
  }


  const createPdf = (data) => {
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
    pdf.text(110, 125, `${data.name_book}`);
    pdf.text(110, 140, `${auth.user.username}`);
    pdf.text(110, 156, `${data.date_loan}`);
    pdf.text(110, 170, `${data.return_date}`);
    pdf.text(110, 186,"Prestamo");

    pdf.setFontSize(40);
    pdf.text(40, 250, "Ticket de Prestamo");
    pdf.save("print.pdf");
    
    // pdf.autoPrint();
    // pdf.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
    // pdf.autoPrint();
    // pdf.output('pdfobjectnewwindow');
    // pdf.autoPrint({variant:'non-conform'});

  }
  

  const createLoan = async () => {
 
    if (!nameRef.current.value || !phoneRef.current.value || !dateRef.current.value) {
      messageError('el prestamo no puede ser procesado llene los campos');
      return;
    }

    let dataLoan = {
      book_id: book._id,
      user_id: auth.user._id,
      name_user: dataUser.name_user,
      mobile_user: dataUser.mobile_user,
      image_book: book.book_cover,
      name_book:  book.name,
      return_loan: dataUser.return_loan
    }
  
    let data = await clienteAxios.post("admin/loan",dataLoan);
    createPdf(data.data.data);
    messageSucces(`${data.data.messageCorrect}`);
    document.querySelector("#form-loan").reset();

  }

  const handelChange = (e) => {
    let { name,value } = e.target;
    setDataUser({
      ...dataUser,
      [name] : value
    });
  }


  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre Libro</th>
            <th scope="col">Autor</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id={item._id}>
            <td>{item.name}</td>
            <td>{item.autor}</td>
            {
              (item.amount === 0) ?
                (<td style={{ background: "#f8d7da"}} >No disponible</td>)
                :
                (<td>disponible</td>)
            }

            <td className="content-btn">
              {(item.amount === 0) ? (
                <button className="btn btn-success btn-sm" disabled={true}>
                  Prestar
                </button>) 
                : (
                <>
                <button type="button" id="modalLoan" onClick={getId} className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Prestar</button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div className="modal-dialog">
                 <div className="modal-content">
                   <div className="modal-header">

                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div className="modal-body">
                    <form id="form-loan">
                      <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">Nombre & Apellido:</label>
                        <input type="text" ref={nameRef} onChange={handelChange} name="name_user" placeholder="Nombre / Apellido" className="form-control" id="recipient-name" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label">Numero de Telefono:</label>
                        <input type="text" ref={phoneRef} onChange={handelChange}  name="mobile_user" placeholder="Telefono" className="form-control" id="recipient-mobile" />
                      </div>
                    </form>
                   </div>
                   <div className="container-label">
                     <label htmlFor="">Marca el Dia Para Devolver el Libro</label>
                  </div>
                   <div className="container-date">
                            <input type="date" ref={dateRef} onChange={handelChange} className="form-control" min={`${new Date().getFullYear()}-${(getMon <= 9 ? ('0' + getMon) : (getMon))}-${(getDate <= 9 ? ('0' + getDate) : (getDate))}`} max={`${new Date().getFullYear()}-${(getMon <= 9) ? ('0' + getMon) : (getMon)}-${(dayLast <= 9) ? ('0' + dayLast) : (dayLast)}`} name="return_loan" id="date"/>
                   </div>
                  <div className="modal-footer">
                     <button type="button" onClick={createLoan} className="btn btn-primary btn-block btn-api">Realizar Prestamo</button>
                   </div>
                 </div>
              </div>
              </div>
                </>
                )}

              {(item.amount === 0) ? (
                <button className="btn btn-success btn-sm" onClick={reservation}>
                  Reservar
                </button>) 
                : (<button className="btn btn-success btn-sm" disabled={true}>Reservar</button>)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableData
