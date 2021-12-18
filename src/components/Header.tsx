import { Flex, Text } from '@chakra-ui/react'

const Header = () => (
  <header>
    <Flex justify="center" align="center" h="calc(56px + env(safe-area-inset-top))" backgroundColor="gray.300">
      <Text fontSize="3xl" color="white">eighteen</Text>
    </Flex>
  </header>
)

export default Header
