import { useState, useMemo, useCallback } from 'react'

type UsePaginationReturnType = {
  currentPage: number
  slicedItems: any
  pagesQuantity: number
  handlePageChange: (toPage: number) => void
}

export const usePagination = <ItemType>(
  itemsPerPage: number,
  items: ItemType[]
): UsePaginationReturnType => {
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
    setCurrentPage(currentPage + toPage)
  }, [])

  const slicedItems = useMemo(
    () => items.slice(cursorHead, cursorTail),
    [cursorHead, cursorTail]
  )

  return {
    currentPage,
    slicedItems,
    pagesQuantity,
    handlePageChange
  }
}
