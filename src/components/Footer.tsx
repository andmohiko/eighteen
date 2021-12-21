import React, { ReactText } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Flex,
  FlexProps,
  Icon,
  Link,
  List,
  ListItem,
  ListIcon,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { FiHome, FiUser } from 'react-icons/fi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import type { IconType } from 'react-icons'

interface LinkItemProps {
  name: string
  icon: IconType
  uri: string
}

const LinkItems: Array<LinkItemProps> = [
  { name: '一覧', icon: FiHome, uri: '/' },
  { name: '追加', icon: AiOutlinePlusCircle, uri: '/edit' },
  { name: 'マイページ', icon: FiUser, uri: '/mypage' }
]

const Footer = () => {
  return (
    <footer>
      <Flex
        position={"fixed"}
        bottom={0}
        w={"100vw"}
      >
        <Flex
          w={"100%"}
          justify={"center"}
          borderTop="1px"
          borderColor={"gray.200"}
          backgroundColor={"white"}
        >
          <UnorderedList
            styleType="none"
            display="flex"
            justify="space-between"
            py={2}
          >
            <ListItem>
              <Flex>
                {LinkItems.map((link) => (
                  <NavItem key={link.name} icon={link.icon} uri={link.uri}>
                    {link.name}
                  </NavItem>
                ))}
              </Flex>
            </ListItem>
          </UnorderedList>
        </Flex>
      </Flex>
    </footer>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  uri: string
  children: ReactText
}

const NavItem = ({ icon, uri, children, ...rest }: NavItemProps) => (
  <NextLink href={uri}>
    <Link style={{ textDecoration: 'none' }}>
      <Box
        justify="center"
        align="center"
        px="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white'
        }}
        {...rest}
      > 
        <Icon
          fontSize="16"
          _groupHover={{
            color: 'white'
          }}
          as={icon}
        />
        <Text>
          {children}
        </Text>
      </Box>
    </Link>
  </NextLink>
)

export default Footer