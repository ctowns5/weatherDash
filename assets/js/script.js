// var body = document.body;
// var weatherDisplay = document.createElement("section");
// var tempDisplay = document.createElement("p");
// var weatherStatus = document.createElement("p");
// var humidDisplay = document.createElement("p");
// var windDisplay = document.createElement("p");
// weatherDisplay.setAttribute("style", "color: white");

// // fetch(https://api.openweathermap.org/geo/1.0/direct?q=Columbia&limit=5&appid=2fd2f73ffd2c3e1baf54a253b940ab7c) geo for London

// function weatherFetch() {
//     var weatherURL;
//     // var weatherRequestURL = "https://api.openweathermap.org/data/3.0/onecall?lat=39.73&lon=-104.99&units=imperial&appid=2fd2f73ffd2c3e1baf54a253b940ab7c";
//     var weatherRequestURL = "https://api.openweathermap.org/data/2.5/weather?q=Denver&units=imperial&appid=2fd2f73ffd2c3e1baf54a253b940ab7c";
//     fetch(weatherRequestURL, weatherURL)
//       .then(function (response) {
//         console.log(response);
//         return response.json();
//       })
//       .then(function (weatherURL) {
//         temperature = weatherURL.main.temp;
//         humidity = weatherURL.main.humidity;
//         wind_speed = weatherURL.wind.speed;
//         console.log(weatherURL);
//         console.log(weatherURL.weather[0]);
//         tempDisplay.textContent = "Temperature: " + temperature + " F";
//         humidDisplay.textContent = "Relative Humidity: " + humidity + " %";
//         windDisplay.textContent = "Wind Speed: " + wind_speed + "mph";
//         body.appendChild(weatherDisplay);
//         weatherDisplay.appendChild(tempDisplay);
//         weatherDisplay.appendChild(humidDisplay);
//         weatherDisplay.appendChild(windDisplay);
//         weatherStatus.textContent = "Current conditions: " + weatherURL.weather[0].main;
//         weatherDisplay.appendChild(weatherStatus);

//       });
//   }

//   weatherFetch();

//function for getting geotrans via api
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
  var newName = document.getElementById("cityInput");
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = +newName.value;
  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=39.73&lon=-104.99&units=imperial&appid=2fd2f73ffd2c3e1baf54a253b940ab7c"
  )
    //fetch ("https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&units=imperial&appid=2fd2f73ffd2c3e1baf54a253b940ab7c")
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "temp").innerHTML =
          "temp:" + Number(data.list[i].main.temp + "F");
      }
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "humidity").innerHTML =
          "humidity:" + Number(data.list[i].main.humidity + "%");
      }
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "wind").innerHTML =
          "wind:" + Number(data.list[i].wind.speed + "mph");
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
