// Define Lat & Long objects globally
let latitude = '';
let longitude = '';

// Assign current location lat & long
function handlePosition (info) {
  latitude = info.coords.latitude.toFixed(4);
  longitude = info.coords.longitude.toFixed(4);
  getWeather()
}

// Fetch API URL, Convert to JSON, Update Weather & Display any errors
let getWeather = function() {
  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  openweathermap_api_url += 'lat=' + latitude
  openweathermap_api_url += '&lon=' + longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'
  console.debug("The Latitude is " + latitude);
  console.debug("The Longitude is " + longitude);
fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
}

// Convert raw response into JSON
let convertToJSON = function(response) {
  return response.json();
}

// Use data from service to update weather elements & icon
let updateWeather = function(dataFromService) {
  city = dataFromService.name;
  temp = dataFromService.main.temp;
  icon = dataFromService.weather[0].icon;
  document.querySelector('.card-title').innerHTML = city;
  document.querySelector('.card-text').innerHTML = "It is " + temp + " degrees outside";
  document.querySelector('.card-img-top').src = "http://openweathermap.org/img/w/" + icon + ".png";
}

// Error message
let displayError = function(error) {
  console.debug(error);
  window.alert("Sorry, something went wrong.");
}

// Listen for clicks
let link = document.getElementById("get_forecast")
link.addEventListener("click", function(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
});
