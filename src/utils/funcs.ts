import * as dotenv from 'dotenv';
import { BaseWeatherData } from '../modules/weather';
import { ApiDailyBreakdown } from '../modules/apiDailyBreakdown';
import { FullApiResponse } from '../modules/fullApiResponse';
import { DailyBreakdown } from '../modules/dailyBreakdown';
import { UnitGroup } from '../modules/unitGroup';
dotenv.config();

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const API_KEY = process.env.WEATHER_API_KEY as string;


// TODO: Add a way to convert full country name into country code (e.g. United States -> US, Canada -> CA, etc.)
export async function baseWeatherFetch(city: string, country: string, unitGroup: UnitGroup, startDate?: string, endDate?: string): Promise<FullApiResponse> {


    let weatherDataUrl: string = `${BASE_URL}/${city}%2C${country}`;
    if (startDate) {
        weatherDataUrl += `/${startDate}`;
    }
    if (endDate) {
        weatherDataUrl += `/${endDate}`;

    }
    weatherDataUrl += `?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`;
    const response = await fetch(weatherDataUrl, { method: 'GET', redirect: 'follow' })
    if (!response.ok)  throw new Error(`Failed to fetch weather data: ${response.statusText}`);

    const data: FullApiResponse = await response.json();
    return data;

}


export function cleanWeatherData(data: FullApiResponse): BaseWeatherData {

    const dailyBreakdown: DailyBreakdown[] = data.days.map((day: ApiDailyBreakdown) => {
        return {
            date: day.datetime,
            maxTemp: day.tempmax,
            minTemp: day.tempmin,
            avgTemp: day.temp,
            description: day.description,
        };
    });

    const responseData: BaseWeatherData = {
        cityId: `${data.latitude},${data.longitude}`,
        country: data.resolvedAddress.split(',')[2].trim(),
        state: data.resolvedAddress.split(',')[1].trim(),
        city: data.resolvedAddress.split(',')[0].trim(),
        description: data.description,
        weatherDetails: dailyBreakdown
    }

    return responseData;
}
