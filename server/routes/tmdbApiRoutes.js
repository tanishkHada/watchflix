import express from 'express';
import apiController from '../controllers/tmdbApiController.js';

const router = express.Router();

router.get('/media/:mediaType/:category', apiController.mediaData);
router.get('/genres/:mediaType', apiController.genreList);
router.get('/details/:mediaType/:mediaId', apiController.mediaDetails);
router.get('/details/tv/:seriesId/season/:seasonNumber', apiController.seasonDetails);
router.get('/details/:mediaType/:mediaId/cast', apiController.castDetails);
router.get('/similar/:mediaType/:mediaId', apiController.similarMediaData);
router.get('/recommendations/:mediaType/:mediaId', apiController.recommendationsMediaData);
router.get('/search/multi', apiController.searchResults);
router.get('/discover/:mediaType', apiController.genreFiltersResults);

export default router; 