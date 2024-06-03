import express from 'express';
import AdminController from '../controllers/AdminController';
import adminMiddleware from '../middleware/AdminMiddleware';

const router = express.Router();

router.get('/all',adminMiddleware , AdminController.getAllUser);
router.delete('/delete/:id',adminMiddleware ,AdminController.deleteUser);
router.put('/update/:id',adminMiddleware ,AdminController.updateUser);
router.post('/create', adminMiddleware, AdminController.createUser)
router.get('/search', adminMiddleware, AdminController.searhUser)


export default router;