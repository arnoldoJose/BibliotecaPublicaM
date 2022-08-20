import React, {useState,useEffect} from "react";
import Layout from "./Layout";
import TableData from './TableData';
import Search from './Search';
import Spinner from '../Styled/Spinner';

import clienteAxios from '../Config/config'
import '../Css/estiloBook.css';
// import "bootstrap/dist/css/bootstrap.min.css"

// const Search = lazy(() => import('./Search'))
// const TableData = lazy(() => import('./TableData'))

const CardBook = () => {

  const [books, saveBooks] = useState([]);
  const [status,verifyStatus] = useState(true);
  const [messageError, saveMessage] = useState("");


  useEffect(() => {
    if(status){
      const consultarAPI = async () => {
      let data = await clienteAxios.get("get/books");
      saveBooks(data.data);
      }
      consultarAPI();
      verifyStatus(false);
    }
  },[status,verifyStatus])


  const loadL = () => {
    console.log("loadesd");
  }

  return (
    <Layout>
      {(!books.length) ? <Spinner /> : (
        <>
          <div className="container" onLoad={loadL}>
            <div className="container-search-input d-flex">
                <Search saveBooks={saveBooks} saveMessage={saveMessage} verifyStatus={verifyStatus} />
          
            </div>
          </div>
          <div className="container-message ">
            {!messageError ? null : <div className="error">{messageError}</div>}
          </div>
          {
            books.map((item) => (
              <div key={item._id} id={item._id} className="card mb-3 content-all mt-5">
                <div className="row g-0 Row">
                  <div className="col-sm-8 col-md-5 col-lg-3">
                    <img
                      src={item.book_cover}
                      alt="..."
                      width="170"
                      height="230"
                    loading="lazy"
                    />
                  </div>
                    <div className="col-md-8 content-book">
                      <div className="card-body card-content">
                        <div className="container-list-info">
                          <TableData item={item} />
                        </div>
                      </div>
                    </div>
                  
                </div>
              </div>
            ))
          }
        </>
      )}
    </Layout>
  );
};

export default CardBook;