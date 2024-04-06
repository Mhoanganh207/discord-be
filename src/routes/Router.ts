import serverRouter from './ServerRoute';
import profileRiuter from './ProfileRoute';

export const routerConfig = (app : any) => {
   app.use("/api/server",serverRouter);
    app.use("/api/profile",profileRiuter);
};