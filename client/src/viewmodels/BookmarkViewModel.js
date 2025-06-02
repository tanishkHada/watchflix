import { useState, useEffect } from "react";
import bookmarkService from "../shared/BookmarkService";

const useBookmarkViewModel = () => {
    const [results, setResults] = useState([]);

    const [newLoading, setNewLoading] = useState(false);
    const [nextPageLoading, setNextPageLoading] = useState(false); 

    const [pageNum, setPageNum] = useState(1);

    const [noResultsFound, setNoResultsFound] = useState(false);
    const [noMoreData, setNoMoreData] = useState(false);

    const [lastId, setLastId] = useState(null);

    const fetchBookmarkResults = async (pageNum) => {
        try {
            const data = await bookmarkService.getAllBookmarks(pageNum, lastId);
            return data;
        } catch (error) {
            throw error;            
        }
    }

    const fetchResults = async () => {
        try {
            if(pageNum === 1){
                setNewLoading(true);
            }else{
                setNextPageLoading(true);
            }

            let data;
            data = await fetchBookmarkResults(pageNum);            

            if(pageNum === 1){
                if(data.length === 0){
                    setNoResultsFound(true);
                }else{
                    setNoResultsFound(false);
                }
                setNoMoreData(false);
                setResults(data);
            }else{
                if(data.length === 0){
                    setNoMoreData(true);
                }else{
                    setNoMoreData(false);
                }
                setResults((prevResults) => ([...prevResults, ...data]))
            }

        } catch (err) {
            console.log(err);            
        } finally{            
            setNewLoading(false);
            setNextPageLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, [pageNum]);

    useEffect(() => {
        if(results.length > 0){
            setLastId(results[results.length - 1]._id);
        }
    }, [results]);

    return {
        setPageNum,
        noResultsFound,
        noMoreData,
        results,
        newLoading,
        nextPageLoading,
    };
};

export default useBookmarkViewModel;
