import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoute from './routes/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/v1', authRoute);

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 200,
    message: 'Welcome to Diary API',
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
