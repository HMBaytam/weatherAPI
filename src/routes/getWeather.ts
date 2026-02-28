import { Router, Request, Response } from 'express';
import { BaseWeatherData } from '../modules/weather';
import { baseWeatherFetch, cleanWeatherData } from '../utils/funcs';

const router = Router();
const today = new Date().toISOString().split('T')[0];
const date7DaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
let weatherData: BaseWeatherData;


router.get('/weather', async (req: Request, res: Response) => {
    const city: string = req.query.city as string;
    const country: string = req.query.country as string;
    const unitGroup: string = req.query.unitGroup as string || 'us';
    const startDate: string | undefined = req.query.startDate as string || undefined;
    const endDate: string | undefined = req.query.endDate as string || undefined;


    var allData: JSON = await baseWeatherFetch(city, country, unitGroup, startDate, endDate);


    weatherData = cleanWeatherData(allData);

    res.json(weatherData);
})






export default router;