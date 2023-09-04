import axios from "axios";
export const apiCall = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
  };


  const baseUrl = `https://www.themealdb.com/api/json/v1/1`
// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
  export const listAllMeal = async (search) => {
    try {
      return await apiCall.get(`${baseUrl}/search.php?s=${search}`);
    } catch (error) {
      return error.message;
    }
  };

  export const listAllCategories = async () => {
    try {
      return await apiCall.get(`${baseUrl}/categories.php`);
    } catch (error) {
      return error.message;
    }
  };

  export const filterByCategories = async (category) => {
    try {
      return await apiCall.get(`${baseUrl}/filter.php?c=${category}`);
    } catch (error) {
      return error.message;
    }
  };
