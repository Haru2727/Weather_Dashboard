let city = $("#selectedCity").val();
// store api key
const apiKey = "&appid=bf7a15b27f6a19b1213edbffc3e5c8e4";

let date = new Date();


$("#searchBtn").on("click", function () {



    // get the value of the input from user
    city = $("#selectedCity").val();

    // clear input box
    $("#selectedCity").val("");

    // full url to call api
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {

            console.log(response)

            console.log(response.name)
            console.log(response.weather[0].icon)
// Temperature Converter formula.  Found online.  Most of this code was modified off bits and pieces of other code.

            let tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(Math.floor(tempF))

            console.log(response.main.humidity)

            console.log(response.wind.speed)
            console.log(response.coord.lat)
            console.log(response.coord.lon)
            
            getCurrentConditions(response);
            getCurrentForecast(response);
            getUVIndex(response);
            makeList();

        })
});

function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
}

function getCurrentConditions(response) {

    // get the temperature and convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#weatherOutput').empty();

    // get and set the content 
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#weatherOutput").append(card)

}

// cannot obtain the location of the UV Index value.  The example on OpenWeather API doesn't match with the information I get back.
// function getUVIndex() {

//     var lat = (response.coord.lat);
//     var lon = (response.coord.lon);
//     $.ajax({
//       url: "http://api.openweathermap.org/data/2.5/uvi/forecast?lat="+lat+"&lon="+lon+ +apiKey
//         method: "GET",
//     }).then(function (response){
//         console.log(response.list)
//         // $("#weatherOutput").append
//     })

// }

function getCurrentForecast() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
    }).then(function (response) {

        console.log(response)
        console.log(response.dt)
        $('#forecast').empty();

        // variable to hold response.list
        let results = response.list;
        console.log(results)

        //declare start date to check against
        // startDate = 20
        //have end date, endDate = startDate + 5

        for (let i = 0; i < results.length; i++) {

          let day = Number(results[i].dt_txt);
          let hour = results[i].dt_txt;
          console.log(day);
          console.log(hour);

          if(results[i].dt_txt.indexOf("12:00:00") !== -1){

            // get the temperature and convert to fahrenheit 
            let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
            let tempF = Math.floor(temp);

            // adding the information to a card to be presented when use searches for a city 
            const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
            const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
            const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
            const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
            const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

            const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

            cardBody.append(cityDate, image, temperature, humidity);
            card.append(cardBody);
            $("#forecast").append(card);

          }
        }
    
    })


};

