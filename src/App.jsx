import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./index.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const fetchWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`Error fetching data for ${city}:`, error.message);
      return null;
    });
};

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const initialCities = [
      "New York",
      "London",
      "Tokyo",
      "Sydney",
      "Helsinki",
      "Kathmandu",
    ];
    const fetchAllWeatherData = async () => {
      const weatherData = initialCities.map((city) => fetchWeather(city));
      const weatherDataArray = await Promise.all(weatherData);
      const validWeatherDataArray = weatherDataArray.filter(
        (data) => data !== null
      );
      setWeatherData(validWeatherDataArray);
    };

    fetchAllWeatherData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchWeather(searchQuery);
    if (data) {
      setSearchResult(data);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">SkyWatch Weather Dashboard</h1>
      <form onSubmit={handleSearch} className="mb-8 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city"
          className="p-2 rounded-l-md border border-gray-300"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md"
        >
          Search
        </button>
      </form>
      {searchResult && (
        <div className="mb-8">
          <WeatherCard
            city={searchResult.name}
            temperature={searchResult.main.temp}
            condition={searchResult.weather[0].description}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {weatherData.map((data, index) => (
          <WeatherCard
            key={index}
            city={data.name}
            temperature={data.main.temp}
            condition={data.weather[0].description}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
