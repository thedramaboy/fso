import { useEffect, useState } from "react";
import countryService from "../services/countries";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getWeather(country.capital[0]).then((initialWeather) => {
      setWeather(initialWeather);
    });
  }, [country.capital[0]]);

  return (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
      {weather && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <p>temperature {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Country;
