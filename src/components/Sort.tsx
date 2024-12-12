import React from 'react'

type SortItem = {
  name: string,
  sortProperty: string,
}

type SortProps = {
  value: SortItem,
  onChangeSort: (obj: SortItem) => void
}

export const sortList: SortItem[] = [
    { name: 'Популярности', sortProperty: '-rating' },
    { name: 'Цене (по возрастанию)', sortProperty: 'price' },
    { name: 'Цене (по убыванию)', sortProperty: '-price' },
    { name: 'Алфавиту', sortProperty: 'title' }
]

export const Sort: React.FC<SortProps> = React.memo(({ value, onChangeSort }) => {
  const [open, setOpen] = React.useState(false)

  const sortRef = React.useRef<HTMLDivElement>(null)

  const onClickListItem = (obj: SortItem) => {
    onChangeSort(obj)
    setOpen(false)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={sortRef} className="sort" onClick={() => setOpen(!open)}>
      <div className="sort__label">        
        <b>
          <svg className={open ? 'active' : ''} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#ffffff"></path>
          </svg>
        </b>
        <b>
          Сортировка по:
        </b>
        <b>{value.name}</b>
      </div>
        {open && (
            <div className='sort__popup'>
              <ul>
                {
                  sortList.map((obj, i) => (
                    <li
                      key={i}
                      className={value.sortProperty === obj.sortProperty ? 'active' : ''}
                      onClick={() => onClickListItem(obj)}
                    >
                      {obj.name}
                    </li>
                  ))
                }
                </ul>
              </div>
        )}
    </div>
  )
})