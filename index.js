const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "87a4b4f648814f8709197f45419a77f2"; // API key for OpenWeatherMap API
    
const createWeatherCard = (cityName, weatherItem) => {
    if(index === 1) { // HTML for the current weather
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt})</h2>
                    <h6>Temperature: ${(weatherItem.main.temp)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for next 5 days
        return `<li class="card">
                    <h3>(${weatherItem.dt})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
    console.log(weatherItem)
}

// receive city coordinates (latitude, longitude, and name) from the API response
searchButton.addEventListener("click", getCityCoordinates);
const getCityCoordinates = () => {
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}&unit=metric`;
    const cityName = cityInput.value;
}

locationButton.addEventListener("click", getUserCoordinates);
const getUserCoordinates = () => {
    // Get coordinates of user location using reverse geocoding
    const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
    navigator.geolocation.getCurrentPosition(
        position => {
            const {latitude, longitude} = position.coords; 
        });
}
