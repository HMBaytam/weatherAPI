import * as dotenv from 'dotenv';
import { BaseWeatherData } from '../modules/weather';
dotenv.config();

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const API_KEY = process.env.WEATHER_API_KEY as string;

export function baseWeatherFetch(city: string, country: string): Promise<JSON> {

    console.log(`Getting weather data for ${city}, ${country}...`);

    var weatherDataUrl: string =  `${BASE_URL}/${city}%2C${country}?key=${API_KEY}`;
    return fetch(weatherDataUrl, {method: 'GET', redirect: 'follow'})
  .then(response => response.json())
  .catch(error => console.log('error', error));

}

// TODO: Add a way to convert full country name into country code

export function cleanWeatherData(data: any): any {
    let responseData: BaseWeatherData;
    let dailyBreakdown: Array<any> = data['days'];

    for (let i=0; i<data.length; i++) {
        dailyBreakdown.push({
            date: data[i]['datetime'],
            maxTemp: data[i]['tempmax'],
            minTemp: data[i]['tempmin'],
            tempNow: data[i]['temp'],
            condition: data[i]['conditions'],
            description: data[i]['description']
        })
    }
    responseData = {
        cityId: `${data['latitude']},${data['longitude']}`,
        country: data['resolvedAddress'].split(',')[2].trim(),
        state: data['resolvedAddress'].split(',')[1].trim(),
        city: data['resolvedAddress'].split(',')[0].trim(),
        description: data['description'],
        weatherDetails: dailyBreakdown
        
    }

  return responseData;
}
