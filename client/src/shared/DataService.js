import axios from 'axios';

class DataService {
  constructor() {
    this.onInitData = null;
    this.ongoingPromise = null;
    this.movieGenreList = null;
    this.tvGenreList = null;
    this.genreMap = null;

    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_APP_SERVER_URL}/tmdb`,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  createGenreMap(list1, list2) {
    const combinedList = [...list1, ...list2];

    this.genreMap = new Map();
    combinedList.forEach(genre => {
      if (!this.genreMap.has(genre.id)) {
        this.genreMap.set(genre.id, genre.name);
      }
    });
  }

  async getGenres() {
    const mv_genre_list = await this.getGenreList('movie');
    const tv_genre_list = await this.getGenreList('tv');
    this.movieGenreList = mv_genre_list;
    this.tvGenreList = tv_genre_list;
    this.createGenreMap(mv_genre_list, tv_genre_list);
  }

  async preFetchData() {
    try {
      if (this.onInitData) {
        return this.onInitData;
      }

      if (!this.ongoingPromise) {
        this.ongoingPromise = (async () => {
          const res_mv_now_playing = await this.getMediaData('movie', 'now_playing');
          const res_mv_popular = await this.getMediaData('movie', 'popular');
          const res_mv_top_rated = await this.getMediaData('movie', 'top_rated');

          const res_tv_popular = await this.getMediaData('tv', 'popular')
          const res_tv_top_rated = await this.getMediaData('tv', 'top_rated');

          this.onInitData = {
            mv_now_playing: res_mv_now_playing,
            mv_popular: res_mv_popular,
            mv_top_rated: res_mv_top_rated,

            tv_popular: res_tv_popular,
            tv_top_rated: res_tv_top_rated
          };

          return this.onInitData;
        })();
      }

      return await this.ongoingPromise;
    } catch (error) {
      this.onInitData = null;
      this.ongoingPromise = null;
      throw error;
    }
  }

  async getMediaData(mediaType, category) {
    try {
      const { data } = await this.api.get(`/media/${mediaType}/${category}`);
      return data.results;
    } catch (error) {
      throw error;
    }
  }

  async getGenreList(mediaType) {
    try {
      const { data } = await this.api.get(`/genres/${mediaType}`);
      return data.results;
    } catch (error) {
      throw error;
    }
  }

  async getMediaDetails(mediaType, mediaId) {
    try {
      const { data } = await this.api.get(`/details/${mediaType}/${mediaId}`);
      return data.results;
    } catch (error) {
      throw error;
    }
  }

  async getSeasonDetails(seriesId, seasonNumber) {
    try {
      const { data } = await this.api.get(`/details/tv/${seriesId}/season/${seasonNumber}`);
      return data.results;
    } catch (error) {
      throw error;
    }
  }

  async getCastDetails(mediaType, mediaId) {
    try {
      const { data } = await this.api.get(`/details/${mediaType}/${mediaId}/cast`);
      return data.results;
    } catch (error) {
      throw error;
    }
  }

  async getSimilarMediaData(mediaType, mediaId) {
    try {
      const { data } = await this.api.get(`/similar/${mediaType}/${mediaId}`);
      return data.results.results;
    } catch (error) {
      throw error;
    }
  }

  async getRecommendationsMediaData(mediaType, mediaId) {
    try {
      const { data } = await this.api.get(`/recommendations/${mediaType}/${mediaId}`);
      return data.results.results;
    } catch (error) {
      throw error;
    }
  }

  async getSearchList(query, pageNum, signal) {
    try {
      const { data } = await this.api.get('/search/multi', {
        params: {
          query: query,
          page: pageNum
        },
        signal: signal
      });
      return data.results;
    } catch (error) {
      throw error;
    }
  }

  async getGenreFiltersList(mediaType, genreFilters, pageNum, signal) {
    try {
      const { data } = await this.api.get(`/discover/${mediaType}`, {
        params: {
          genreFilters: genreFilters,
          page: pageNum
        },
        signal: signal
      });
      return data.results;
    } catch (error) {
      throw error;
    }
  }
}

const dataService = new DataService();
export default dataService;
