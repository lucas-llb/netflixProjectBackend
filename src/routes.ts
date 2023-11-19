import express from 'express'
import { categoriesController } from './controllers/categoriesController';
import { seriesController } from './controllers/seriesController';
import { episodesController } from './controllers/episodesController';

const router = express.Router();

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/series/featured', seriesController.featured)
router.get('/series/newest', seriesController.newest)
router.get('/series/search', seriesController.search)
router.get('/series/:id', seriesController.show)

router.get('/episodes/stream', episodesController.stream)

export { router }