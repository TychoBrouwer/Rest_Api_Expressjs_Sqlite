import { Router } from 'express';
import { getMultiple } from '../services/sign-in';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.json(getMultiple(req.query.page));
  } catch (err) {
    console.error('Error while getting login ', err.message);
    next(err);
  }
});

export default router;
