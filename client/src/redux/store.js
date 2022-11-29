import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import laporanReducer from "./laporanSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    laporan: laporanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
