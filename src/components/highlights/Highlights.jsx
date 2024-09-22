import styles from "./Highlights.module.css";
import { FaTemperatureLow, FaWater } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineWaterDrop } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";
import { useAppContext } from "../../context/AppContext";

function Highlights() {
  const { currentWeatherData, isFahrenheit } = useAppContext();

  // Function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  // Function to format time (Sunrise, Sunset) based on timezone
  function formatTime(timeUnix, timezone) {
    const date = new Date((timeUnix + timezone) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  }

  return (
    <section className={styles.highlights} aria-label="highlights label">
      <h2 className={styles.tH} id="highlights-label">
        Today Highlights
      </h2>
      <div>
        <div className={styles.row}>
          <div className={styles.box}>
            <h3>Sunrise</h3>
            <div className={styles.bottom}>
              <IoMdSunny />
              <p>
                {formatTime(
                  currentWeatherData?.sys.sunrise,
                  currentWeatherData?.timezone
                )}
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <h3>Sunset</h3>
            <div className={styles.bottom}>
              <IoMoonOutline />
              <p>
                {formatTime(
                  currentWeatherData?.sys.sunset,
                  currentWeatherData?.timezone
                )}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.box}>
            <h3>Humidity</h3>
            <div className={styles.bottom}>
              <MdOutlineWaterDrop />
              <p>
                {currentWeatherData?.main.humidity}
                <small>%</small>
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <h3>Pressure</h3>
            <div className={styles.bottom}>
              <FaWater />
              <p>
                {currentWeatherData?.main.pressure}
                <small>hPa</small>
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <h3>Visibility</h3>
            <div className={styles.bottom}>
              <MdOutlineVisibility />
              <p>
                {(currentWeatherData?.visibility / 1000).toFixed(1)}
                <small> km</small>
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <h3>Feels Like</h3>
            <div className={styles.bottom}>
              <FaTemperatureLow />
              <p>
                {/* Dynamically convert and display 'Feels Like' temperature in Fahrenheit or Celsius */}
                {isFahrenheit
                  ? `${convertToFahrenheit(currentWeatherData?.main.feels_like).toFixed(1)} °F`
                  : `${currentWeatherData?.main.feels_like.toFixed(1)} °C`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
