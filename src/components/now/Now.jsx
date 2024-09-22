import { useAppContext } from "../../context/AppContext";
import styles from "./Now.module.css";
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

function Now() {
  const { currentWeatherData, isFahrenheit, toggleTemperatureUnit } =
    useAppContext();

  // Function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  // Get the temperature, convert if needed
  const tempCelsius = Math.round(currentWeatherData?.main?.temp) || 0;
  const temperature = isFahrenheit
    ? Math.round(convertToFahrenheit(tempCelsius))
    : tempCelsius;

  return (
    <section className={styles.currentWeather} aria-label="current weather">
      <div className={styles.card}>
        <h2 className={styles.title}>
          Now in {currentWeatherData?.name || ""}
        </h2>
        <div className={styles.wrapper}>
          <span className={styles.temp}>
            {temperature}°{isFahrenheit ? "F" : "C"}
          </span>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeatherData?.weather[0].icon}@2x.png`}
            alt="Weather icon"
            className={styles.weatherIcon}
            loading="lazy"
          />
        </div>
        <p className={styles.wState}>
          {currentWeatherData?.weather[0].description}
        </p>
        <ul className={styles.metaList}>
          <li className={styles.metaItem}>
            <MdDateRange />
            <p className={styles.metaText}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </li>
          <li className={styles.metaItem}>
            <FaLocationDot />
            <p className={styles.metaText}>{`${
              currentWeatherData?.name || ""
            }, ${currentWeatherData?.sys.country || ""}`}</p>
          </li>
        </ul>

        {/* Custom switch for Celsius / Fahrenheit */}
        <label
          htmlFor="filter"
          className={styles.switch}
          aria-label="Toggle Temperature Unit"
        >
          <input
            type="checkbox"
            id="filter"
            checked={isFahrenheit}
            onChange={toggleTemperatureUnit} // Use the toggle function from context
          />
          <span className={styles.toggleText}>Celsius</span>
          <span className={styles.toggleText}>Fahrenheit</span>
        </label>
      </div>
    </section>
  );
}

export default Now;
