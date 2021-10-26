import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";

function WeatherApp() {
  const apiKey = "d9ac64f060c8d14585c1fc3742174016";
  const [weather, setWeather] = useState([{}]);
  const [city, setCity] = useState("");
  

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setCity("");
          
        });
    }
  };

  return (
    <div className=" mx-auto w-1/2 min-w-max bg-blue-400 my-8 lg:my-32 pb-8 rounded-lg">
      <div className="search flex justify-center items-center text-center py-16 ">
        <input
          className="border border-black px-2 min-w-min lg:w-96 h-10 outline-none bg-gray-300"
          type="text"
          placeholder="Enter City Name"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={getWeather}
        />
        <button className="border border-black px-4 h-10 text-2xl bg-gray-300">
          <FcSearch />
        </button>
      </div>
      {typeof weather.main != "undefined" ? (
        <div className="weather-data">
          <div className="weather text-gray-100 text-center">
            <h2 className="city py-4 text-4xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="temp">
              <div className="weather-icon"></div>
              <div className="text-6xl flex justify-center gap-2 text-black py-8 my-6 mx-auto font-semibold w-1/2 bg-blue-100 rounded-lg shadow-lg">
              <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />
                {Math.round(weather.main.temp)} &deg;c
              </div>
            </div>
            <div className="description pb-4 text-xl">
              {weather.weather[0].description}
            </div>
            <div className="wind-speed flex items-center justify-center gap-32 text-black text-xl">
              <div className="humidity py-4">
                Humidity: {weather.main.humidity}
              </div>
              <div className="wind">Wind speed: {weather.wind.speed}</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default WeatherApp;
