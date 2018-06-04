import { Router } from 'express';
import { getShortUrl, redirectUrl } from '../controllers/link';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Custom URL Shortener',
  });
});

router.post('/', getShortUrl);

router.get('/redirect/:shortUrl', redirectUrl);

export default router;
