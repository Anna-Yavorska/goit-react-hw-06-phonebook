import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const { createSlice, nanoid } = require('@reduxjs/toolkit');

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const initialState = {
  contacts: defaultContacts,
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(el => el.id !== action.payload);
    },
    addContact: {
      prepare(contact) {
        return {
          payload: {
            ...contact,
            id: nanoid(),
          },
        };
      },
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
    },
  },
});
const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { deleteContact, addContact } = contactsSlice.actions;
