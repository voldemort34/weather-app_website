const apiKey= "7dba0e6a1d4d99754887f7a220e5e8ef";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

async function fetchWeatherData(city = "") {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    return await response.json();
}


function displayWeather(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)  + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
   
    if (data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if (data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if (data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if (data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
}
     
searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    
    fetchWeatherData(city)
        .then(data => {
            console.log(data);
            displayWeather(data);
            document.querySelector(".error").style.display = "none";
        })
        .catch(error => {
            console.log("Error fetching weather data:", error);
            document.querySelector(".error").style.display = "block";
        });
})





/*
async function checkWeather(){
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

checkWeather().then(data => {
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity;
    document.querySelector(".wind").innerHTML = data.wind.speed;

}).catch(error => {
    console.log(`eror fetching:`, error);
});

*/