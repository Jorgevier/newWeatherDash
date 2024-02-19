var cities = [];

var city = document.querySelector("#city-search-form");
var cityInput = document.querySelector("#city");
var weatherConditon = document.querySelector("#current-weather-container");
var citySearchinput = document.querySelector("#searched-city");


var formSumbitHandler = function (event) {
    event.preventDefault();
    var city = cityInput.value.trim();
    if (city) {
        getCityWeather(city);
        
        cities.unshift({ city });
        cityInput.value = "";
    } else {
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

var saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getCityWeather = function (city) {
    var apiKey = "79e45d114d543040657fc21cbfd74ce5"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayWeather(data, city);
            });
        });
};

var displayWeather = function (weather, searchCity) {
    
    weatherConditon.textContent = "";
    citySearchinput.textContent = searchCity;

    var currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearchinput.appendChild(currentDate);

    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchinput.appendChild(weatherIcon);

    var temperature = document.createElement("span");
    temperature.textContent = "Temperature: " + weather.main.temp + " °F";
    temperature.classList = "list-group-item"

    weatherConditon.appendChild(temperature);
}


city.addEventListener("submit", formSumbitHandler);