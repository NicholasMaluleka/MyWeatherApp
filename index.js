const API_KEY = "87a4b4f648814f8709197f45419a77f2"; 
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

    
const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 1) { 
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt})</h2>
                    <h6>Temperature: ${weatherItem.main.temp}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for the other five day forecasts
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather-icon">
                    <h6>Temperature: ${weatherItem.main.temp}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    fetch(WEATHER_API_URL)
    .then(response => response.json())
    .then(data => {
        // Filter the forecasts to get only one forecast per day
        const ForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!ForecastDays.includes(forecastDate)) {
                return ForecastDays.push(forecastDate);
            }
        });

        // Creating weather cards
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 1) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    })
}

const getCoordinates = () => {
    const cityName = cityInput.value;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const {lat, lon, name} = data[0];
        getWeatherDetails(name, lat, lon);
    })
}
searchButton.addEventListener("click", getCoordinates);

const UserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; 
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            })
        })
}
locationButton.addEventListener("click", UserCoordinates);