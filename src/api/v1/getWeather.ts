import { Router, Request, Response } from 'express';
import { BaseWeatherData } from '../../modules/weather';
import { baseWeatherFetch, cleanWeatherData } from '../../utils/funcs';

const router = Router();
let weatherData: BaseWeatherData;


// TODO: Add validation for unitGroup values (enum of 'us', 'metric', 'uk')
router.get('/weather', async (req: Request, res: Response) => {
    const city: string = req.query.city as string;
    const country: string = req.query.country as string;
    const unitGroup: string = req.query.unitGroup as string || 'us';

    var allData: JSON = await baseWeatherFetch(city, country, unitGroup);


    weatherData = cleanWeatherData(allData);

    res.json(weatherData);
})

// TODO: Add a route to get forcast for 1 day

// TODO: Add a route to get forcast for date range




export default router;