import { Router } from 'express';
import linkRoutes from './link';

const router = Router();

// render home page as a health check
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// mount link routes at /link
router.use('/link', linkRoutes);

export default router;
