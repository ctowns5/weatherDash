var body = document.body;
var weatherDisplay = document.createElement("section");
var tempDisplay = document.createElement("p");
var weatherStatus = document.createElement("p");
var humidDisplay = document.createElement("p");
var windDisplay = document.createElement("p");
var citytitle = document.createElement("h2");
var apiKey = "2fd2f73ffd2c3e1baf54a253b940ab7c"
var newName = document.getElementById("cityInput");

function fetchFromLocal(){
  var arr = localStorage.getItem("history")
  if (arr){
    return JSON.parse(arr)
  }
  return []
}
var historylist = fetchFromLocal();
weatherDisplay.setAttribute("style", "color: white");
function nametolatlon(cityInput) {
    var nametofetch = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`
    fetch(nametofetch)
    .then((response) => response.json())
    .then(data => {
    fiveDayForecast(data[0].lat, data[0].lon)
    })
    }
function weatherFetch(newCity) {
    var weatherURL;
    var weatherRequestURL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=imperial&appid=${apiKey}`;
    fetch(weatherRequestURL, weatherURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (weatherURL) {
        console.log (weatherURL)
        var city = weatherURL.name
        temperature = weatherURL.main.temp;
        humidity = weatherURL.main.humidity;
        wind_speed = weatherURL.wind.speed;
        tempDisplay.textContent = "Temperature: " + temperature + " F";
        humidDisplay.textContent = "Relative Humidity: " + humidity + " %";
        windDisplay.textContent = "Wind Speed: " + wind_speed + "mph";
        citytitle.textContent = city;
        body.appendChild(weatherDisplay);
        weatherDisplay.appendChild(citytitle);
        weatherDisplay.appendChild(tempDisplay);
        weatherDisplay.appendChild(humidDisplay);
        weatherDisplay.appendChild(windDisplay);
        weatherStatus.textContent = "Current conditions: " + weatherURL.weather[0].main;
        weatherDisplay.appendChild(weatherStatus);
        nametolatlon(newCity)
      });
  }
  weatherFetch("Denver");
var d = new Date();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function fiveDayForecast(lat,lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
  .then((response) => response.json())
  .then((data) => {
    for (i = 0; i < 5; i++) {
      document.getElementById("day" + (i + 1) + "temp").innerHTML =
        "temp: " + Number(data.list[i].main.temp);
    }
    for (i = 0; i < 5; i++) {
      document.getElementById("day" + (i + 1) + "humidity").innerHTML =
        "humidity: " + Number(data.list[i].main.humidity);
    }
    for (i = 0; i < 5; i++) {
      document.getElementById("day" + (i + 1) + "wind").innerHTML =
        "wind: " + Number(data.list[i].wind.speed);
    }
    for (i = 0; i < 5; i++) {
      document.getElementById("img" + (i + 1)).src =
        " https://openweathermap.org/img/wn/" +
        data.list[i].weather[0].icon +
        ".png";
    }
  })
  .catch((err) => alert("Oops"));
}
function getCityInfo() {
  historylist.push(newName.value)
  localStorage.setItem("history",JSON.stringify(historylist))
  populateHistory()
  weatherFetch(newName.value)
}

function populateHistory(){
  var history = document.getElementById("history")
  history.textContent =""
  for (const c of historylist) {
    var li = document.createElement("li")
    var btn = document.createElement("button")
    btn.textContent = c
    btn.addEventListener ("click",function(event){
      weatherFetch(event.target.innerText)
    })
    li.append(btn)
    
    history.appendChild(li)
  }
}
function DefaultCity(){
    document.getElementById("cityInput").defaultValue ="Denver"
    getCityInfo();
}
function checkDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}
for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[checkDay(i)];
}
