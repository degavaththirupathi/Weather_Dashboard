const apiKey = "84b79da5e5d7c92085660485702f4ce8"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

function fetchWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found. Please try again.");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      showError(error.message);
    });
}

function displayWeather(data) {
  const weatherInfo = document.getElementById("weatherInfo");
  const errorMessage = document.getElementById("errorMessage");
  weatherInfo.innerHTML = "";
  errorMessage.innerHTML = "";

  const current = data.list[0];
  const forecast = data.list.filter((item, index) => index % 8 === 0); 

  const currentWeatherHTML = `
    <div class="weather-card">
      <h2>${data.city.name}, ${data.city.country}</h2>
      <p>${new Date(current.dt * 1000).toLocaleDateString()}</p>
      <img src="http://openweathermap.org/img/wn/${current.weather[0].icon}.png" alt="${current.weather[0].description}" class="weather-icon">
      <p>${current.main.temp}°C</p>
      <p>${current.weather[0].description}</p>
      <p>Humidity: ${current.main.humidity}%</p>
      <p>Wind: ${current.wind.speed} m/s</p>
    </div>
  `;
  weatherInfo.innerHTML += currentWeatherHTML;

  const forecastHTML = `
    <div class="forecast-container">
      ${forecast.slice(0, 5).map((day) => `
        <div class="weather-card">
          <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
          <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}" class="weather-icon">
          <p>${day.main.temp}°C</p>
          <p>${day.weather[0].description}</p>
        </div>
      `).join("")}
    </div>
  `;
  weatherInfo.innerHTML += forecastHTML;
}

function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.innerHTML = message;
}