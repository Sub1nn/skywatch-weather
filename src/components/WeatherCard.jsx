import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const WeatherCard = ({ city, temperature, condition }) => {
  const getIcon = (condition) => {
    switch (condition) {
      case "clear sky":
        return "CLEAR_DAY";
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return "PARTLY_CLOUDY_DAY";
      case "shower rain":
      case "rain":
        return "RAIN";
      case "thunderstorm":
        return "SLEET";
      case "snow":
        return "SNOW";
      case "mist":
        return "FOG";
      default:
        return "CLOUDY";
    }
  };

  const getColor = (condition) => {
    switch (condition) {
      case "clear sky":
        return "#FFD700"; // Gold
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return "#B0C4DE"; // Light Steel Blue
      case "shower rain":
      case "rain":
        return "#00BFFF"; // Deep Sky Blue
      case "thunderstorm":
        return "#FF4500"; // Orange Red
      case "snow":
        return "#00FFFF"; // Aqua
      case "mist":
        return "#696969"; // Dim Gray
      default:
        return "#808080"; // Gray
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-2">{city}</h2>
      <ReactAnimatedWeather
        icon={getIcon(condition)}
        color={getColor(condition)}
        size={54}
        animate={true}
      />
      <p className="text-xl mt-4">{temperature}°C</p>
      <p className="text-gray-700">{condition}</p>
    </div>
  );
};

export default WeatherCard;
