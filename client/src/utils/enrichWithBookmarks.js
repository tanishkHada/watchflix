import bookmarkService from "../shared/BookmarkService";

const enrichWithBookmarks = async (items) => {
    try {
        const ids = items.map(item => item.id);
        const bookmarks = await bookmarkService.getBookmarksByIds(ids);
        const bookmarkedIds = new Set(bookmarks.map(b => b.mediaId));

        return items.map(item => ({
            ...item,
            bookmarked: bookmarkedIds.has(String(item.id))
        }));
    } catch (error) {
        if (error.response?.status === 401) {
            console.warn("Not logged in. Skipping bookmark enrichment.");
        } else {
            console.error("Bookmark enrichment failed:", error);
        }

        return items.map(item => ({
            ...item,
            bookmarked: false
        }));
    }
}

export default enrichWithBookmarks;