//weather variable selectors
var cityEl = $("#city-name");
var tempEl = $("#current-temp");
var humidEl = $("#current-humid");
var windEl = $("#wind-speed");
var iconEl = $("#weather-icon");
var citySearchEl = document.querySelector("#city-search");
//var cityLat = (cityData.coord.lat);
var cityLat; 
//var cityLon = (cityData.coord.lon);
var cityLon;
var APIKey="c1cca8b9a19bd1602dafeedbadde768a";
var cityHistory = [];

//display current date
var today = dayjs().format('M/D/YYYY');
$('#todays-date').text(today);



function getCity(event) {
    event.preventDefault();
    var searchedCity = document.querySelector("#city-search").value;

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (cityData) {
            getCoords(cityData)
        });

        //adds searched city to a history list
        function addToHistory() {
            var historyEl = $("<li>" + searchedCity + "</li>");
            $(".list-group").append(historyEl);
            $(historyEl).attr("class","list-group-item");
            $(historyEl).attr("data-value", searchedCity);
            cityHistory.push(searchedCity);
            localStorage.setItem("cityHistory", JSON.stringify(cityHistory))
        }
        addToHistory();
}

function pastSearch(event){
    var liEl=event.target;
    if (event.target.matches("li")){
        searchedCity=liEl.textContent.trim();
        getCity(searchedCity);
    }

}

getCoords = function (cityData) {
    var latd = cityData.coord.lat;
    var lotd = cityData.coord.lon;
    getForecast(latd, lotd);
}

//get weather function
getForecast = function(lat, lon) {
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
weather.fetchWeather();
}

//populating text fields
displayWeather = function (data) {
    $(cityEl).html(data.city.name);
    $(tempEl).html(Math.round((data.list[0].main.temp - 273.15) * 1.80 + 32) + "°F");
    $(humidEl).html(data.list[0].main.humidity + "%");
    $(windEl).html(data.list[0].wind.speed + " km/h");
    var weatherIcon = (data.list[0].weather[0].icon);
    var iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    $(iconEl).html("<img src=" + iconUrl + ">");

    //looping through getting forecast data
    for (i=0;i<5;i++){
        var date = new Date((data.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
        var iconCode = data.list[((i+1)*8)-1].weather[0].icon;
        var iconurl ="http://openweathermap.org/img/wn/"+iconCode+"@2x.png";
        var tempK = data.list[((i+1)*8)-1].main.temp;
        var tempF =(((tempK-273.5)*1.80)+32).toFixed(2);
        var humidity = data.list[((i+1)*8)-1].main.humidity;
        var windF = (data.list[i].wind.speed + " km/h")
    
        //populate forecast cards
        $("#date"+i).html(date);
        $("#img"+i).html("<img src="+iconurl+">");
        $("#temp"+i).html(tempF+"°F");
        $("#wind"+i).html(windF);
        $("#humidity"+i).html(humidity+"%");
    }
}

$("#btn").on("click", getCity);