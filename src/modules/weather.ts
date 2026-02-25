export interface BaseWeatherData {
    cityId: string;
    country: string;
    state: string;
    city: string;
    weatherDetails: Array<JSON>;
    description: string;
}