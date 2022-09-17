import express from 'express';
import signInRouter from './routes/sign-in';

const app = express();
const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

app.use('/sign-in', signInRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
