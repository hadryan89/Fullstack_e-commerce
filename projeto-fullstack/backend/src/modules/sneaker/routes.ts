import { Router } from 'express';
import { SneakerController } from './controller';
import { authMiddleware } from '../../middlewares/auth';

const router = Router();
const sneakerController = new SneakerController();

// Rotas públicas
router.get('/', (req, res) => sneakerController.findAll(req, res));
router.get('/:id', (req, res) => sneakerController.findById(req, res));

// Rotas protegidas
router.post('/', authMiddleware, (req, res) => sneakerController.create(req, res));
router.put('/:id', authMiddleware, (req, res) => sneakerController.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => sneakerController.delete(req, res));

export default router;
