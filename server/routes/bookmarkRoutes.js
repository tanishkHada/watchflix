import express from 'express';
import bookmarkController from '../controllers/bookmarkController.js';

const router = express.Router();

router.get('/all', bookmarkController.getAllBookmarks);
router.post('/save', bookmarkController.saveBookmark);
router.delete('/delete/:mediaId', bookmarkController.deleteBookmark);
router.post('/by-ids', bookmarkController.getBookmarksByIds);

export default router; 