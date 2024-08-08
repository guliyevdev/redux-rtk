import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  selectedCategory: null,
  favorites: [],
  basket: [],
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await axios.get(
        "https://northwind.vercel.app/api/categories"
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "categories/fetchCategory",
  async (id) => {
    try {
      const response = await axios.get(
        `https://northwind.vercel.app/api/categories/${id}`
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async (id, category) => {
    try {
      const response = await axios.patch(
        `https://northwind.vercel.app/api/categories/${id}`,
        category
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    try {
      await axios.delete(`https://northwind.vercel.app/api/categories/${id}`);
      return id;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categories) => {
    try {
      const response = await axios.post(
        "https://northwind.vercel.app/api/categories",
        categories
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
      addToWishlist: (state, action) => {
            state.favorites.push(action.payload);
        },
    removeFromWishlist: (state, action) => {
        state.favorites = state.favorites.filter(category => category.id !== action.payload.id);
    },
    addBasket: (state, action) => {
        state.basket.push(action.payload);
    },
    removeBasket: (state, action) => {
      const id = action.payload
      const existingItem = state.basket.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.basket = state.basket.filter((item) => item.id !== id);
        }
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchCategories.pending, (state) => {
  //       state.status = "loading";
  //       state.error = null;
  //     })
  //     .addCase(fetchCategories.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.data = action.payload;
  //     })
  //     .addCase(fetchCategories.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     })
  //     .addCase(fetchCategory.pending, (state) => {
  //       state.status = "loading";
  //       state.error = null;
  //     })
  //     .addCase(fetchCategory.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.selectedCategory = action.payload;
  //     })
  //     .addCase(fetchCategory.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     })
  //     .addCase(editCategory.pending, (state) => {
  //       state.status = "loading";
  //       state.error = null;
  //     })
  //     .addCase(editCategory.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.data = state.data.map((category) =>
  //         category.id === action.payload.id ? action.payload : category
  //       );
  //       state.selectedCategory = action.payload;
  //     })
  //     .addCase(editCategory.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     })
  //     .addCase(deleteCategory.pending, (state) => {
  //       state.status = "loading";
  //       state.error = null;
  //     })
  //     .addCase(deleteCategory.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.data = state.data.filter(
  //         (category) => category.id !== action.payload
  //       );
  //     })
  //     .addCase(deleteCategory.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     })
  //     .addCase(addCategory.pending, (state) => {
  //       state.status = "loading";
  //       state.error = null;
  //     })
  //     .addCase(addCategory.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.data.push(action.payload);
  //     })
  //     .addCase(addCategory.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     })
  //     .addCase(addFavorite.fulfilled, (state, action) => {
  //       state.favorites = action.payload;
  //     });
  // },
});

export const { addBasket, removeBasket,addToWishlist,removeFromWishlist } = categoriesSlice.actions;
export default categoriesSlice.reducer;
