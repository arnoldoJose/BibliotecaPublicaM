let getMont = new Date().getMonth() + 1;
let getDate = new Date().getDate();
let getDay = new Date().getDate();
let lastDate = `${new Date(new Date().getFullYear(), getMont, 0).getDate()}`;
let dayLast;
//igualar mejor con el ultimo dia del mes

if (getDay === lastDate) {
  dayLast = "0" + 4;
} else {
  dayLast = getDay+=3

    // if (dayLast > 30) {
    //   dayLast = "0" + 3;
    // } else {
    //   dayLast = dayLast + 3;
    // }
}

console.log(dayLast);


export { getMont, getDate, dayLast };
