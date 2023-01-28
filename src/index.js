//date, day and time
function displayDate(fulldate) {
  let months = [
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

  let numbermonth = fulldate.getMonth();
  let month = months[numbermonth];
  let date = fulldate.getDate();
  let year = fulldate.getFullYear();

  let sentencedate = `${date} ${month} ${year}`;
  return sentencedate;
}

function displayDateTilme(fulldate) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let numberday = fulldate.getDay();
  let day = weekdays[numberday];
  let hour = fulldate.getHours();
  let min = fulldate.getMinutes();
  let sentenceDayTime = `${day} ${hour}:${min}`;
  return sentenceDayTime;
}
let now = new Date();
document.querySelector("#date").innerHTML = displayDate(now);
document.querySelector("#dayAndtime").innerHTML = displayDateTilme(now);

// load city and temp
function searchCity(city) {
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let feels = Math.round(response.data.main.feels_like);
  let humid = Math.round(response.data.main.humidity);
  let wind = response.data.wind.speed;
  let weather = response.data.weather[0].main;
  let city = response.data.name;
  document.querySelector("#numbertemp").innerHTML = `${temperature}°`;
  document.querySelector("#currentHL").innerHTML = `H:${high}° L:${low}°`;
  document.querySelector("#feelslike").innerHTML = `Feels Like: ${feels}°`;
  document.querySelector("#humid").innerHTML = `Humidity: ${humid}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${wind}xm/s`;
  document.querySelector("#weather").innerHTML = `${weather}`;
  document.querySelector("#cityname").innerHTML = `${city}`;
}

searchCity("Brussels");

//city change

function citychange(event) {
  event.preventDefault();
  let valuecity = document.querySelector("#input-city");
  let newcityname = valuecity.value;
  searchCity(newcityname);
}

let cityform = document.querySelector("#enterCity");
cityform.addEventListener("submit", citychange);

// currentCityButton
function currentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPositionTemp);
}
//
function getPositionTemp(position) {
  //console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let currentform = document.querySelector("#currentcitybutton");
currentform.addEventListener("click", currentlocation);
// C vs F

//function changetoCel(event) {
//event.preventDefault();
//let maintemp = document.querySelector("#numbertemp");
//let mainHL = document.querySelector("#currentHL");
//maintemp.innerHTML = `19°`;
//mainHL.innerHTML = `H:12° L:20°`;
//}
//function changetoFaren(event) {
//event.preventDefault();
//let maintemp = document.querySelector("#numbertemp");
//let mainHL = document.querySelector("#currentHL");
//maintemp.innerHTML = `66°`;
//mainHL.innerHTML = `H:54° L:68°`;
//}
//let degC = document.querySelector("#celsius");
//degC.addEventListener("click", changetoCel);
//let degF = document.querySelector("#farenheit");
//degF.addEventListener("click", changetoFaren);
