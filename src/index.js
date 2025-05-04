function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let timeElement = document.querySelector("#time");
  let dayElement = document.querySelector("#day");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  timeElement.innerHTML = formatTime(date);
  dayElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}

function formatTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 12) {
    return `${hours}:${minutes} AM`;
  } else {
    hours = hours - 12;
    return `${hours}:${minutes} PM`;
  }
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let today = date.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return `${day}, ${today}  ${month} ${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function searchCity(city) {
  let apiKey1 = "34eba43b83b3fa388doc023be8fb7t33";
  let apiUrl1 = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey1}`;
  console.log(apiUrl1);
  axios.get(apiUrl1).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#Search-input");
  searchCity(searchInput.value);
}
function getForecast(city) {
  let apiKey2 = "34eba43b83b3fa388doc023be8fb7t33";
  let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey2}&units=metric`;
  axios(apiUrl2).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormelement = document.querySelector("#search-form");
searchFormelement.addEventListener("submit", handleSearchSubmit);

displayForecast();
