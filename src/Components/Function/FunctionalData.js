let getMont = new Date().getMonth() + 1;
let getDate = new Date().getDate();
let getDay = new Date().getDate();
let lastDate = `${new Date(new Date().getFullYear(), getMont, 0).getDate()}`;
let dayLast;
//igualar mejor con el ultimo dia del mes

if (getDay === lastDate) {
  dayLast = "0" + 4;
} else {
  dayLast = getDay+=4
  if (dayLast <= 9) {
    dayLast = '0'+dayLast
  } else {
    // dayLast = getDay += 4;
    if (dayLast > 31) {
      dayLast = "0" + 4;
    }
  }
}

console.log(dayLast);


export { getMont, getDate, dayLast };
