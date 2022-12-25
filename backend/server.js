const EXPRESS_APP_PORT = 5000;
const app = require('./app');

app.listen(EXPRESS_APP_PORT, () =>
  console.log(`Listening on port: ${EXPRESS_APP_PORT}`)
);