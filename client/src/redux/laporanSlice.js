import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const laporanAddAsync = createAsyncThunk(
  "laporan/laporanAddAsync",
  async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const laporan = await fetch("http://localhost:5000/laporan/create", {
        method: "POST",
        headers: {
          token: token,
        },
        body: payload,
      });
      if (laporan.ok) {
        return laporan;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const laporanListAsync = createAsyncThunk(
  "laporanListAsync",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const laporan = await fetch("http://localhost:5000/laporan/list", {
        method: "GET",
        headers: {
          token: token,
        },
      });
      console.log(laporan, "ISI LAPORAN");
      if (laporan.ok) {
        const laporans = await laporan.json();
        return laporans.data;
      } else if (laporan.statusText === "Unauthorized") {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const laporanEditAsync = createAsyncThunk(
  "laporan/laporanEditAsync",
  async ({ formData, id }) => {
    console.log(id, "DARI SLICE");
    try {
      const token = localStorage.getItem("token");
      const laporan = await fetch(`http://localhost:5000/laporan/edit/${id}`, {
        method: "PUT",
        headers: {
          token: token,
        },
        body: formData,
      });
      if (laporan.ok) {
        return laporan;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const laporanDeleteAsync = createAsyncThunk(
  "laporan/laporanDeleteAsync",
  async ({ id }) => {
    console.log(id, "DARI SLICE");
    try {
      const token = localStorage.getItem("token");
      const laporan = await fetch(
        `http://localhost:5000/laporan/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            token: token,
          },
        }
      );
      if (laporan.ok) {
        return laporan;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const laporan = createSlice({
  name: "laporan",
  initialState: [],
  reducers: {},
  extraReducers: {
    [laporanListAsync.fulfilled]: (state, action) => {
      const laporans = action.payload;
      return laporans;
    },
  },
});

export default laporan.reducer;
