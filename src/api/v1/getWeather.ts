import { Router, Request, Response } from 'express';
import { BaseWeatherData } from '../../modules/weather';
import { baseWeatherFetch, cleanWeatherData } from '../../utils/funcs';

const router = Router();
let weatherData: BaseWeatherData;


// TODO: Add a way to check what unit the user wants with the default being Farenheit and add that to the url in utils/funcs.ts
router.get('/weather', async (req: Request, res: Response) => {
    const city: string = req.query.city as string;
    const country: string = req.query.country as string;

    var allData: any = await baseWeatherFetch(city, country);
    var tempData: Array<any> = allData['days'];


    weatherData = cleanWeatherData(allData);

    res.json(weatherData);
})

// TODO: Add a route to get forcast for 1 day

// TODO: Add a route to get forcast for date range




export default router;