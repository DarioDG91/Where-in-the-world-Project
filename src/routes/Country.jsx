import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Circles as Loader } from "react-loader-spinner";
import { addDots } from "../../util/utility";

export default function Country() {
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState({});
  const [languages, setLanguages] = useState({});

  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data) {
          setCountries(data);
          setCountryData(
            data.filter((item) => {
              return item.name.common === params.countryId;
            })[0]
          );
          setLanguages(
            data.filter((item) => {
              return item.name.common === params.countryId;
            })[0].languages
          );
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [params]);

  // console.log(countryData);

  const getPropertyValue = (obj, propertyName) => {
    if (!obj) return "";
    const keys = Object.keys(obj);
    for (const key of keys) {
      if (obj[key][propertyName]) {
        return obj[key][propertyName];
      }
    }
    return "";
  };

  const nativeName = getPropertyValue(countryData.name?.nativeName, "common");
  const currency = getPropertyValue(countryData.currencies, "name");

  return (
    <>
      <main
        id="country"
        className=" flex flex-col gap-6  px-12 py-10 items-center "
      >
        <Link to="/" className="btn px-6 py-1 self-start">
          {" "}
          <div className=" flex items-center gap-2">
            <svg
              className=" w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M244 400L100 256l144-144M120 256h292"
              />
            </svg>
            <div>Back</div>
          </div>
        </Link>
        {!isLoading ? (
          <div className=" flex flex-col lg:flex-row sm:justify-center items-center sm:gap-32 w-full max-w-[1440px]">
            <img
              className="  sm:flex-1"
              src={countryData.flags?.svg}
              alt={`${countryData.name?.common}'s flag `}
              height="300px"
              width="260px"
            />
            <div className=" flex flex-col items-start gap-6 mt-6 sm:flex-1">
              <h1 className=" text-xl font-bold sm:text-3xl">
                {countryData.name?.common}
              </h1>
              <div className=" flex flex-col sm:flex-row gap-8 sm:gap-32">
                <div className=" flex flex-col gap-2">
                  <div className=" flex items-center gap-2">
                    <h3 className=" font-bold">Native name:</h3>
                    <p>{nativeName}</p>
                  </div>
                  <div className=" flex items-center gap-2">
                    <h3 className=" font-bold">Population:</h3>
                    <p> {addDots(countryData.population)}</p>
                  </div>
                  <div className=" flex items-center gap-2">
                    <h3 className=" font-bold">Region:</h3>
                    <p>{countryData.region}</p>
                  </div>
                  <div className=" flex items-center gap-2">
                    <h3 className=" font-bold">Sub Region:</h3>
                    <p>{countryData.subregion}</p>
                  </div>
                  <div className=" flex items-center gap-2">
                    <h3 className=" font-bold">Capital:</h3>
                    <p>
                      {countryData.capital?.length > 1
                        ? countryData.capital.join(", ")
                        : countryData.capital}
                    </p>
                  </div>
                </div>
                <div className=" flex flex-col gap-2">
                  <div className=" flex items-center gap-2">
                    <h3 className=" font-bold">Top Level Domain:</h3>
                    <p>
                      {countryData.tld?.length > 1
                        ? countryData.tld.join(", ")
                        : countryData.tld}
                    </p>
                  </div>
                  <div className=" flex items-center gap-2">
                    <h3 className=" font-bold">Currencies:</h3>
                    <p>{currency}</p>
                  </div>
                  <div className=" flex  gap-2">
                    <h3 className=" font-bold">Languages:</h3>
                    <p>{Object.values(languages).join(", ")}</p>
                  </div>
                </div>
              </div>
              {countryData.borders !== undefined ? (
                <div className=" flex flex-col gap-3 sm:mt-8">
                  <h3 className=" font-bold">Border Countries:</h3>
                  <ul className=" flex flex-wrap justify-start items-center">
                    {countryData.borders?.map((item) => {
                      // console.log(item);
                      const commonNameBorderCountry = countries.filter(
                        (country) => country.cca3 === item
                      )[0].name.common;

                      return (
                        <li className=" mx-1 my-2" key={item}>
                          <Link
                            className="btn px-7 py-1 "
                            to={`/${commonNameBorderCountry}`}
                          >
                            {" "}
                            {commonNameBorderCountry}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className=" flex justify-center items-center mt-16 w-full">
            <Loader />
          </div>
        )}
      </main>
    </>
  );
}
