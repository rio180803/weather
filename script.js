function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('weather').innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = 'a839dd1a7e0d434fab441030243105'; // Replace with your actual WeatherAPI key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherCondition = data.current.condition.text.toLowerCase();
            let weatherIcon = '';

            if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
                weatherIcon = '☀️';
            } else if (weatherCondition.includes('cloudy') || weatherCondition.includes('overcast')) {
                weatherIcon = '☁️';
            } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
                weatherIcon = '🌧️';
            } else if (weatherCondition.includes('snow')) {
                weatherIcon = '❄️';
            } else if (weatherCondition.includes('thunder')) {
                weatherIcon = '⛈️';
            } else {
                weatherIcon = '🌤️';
            }

            const weather = `
                <div class="weather-icon">${weatherIcon}</div>
                <p>Location: ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
                <p>Temperature: ${data.current.temp_c} °C</p>
                <p>Weather: ${data.current.condition.text}</p>
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind Speed: ${data.current.wind_kph} kph</p>
            `;
            document.getElementById('weather').innerHTML = weather;
        })
        .catch(error => {
            document.getElementById('weather').innerText = `Unable to retrieve weather data: ${error.message}`;
            console.error('Error fetching weather data:', error);
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('weather').innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('weather').innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('weather').innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('weather').innerText = "An unknown error occurred.";
            break;
    }
}
