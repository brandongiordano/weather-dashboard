//weather variable selectors
var tempEl = document.getElementById("city-temp");
var humidEl = document.getElementById("city-humid");
var windEl = document.getElementById("wind-speed");
var searchCityEl = document.querySelector("#search-input");
var lat = 40.7831;
var lon = -73.9712;

//display current day
var today = dayjs().format('M:D:YYYY');
$('#todays-date').text(today);


//get weather function
let weather = {
    apiKey:"c1cca8b9a19bd1602dafeedbadde768a",
    fetchWeather: function(){
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=c1cca8b9a19bd1602dafeedbadde768a")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("test", data);
        });
    }
};

//populating text fields
//$("#city-temp").textContent(data.main.temp);

weather.fetchWeather();