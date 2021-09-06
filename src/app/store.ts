import { tassign } from "tassign";
import { AppError } from "./common/app-error";
import { Product, ProductsService } from "./services/products.service";

export enum ActionTypes {
  THROW_PRODUCT_ERRORS = 'THROW_LOADING_ERROR'

}


export interface Action {
    type: string,
    payload ?: any
}

export interface IAppState {
    productList: Array<Product>;
    dataState: DataState;
    orderList: Array<Product>;
  }

export interface DataState {
  isLoading: boolean;
  isLoaded: boolean;
  error: AppError | null;
}

export interface User {
  uid: string;
  name: string;
  address: string;
  city: string;
}

export interface Order {
   user: User;
   orderList: Product[];
}

export let initState: IAppState =  {
    productList: [],
    dataState : {
       isLoading: true,
       isLoaded: false,
       error: null
    },
    orderList:[],
  }



export const selectProductInCart = (state: IAppState) =>{
     state.productList.map((product: Product) => product.qtyInCart > 0);
}

const getUpdatedProductList = (orig:Product[], updatedProduct: Product, productIndex: number): Product[] => {
    return orig.slice(0,productIndex).concat(updatedProduct).concat(orig.slice(productIndex+1,orig.length-1));
  }

const getQtyUpdatedProduct = (orig:Product, newQty: number): Product =>{
    return tassign(orig, {qtyInCart: newQty});
  }

export let rootReducer = (state: IAppState, action: Action) => {

    switch(action.type){
        case ('LOAD_PRODUCTS'): {
            console.log('successfully loaded products');
            return tassign(state, {
              productList: action.payload.productList,
              dataState: action.payload.dataState
            });
        }
        case('UPDATE_QTY_IN_CART'):{
            let index = state.productList.findIndex(product => product.id===action.payload.id);
            let updateProduct =   getQtyUpdatedProduct(state.productList[index],action.payload.qtyInCart );
            return tassign(state, 
                {productList: getUpdatedProductList(state.productList, updateProduct, index)});
        } 
        case('THROW_LOADING_ERROR'):{
          return tassign(state, {dataState: action.payload.dataState});
        }
        case('CREATE_ORDER_LIST'): {
          console.log('oList in reducer', action.payload.orderList);
          return tassign(state, {orderList: action.payload.orderList});
        }
        case('CLEAR_ORDER_LIST'): {
          return tassign(state, {orderList:action.payload.orderList});
        }
        case('LOAD_ORDER_LIST'):{
          return tassign(state, {orderList:action.payload.orderList});
        }
    }
        return state
}