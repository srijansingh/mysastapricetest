import * as ActionTypes from "./actionTypes";

export const Category = (state = {
    isLoading: true,
    errMess: null,
    category: []
}, action) => {

    switch(action.type) {
        case ActionTypes.ADD_CATEGORY:
            return {...state, isLoading:false, category:action.payload, errMess:null}

        case ActionTypes.CATEGORY_LOADING:
            return {...state, isLoading:true, category:[], errMess:null}

        case ActionTypes.CATEGORY_FAILED:
            return {...state, isLoading:false, category:[], errMess:action.payload}

        default :
            return state
    }
}