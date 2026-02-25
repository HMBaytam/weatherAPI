import express, { Request, Response } from 'express';
import Routes from './api/v1/getWeather';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/api/v1', Routes)

// TODO: Cache response for 1 hour in a Redis db


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Tyepscript Express!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});