import { createAsyncThunk, createSlice, combineReducers } from "@reduxjs/toolkit";

import { fetchItems, postItem as postItemToApi, putAmmount as putAmmountToApi, fetchUsers, postUser, loginUser as loginUserApi, deleteItem as deleteApiItem } from "../Components/Api";
import { saveUserToStorage, getUserFromStorage, clearUserFromStorage } from "../utils/localStorage";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
  return await fetchItems();
});

export const postMenu = createAsyncThunk("menu/postMenu", async (newTask) => {
  return await postItemToApi(newTask);
})

export const putAmmount = createAsyncThunk("ammount/putAmmount", async(payload)=>{
  return await putAmmountToApi(payload);
})

export const fetchAccounts = createAsyncThunk("user/fetchUser", async() =>{
  return await fetchUsers();
})

export const postAccounts = createAsyncThunk("user/postUser", async(newU) =>{
  return await postUser(newU);
})

export const loginUser = createAsyncThunk("user/loginUser", async(credentials) =>{
  return await loginUserApi(credentials);
})

export const deleteItem = createAsyncThunk("item/deleteItem", async(ind) =>{
  return await deleteApiItem(ind)
})

const contactsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
   
    toggleToCart(state, action) {
      const item = state.items.find((item) => String(item.id) === String(action.payload));
      if (item) {
        item.cart = !item.cart;
      }
    },
    clearCart(state) {
      state.items = state.items.map((item) => ({
        ...item,
        cart: false,
      }));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.map((item) => ({
          ...item,
          id: Number(item.id),
          cart: item.cart ?? false,
        }));
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postMenu.fulfilled, (state, action) => {
        state.items.push({ ...action.payload, cart: false });
      })
      .addCase(postMenu.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(putAmmount.fulfilled, (state, action) =>{
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })
      .addCase(putAmmount.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteItem.fulfilled, (state, action)=>{
        state.items = action.payload.map((item) => ({
          ...item,
          id: Number(item.id),
          cart: item.cart ?? false,
        }));
      })
  },
});

const accountSlice = createSlice({
  name: "account",
  initialState: {
    users: [],
    user: getUserFromStorage(),
    status: "idle",
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      saveUserToStorage(action.payload);
    },
    logout(state) {
      state.user = null;
      clearUserFromStorage();
    }
  },
  extraReducers(builder){
    builder
    .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.map((user) => ({
          ...user,
          id: Number(user.id),
          op: true
        }));
      })
    .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    .addCase(postAccounts.fulfilled, (state, action) => {
        state.users.push({ ...action.payload, });
        // Save new user to localStorage as well
        saveUserToStorage(action.payload);
      })
      .addCase(postAccounts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
        saveUserToStorage(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})

export const { removeContact, toggleToCart, clearCart } = contactsSlice.actions;
export const { setUser, logout } = accountSlice.actions;

export const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  users: accountSlice.reducer,
});
