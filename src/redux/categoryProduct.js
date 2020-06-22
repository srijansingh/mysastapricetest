import * as ActionTypes from "./actionTypes";

export const CategoryProduct = (state = {
    isLoading: true,
    errMess: null,
    categoryProduct: []
}, action) => {

    switch(action.type) {
        case ActionTypes.ADD_CATEGORY_PRODUCT:
            return {...state, isLoading:false, categoryProduct:action.payload, errMess:null}

        case ActionTypes.CATEGORY_PRODUCT_LOADING:
            return {...state, isLoading:true, categoryProduct:[], errMess:null}

        case ActionTypes.CATEGORY_PRODUCT_FAILED:
            return {...state, isLoading:false, categoryProduct:[], errMess:action.payload}

        default :
            return state
    }
}