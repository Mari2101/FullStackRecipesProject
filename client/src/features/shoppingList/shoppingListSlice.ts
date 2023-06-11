import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type List = {
  id: number;
  title: string;
  description: string;
};
export type ListsState = {
  lists: List[];
};
const initialState: ListsState = {
  lists: [],
};
const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<List>) => {
      state.lists.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<List>) => {
      const index = state.lists.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.lists.splice(index, 1);
      }
    },
    updateItem: (state, action: PayloadAction<List>) => {
      const index = state.lists.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.lists[index] = action.payload;
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = listSlice.actions;
export default listSlice.reducer;
