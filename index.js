import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import Routes from './routes/index.js';


env.config(); // Load environment variables from .env file

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
// app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


app.use('/api/admin', Routes.admin);
app.use('/api/public', Routes.public);
app.use('/api/center', Routes.center);
app.use('/api/nurse', Routes.nurse);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});