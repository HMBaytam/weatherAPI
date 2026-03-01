import { Router, Request, Response } from 'express';
import { BaseWeatherData } from '../modules/weather';
import { UnitGroup } from '../modules/unitGroup';
import { baseWeatherFetch, cleanWeatherData } from '../utils/funcs';

const router = Router();


router.get('/weather', async (req: Request, res: Response) => {
    const city: string = req.query.city as string;
    const country: string = req.query.country as string;
    const unitGroup: UnitGroup = Object.values(UnitGroup).includes(req.query.unitGroup as UnitGroup) ? req.query.unitGroup as UnitGroup : UnitGroup.US;
    const startDate: string | undefined = req.query.startDate as string || undefined;
    const endDate: string | undefined = req.query.endDate as string || undefined;

    if (!city || !country) {
        res.status(400).json(
            { error: 'City and country parameters are required'}
        );
        return;
    }
    try {
        const allData = await baseWeatherFetch(city, country, unitGroup, startDate, endDate);
        const weatherData: BaseWeatherData = cleanWeatherData(allData);
        res.json(weatherData);
    } 
    catch (error) {
        res.status(500).json(
            { error: 'failed to fetch weather data'}
        )
    }
})






export default router;