import * as ActionTypes from './actionTypes';

export const fetchCategory = () => (dispatch) => {
    dispatch(categoryLoading(true));

   return fetch('/user/category')
   .then(response => response.json())
   .then(category => {
       console.log(category.category)
       dispatch(addCategory(category.category))
   })
}


export const categoryLoading = () => ({
    type: ActionTypes.CATEGORY_LOADING
})

export const categoryFailed =(errmess) =>({
    type: ActionTypes.CATEGORY_FAILED,
    payload:errmess
})

export const addCategory =(category) =>({
    type:ActionTypes.ADD_CATEGORY,
    payload: category
})




// cATEGORY pRODUCT

export const fetchCategoryProduct = (categoryId) => (dispatch) => {
    dispatch(categoryProductLoading(true));
    
   return fetch('http://localhost:8080/user/category/'+ categoryId)
   .then(res => res.json())
   .then(response => {
      console.log(response)
       dispatch(addCategoryProduct(response))
   })
}


export const categoryProductLoading = () => ({
    type: ActionTypes.CATEGORY_PRODUCT_LOADING
})

export const categoryProductFailed =(errmess) =>({
    type: ActionTypes.CATEGORY_PRODUCT_FAILED,
    payload:errmess
})

export const addCategoryProduct =(categoryProduct) =>({
    type:ActionTypes.ADD_CATEGORY_PRODUCT,
    payload: categoryProduct
})