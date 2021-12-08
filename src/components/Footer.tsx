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
import { FiHome, FiUser, FiMessageCircle } from 'react-icons/fi'
import type { IconType } from 'react-icons'

interface LinkItemProps {
  name: string
  icon: IconType
  uri: string
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'ホーム', icon: FiHome, uri: '/' },
  { name: '記録', icon: FiUser, uri: '/history' },
  { name: 'マイページ', icon: FiUser, uri: '/mypage' },
]

const Footer = () => {
  return (
    <footer>
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