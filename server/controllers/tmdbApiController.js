import apiService from '../services/tmdbApiService.js';

const mediaData = async (req, res) => {
    try {
        const {mediaType, category} = req.params;
        const result = await apiService.getMediaData(mediaType, category);

        return res.status(200).json({success: true, results: result});
    } catch (error) {
        console.log(error);        

        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Internal Server Error';
        return res.status(status).json({message: message});
    }
}

const genreList = async (req, res) => {
    try {
        const {mediaType} = req.params;
        const result = await apiService.getGenreList(mediaType);
        
        return res.status(200).json({success: true, results: result});
    } catch (error) {
        console.log(error); 
        
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Internal Server Error';
        return res.status(status).json({message: message});
    }
}

const mediaDetails = async (req, res) => {
    try {
        const {mediaType, mediaId} = req.params;
        const result = await apiService.getMediaDetails(mediaType, mediaId);
        
        return res.status(200).json({success: true, results: result});
    } catch (error) {
        console.log(error);    
        
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Internal Server Error';
        return res.status(status).json({message: message});
    }
}

const seasonDetails = async (req, res) => {
    try {
        const {seriesId, seasonNumber} = req.params;
        const result = await apiService.getSeasonDetails(seriesId, seasonNumber);

        return res.status(200).json({success: true, results: result});
    } catch (error) {
        console.log(error);     
        
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Internal Server Error';
        return res.status(status).json({message: message});
    }
}

const castDetails = async (req, res) => {
    try {
        const {mediaType, mediaId} = req.params;
        const result = await apiService.getCastDetails(mediaType, mediaId);

        return res.status(200).json({success: true, results: result});
    } catch (error) {
        console.log(error); 
        
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Internal Server Error';
        return res.status(status).json({message: message});
    }
}

const similarMediaData = async(req, res) => {
    try {
        const {mediaType, mediaId} = req.params;
        const result = await apiService.getSimilarMediaData(mediaType, mediaId);

        return res.status(200).json({success: true, results: result});
    } catch (error) {
        console.log(error); 
        
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Internal Server Error';
        return res.status(status).json({message: message});
    }
}

const recommendationsMediaData = async(req, res) => {
    try {
        const {mediaType, mediaId} = req.params;
        const result = await apiService.getRecommendationsMediaData(mediaType, mediaId);

        return res.status(200).json({success: true, results: result});
    } catch (error) {
        console.log(error);   
        
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Internal Server Error';
        return res.status(status).json({message: message});
    }
}

const searchResults = async(req, res) => {
    try {
        const {query, page} = req.query;
        const result = await apiService.getSearchList(query, page);

        return res.status(200).json({success: true, results: result});
    } catch (error) {
        console.log(error); 
        
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Internal Server Error';
        return res.status(status).json({message: message});
    }
}

const genreFiltersResults = async(req, res) => {
    try {
        const {mediaType} = req.params;
        const {genreFilters, page} = req.query;
        const result = await apiService.getDiscoverList(mediaType, genreFilters, page);

        return res.status(200).json({success: true, results: result});
    } catch (error) {
        console.log(error); 
        
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Internal Server Error';
        return res.status(status).json({message: message});
    }
}

const tmdbApiController = {
    mediaData,
    genreList,
    mediaDetails,
    seasonDetails,
    castDetails,
    similarMediaData,
    recommendationsMediaData,
    searchResults,
    genreFiltersResults
}

export default tmdbApiController;