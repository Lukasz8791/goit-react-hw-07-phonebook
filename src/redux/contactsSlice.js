import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(
      'https://65d9b3f7bcc50200fcdbf6a8.mockapi.io/contacts'
    );
    return response.data;
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContactAsync',
  async newContact => {
    const response = await axios.post(
      'https://65d9b3f7bcc50200fcdbf6a8.mockapi.io/contacts',
      newContact
    );
    return response.data;
  }
);

export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContactAsync',
  async id => {
    await axios.delete(
      `https://65d9b3f7bcc50200fcdbf6a8.mockapi.io/contacts/${id}`
    );
    return id;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { setFilter } = contactsSlice.actions;

export const contactsActions = {
  fetchContacts,
  addContactAsync,
  deleteContactAsync,
  setFilter,
};

export default contactsSlice.reducer;
