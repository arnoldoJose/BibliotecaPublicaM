class AlertFunc {
  
  messageSucces(message) {
    let $iconMain = document.querySelector(".icon-main");
    let iconClass = [...$iconMain.classList];
    
    if (!iconClass.includes(".content-icono-success")) {
      $iconMain.classList.add("content-icono-success");
      document.querySelector(".span-left").classList.remove("span-error-left")
      document.querySelector(".span-right").classList.remove("span-success-right")
      document.querySelector(".span-left").classList.add("span-success-left");
      document.querySelector(".span-right").classList.add("span-success-right");

      document.querySelector(".alert-main").style.display = "block";
      document.querySelector(".message-info-util").textContent = message;
    }
  }

  messageError (message) {
    let $iconMain = document.querySelector(".icon-main");
    let iconClass = [...$iconMain.classList]

     if(!iconClass.includes("content-icono-error")){       
      $iconMain.classList.add("content-icono-error");
      document.querySelector(".span-left").classList.remove("span-success-left")
      document.querySelector(".span-right").classList.remove("span-success-right")
      document.querySelector(".span-left").classList.add("span-error-left")
      document.querySelector(".span-right").classList.add("span-error-right");
      
     document.querySelector(".alert-main").style.display = "block";
     document.querySelector(".message-info-util").textContent = message;
    }
  }
}

const { messageSucces, messageError } = new AlertFunc();

export { messageSucces,messageError }


