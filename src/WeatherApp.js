import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import Zoom from 'react-reveal/Zoom'

function WeatherApp() {
  const apiKey = "d9ac64f060c8d14585c1fc3742174016";
  const [weather, setWeather] = useState([{}]);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const getWeather = (event) => {
    event.preventDefault();
    //if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw Error('Invalid entry !');
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
          setCity("");
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setWeather("")
        });
    //}
  };

  return (
    <div className=" mx-auto w-1/2 min-w-min bg-blue-400 my-8  pb-8 rounded-xl">
      <form action="" onSubmit={getWeather}>
      <div className="search flex justify-center items-center text-center py-8  ">
        <input
          className="border border-black px-2 min-w-min lg:w-96 h-10 outline-none bg-gray-300"
          type="text"
          placeholder="Enter City Name"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          //onKeyPress={getWeather}
        />
        <button className="border border-black px-4 h-10 text-2xl bg-gray-300" type="submit">
          <FcSearch />
        </button>
      </div>
      {typeof weather.main === "undefined" ? (
        <div className="message text-sm md:text-base  px-4 text-center">
          Enter city name to get weather status.
        </div>
      ) : (
        <div className="weather-data">
          <div className="weather text-gray-100 text-center">
            <h2 className="city py-4 text-4xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <Zoom duration={4000}>
            <div className="temp">
              <div className="text-xl md:text-4xl lg:text-6xl flex justify-center items-center 
              gap-8 md:gap-12 text-black py-4 my-6 mx-auto font-semibold w-1/2 bg-blue-100 rounded-lg shadow-lg">
                <img
                  src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt="weather status icon"
                  className="weather-icon"
                />
                {Math.round(weather.main.temp)} &deg;c
              </div>
            </div>
            </Zoom>
            <div className="description pb-4 text-xl">
              {weather.weather[0].description}
            </div>
            <div className="wind-speed md:flex items-center justify-center gap-32 text-black text-sm lg:text-xl mx-8">
              <div className="humidity py-4">
                Humidity: {weather.main.humidity}
              </div>
              <div className="wind">Wind speed: {weather.wind.speed}</div>
            </div>
          </div>
        </div>
      )}
      {/* {weather.cod === "404" ? (
        <p className="text-red-600 text-center py-1">Error... Incorrect city name</p>
      ) : (
        <>
        </>
      )} */}
      {error && (
        <div className="text-center text-red-600 text-sm py-1">
          {" "}
          Error... {error}{" "}
          
        </div>
      )}
      </form>
    </div>
  );
}

export default WeatherApp;
