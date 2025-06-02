import axios from 'axios';

class BookmarkService {
  constructor() {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_APP_SERVER_URL}/bookmarks`,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  async save(bookmarkData) {
    try {
        const {data} = await this.api.post('/save', bookmarkData, {withCredentials: true});
        return data;
    } catch (error) {
        throw error;        
    }    
  }

  async unsave(mediaId){
    try {
        const {data} = await this.api.delete(`/delete/${mediaId}`, {withCredentials: true});
        return data;
    } catch (error) {
        throw error;        
    }
  }  

  async getBookmarksByIds(ids){
    try {
      const {data} = await this.api.post('/by-ids', {ids}, {withCredentials: true});
      return data.results;
    } catch (error) {
      throw error;      
    }
  }

  async getAllBookmarks(pageNum, lastId){
    try {
      const {data} = await this.api.get('/all', {
        params: {
          pageNum: pageNum,
          lastId: lastId
        },
        withCredentials: true
      });
      return data.results;
    } catch (error) {
      throw error;      
    }
  }
}

const bookmarkService = new BookmarkService();
export default bookmarkService;
