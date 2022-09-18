import Router from 'express';
import signIn from '../services/users';

const router = Router();

router.post('/', (req, res, next) => {
  try {
    res.json(signIn.validateUser(req.query.page));
  } catch (err) {
    console.error('Error while getting login ', err.message);
    next(err);
  }
});

export default router;
