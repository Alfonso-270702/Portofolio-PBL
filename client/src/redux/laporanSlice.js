import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const laporanAddAsync = createAsyncThunk(
  "laporan/laporanAddAsync",
  async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const laporan = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}laporan/create`,
        {
          method: "POST",
          headers: {
            token: token,
          },
          body: payload,
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

export const laporanListAsync = createAsyncThunk(
  "laporanListAsync",
  async (navigate) => {
    try {
      const token = localStorage.getItem("token");

      const laporan = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}laporan/list`,
        {
          method: "GET",
          headers: {
            token: token,
          },
        }
      );
      if (laporan.status === 200) {
        const laporans = await laporan.json();
        return laporans.data;
      } else if (laporan.statusText === "Unauthorized") {
        throw new Error(laporan.statusText);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
      Swal.fire({
        icon: "error",
        title: `${error.message}`,
        text: "Mohon login kembali",
        showConfirmButton: false,
        timer: 1500,
      });
      return error;
    }
  }
);

export const laporanEditAsync = createAsyncThunk(
  "laporan/laporanEditAsync",
  async ({ formData, id }) => {
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
