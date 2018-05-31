import { Router } from 'express';
import { getShortUrl, redirectUrl } from '../controllers/link';

const router = Router();

router.get('/', function (req, res, next) {
  res.render('index', { 
    title: 'Custom URL Shortener' 
  });
});

router.get('/redirect/:shortUrl', redirectUrl);

router.post('/', getShortUrl);

export default router;
