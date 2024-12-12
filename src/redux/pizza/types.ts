export interface FetchPizzaArgs {
  sort: {
    name: string;
    sortProperty: string;
  };
  currentPage: number;
  categoryId: number;
};

export interface PizzaItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}

export interface FetchPizzaRes {
  items: PizzaItem[];
  meta: Record<string, number>;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}