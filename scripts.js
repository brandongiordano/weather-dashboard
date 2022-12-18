//weather variable selectors
var cityEl = $("#city-name");
var tempEl = $("#city-temp");
var humidEl = $("#city-humid");
var windEl = $("#wind-speed");
var iconEl = $("#weather-icon");
var searchCityEl = $("#search-input");
var lat = 40.7831;
var lon = -73.9712;
var APIKey="c1cca8b9a19bd1602dafeedbadde768a";

//display current day
var today = dayjs().format('M/D/YYYY');
$('#todays-date').text(today);


//get weather function
let weather = {
    fetchWeather: function(){
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data)
        });
    }
};


//populating text fields
var displayWeather = function (data) {
    console.log(data);
    $(cityEl).append(data.city.name);
    $(tempEl).append(Math.round((data.list[0].main.temp - 273.15) * 1.80 + 32) + "°F");
    $(humidEl).append(data.list[0].main.humidity + "%");
    $(windEl).append(data.list[0].wind.speed + " km/h");
    $(iconEl).attr({"src": "http://openweathermap.org/img/wn/" + data.list[0].weather.icon + ".png",
    "height": "100px", "width":"100px"});
}


weather.fetchWeather();