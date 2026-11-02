import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [newCountry, setNewCountry] = useState("");

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  if (!countries) {
    return <div>Loading...</div>;
  }

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value);
  };

  const countriesToShow =
    newCountry === ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(newCountry.toLowerCase()),
        );

  const toggleToShow = (name) => {
    setNewCountry(name);
  };

  return (
    <div>
      <p>
        find countries
        <input value={newCountry} onChange={handleCountryChange} />
      </p>
      {countriesToShow.length > 10 && newCountry !== "" ? (
        <div>Too many matches, specify another filter</div>
      ) : countriesToShow.length === 1 && newCountry !== "" ? (
        countriesToShow.map((country) => <Country country={country} />)
      ) : (
        countriesToShow.map((country) => (
          <div key={country.name.common}>
            <p>
              {country.name.common}{" "}
              <button onClick={() => toggleToShow(country.name.common)}>
                Show
              </button>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
