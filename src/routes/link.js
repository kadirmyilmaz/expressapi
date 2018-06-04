import express from 'express';
import validate from 'express-validation';
import linkCtrl from '../controllers/link';
import { createLink } from '../config/param-validation';

const router = express.Router();

router.route('/')
  /** GET /api/link - Get list of public link */
  .get(linkCtrl.list)

  /** POST /api/link - Create new link */
  .post(validate(createLink), linkCtrl.create);

export default router;
