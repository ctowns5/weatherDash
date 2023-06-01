var body = document.body;
var weatherDisplay = document.createElement("section");
var tempDisplay = document.createElement("p");
var weatherStatus = document.createElement("p");
var humidDisplay = document.createElement("p");
var windDisplay = document.createElement("p");
weatherDisplay.setAttribute("style", "color: white");

// fetch(https://api.openweathermap.org/geo/1.0/direct?q=Columbia&limit=5&appid=2fd2f73ffd2c3e1baf54a253b940ab7c) geo for London




function weatherFetch() {
    var weatherURL;
    // var weatherRequestURL = "https://api.openweathermap.org/data/3.0/onecall?lat=39.73&lon=-104.99&units=imperial&appid=2fd2f73ffd2c3e1baf54a253b940ab7c";
    var weatherRequestURL = "https://api.openweathermap.org/data/2.5/weather?q=Denver&units=imperial&appid=2fd2f73ffd2c3e1baf54a253b940ab7c";
    fetch(weatherRequestURL, weatherURL)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (weatherURL) {
        temperature = weatherURL.main.temp;
        humidity = weatherURL.main.humidity;
        wind_speed = weatherURL.wind.speed;
        console.log(weatherURL);
        console.log(weatherURL.weather[0]);
        tempDisplay.textContent = "Temperature: " + temperature + " degrees";
        humidDisplay.textContent = "Humidity: " + humidity + " Percent";
        windDisplay.textContent = "Wind Speed " + wind_speed + "mph";
        body.appendChild(weatherDisplay);
        weatherDisplay.appendChild(tempDisplay);
        weatherDisplay.appendChild(humidDisplay);
        weatherDisplay.appendChild(windDisplay);   
        weatherStatus.textContent = "Status: " + weatherURL.weather[0].main;
        weatherDisplay.appendChild(weatherStatus);
        
  
      });
  }
  
  weatherFetch();
  