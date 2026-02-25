import { Router, Request, Response } from 'express';
import { BaseWeatherData } from '../../modules/weather';
import { getWeatherForCity } from '../../utils/funcs';

const router = Router();
let weatherData: BaseWeatherData;


// TODO: Add a way to check what unit the user wants with the default being Farenheit and add that to the url in utils/funcs.ts
// TODO: Clean up this code and export json handleing to a function in utils/funcs.ts
router.get('/weather', async (req: Request, res: Response) => {
    const city: string = req.query.city as string;
    const country: string = req.query.country as string;

    var allData: any = await getWeatherForCity(city, country);
    var tempData: Array<any> = allData['days'];

    var weatherDetails: Array<any> = [];


    for (let i=0; i<tempData.length; i++) {
        weatherDetails.push({
            date: tempData[i]['datetime'],
            maxTemp: tempData[i]['tempmax'],
            minTemp: tempData[i]['tempmin'],
            tempNow: tempData[i]['temp'],
            condition: tempData[i]['conditions'],
            description: tempData[i]['description']
        })
    }


    weatherData = {
        cityId: `${allData['latitude']},${allData['longitude']}`,
        country: allData['resolvedAddress'].split(',')[2].trim(),
        state: allData['resolvedAddress'].split(',')[1].trim(),
        city: allData['resolvedAddress'].split(',')[0].trim(),
        description: allData['description'],
        weatherDetails: weatherDetails
        
    }
    res.json(weatherData);
})

// TODO: Add a route to get forcast for 1 day

// TODO: Add a route to get forcast for date range



export default router;