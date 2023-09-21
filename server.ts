import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import databaseConnection from './src/config/connectDB';
import cors from 'cors';
import UserRoute  from './src/routes/user.routes';
import EntrepriseRoute from './src/routes/entreprise.routes';
import BoutiqueRoute from './src/routes/boutique.routes';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './src/middlewares/credentials.middleware';

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: [
      "http://localhost:3000"
  ],
  credentials: true
}));


app.use(corsMiddleware);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/user', UserRoute);
app.use('/api/entreprise', EntrepriseRoute);
app.use('/api/boutique', BoutiqueRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Bonjour, monde !');
});

databaseConnection()

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});