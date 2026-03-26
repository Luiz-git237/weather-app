<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather App</title>

    <style>
      body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        color: white;
        text-align: center;
        padding: 40px;
      }

      .app {
        max-width: 400px;
        margin: auto;
        background: rgba(0, 0, 0, 0.2);
        padding: 20px;
        border-radius: 15px;
        backdrop-filter: blur(10px);
      }

      input {
        padding: 10px;
        width: 70%;
        border: none;
        border-radius: 8px;
        outline: none;
      }

      button {
        padding: 10px;
        border: none;
        border-radius: 8px;
        background: #ffcc00;
        cursor: pointer;
        font-weight: bold;
      }

      .weather {
        margin-top: 20px;
      }

      img {
        width: 100px;
      }

      .temp {
        font-size: 40px;
        font-weight: bold;
      }
    </style>
  </head>

  <body>
    <div class="app">
      <h2>🌤 Weather App</h2>

      <input type="text" id="city" placeholder="Enter city" />
      <button onclick="getWeather()">Search</button>

      <div class="weather" id="weather"></div>
    </div>

    <script>
      const weatherIcons = {
        0: "https://cdn-icons-png.flaticon.com/512/869/869869.png", // clear
        1: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png", // mainly clear
        2: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png", // partly cloudy
        3: "https://cdn-icons-png.flaticon.com/512/414/414825.png", // cloudy
        45: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png", // fog
        48: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
        51: "https://cdn-icons-png.flaticon.com/512/414/414974.png", // drizzle
        61: "https://cdn-icons-png.flaticon.com/512/414/414974.png", // rain
        71: "https://cdn-icons-png.flaticon.com/512/642/642102.png", // snow
        80: "https://cdn-icons-png.flaticon.com/512/414/414974.png",
        95: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png", // thunderstorm
      };

      async function getWeather() {
        const city = document.getElementById("city").value;

        if (!city) return;

        // 1. Get coordinates
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
        );
        const geoData = await geoRes.json();

        if (!geoData.results) {
          alert("City not found");
          return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // 2. Get weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
        );
        const weatherData = await weatherRes.json();

        const weather = weatherData.current_weather;

        const icon = weatherIcons[weather.weathercode] || weatherIcons[0];

        // 3. Display
        document.getElementById("weather").innerHTML = `
        <h3>${name}, ${country}</h3>
        <img src="${icon}" alt="weather icon">
        <div class="temp">${weather.temperature}°C</div>
        <p>Wind: ${weather.windspeed} km/h</p>
    `;
      }
    </script>
  </body>
</html>
