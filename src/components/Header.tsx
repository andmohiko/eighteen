import { Flex, Text } from '@chakra-ui/react'

const Header = () => (
  <header>
    <Flex
      position={"fixed"}
      top={0}
      w={"100vw"}
    >
      <Flex w={"100%"} justify="center" align="center" h="56px" backgroundColor="gray.300">
        <Text fontSize="3xl" color="white">eighteen</Text>
      </Flex>
    </Flex>
  </header>
)

export default Header
