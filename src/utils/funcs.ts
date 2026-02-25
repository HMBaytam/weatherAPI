import * as dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const API_KEY = process.env.WEATHER_API_KEY as string;

export function getWeatherForCity(city: string, country: string): Promise<JSON> {

    console.log(`Getting weather data for ${city}, ${country}...`);

    var weatherDataUrl: string =  `${BASE_URL}/${city}%2C${country}?key=${API_KEY}`;
    return fetch(weatherDataUrl, {method: 'GET', redirect: 'follow'})
  .then(response => response.json())
  .catch(error => console.log('error', error));

}

// TODO: Add a way to convert full country name into country code


