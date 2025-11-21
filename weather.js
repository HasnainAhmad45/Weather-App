const apikey = "8c77042e721109158ba07b30a4a48e55";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let search = document.getElementById("in");
let pic = document.getElementById("img");
let container = document.getElementById("container");

async function check_weather(city) {
    try {
        // Show loading state
        container.classList.add('loading');
        
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        var data = await response.json();
        console.log(data);

        // Update weather information
        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.getElementById("w-speed").innerHTML = data.wind.speed + " km/h";
        document.getElementById("humid").innerHTML = data.main.humidity + "%";

        // Update weather icon based on conditions
        if (data.weather[0].main == "Clouds") {
            pic.src = "./icons/cloud-png-isolated-transparent-background_191095-18057.avif";
        } else if (data.weather[0].main == "Clear") {
            pic.src = "./icons/pexels-photo-96622.webp";
        } else if (data.weather[0].main == "Rain") {
            pic.src = "./icons/weather-icon-with-rain-cloud-with-water-drops_107791-17374.jpg";
        } else if (data.weather[0].main == "Drizzle") {
            pic.src = "./icons/raindrops-misted-on-a-windscreen.jpg";
        } else if (data.weather[0].main == "Mist" || data.weather[0].main == "Fog") {
            pic.src = "./icons/mist.png"; // You might need to add this icon
        } else if (data.weather[0].main == "Snow") {
            pic.src = "./icons/snow.png"; // You might need to add this icon
        } else {
            pic.src = "./icons/770b805d5c99c7931366c2e84e88f251.png"; // Default icon
        }

        // Remove any existing error messages
        removeErrorMessage();
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showErrorMessage('City not found. Please try again.');
    } finally {
        // Remove loading state
        container.classList.remove('loading');
    }
}

function showErrorMessage(message) {
    removeErrorMessage(); // Remove existing error first
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    container.appendChild(errorDiv);
}

function removeErrorMessage() {
    const existingError = container.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }
}

// Search when button is clicked
let btn = document.getElementById("btn-1");
btn.addEventListener("click", () => {
    if (search.value.trim() !== '') {
        check_weather(search.value.trim());
    }
});

// Search when Enter key is pressed
search.addEventListener("keypress", (e) => {
    if (e.key === 'Enter' && search.value.trim() !== '') {
        check_weather(search.value.trim());
    }
});

// Load default city on startup
check_weather("London");