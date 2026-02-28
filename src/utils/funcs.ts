import * as dotenv from 'dotenv';
import { BaseWeatherData } from '../modules/weather';
dotenv.config();

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const API_KEY = process.env.WEATHER_API_KEY as string;


// TODO: Refactor this function to be more modular and reusable for other routes (e.g. get forecast for 1 day, get forecast for date range, etc.)
// TODO: Validation for city and country parameters (e.g. check if they are valid strings, check if they are not empty, etc.)
// TODO: Add a way to convert full country name into country code (e.g. United States -> US, Canada -> CA, etc.)
// TODO: Add validation for unitGroup values (enum of 'us', 'metric', 'uk')
// TODO: Add error handling for fetch request (e.g. check if response is ok, check if data is in the correct format, etc.)
export function baseWeatherFetch(city: string, country: string, unitGroup: string, startDate?: string, endDate?: string): Promise<JSON> {

    console.log(`Getting weather data for ${city}, ${country}...`);

    let weatherDataUrl: string =  `${BASE_URL}/${city}%2C${country}`;
    if (startDate) {
        weatherDataUrl += `/${startDate}`;
    }
    if (endDate) {
        weatherDataUrl += `/${endDate}`;

    }
    weatherDataUrl += `?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`;  
    return fetch(weatherDataUrl, {method: 'GET', redirect: 'follow'})
  .then(response => response.json())
  .catch(error => console.log('error', error));

}

// TODO: Add a way to convert full country name into country code

export function cleanWeatherData(data: any): BaseWeatherData {
    const dailyBreakdown = data['days'].map((day: any) => {
        return {
            date: day['datetime'],
            maxTemp: day['tempmax'],
            minTemp: day['tempmin'],
            avgTemp: day['temp'],
            description: day['description']
    }})

    const responseData: BaseWeatherData = {
        cityId: `${data['latitude']},${data['longitude']}`,
        country: data['resolvedAddress'].split(',')[2].trim(),
        state: data['resolvedAddress'].split(',')[1].trim(),
        city: data['resolvedAddress'].split(',')[0].trim(),
        description: data['description'],
        weatherDetails: dailyBreakdown
    }

  return responseData;
}
