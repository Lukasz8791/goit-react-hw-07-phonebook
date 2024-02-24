import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
  },
  reducers: {
    setContacts: (state, action) => {
      state.items = action.payload;
    },
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    saveToLocalStorage: state => {
      localStorage.setItem('contacts', JSON.stringify(state.items));
    },
  },
});

export const {
  setContacts,
  addContact,
  deleteContact,
  setFilter,
  saveToLocalStorage,
} = contactsSlice.actions;

export default contactsSlice.reducer;
