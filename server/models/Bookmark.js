import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
    mediaId: { type: String, required: true, unique: true },
    mediaType: { type: String, required: true },
    posterPath: { type: String, required: true },
    bookmarked: { type: Boolean, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;
