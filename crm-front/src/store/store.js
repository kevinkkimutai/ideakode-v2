import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { apiSlice } from "../services/api";
import { 
  authReducers, 
  projectReducers, 
  projectCategoryReducers,
  supportcategoriesReducers,
  supportTicketsReducer,
  productReducers,
  productCategoryReducers,
  customerReducers
 } from "@/redux/reducers";


// Cart persistence configuration
const notificationsPersistConfig = {
  key: "notifications",
  storage,
  whitelist: ["notifications"],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  auth: authReducers,
  projects: projectReducers,
  products: productReducers,
  projectcategories: projectCategoryReducers,
  productcategories: productCategoryReducers,
  supportcategories: supportcategoriesReducers,
  tickets: supportTicketsReducer,
  customers: customerReducers,
  notifications: persistReducer(notificationsPersistConfig, projectReducers),
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
