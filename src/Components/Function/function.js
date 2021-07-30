// //CREAR UNA CLASE QUE MANEJE TODO LA LOGICA PARA LOS EVENTOS DEL FORMULARIO

// import clienteAxios from "../../Config/config";
// import Swal from "sweetalert2";

//  const dataLocal = () => {
//  if(localStorage.getItem("data")){
//  let { mobile_user, name_user } = JSON.parse(localStorage.getItem("data"));
//  return { mobile_user, name_user };
//  }
// };

// class ValidateForm {
//   verifyInputLength = (oneInput, secondaryInput) => {
//     oneInput.style.borderBottomColor = "red";
//     secondaryInput.style.borderBottomColor = "red";
//   };

//   showMessage = (message) => {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: `${message}`,
//     });
//   };

//   verifyValue = () => {
//     let inputData = document.querySelectorAll(".form-control");

//     if (!inputData[0].value && !inputData[1].value) {
//       this.verifyInputLength(inputData[0], inputData[1]);
//       return false;
//     } else {
//       return true;
//     }
//   };

//   verifyLength = () => {
//     let inputData = document.querySelectorAll(".form-control");
//     let date = document.querySelector("#date");

//     if (inputData[0].value.length <= 6) {
//       inputData[0].style.borderBottomColor = "red";
//       let message = "el nombre debe tener mas de 6 caracteres";
//       this.showMessage(message);
//       return false;
//     } else if (inputData[1].value.length <= 7) {
//       inputData[1].style.borderBottomColor = "red";
//       let message = "el numero debe tener mas de 8 digitos";
//       this.showMessage(message);
//       return false;
//     } else if (date.value === "") {
//       let message = "Marca el dia para devolver el libro";
//       this.showMessage(message);
//       return false;
//     } else {
//       return true;
//     }
//   };

//   saveDataLocal(name_user, mobile_user, name_book) {
//     localStorage.setItem(
//       "data",
//       JSON.stringify({ name_user, mobile_user, name_book })
//     );
//   }

//   verifyLocal(name_book) {
//     if (localStorage.getItem("data")) {
//       if (name_book === JSON.parse(localStorage.getItem("data")).name_book) {
//         return false;
//       } else {
//         return true;
//       }
//     } else{
//       return true
//     }

//   }

//   sendData = async (dataloan) => {

//     let { name_user, mobile_user, name_book } = dataloan;
    
//     let data = await clienteAxios.post("create/loan", dataloan);
//     if(!data.data.messageError){
//       Swal.fire("Prestamo Procesado", "You clicked the button!", "success");
//       this.saveDataLocal(name_user, mobile_user, name_book);
//     }else{
//       this.showMessage(data.data.messageError);
//     }
    
//   };
// }

// const methodsForm = new ValidateForm();

// let { sendData, verifyValue, verifyLength, verifyLocal ,showMessage } = methodsForm;

// const callApi = (dataloan) => {
  
//   if (!verifyValue()) {
//     let message = "Llena Todos Los Campos";
//     showMessage(message);
//   } else if (!verifyLength()) {
//     verifyLength();
//   } else if (!verifyLocal(dataloan.name_book)) {
//     showMessage("no puedes prestar el mismo libro");
//   } else {
//     sendData(dataloan);
   
//     if(!localStorage.getItem("data")){
//        document.querySelector("#form-loan").reset();
//    }
//   }
// };

// export { callApi, dataLocal };






// // disabledBtn = () => {
// //   document
// //     .querySelector(".btn-outline-secondary")
// //     .removeAttribute("data-bs-toggle");
// //   document.querySelector(".btn-api").disabled = true;
// // };


