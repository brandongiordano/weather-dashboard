//weather variable selectors
var cityEl = $("#city-name");
var tempEl = $("#current-temp");
var humidEl = $("#current-humid");
var windEl = $("#wind-speed");
var iconEl = $("#weather-icon");
//var searchButton = $("#search-button");
//var searchFormEl = document.querySelector('#search-bar');
//var searchedCity = document.querySelector("#search-input").value;
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

//fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + ",US&limit=5&appid=" + APIKey)

//populating text fields
displayWeather = function (data) {
    console.log(data);
    $(cityEl).append(data.city.name);
    $(tempEl).append(Math.round((data.list[0].main.temp - 273.15) * 1.80 + 32) + "°F");
    $(humidEl).append(data.list[0].main.humidity + "%");
    $(windEl).append(data.list[0].wind.speed + " km/h");
    //$(iconEl).attr({"src": "http://openweathermap.org/img/wn/" + data.list[0].weather.icon + ".png",
    //"height": "100px", "width":"100px"});
}

//get future forecasts
forecast = function(data) {
    for (i=0;i<5;i++){
        var date = new Date((data.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
        var iconCode = data.list[((i+1)*8)-1].weather[0].icon;
        var iconurl ="https://openweathermap.org/img/wn/"+iconCode+".png";
        var tempK = data.list[((i+1)*8)-1].main.temp;
        var tempF =(((tempK-273.5)*1.80)+32).toFixed(2);
        var humidity = data.list[((i+1)*8)-1].main.humidity;
        var windF = (data.list[i].wind.speed + " km/h")
    
        $("#date"+i).append(date);
        $("#img"+i).append("<img src="+iconurl+">");
        $("#temp"+i).append(tempF+"°F");
        $("#wind"+i).append(windF);
        $("#humidity"+i).append(humidity+"%");
    }
}

weather.fetchWeather();