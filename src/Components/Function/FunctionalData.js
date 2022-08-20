let getMon = new Date().getMonth() + 1;
let getDate = new Date().getDate();
let getDay = new Date().getDate();
let lastDate = `${new Date(new Date().getFullYear(), getMon, 0).getDate()}`;
let dayLast;
//igualar mejor con el ultimo dia del mes
///cuando el ultimo dia es menor se produce error poner 0 antes del numero
//
//
if (getDay === lastDate) {
  getMon += 1;
  dayLast = "0" + 3;
} else {
  dayLast = getDay+=3
}

console.log(getMon, getDate, dayLast);


export { getMon, getDate, dayLast };
//por si sale mal el cambio de arriba
// if (getDay === lastDate) {
//   dayLast = "0" + 3;
// } else {
//   dayLast = getDay += 3;

//   if (dayLast > lastDate) {
//     getMon += 1;
//     dayLast = "0" + 3;
//   }
// }




