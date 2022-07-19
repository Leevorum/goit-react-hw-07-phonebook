import { createSlice } from '@reduxjs/toolkit';

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const phoneBookSliceReducer = phoneBookSlice.reducer;
export const { remove, add } = phoneBookSlice.actions;

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    addFilter: (_, action) => {
      return action.payload;
    },
  },
});

export const { addFilter } = filterSlice.actions;
export const filterSliceReducer = filterSlice.reducer;
