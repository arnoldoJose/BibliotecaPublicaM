//usar un ternario en ves del if principal mejorar logica dentro del ternario
let showsOcult = (pathname,key, refBook, refSesion, refLoans) => {
  if (key === 1 || pathname === "/BibliotecaPublicaM") {
    if (refSesion.current !== null) refSesion.current.classList.remove("back-color-list");
    if (refLoans.current !== null) refLoans.current.classList.remove("back-color-list");
    if (refBook.current !== null) refBook.current.classList.add("back-color-list");
    
  } else if (key === 2 || pathname === "/login" || pathname === "/registrate") {
    if (refBook.current !== null) refBook.current.classList.remove("back-color-list");
    if (refLoans.current !== null) refLoans.current.classList.remove("back-color-list");
    if (refSesion.current !== null) refSesion.current.classList.add("back-color-list");

  } else if (key === 3 || pathname === "/loans") {
    if (refSesion.current !== null) refSesion.current.classList.remove("back-color-list");
    if (refBook.current !== null) refBook.current.classList.remove("back-color-list");
    if (refLoans.current !== null) refLoans.current.classList.add("back-color-list");
  }
};
export { showsOcult };


