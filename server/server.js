import 'dotenv/config';
import express from "express";
import cors from "cors";
import { initialize } from './utils/jwt.js';
import authRoute from './routes/authRoute.js';
import orderRoute from './routes/orderRoute.js';
import productRoute from './routes/productRoute.js';

const app = express();
const HTTP_PORT = process.env.HTTP_PORT;

app.use(cors());
app.use(express.json());
app.use(initialize());

app.use('/', authRoute); 
app.use('/order', orderRoute);
app.use('/product', productRoute);

app.use((req, res) => {
    res.status(404).end();
});

app.listen(HTTP_PORT, () => {
    console.log(`Listening at http://localhost:${HTTP_PORT}`);
});