import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import Selection from "../components/Selection";
import { Link } from "react-router-dom";
import { Circles as Loader } from "react-loader-spinner";
import { addDots } from "../../util/utility";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [countryName, setCountryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data) {
          setCountries(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
    });
  }, []);

  function handleRegionValue(value) {
    setRegion(value);
  }

  function handleCountryName(country) {
    setCountryName(country);
  }

  //   console.log(countryName);

  function capitalize(str) {
    if (str) {
      return str[0].toUpperCase() + str.slice(1);
    }
  }

  // Calculate distance between two locations using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  const listOfCountries = (
    <section className=" mt-8">
      <ul className=" flex justify-start items-center flex-col md:flex-row sm:flex-wrap  gap-12">
        {countries
          .filter((country) => {
            if (
              region !== "" &&
              country.name.common
                .toLowerCase()
                .includes(countryName.toLowerCase())
            ) {
              return country.region === capitalize(region);
            }

            if (
              region === "" &&
              country.name.common
                .toLowerCase()
                .includes(countryName.toLowerCase())
            ) {
              return country;
            }
          })
          .sort((a, b) => {
            // Sorting the array of objects by the user location
            if (userLocation) {
              const distanceToA = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                a.latlng[0],
                a.latlng[1]
              );
              const distanceToB = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                b.latlng[0],
                b.latlng[1]
              );

              return distanceToA - distanceToB;
            } else {
              // Sorting the array of objects alphabetically by the 'name' key
              // Convert names to lowercase for case-insensitive sorting
              const nameA = a.name.common.toLowerCase();
              const nameB = b.name.common.toLowerCase();

              // Compare the names
              if (nameA < nameB) {
                return -1; // nameA comes before nameB
              } else if (nameA > nameB) {
                return 1; // nameA comes after nameB
              } else {
                return 0; // names are equal
              }
            }
          })
          .map((country) => {
            // console.log(country);

            return (
              <li key={country.cca3} className=" shadow-lg">
                <Link to={`/${country.name.common}`}>
                  <div className="card-country w-[17.4rem] min-h-[19rem] rounded-md overflow-hidden">
                    <img
                      className=" w-full h-36 object-center object-fill shadow"
                      src={country.flags.png}
                      alt={`${country.name.common}'s flag`}
                    />
                    <div className=" px-4 py-4 ">
                      <h2 className=" font-bold mb-4">{country.name.common}</h2>
                      <div className=" flex gap-2">
                        <h3 className="font-semibold">Population:</h3>
                        <p className="card-paragraph">
                          {addDots(country.population)}
                        </p>
                      </div>
                      <div className=" flex gap-2">
                        <h3 className="font-semibold">Region:</h3>
                        <p className="card-paragraph">{country.region}</p>
                      </div>
                      <div className=" flex gap-2">
                        <h3 className="font-semibold">Capital:</h3>
                        <p className="card-paragraph">
                          {country.capital?.length > 1
                            ? country.capital.join(", ")
                            : country.capital}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );

  return (
    <main className=" py-8 px-4 sm:px-20">
      <div className=" sm:flex sm:justify-between sm:items-center  ">
        <Searchbar onCountryName={handleCountryName} />
        <Selection onRegionValue={handleRegionValue} />
      </div>
      {!isLoading ? (
        listOfCountries
      ) : (
        <div className=" flex justify-center items-center mt-16">
          <Loader />
        </div>
      )}
    </main>
  );
}
