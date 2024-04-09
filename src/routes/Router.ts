import serverRouter from './ServerRoute';
import profileRiuter from './ProfileRoute';
import { Express } from 'express-serve-static-core';

export const routerConfig = (app: Express) => {
    app.use("/api/server", serverRouter);
    app.use("/api/profile", profileRiuter);
};