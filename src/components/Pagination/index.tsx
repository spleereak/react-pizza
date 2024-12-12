import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import { setCurrentPage } from '../../redux/filter/slice'
import { useDispatch } from 'react-redux'

type PaginationProps = {
  pageCount: number,
  currentPage: number
}

export const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage }) => {  

  const dispatch = useDispatch()

  return (
    <ReactPaginate
        className={styles.root}
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
    />
  )
}
