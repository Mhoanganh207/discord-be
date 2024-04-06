import express from 'express';
import dotenv from 'dotenv';
import { routerConfig } from './routes/Router';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


routerConfig(app);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
