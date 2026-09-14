import { getWeather } from "./visual-crossing-access.js";
import { toF, toC } from "./helpers.js";

const form = document.querySelector("form");
const weatherContent = document.querySelector(".weather-content");

let maxTemps = [];
let minTemps = [];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const latitude = document.querySelector("#latitude");
  const longitude = document.querySelector("#longitude");
  const weatherData = await getWeather(latitude.value, longitude.value);
  console.log(weatherData);

  weatherContent.replaceChildren();
  maxTemps = [];
  minTemps = [];

  const degreeUnit = document.querySelector(".degree-unit:checked");
  console.log(degreeUnit.value);

  weatherData.days.forEach(function(item){
    const dailyContent = document.createElement("div");
    dailyContent.className = "daily-content";

    const tempMaxDisplay = document.createElement("p");
    tempMaxDisplay.className = "max-temp";
    const tempMinDisplay = document.createElement("p");
    tempMinDisplay.className = "min-temp";

    if (degreeUnit.value === "fahrenheit"){
      tempMaxDisplay.textContent = `Temp Max: ${item.tempmax} F`;
      maxTemps.push(item.tempmax);

      tempMinDisplay.textContent = `Temp Min: ${item.tempmin} F`;
      minTemps.push(item.tempmin);
    } else {
      tempMaxDisplay.textContent = `Temp Max: ${toC(item.tempmax).toFixed(2)} C`;
      maxTemps.push(toC(item.tempmax));

      tempMinDisplay.textContent = `Temp Min: ${toC(item.tempmin).toFixed(2)} C`;
      minTemps.push(toC(item.tempmin));
    }

    const precipProbDisplay = document.createElement("p");
    const precipProb = item.precipprob ?? 0;
    precipProbDisplay.textContent = `Precip Chance: ${precipProb}%`;

    const precipTypeDisplay = document.createElement("p");
    precipTypeDisplay.textContent = `Precip Type: ${item.preciptype[0]}`;

    dailyContent.appendChild(tempMaxDisplay);
    dailyContent.appendChild(tempMinDisplay);
    dailyContent.appendChild(precipProbDisplay);
    dailyContent.appendChild(precipTypeDisplay);
    weatherContent.appendChild(dailyContent);
  });
});

const degreeUnits = document.querySelectorAll(".degree-unit");
degreeUnits.forEach((item) => {
  item.addEventListener("change", (e) => {
    let unit;
    let fn;

    if(e.target.id === "fahrenheit"){
      unit = "F";
      fn = toF;
    } else {
      unit = "C";
      fn = toC;
    }

    const convertedMaxTemps = maxTemps.map(fn);
    const convertedMinTemps = minTemps.map(fn);

    maxTemps = convertedMaxTemps;
    minTemps = convertedMinTemps;


    const tempMinDisplays = document.querySelectorAll(".min-temp");
    for(let i = 0; i < tempMinDisplays.length; i++){
      const tempMinDisplay = tempMinDisplays[i];
      tempMinDisplay.textContent = `Temp Min: ${convertedMinTemps[i].toFixed(2)} ${unit}`
    }

    const tempMaxDisplays = document.querySelectorAll(".max-temp");
    for(let i = 0; i < tempMaxDisplays.length; i++){
      const tempMaxDisplay = tempMaxDisplays[i];
      tempMaxDisplay.textContent = `Temp Max: ${convertedMaxTemps[i].toFixed(2)} ${unit}`
    }
  });
});