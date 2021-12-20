import { useState, useMemo, useCallback } from 'react'

type UsePaginationReturnType<ItemType> = {
  currentPage: number
  slicedItems: ItemType[]
  pagesQuantity: number
  handlePageChange: (toPage: number) => void
}

export const usePagination = <ItemType>(
  itemsPerPage: number,
  items: ItemType[]
): UsePaginationReturnType<ItemType> => {
  const [currentPage, setCurrentPage] = useState(0)
  const cursorHead = useMemo(() => currentPage * itemsPerPage, [currentPage])
  const cursorTail = useMemo(
    () => (currentPage + 1) * itemsPerPage,
    [currentPage]
  )

  const pagesQuantity = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage)
  }, [items.length])

  const handlePageChange = useCallback((toPage: number) => {
    setCurrentPage((currentPage) => currentPage + toPage)
  }, [])

  const slicedItems = useMemo(
    () => items.slice(cursorHead, cursorTail),
    [cursorHead, cursorTail, items]
  )

  return {
    currentPage,
    slicedItems,
    pagesQuantity,
    handlePageChange
  }
}
