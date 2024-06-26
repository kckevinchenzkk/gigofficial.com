import axios from '../api/api';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  LATEST_PRODUCT_LIST_REQUEST,
  LATEST_PRODUCT_LIST_SUCCESS,
  LATEST_PRODUCT_LIST_FAIL,
  DEALS_PRODUCT_LIST_REQUEST,
  DEALS_PRODUCT_LIST_SUCCESS,
  DEALS_PRODUCT_LIST_FAIL,
  MAYLIKE_PRODUCT_LIST_REQUEST,
  MAYLIKE_PRODUCT_LIST_SUCCESS,
  MAYLIKE_PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  FILTER_PRODUCTS_REQUEST,
  FILTER_PRODUCTS_SUCCESS,
  FILTER_PRODUCTS_FAIL,

  RECOMM_PRODUCT_LIST_REQUEST, 
  RECOMM_PRODUCT_LIST_SUCCESS, 
  RECOMM_PRODUCT_LIST_FAIL

} from "../constants/productConstants";
import { useDispatch, useSelector } from "react-redux";

export const listProducts = (pageNumber = '', filters = {}) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // Construct query parameters string including filters and pageNumber
    const queryParams = new URLSearchParams({ page: pageNumber, ...filters }).toString();
    console.log(`Request URL: /store/products/?${queryParams}`); // Log the request URL

    const { data } = await axios.get(`/store/products/?${queryParams}`);

    const PRODUCTS_PER_PAGE = 8;
    const totalPages = Math.ceil(data.count / PRODUCTS_PER_PAGE);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: {
        results: data.results,
        totalPages,
      },
    });
  } catch (error) {
    console.error("API request failed:", error); // Log any errors
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listDealsProducts = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: DEALS_PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/store/products/?ordering=-last_update&page=${pageNumber}`);
    const PRODUCTS_PER_PAGE = 8;
    const totalPages = Math.ceil(data.count / PRODUCTS_PER_PAGE); 
    dispatch({
      type: DEALS_PRODUCT_LIST_SUCCESS,
      payload: {
        results: data.results,
        totalPages, // Make sure to include this in your dispatch
      },
    });
  } catch (error) {
    dispatch({
      type: DEALS_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const listProductsYouMayLike = (pageNumber = '', userInfo) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `JWT ${userInfo.accessToken}`, 
      },
    };
    dispatch({ type: MAYLIKE_PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/store/recommendation/?page=${pageNumber}`, config);
    const PRODUCTS_PER_PAGE = 8;
    const totalPages = Math.ceil(data.count / PRODUCTS_PER_PAGE); 
    dispatch({
      type: MAYLIKE_PRODUCT_LIST_SUCCESS,
      payload: {
        results: data.results,
        totalPages, // Make sure to include this in your dispatch
      },
    });
  } catch (error) {
    dispatch({
      type: MAYLIKE_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const listLatestProducts = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: LATEST_PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/store/products/?ordering=-last_update&page=${pageNumber}`);
    const PRODUCTS_PER_PAGE = 8;
    const totalPages = Math.ceil(data.count / PRODUCTS_PER_PAGE); 
    dispatch({
      type: LATEST_PRODUCT_LIST_SUCCESS,
      payload: {
        results: data.results,
        totalPages, // Make sure to include this in your dispatch
      },
    });
  } catch (error) {
    dispatch({
      type: LATEST_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const listProductDetails =(id) => async (dispatch)=>{

  try{
      dispatch({type:PRODUCT_DETAILS_REQUEST})
      const {data} = await axios.get(`/store/products/${id}`)
      console.log("product detail", data);
      dispatch({
          type:PRODUCT_DETAILS_SUCCESS,
          payload:data
      })

  }
  catch(error){
      dispatch({
          type:PRODUCT_DETAILS_FAIL,
          payload:error.response && error.response.data.detail
          ? error.response.data.detail
          :error.message,
      })

  }
}




export const filterProducts = (filters, page = 1) => async (dispatch) => {
  dispatch({ type: FILTER_PRODUCTS_REQUEST });

  // Filter out any parameters that are undefined, null, or empty strings
  const adjustedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // For array values, join them into a comma-separated string
      acc[key] = Array.isArray(value) ? value.join(',') : value;
    }
    return acc;
  }, {});

  // Construct the query parameters string
  const queryParams = new URLSearchParams({ ...adjustedFilters, page }).toString();

  // Log the constructed URL for debugging
  console.log(`Requesting: http://127.0.0.1:8000/store/products/?${queryParams}`);

  try {
    const response = await axios.get(`http://127.0.0.1:8000/store/products/?${queryParams}`);
    const PRODUCTS_PER_PAGE = 8;
    const totalPages = Math.ceil(response.data.count / PRODUCTS_PER_PAGE);

    dispatch({
      type: FILTER_PRODUCTS_SUCCESS,
      payload: {
        results: response.data.results,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    dispatch({
      type: FILTER_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
