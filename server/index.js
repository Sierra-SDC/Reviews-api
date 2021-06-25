const express = require('express');
const morgan = require('morgan');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 1234;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
