export interface ISort {
  name: string;
  sortProperty: string;
}

export interface FilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  pagesCount: number;
  sort: ISort;
}

export interface SearchPizzaParams {
  categoryId: number,
  currentPage: number
}