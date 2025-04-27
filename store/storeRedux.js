import { configureStore, createSlice } from '@reduxjs/toolkit';

const setReduxSlice = createSlice({
  name: 'setRedux',
  initialState: {
    changeIcon: false,
    arrayID: [],
    historite: [], // 🔥 NEW STATE
  },
  reducers: {
    setChangeIcon(state, action) {
      state.changeIcon = action.payload;
    },
    addToArrayID(state, action) {
      if (!state.arrayID.includes(action.payload)) {
        state.arrayID.push(action.payload);
      }
    },
    removeFromArrayID(state, action) {
      state.arrayID = state.arrayID.filter(item => item !== action.payload);
    },
    setHistorite(state, action) {
      state.historite = action.payload; // 🔥 SET stories here
    },
  },
});

// Export actions
export const {
  setChangeIcon,
  addToArrayID,
  removeFromArrayID,
  setHistorite, // 🔥 Don’t forget this one!
} = setReduxSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    setRedux: setReduxSlice.reducer,
  },
});

export default store;
