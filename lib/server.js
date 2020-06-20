import express from 'express';

import googleSearchRouter from './google-search/routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/google-search', googleSearchRouter);

app.use('/', (_, res) => res.send('I am alive!'));

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
