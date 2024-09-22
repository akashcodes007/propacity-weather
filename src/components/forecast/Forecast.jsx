import { useAppContext } from "../../context/AppContext";
import styles from "./Forecast.module.css";

function Forecast() {
  const { forecastData, isFahrenheit } = useAppContext();
  let fiveDaysForecast = [];

  // Function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  // Loop through forecast data and pick the forecast for 5 days
  for (let i = 7; i < forecastData?.list.length; i += 8) {
    const forecastItem = forecastData?.list[i];
    const date = new Date(forecastItem?.dt * 1000);
    const options = { day: "numeric", month: "long" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);

    fiveDaysForecast.push({
      formattedDate: formattedDate,
      dayName: dayName,
      forecastItem: forecastItem,
    });
  }

  return (
    <section className={styles.forecast} aria-label="forecast label">
      <h2>5 Days Forecast:</h2>
      <div className={styles.cardWrapper}>
        {fiveDaysForecast.map((item) => (
          <div className={styles.card} key={item.forecastItem.dt}>
            <img
              src={`https://openweathermap.org/img/wn/${item.forecastItem.weather[0].icon}@2x.png`}
              alt="Weather icon"
              title={item.forecastItem.weather[0].description}
              className="weather-icon"
              loading="lazy"
            />
            {/* Dynamically display temperature in Celsius or Fahrenheit */}
            <span>
              {isFahrenheit
                ? `${Math.round(convertToFahrenheit(item.forecastItem.main.temp_max))}°F`
                : `${Math.round(item.forecastItem.main.temp_max)}°C`}
            </span>
            <p className={styles.label}>{item.formattedDate}</p>
            <p className={styles.label}>{item.dayName}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forecast;
