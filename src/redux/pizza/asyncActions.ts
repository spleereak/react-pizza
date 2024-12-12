import { createAsyncThunk } from "@reduxjs/toolkit"
import { setPagesCount } from '../filter/slice';
import { FetchPizzaArgs, FetchPizzaRes, PizzaItem } from './types';
import axios from 'axios';

export const fetchPizza = createAsyncThunk<PizzaItem[], FetchPizzaArgs>('pizza/fetchPizzaStatus', async (params: FetchPizzaArgs, thunkApi) => {
  const { sort, categoryId, currentPage } : FetchPizzaArgs = params;
  const { data } = await axios.get<FetchPizzaRes>(`https://d7d46da63dd6c2bd.mokky.dev/items?page=${currentPage}&limit=4${categoryId > 0 ? `&category=${categoryId}` : ''}&sortBy=${sort.sortProperty}`)
  const dispatch = thunkApi.dispatch
  dispatch(setPagesCount(data.meta.total_pages))
  return data.items;
})