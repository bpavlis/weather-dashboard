const key = "7332abd1aaaf495bb96c30eaec0e625c"
var cityName;
var citySave = [];
var dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS');
var date = dayjs().format('dddd, MMMM D YYYY');
var cardToday = $('.cardToday')

function getWeatherOverall() {
  $(cardToday).empty();

  $.ajax({    //6.5 for help
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${key}`,
    method: 'GET'
  }).then(function (response) {
    $('.cityName').text(response.name);
    $('.date').text(date);

    $('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)

    var tempEl = $('<p>').text(`Temp (°F): ${response.main.temp}`);
    cardToday.append(tempEl);

    var feelsLikeEl = $('<p>').text(`Feels like (°F): ${response.main.feels_like}`);
    cardToday.append(feelsLikeEl);

    var humidityEl = $('<p>').text(`Humidity (%): ${response.main.humidity}`);
    cardToday.append(humidityEl);

    var windSpeedEl = $('<p>').text(`Wind (MPH): ${response.wind.speed}`);
    cardToday.append(windSpeedEl);

    //saving the lon and lat of the search
    var lonCity = response.coord.lon;
    var latCity = response.coord.lat;
    // console.log(lonCity, latCity)
  });
  getFiveDay();
};

// creating way to save city searches
var citySaveEl = $('.citySave');
function saveSearch() {
  citySaveEl.empty();

  for (let i = 0; i < citySave.length; i++) {
    var newRow = $('<row>');
    var newBtn = $('<button>').text(`${citySave[i]}`)
    newBtn.addClass('btn btn-outline-secondary histBtn');
    newRow.addClass('row histBtnRow');
    newBtn.attr('type', 'button');
    citySaveEl.append(newRow);
    newRow.append(newBtn);
  }
  //Searching using the created els
  $('.histBtn').on("click", function (event) {
    event.preventDefault();
    fiveDayEl.empty();
    cityName = $(this).text();
    getWeatherOverall();
  });
};

var fiveDayEl = $('.fiveDayEl');
function getFiveDay() {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${key}`,
    method: 'GET'
  }).then(function (response) {
    var getFiveDayArr = response.list;
    var weather = [];

    //what goes inside each card for 5day
    $.each(getFiveDayArr, function (index, response2) {
      randomObjTest = {
        date: response2.dt_txt,
        time: response2.dt_txt,
        temp: response2.main.temp,
        feels_like: response2.main.feels_like,
        icon: response2.weather[0].icon,
        humidity: response2.main.humidity
      }

      if (response2.dt_txt.split(' ')[1] === "12:00:00") {
        weather.push(randomObjTest);
      }
    })


    //getting the 5day to populate 
    for (let i = 0; i < weather.length; i++) {

      var createDivEl = $('<div>');
      createDivEl.attr('class', 'card');
      // createDivEl.attr('style', 'max-width: 200px;');
      fiveDayEl.append(createDivEl);

      //header
      var createFiveDayHeader = $('<div>');
      createFiveDayHeader.attr('class', 'card-header')
      var dayJs = dayjs(`${weather[i].date}`).format('MM-DD-YYYY');
      createFiveDayHeader.text(dayJs);
      createDivEl.append(createFiveDayHeader)

      //body
      var createFiveDayBody = $('<div>');
      createFiveDayBody.attr('class', 'card-body');
      createDivEl.append(createFiveDayBody);

      //icons/symbols
      var createFiveDayIcons = $('<img>');
      createFiveDayIcons.attr('class', 'icons');
      createFiveDayIcons.attr('src', `https://openweathermap.org/img/wn/${weather[i].icon}@2x.png`);
      createFiveDayBody.append(createFiveDayIcons);

      //temp
      var createFiveDayTemp = $('<p>').text(`Temp (°F): ${weather[i].temp}`);
      createFiveDayBody.append(createFiveDayTemp);

      //feels Like
      var createFiveDayFeelsLike = $('<p>').text(`Feels like (°F): ${weather[i].feels_like}`);
      createFiveDayBody.append(createFiveDayFeelsLike);

      //humidity
      var createFiveDayHumidity = $('<p>').text(`Humidity (%): ${weather[i].humidity} %`);
      createFiveDayBody.append(createFiveDayHumidity);
    }
  });
};

//saving search input into storage
$('.search').on("click", function (event) {
  event.preventDefault();
  cityName = $(this).parent('.btnPar').siblings('.textVal').val().trim();
  citySave.push(cityName);
  localStorage.setItem('city', JSON.stringify(citySave));
  fiveDayEl.empty();
  saveSearch();
  getWeatherOverall();
});


/*
Example code from gary:

  There are a bunch of ways of doing multiple asynchronous requests. Here are two of them. None is better than the other. Choose whichever you feel most comfortable with.

  #1: Nested anonymous functions.
  Example:


fetch("some-url-here")
.then( function(response){
  return response.json()
})
.then( function(data){
  // here you can take the data you receive and send any part of it to the next then() block.
  const coolData = data.stuff
  return coolData
})
.then( function(coolDataFromAbove){
  // use the coolDataFromAbove for the next fetch call
  fetch("url-from-cooldata")
  .then( function(response){
    return response.json()
  })
  .then( function(finalData){
    // Here is your final data!!
  })
})



  Example 2: Using async/await


async function getAllTheData(){
  const resp1 = await fetch("url-1");
  const data1 = await resp1.json()

  // data1 gives is all the prelim stuff, which we can use to 
  // compose the next fetch call
  const resp2 = await fetch("url-2");
  const data2 = await resp2.json()

  // data2 is the final data we need to populate the page
}
*/

/*
From the API
"list": [
    {
      "dt": 1661871600,
      "main": {
        "temp": 296.76,
        "feels_like": 296.98,
        "temp_min": 296.76,
        "temp_max": 297.87,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 933,
        "humidity": 69,
        "temp_kf": -1.11
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 0.62,
        "deg": 349,
        "gust": 1.18
      },
      "visibility": 10000,
      "pop": 0.32,
      "rain": {
        "3h": 0.26
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-08-30 15:00:00"
    },
*/
