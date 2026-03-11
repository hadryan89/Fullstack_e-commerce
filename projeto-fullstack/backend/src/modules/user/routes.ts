import { Router } from 'express';
import { UserController } from './controller';
import { authMiddleware } from '../../middlewares/auth';

const router = Router();
const userController = new UserController();

router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/', authMiddleware, (req, res) => userController.findAll(req, res));
router.get('/:id', authMiddleware, (req, res) => userController.findById(req, res));
router.delete('/:id', authMiddleware, (req, res) => userController.delete(req, res));

export default router;
