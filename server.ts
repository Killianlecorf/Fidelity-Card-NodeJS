import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import databaseConnection from './src/config/connectDB';
import cors from 'cors';
import UserRoute  from './src/routes/user.routes';
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/user', UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Bonjour, monde !');
});

databaseConnection()

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});