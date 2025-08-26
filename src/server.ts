import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web';
import connectDB from './config/configdb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8088;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
configViewEngine(app);

// Routes
initWebRoute(app);

// Connect DB
connectDB();

app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});
