// Get your own API key from OpenWeatherMap
const apiKey = "5e8b584e70de3397f203b648f35f22d3"; // IMPORTANT: Replace with your actual API key
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
    // --- HOW TO DEBUG ---
    // 1. In your browser (Chrome, Firefox, Edge), press F12 to open Developer Tools.
    // 2. Click on the "Console" tab.
    // 3. Look for any red error messages when you try to search for a city.

    const fetchUrl = `${apiUrl}${city}&appid=${apiKey}`;
    console.log("Fetching weather data from:", fetchUrl); // Logs the exact URL being used

    try {
        const response = await fetch(fetchUrl);
        console.log("API Response:", response); // Logs the response object

        if (!response.ok) {
            // This will catch errors like 401 (Invalid API Key) or 404 (City Not Found)
            console.error(`Error: ${response.status} - ${response.statusText}`);
            errorDisplay.style.display = "block";
            weatherDisplay.style.display = "none";
            if (response.status === 401) {
                errorDisplay.querySelector("p").textContent = "Invalid API Key. Please check your key in script.js";
            } else if (response.status === 404) {
                 errorDisplay.querySelector("p").textContent = "Invalid city name.";
            }
            return;
        }

        const data = await response.json();
        console.log("API Data:", data); // Logs the weather data

        // Update UI with fetched data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon using the official icon from the API
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


        // Show weather info and hide error message
        weatherDisplay.style.display = "block";
        errorDisplay.style.display = "none";

        // Save the last searched city to local storage
        localStorage.setItem("lastCity", city);

    } catch (error) {
        console.error("A network error occurred or the script failed:", error);
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
        checkWeather("Agra");
    }
});
