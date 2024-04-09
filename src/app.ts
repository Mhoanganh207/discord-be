import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { routerConfig } from './routes/Router';
import swaggerDocument from './swagger.json';





dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const corsMiddleware = (req : Request, res : Response, next : NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

app.use(corsMiddleware);

app.use(
  "/docs",
  corsMiddleware
  ,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

routerConfig(app);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;