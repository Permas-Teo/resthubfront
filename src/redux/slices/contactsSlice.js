import { createSlice } from '@reduxjs/toolkit';
import { API_HOST } from '../../consts';
import { loadState, saveState } from '../localStorage';

const CONTACT_STATE_KEY = 'contacts';
const persistedContact = loadState(CONTACT_STATE_KEY);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: persistedContact,
  reducers: {
    setContacts: (state, action) => action.payload,
  },
});

export const { setContacts } = contactsSlice.actions;

export const getContacts = () => (dispatch) => {

  const apiUrl = `${API_HOST}/api/contacts`; 
  fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .then((result) => {
      saveState(CONTACT_STATE_KEY, result.data);
      dispatch(setContacts(result.data));
      console.log(result.data);
    })
    .catch((err) => console.log(err));
};

export const selectContacts = (state) => state.contacts;

export default contactsSlice.reducer;
