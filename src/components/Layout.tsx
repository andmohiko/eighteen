import React, { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import Header from 'components/Header'
import Footer from 'components/Footer'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => (
  <Box w={"100vw"} minH={"100vh"} border="1px" borderColor="blue">
    <Header />
    <Flex justify={"center"}>
      <Box minH="calc(100vh - 124px)" maxW="375px" border="1px" borderColor="blue">
        {children}
      </Box>
    </Flex>
    <Flex justify={"center"} borderTop="1px" borderColor={"gray.200"}>
      <Footer />
    </Flex>
  </Box>
)

export default Layout
