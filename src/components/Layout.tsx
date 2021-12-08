import React, { ReactNode } from 'react'
import Link from 'next/link'
import { Box, Flex } from '@chakra-ui/layout'
import Header from 'components/Header'
import Footer from 'components/Footer'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => (
  <Flex justify="center">
    <Box maxW={"375px"} minH={"100vh"} border="1px" borderColor="blue">
      <Header />
        <Box minH="calc(100vh - 124px)" border="1px" borderColor="blue">
          {children}
        </Box>
      <Footer />
    </Box>
  </Flex>
)

export default Layout
