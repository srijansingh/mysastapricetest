import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Category } from "./category";
import { CategoryProduct } from "./categoryProduct";
import logger from "redux-logger";
import thunk  from "redux-thunk"

export const ConfigureStore = () => {
    const store = createStore(
       combineReducers({
          category: Category,
          categoryProduct: CategoryProduct
       }),
       applyMiddleware(thunk, logger)
    );

    return store;
}