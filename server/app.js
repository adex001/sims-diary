import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 200,
    message: 'Welcome to Diary API',
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
