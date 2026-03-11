import { Router } from 'express';
import userRoutes from '../modules/user/routes';
import sneakerRoutes from '../modules/sneaker/routes';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Sneakers API',
    endpoints: {
      users: '/api/users',
      sneakers: '/api/sneakers'
    }
  });
});

router.use('/users', userRoutes);
router.use('/sneakers', sneakerRoutes);

export default router;
