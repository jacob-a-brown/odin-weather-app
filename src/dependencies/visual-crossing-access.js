import { format } from "date-fns";

const API_KEY = process.env.API_KEY;

const getWeather = async function(latitude, longitude) {
  const today = new Date();
  const fiveDaysLater = new Date(today);
  fiveDaysLater.setDate(today.getDate() + 5);
  const dateOne = format(today, "yyyy-MM-dd");
  const dateTwo = format(fiveDaysLater, "yyyy-MM-dd")

  const params = new URLSearchParams({
    key: API_KEY,
    elements: "tempmax,tempmin,precipprob,preciptype"
  });

  try{
    const request = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${dateOne}/${dateTwo}?${params.toString()}`, {
      method: "GET",
    });

    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
  
}

export { getWeather }