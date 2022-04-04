let nav = 0;
let monthDate  = 0;
let yearDate = 0;
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const actualDate = new Date(); //i need it for the dropdown list
const calendar = document.getElementById("calendar");
//const backDrop = document.getElementById('modalBackDrop');
const anchorMonth = document.getElementById("month");
const anchorYear = document.getElementById("year");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const year = document.getElementById("year");

/*function OpenModal(date){
    clicked = date;
    backDrop.style.display = 'block';
}*/
function GeneraAgenda() {
  //const date = new Date(year, month , 0);//to get the last day of the previous month
  const dateNow = new Date(); //to get the date of today

  if (nav !== 0) {
    dateNow.setMonth(new Date().getMonth() + nav);
  }

  const day = dateNow.getDate();
  const month = dateNow.getMonth();
  const year = dateNow.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate(); //to get the last month of the month and so i know the number of days in that month
  const firstDay = new Date(year, month, 1); //to get the first day of the month

  const dayString = firstDay.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const padding = weekdays.indexOf(dayString.split(", ")[0]); //in this way i get the index of which day is the first of the month and from which the agenda has to start

  document.getElementById(
    "monthDisplay"
  ).innerText = `${dateNow.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;

  calendar.innerHTML = " ";

  for (let i = 1; i <= padding + daysInMonth; i++) {
    const daySet = document.createElement("div");
    daySet.classList.add("day");

    if (i > padding) {
      daySet.innerText = i - padding;
      daySet.addEventListener("click", () => console.log("click"));
    } else {
      daySet.classList.add("padding");
    }
    const day = new Date(year, month, i - padding);
    /*const dayString = day.toLocaleDateString('en-us', {
    
            weekday : 'long',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        })*/
    //console.log(dayString);
    calendar.appendChild(daySet);
  }
}
/*function CloseModal(){
    clicked = null;
    backDrop.style.display = 'none';
}*/

function Buttons() {
  document.getElementById("nextButton").addEventListener("click", function () {
    nav += 1;
    console.log(nav);
    VerificaAgenda(1);
  });
  document.getElementById("backButton").addEventListener("click", function () {
    nav += -1;
    console.log(nav);
    VerificaAgenda(2);
  });
  //document.getElementById('loadButton').addEventListener('click', MoveBetween());
}

function VerificaAgenda(idCase) {
  const date = new Date();
  date.setMonth(new Date().getMonth() + nav);
  switch (idCase) {
    case 1:
      alert("Hai premuto il tasto Next}");
      break;
    case 2:
      alert("Hai premuto il tasto Back");
      break;
  }
  GeneraAgenda();
}
function MoveBetween() {
  nav = 0;
  let previous = new Date();
  //console.log(anchorMonth.options[anchorMonth.selectedIndex].value);
  //console.log(anchorYear.options[anchorYear.selectedIndex].value);
  //console.log(months.indexOf(anchorMonth.options[anchorMonth.selectedIndex].value));
  nav +=
    months.indexOf(anchorMonth.options[anchorMonth.selectedIndex].value) -
    parseInt(previous.getMonth());
  //console.log(nav);
  nav +=
    (parseInt(anchorYear.options[anchorYear.selectedIndex].value) -
      parseInt(previous.getFullYear())) *
    12;
  //console.log(nav);
  GeneraAgenda();
  //nav += (yearToGo - previous.getFullYear())*12;//if the user has to visit another month in a different year, i have to add the difference of the years *12 because in 1 year there are 12 months
  //nav += (monthToGo - previous.getMonth());

  //const monthSelector = document.getElementById()
}
function Populate() {
  for (let i = 0; i <= 10; i++) {
    var option = document.createElement("option");
    //console.log(typeof(date.getFullYear() - i)); it's a number

    option.textContent = (actualDate.getFullYear() - i).toString();
    option.setAttribute("value", actualDate.getFullYear() - i); //it sets the year that i specified
    year.appendChild(option);
  }
}

function VerifyDate(){
  monthDate = nav % 12;// this will set the month of the agenda
  yearDate = nav / 12;//this will set the year to add to the year of the actual date
  //new Date(yearDate, monthDate, 27); 
}
//$(document).ready(GeneraAgenda());
GeneraAgenda();
Populate();
Buttons();
