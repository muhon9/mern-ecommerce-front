import { combineReducers } from 'redux'
import { queryReducer } from './queryReducer';
import { cartReducer } from './cartReducer';
import { userReducer } from './userReducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';

const rootReducer = combineReducers({
  user : userReducer,
  query: queryReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
})
 
export default rootReducer;