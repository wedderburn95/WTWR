import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { useContext } from "react";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/constants.js";

function Main({
  weatherData,
  onCardClick,
  clothingItems,
  onCardLike,
  onCardDelete,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentWeatherOption =
    weatherOptions.find((option) => option.day === weatherData.type) ||
    defaultWeatherOptions;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
