// We get the API key from the new config.js file
const apiKey = CONFIG.API_KEY; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDisplay = document.querySelector(".weather");
const errorDisplay = document.querySelector(".error");

/**
 * Fetches weather data for a given city and updates the UI.
 * @param {string} city - The name of the city to get weather for.
 */
async function checkWeather(city) {
    if (!apiKey || apiKey === "YOUR_OPENWEATHERMAP_API_KEY_HERE") {
        errorDisplay.style.display = "block";
        weatherDisplay.style.display = "none";
        errorDisplay.querySelector("p").textContent = "API Key not configured. Please add your key to config.js";
        return;
    }

    const fetchUrl = `${apiUrl}${city}&appid=${apiKey}`;

    try {
        const response = await fetch(fetchUrl);

        if (!response.ok) {
            errorDisplay.style.display = "block";
            weatherDisplay.style.display = "none";
            if (response.status === 401) {
                errorDisplay.querySelector("p").textContent = "Invalid API Key. Please check your key in config.js";
            } else if (response.status === 404) {
                 errorDisplay.querySelector("p").textContent = "Invalid city name.";
            } else {
                 errorDisplay.querySelector("p").textContent = "An error occurred. Please try again.";
            }
            return;
        }

        const data = await response.json();

        // Update UI with fetched data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Show weather info and hide error message
        weatherDisplay.style.display = "block";
        errorDisplay.style.display = "none";

        // Save the last searched city to local storage
        localStorage.setItem("lastCity", city);

    } catch (error) {
        errorDisplay.querySelector("p").textContent = "Could not connect to the weather service.";
        errorDisplay.style.display = "block";
        weatherDisplay.style.display = "none";
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    if (searchBox.value) {
        checkWeather(searchBox.value);
    }
});

// Event listener for the Enter key in the search box
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (searchBox.value) {
            checkWeather(searchBox.value);
        }
    }
});

// On page load, check for a saved city in local storage
window.addEventListener("load", () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        checkWeather(lastCity);
    } else {
        // Default to a pre-defined city if no city is saved
        checkWeather("Delhi");
    }
});
