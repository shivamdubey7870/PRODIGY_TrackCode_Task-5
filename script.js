// JavaScript for fetching and displaying weather data

const locationInput = document.getElementById('locationInput');
const fetchWeatherButton = document.getElementById('fetchWeather');
const weatherInfo = document.getElementById('weatherInfo');

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

fetchWeatherButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location === '') {
        alert('Please enter a location.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const { name, main, weather } = data;
                const temperature = main.temp;
                const description = weather[0].description;
                const icon = weather[0].icon;

                const weatherHTML = `
                    <h2>${name}</h2>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather: ${description}</p>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
                `;

                weatherInfo.innerHTML = weatherHTML;
            } else {
                weatherInfo.innerHTML = '<p>Location not found. Please try again.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>An error occurred. Please try again later.</p>';
        });
});