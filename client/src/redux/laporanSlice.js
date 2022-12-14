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
      if (laporan.status === 201) {
        return laporan;
      }
    } catch (error) {
      return error.message;
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
      return error.message;
    }
  }
);

export const laporanGetOneAsync = createAsyncThunk(
  "laporanGetOneAsync",
  async (edit) => {
    try {
      const token = localStorage.getItem("token");
      const laporan = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}laporan/${edit}`,
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
      return error.message;
    }
  }
);

export const laporanEditAsync = createAsyncThunk(
  "laporan/laporanEditAsync",
  async ({ formData, id }) => {
    try {
      const token = localStorage.getItem("token");
      const laporan = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}laporan/edit/${id}`,
        {
          method: "PUT",
          headers: {
            token: token,
          },
          body: formData,
        }
      );
      if (laporan.status === 200) {
        return laporan;
      }
    } catch (error) {
      return error.message;
    }
  }
);

export const laporanDeleteAsync = createAsyncThunk(
  "laporan/laporanDeleteAsync",
  async ({ id }) => {
    try {
      const token = localStorage.getItem("token");
      const laporan = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}laporan/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            token: token,
          },
        }
      );
      if (laporan.status === 200) {
        return laporan;
      }
    } catch (error) {
      return error.message;
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
