import { getWeather } from "./visual-crossing-access.js";

const form = document.querySelector("form");
const weatherContent = document.querySelector(".weather-content");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const latitude = document.querySelector("#latitude");
  const longitude = document.querySelector("#longitude");
  const weatherData = await getWeather(latitude.value, longitude.value);
  console.log(weatherData);

  weatherContent.replaceChildren();

  weatherData.days.forEach(function(item){
    const dailyContent = document.createElement("div");
    dailyContent.className = "daily-content";

    const tempMaxDisplay = document.createElement("p");
    tempMaxDisplay.textContent = `Temp Max: ${item.tempmax}`;

    const tempMinDisplay = document.createElement("p");
    tempMinDisplay.textContent = `Temp Min: ${item.tempmin}`;

    const precipProbDisplay = document.createElement("p");
    precipProbDisplay.textContent = `Precip Chance: ${item.precipprob}%`;

    const precipTypeDisplay = document.createElement("p");
    precipTypeDisplay.textContent = `Precip Type: ${item.preciptype[0]}`;

    dailyContent.appendChild(tempMaxDisplay);
    dailyContent.appendChild(tempMinDisplay);
    dailyContent.appendChild(precipProbDisplay);
    dailyContent.appendChild(precipTypeDisplay);
    weatherContent.appendChild(dailyContent);
  });
});