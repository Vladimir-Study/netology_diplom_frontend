import { ConfigureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./test";

export const store = ConfigureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware().concat(usersApi.middleware),
})

setupListeners(store.dispatch)