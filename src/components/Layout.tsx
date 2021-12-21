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
    <Flex justify={"center"} pt={"56px"} pb={"68px"}>
      <Flex maxW="375px">
        <Box minH="calc(100vh - 124px)" w="100vw">
          {children}
        </Box>
      </Flex>
    </Flex>
    <Footer />
  </Box>
)

export default Layout
