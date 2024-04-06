import express from 'express';
import ServerController from '../controllers/ServerController';


const router = express.Router();


router.post('/', ServerController.createServer
);


export default router;