import React from 'react'
import { Button, Flex } from '@chakra-ui/react'

interface Props {
  pagesQuantity: number
  currentPage: number
  handlePageChange: any
}

const SenpaiUsersTable: React.FC<Props> = ({
  pagesQuantity,
  currentPage,
  handlePageChange
}) => {
  return (
    <Flex justify="end" align="center">
      <Button
        onClick={() => handlePageChange(-1)}
        isDisabled={currentPage === 0}
      >
        前
      </Button>
      {currentPage + 1} / {pagesQuantity}
      <Button
        onClick={() => handlePageChange(1)}
        isDisabled={currentPage === pagesQuantity - 1}
      >
        次
      </Button>
    </Flex>
  )
}

export default SenpaiUsersTable
