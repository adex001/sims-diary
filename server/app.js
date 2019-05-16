import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoute from './routes/auth';
import entriesRoute from './routes/entries';

dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Call the route for authentication
app.use('/api/v1', authRoute);

// Call the route for entries
app.use('/api/v1/entries', entriesRoute);

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 200,
    message: 'Welcome to Diary API',
  });
});

// Fall back to this incase any of the paths does not exist as an endpoint
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Page not found!'
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}`);
});