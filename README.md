# Weather App 🌦️

A clean and simple weather application built with HTML, CSS, and vanilla JavaScript that provides real-time weather data for any city. This app fetches data from the OpenWeatherMap API and displays the current temperature, humidity, wind speed, and a dynamic weather icon.



---

## ✨ Features

-   **City Search**: Find the current weather for any city in the world.
-   **Real-Time Data**: Displays up-to-date temperature, humidity, and wind speed.
-   **Dynamic Icons**: The weather icon changes automatically to reflect the current conditions (e.g., sunny, cloudy, rainy).
-   **Error Handling**: Provides clear feedback for invalid city names or API key issues.
-   **Local Storage**: Remembers and displays the weather for the last searched city when you reopen the app.
-   **Responsive Design**: A clean, mobile-first design that looks great on any device.

---

## 🛠️ How It Works

The application uses the **OpenWeatherMap API** to fetch weather data.

1.  A user enters a city name into the search bar.
2.  The JavaScript `fetch` function makes an asynchronous call to the OpenWeatherMap API endpoint with the specified city and the user's API key.
3.  Once the data is received, the script dynamically updates the DOM to display the temperature, city name, humidity, and wind speed.
4.  The weather condition icon is also updated based on the data provided by the API.
5.  If the city is not found or another error occurs, a user-friendly error message is displayed.

---

## 🔐 Security Note: API Key Management

The OpenWeatherMap API key is sensitive and should **not** be exposed in a public GitHub repository. This project uses a `config.js` file to separate the key from the main application logic. This file is included in the `.gitignore` file to prevent it from being committed.

To run this project, you must create your own `config.js` file.

---

## 🚀 Setup and Installation

Follow these steps to set up the project on your local machine.

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/weather-app.git](https://github.com/your-username/weather-app.git)
    cd weather-app
    ```

2.  **Get your API Key**:
    -   Go to [OpenWeatherMap](https://openweathermap.org/api) and sign up for a free account.
    -   Navigate to the "API keys" tab and get your free API key.

3.  **Create the Configuration File**:
    -   In the root of the project folder, create a new file named `config.js`.
    -   Add the following code to it, replacing the placeholder with your actual API key:
        ```javascript
        const CONFIG = {
            API_KEY: "YOUR_OPENWEATHERMAP_API_KEY_HERE"
        };
        ```

4.  **Create a `.gitignore` file**:
    -   To ensure you don't accidentally commit your secret key, create a file named `.gitignore` in the root of the project.
    -   Add the following line to it:
        ```
        config.js
        ```

5.  **Open in Browser**:
    -   Open the `index.html` file in your web browser to run the application.

---

## 💻 Technologies Used

-   **HTML5**: For the structure of the application.
-   **CSS3**: For styling and layout, including the gradient background and responsive design.
-   **Vanilla JavaScript**: For the application logic, API calls, and DOM manipulation.

## Licence
This project 
