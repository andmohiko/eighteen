import React, { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import Header from 'components/Header'
import Footer from 'components/Footer'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => (
  <Box maxW={"100vw"} minH={"100vh"}>
    <Header />
    <Flex justify={"center"}>
      <Flex maxW="375px">
        <Box minH="calc(100vh - 124px)" w="100vw" border="1px" borderColor="blue">
          {children}
        </Box>
      </Flex>
    </Flex>
    <Flex justify={"center"} borderTop="1px" borderColor={"gray.200"}>
      <Footer />
    </Flex>
  </Box>
)

export default Layout
