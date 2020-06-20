import { Router } from 'express';

import fetcher from '../fetcher';
import { urlBuilder } from './utils';
import crawler from './crawler';

const router = Router();

router.get('/', async (req, res) => {
  const search = req.query.q;
  const numResults = req.query.num;
  const url = urlBuilder(search, numResults);

  const content = await fetcher({ url });
  const results = crawler(content);

  res.status(200).json(results);
});

export default router;
