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

function displayTemperature(response) {
    console.log(response.data)

    let temperature = response.data.main.temp;
    let city = response.data.name;
    let country = response.data.sys.country;
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let windSpeed = response.data.wind.speed;
    let precipitation = response.data.rain ? response.data.rain["1h"] : 0;
    let feelsLike = response.data.main.feels_like;
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDate = new Date();
    let dayOfWeek = daysOfWeek[currentDate.getDay()];
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let timeOfDay = hours >= 12 ? "pm" : "am";
    if (hours > 12) {
        hours -= 12;
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




    let temperatureElement = document.querySelector("#temperature");
    let cityCountryElement = document.querySelector("#city-country");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windSpeed");
    let precipitationElement = document.querySelector("#precipitation");
    let feelsLikeElement = document.querySelector("#feelsLike");
    let dateTimeElement = document.querySelector("#date-time");
    let currentTime = `${dayOfWeek} ${hours}:${minutes} ${timeOfDay}`;
    let weatherIconElement = document.querySelector("#weatherIcon i");



    temperatureElement.innerHTML = `${temperature}`;
    cityCountryElement.innerHTML = `${city}, ${country}`;
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = humidity.toString() + "%";
    windSpeedElement.innerHTML = windSpeed.toString() + " m/s";
    precipitationElement.innerHTML = `${precipitation} mm`;
    feelsLikeElement.innerHTML = feelsLike;
    dateTimeElement.innerHTML = `${currentTime}`;
    weatherIconElement.className = `bi ${weatherIconClass}`;

}

let apiKey = "422a5d2a9e80b842797654cf3e2f72e8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=-33.8688&lon=151.2093&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);