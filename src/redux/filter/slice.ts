import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, ISort, SearchPizzaParams } from "./types";

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  pagesCount: 3,
  sort: {
    name: 'Популярности',
    sortProperty: '-rating'
  }
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSortType(state, action: PayloadAction<ISort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setPagesCount(state, action: PayloadAction<number>) {
      state.pagesCount = action.payload
    },
    setFilters(state, action: PayloadAction<SearchPizzaParams>) {
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
    }
  }
})

export const { setCategoryId, setSortType, setCurrentPage, setPagesCount, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer