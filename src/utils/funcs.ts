import * as dotenv from 'dotenv';
import { BaseWeatherData } from '../modules/weather';
dotenv.config();

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const API_KEY = process.env.WEATHER_API_KEY as string;


// TODO: Add a way to convert full country name into country code (e.g. United States -> US, Canada -> CA, etc.)
export async function baseWeatherFetch(city: string, country: string, unitGroup: string, startDate?: string, endDate?: string): Promise<JSON> {

    console.log(`Getting weather data for ${city}, ${country}...`);

    let weatherDataUrl: string =  `${BASE_URL}/${city}%2C${country}`;
    if (startDate) {
        weatherDataUrl += `/${startDate}`;
    }
    if (endDate) {
        weatherDataUrl += `/${endDate}`;

    }
    weatherDataUrl += `?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`;  
    const response = await fetch(weatherDataUrl, {method: 'GET', redirect: 'follow'})
    if (response.status >= 400) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    return response.json();

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
