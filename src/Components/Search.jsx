import React, { useState } from 'react'

import clienteAxios from '../Config/config';
import '../Css/estilosBooks.css';

const Search = ({ saveBooks, saveMessage, verifyStatus }) => {

  
   const [nameBook,saveNameBook] = useState("");

     const handelSubmit = async () => {
       let data = await clienteAxios.get(`get/book?name=${nameBook.name}`);
    
       if(data.data.message){//mejorar esto!
         saveMessage(data.data.message)
        return;
       }else{
         saveMessage("")
         saveBooks(data.data.book);
       }
     };

   const handelChange = e => {
     
     let {name,value} = e.target;

     saveNameBook({...nameBook,[name]: value});
    
     if (value.length >= 3) {
       handelSubmit();
     } else if (!value.length) {
       saveMessage("")
       verifyStatus(true);
     } 
  }

  return (
    <>
      <div className="input-group">
        <input
          type="text"
          onChange={handelChange}
          name="name"
          className="form-control mx-3 search-input-book"
          placeholder="Nombre del Libro O Autor"/>
      </div>
      <input
        type="button"
       
        className="btn btn-success"
        value="Buscar"/>
    </>
  );
}

export default Search
