import Bookmark from "../models/Bookmark.js";

const saveBookmark = async (req, res) => {
    try {
        const { mediaId, mediaType, posterPath } = req.body;

        const existingBookmark = await Bookmark.findOne({
            mediaId,
            userId: req.user.userId
        });

        if (existingBookmark) {
            throw new Error("Bookmark already saved");
        }

        const newBookmark = new Bookmark({
            mediaId,
            mediaType,
            posterPath,
            userId: req.user.userId
        });

        await newBookmark.save();
        res.status(200).json({ success: true, message: 'Bookmark saved' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error in saving bookmark: ${error}` })
    }
}

const deleteBookmark = async (req, res) => {
    try {
        const { mediaId } = req.params;

        const deleteBookmark = await Bookmark.findOneAndDelete({
            mediaId: mediaId,
            userId: req.user.userId
        });

        if (!deleteBookmark) {
            throw new Error("No bookmark found to unsave");
        }
        res.status(200).json({ success: true, message: "Bookmark unsaved" });
    } catch (error) {
        res.status(500).json({ message: `Error in deleting bookmark: ${error}` });
    }
}

const getBookmarksByIds = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { ids } = req.body;

        const bookmarks = await Bookmark.find({
            userId,
            mediaId: { $in: ids }
        });
        res.status(200).json({ success: true, results: bookmarks });
    } catch (error) {
        res.status(500).json({ message: 'Error getting bookmarks by ids' });
    }
}

const getAllBookmarks = async (req, res) => {    
    try {
        const userId = req.user.userId;
        const limit = 20;
        const lastId = req.query.lastId;

        const query = { userId };
        if (lastId) {
            query._id = { $lt: lastId }; 
        }

        const bookmarks = await Bookmark.find(query)
            .sort({ _id: -1 }) 
            .limit(limit);

        res.status(200).json({ success: true, results: bookmarks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting bookmarks' });
    }
}

const bookmarkController = {
    saveBookmark,
    deleteBookmark,
    getBookmarksByIds,
    getAllBookmarks
}

export default bookmarkController;