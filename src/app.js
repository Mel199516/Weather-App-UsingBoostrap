// let weather = {
//     paris: {
//         temp: 19.7,
//         humidity: 80
//     },
//     tokyo: {
//         temp: 17.3,
//         humidity: 50
//     },
//     lisbon: {
//         temp: 30.2,
//         humidity: 20
//     },

//     alemania: {
//         temp: 20.9,
//         humidity: 100
//     },
//     oslo: {
//         temp: -5,
//         humidity: 20
//     },

//     melbourne: {
//         temp: -2,
//         humidity: 15
//     },

//     brisbane: {
//         temp: 22.5,
//         humidity: 50
//     }


// };

// // let city = prompt("Enter a city?");
// // city = city.toLowerCase();

// // if (city in weather) {
// //     const tempCelsius = Math.round(weather[city].temp);
// //     const tempFahrenheit = Math.round(tempCelsius * 9 / 5) + 32;


// //     alert(`It is currently ${tempCelsius}°C in (${tempFahrenheit} °F)  ${city} with a humidity of ${weather[city].humidity}%`);
// // } else {
// //     alert(`Sorry, we don't know the weather for ${city}, try going to https://www.google.com/search?q=weather+${city}`);
// // }

// let date = new Date();
// let time = date.getHours() + ':' + date.getMinutes()
// let day = date.getDay() + ':' + date.getMinutes()

// const options = {
//     weekday: 'long'
// };
// const dayName = date.toLocaleString('en-US', options);
// console.log(document.getElementById("display-time"))
// document.getElementById("display-time").innerText = `Local Time: ${dayName} ${time}`;

// function fetchWeatherData(cityName) {
//     const apiKey = "422a5d2a9e80b842797654cf3e2f72e8";
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             const temperature = data.main.temp;
//             const city = data.name;

//             const cityNameElement = document.getElementById("cityName"); // Elemento para mostrar el nombre de la ciudad
//             const temperatureElement = document.getElementById("temperature");

//             cityNameElement.textContent = `Weather in ${city}`; // Mostrar el nombre de la ciudad en el título
//             temperatureElement.textContent = `${temperature}°C`;
//         })
//         .catch(error => {
//             console.error("Error fetching weather data:", error);
//         });
// }

// let city = prompt("Enter a city?");
// city = city.toLowerCase();

// fetchWeatherData(city);

let isCelsius = true;

function toggleTemperatureUnits(value) {
    console.log(value.target.className)
    let temperatureElement = document.getElementById("temperature");
    let temperatureValue = parseFloat(temperatureElement.innerHTML);
    let temp = document.getElementById('temperature-number').innerText
    if (value.target.className === 'f') {
        temperatureElement.innerHTML = `<span id="temperature-number">${toFahrenheit(temp)}</span>°F`;
    } else {
        temperatureElement.innerHTML = `<span id="temperature-number">${toCelsius(temp)}</span>°C`;
    }

    isCelsius = !isCelsius;
}

function toFahrenheit(celsius) {
    return Math.round((celsius * 9 / 5) + 32).toFixed(1);
}

function toCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5 / 9).toFixed(1);
}

function displayTemperature(response) {
    console.log('displayTemperature response.data', response)

    if (!response.data) {
        return null;
    }

    let temperature = response.data.main.temp;
    let temperatureRounded = Math.round(temperature);
    let city = response.data.name;
    let country = response.data.sys.country;
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let windSpeed = response.data.wind.speed;
    let precipitation = response.data.rain ? response.data.rain["1h"] : 0;
    let feelsLike = response.data.main.feels_like;
    let feelsLikeRounded = Math.round(feelsLike);
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDate = new Date();
    let dayOfWeek = daysOfWeek[currentDate.getDay()];
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let timeOfDay = hours >= 12 ? "pm" : "am";

    if (hours >= 12) {
        timeOfDay = "pm";
    }

    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let weatherIconClass = "";
    if (description.includes("cloud")) {
        weatherIconClass = "bi-cloud";
    } else if (description.includes("rain")) {
        weatherIconClass = "bi-cloud-rain";
    } else if (description.includes("sun") || description.includes("clear")) {
        weatherIconClass = "bi-sun";
    } else {
        weatherIconClass = "bi-question";
    }

    /**
     * Get time in 12 hour format
     */
    function getTimeWithOffset(offsetInSeconds) {
        const offsetInMilliseconds = offsetInSeconds * 1000;
        const localTime = new Date();
        const targetTime = new Date(localTime.getTime() + offsetInMilliseconds);

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = days[targetTime.getUTCDay()];

        let hours = targetTime.getUTCHours();
        const minutes = targetTime.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;

        return `${dayOfWeek}, ${hours}:${strMinutes} ${ampm}`;
    }

    // Time zone funtion/
    let time12HourFormat = getTimeWithOffset(response.data.timezone);


    let temperatureElement = document.querySelector("#temperature");
    let cityCountryElement = document.querySelector("#city-country");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windSpeed");
    let precipitationElement = document.querySelector("#precipitation");
    let feelsLikeElement = document.querySelector("#feelsLike");
    let dateTimeElement = document.querySelector("#date-time");
    let weatherIconElement = document.querySelector("#weatherIcon i");

    temperatureElement.innerHTML = `<span id="temperature-number">${temperatureRounded}</span><span style="font-size: 10px; position:absolute; top:135px;">&#8451;</span>`;
    cityCountryElement.innerHTML = `${city}, ${country}`;
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = humidity.toString() + "%";
    windSpeedElement.innerHTML = windSpeed.toString() + " m/s";
    precipitationElement.innerHTML = `${precipitation} mm`;
    feelsLikeElement.innerHTML = `${feelsLikeRounded} <span style="font-size: 8px; position:absolute; margin-top:3px;">&#8451;</span>`;
    dateTimeElement.innerHTML = `${time12HourFormat}`;
    weatherIconElement.className = `bi ${weatherIconClass}`;
}

/**
 * Forecast
 */
function displayForecast(response) {
    console.log(response)
    let dailyData = response.data.daily.slice(1, 5);
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<h2 class="title-forecast">Forecast</h2><div class="row">`;
    dailyData.forEach(function (day) {
        let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

        let timestampInMilliseconds = day.dt * 1000;
        const date = new Date(timestampInMilliseconds);

        forecastHTML += `
            <div class="col-2">
                <div class="weather-forecast-date">${daysOfWeek[date.getDay()]}</div>
                <i class="fas fa-cloud fa-2x mb-3" style="color: #ddd;"></i>
                <div class="weather-forecast-temperature">
                    <span class="weather-forecast-temperature-max">${Math.round(day.temp.max)}°</span>
                    <span class="weather-forecast-temperature-min">${Math.round(day.temp.min)}°</span>
                </div>
            </div>
        `;
    });

    forecastHTML += `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

/**
 * API Calls
 */
const apiKey = "422a5d2a9e80b842797654cf3e2f72e8";
const apiKeySheCodes = "88724523008dc9e1be18f6eb6a959b67";
let lat = '';
let lon = '';

async function callApiGetCity() {
    let city = document.getElementById("cityInput").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeySheCodes}&units=metric`;

    await axios.get(apiUrl).then((response) => {
        lat = response.data.coord.lat;
        lon = response.data.coord.lon;

        displayTemperature(response);
    });
}

async function callApiGetForecast() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${apiKeySheCodes}`;

    axios.get(apiUrl).then((response) => {
        displayForecast(response);
    });
}

async function getWeather() {
    await callApiGetCity();
    await callApiGetForecast();
}


document.getElementById("celsiusLink").addEventListener("click", toggleTemperatureUnits);
document.getElementById("fahrenheitLink").addEventListener("click", toggleTemperatureUnits);
document.getElementById("searchButton").addEventListener("click", function () {
    getWeather()
});
document.getElementById("cityInput").addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        getWeather();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    getWeather();
});