import React from 'react';
import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';
import { useSelector } from 'react-redux';
import { setCategoryId, setSortType, setFilters } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors'
import { SearchPizzaParams } from '../redux/filter/types'
import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import { fetchPizza } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';

export type ItemProps = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[]
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
    // eslint-disable-next-line
  }, [])

  const onChangeSort = React.useCallback((id: { name: string, sortProperty: string }) => {
    dispatch(setSortType(id))
    // eslint-disable-next-line
  }, [])

  const { categoryId, sort, currentPage, pagesCount, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const isMounted = React.useRef(false)

  const getPizzas = async () => {
    try {
      dispatch(
        fetchPizza({
        currentPage,
        sort,
        categoryId
      }))
      window.scrollTo(0, 0);
    } catch (err) {
      throw new Error('Ошибка при загрузке API');
    }
  }

  React.useEffect(() => {    
    if (isMounted.current) {
      if (categoryId !== 0) {
        const queryString = qs.stringify({
          categoryId,
          currentPage
        });
        navigate(`?${queryString}`);
      } else {
        navigate('')
      }
    }

    isMounted.current = true
  // eslint-disable-next-line
  }, [categoryId, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      dispatch(setFilters({
        categoryId: Number(params.categoryId),
        currentPage: Number(params.currentPage)
      }));

      isMounted.current = true;
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);    
    if (!isSearch.current) {
      getPizzas();
    }

    if (window.location.search === '') {
      dispatch(setCategoryId(0))
    }

    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sort.sortProperty, currentPage, window.location.search]);

  const pizzas = items.filter((obj: ItemProps) => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    };

    return false;
  }).map((obj: ItemProps) => <PizzaBlock key={obj.id} {...obj} />);
  
  const skeletons = [...new Array(currentPage === 3 ? 2 : 4)].map((_, i) => <Skeleton key={i} />);  

  return (
    <div className='container'>
      <div className="content__top">
        <Categories value = {categoryId} onChangeCategory={onChangeCategory} />
        <Sort value = {sort} onChangeSort = {onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка<span>😕</span></h2>
          <p>
            К сожалению, не удалось загрузить пиццы.<br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <Pagination pageCount={pagesCount} currentPage={currentPage} />
    </div>
  )
}
