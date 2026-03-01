import { DailyBreakdown } from './dailyBreakdown';

export interface BaseWeatherData {
    cityId: string;
    country: string;
    state: string;
    city: string;
    weatherDetails: Array<DailyBreakdown>;
    description: string;
}