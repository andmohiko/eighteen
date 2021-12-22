import React from 'react'
import { Badge, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { usePagination } from 'hooks/usePagination'
import PaginationNav from 'components/PaginationNav'
import { Song } from 'models'

interface Props {
  songs: Song[]
}

const SongsTable: React.FC<Props> = ({ songs }) => {
  const itemsPerPage = 30
  const { currentPage, slicedItems, pagesQuantity, handlePageChange } =
    usePagination(itemsPerPage, songs)

  return (
    <>
      <Table variant="simple" border="2px" borderColor="gray.200">
        <Thead backgroundColor="gray.200">
          <Tr>
            <Th px={6} py={4}>曲名</Th>
            <Th p={4}></Th>
            <Th p={4}>キー</Th>
          </Tr>
        </Thead>
        <Tbody backgroundColor="white">
          {slicedItems.map((song: Song) => (
            <Tr key={song.songId}>
              <Td w="85%">
                <Text>{song.title}</Text>
                <Text fontSize={"xs"} color={"gray.500"}>{song.artist}</Text>
              </Td>
              <Td w="5%">
                {song.tag && (<Badge colorScheme="teal" mt={2}>{song.tag}</Badge>)}
              </Td>
              <Td w="10%">
                {song.key > 0 && <Text>+{song.key}</Text>}
                {song.key === 0 && <Text>±{song.key}</Text>}
                {song.key < 0 && <Text>{song.key}</Text>}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PaginationNav
        pagesQuantity={pagesQuantity}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  )
}

export default SongsTable
