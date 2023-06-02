var body = document.body;
var weatherDisplay = document.createElement("section");
var tempDisplay = document.createElement("p");
var weatherStatus = document.createElement("p");
var humidDisplay = document.createElement("p");
var windDisplay = document.createElement("p");
var apiKey = "2fd2f73ffd2c3e1baf54a253b940ab7c"
var newName = document.getElementById("cityInput");
var cityName = document.getElementById("cityName");
var lat = localStorage.getItem("lat")
var lon = localStorage.getItem("lon")
weatherDisplay.setAttribute("style", "color: white");
//console.log(cityName)
// fetch(https://api.openweathermap.org/geo/1.0/direct?q=Columbia&limit=5&appid=2fd2f73ffd2c3e1baf54a253b940ab7c) geo for columbia
//function for getting geotrans via api
// var lat;
// var lon;

// var nametofetch = `https://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=1&appid=2fd2f73ffd2c3e1baf54a253b940ab7c`
//     //var nametofetch = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
// fetch(nametofetch)
//   .then((response) => response.json())
//   .then(data => {
//       // console.log (data[0].lat)
//       lat = (data[0].lat)
//       lon = (data[0].lon)
      
//   })
//console.log (cityName)
function nametolatlon() {
    //var nametofetch = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=2fd2f73ffd2c3e1baf54a253b940ab7c`
    var nametofetch = `https://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=1&appid=${apiKey}`
    fetch(nametofetch)
    .then((response) => response.json())
    .then(data => {
      // console.log (data[0].lat)
      localStorage.setItem("lat", (data[0].lat))
      localStorage.setItem("lon", (data[0].lon))
    // lat = (data[0].lat);
    // lon = (data[0].lon);
    // console.log (lon)
    // console.log (lat)
    })
    
    }
  
nametolatlon()
//console.log (lon)
//console.log (lat)


function weatherFetch() {
    var weatherURL;
    //var weatherRequestURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    var weatherRequestURL = `https://api.openweathermap.org/data/2.5/weather?q=Denver&units=imperial&appid=${apiKey}`;
    fetch(weatherRequestURL, weatherURL)
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (weatherURL) {
        temperature = weatherURL.main.temp;
        humidity = weatherURL.main.humidity;
        wind_speed = weatherURL.wind.speed;
        //console.log(weatherURL);
        //console.log(weatherURL.weather[0]);
        tempDisplay.textContent = "Temperature: " + temperature + " F";
        humidDisplay.textContent = "Relative Humidity: " + humidity + " %";
        windDisplay.textContent = "Wind Speed: " + wind_speed + "mph";
        body.appendChild(weatherDisplay);
        weatherDisplay.appendChild(tempDisplay);
        weatherDisplay.appendChild(humidDisplay);
        weatherDisplay.appendChild(windDisplay);
        weatherStatus.textContent = "Current conditions: " + weatherURL.weather[0].main;
        weatherDisplay.appendChild(weatherStatus);

      });
  }

  weatherFetch();

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
function getCityInfo() {
  // var newName = document.getElementById("cityInput");
  // console.log(cityName)
  cityName.innerHTML = newName.value;
  // console.log (newName)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    //fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${newName.value}&units=imperial&appid${apiKey}`)
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
