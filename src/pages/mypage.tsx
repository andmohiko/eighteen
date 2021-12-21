import Link from 'next/link'
import { useRecoilState } from 'recoil'
import Layout from 'components/Layout'
import { Box, Button, Text } from '@chakra-ui/react'
import { userState } from 'atoms'
import { useCheckLogin } from 'hooks/useCheckLogin'
import { Logout } from 'lib/firebase'
import { useCheckVersion } from 'hooks/useCheckVersion'

const MypagePage = () => {
  const [user, setUser] = useRecoilState(userState)
  const { currentVersion } = useCheckVersion()

  useCheckLogin()
  const logoutEighteen = () => {
    setUser(null)
    Logout()
  }

  return (
    <Layout>
      <Box justifyContent={"space-between"}>
        <Box p={4}>
          <Text fontSize="2xl">{user && user.username}</Text>
          <Text fontSize="base" mt={2}>登録曲数: {user && user.repertory}</Text>
        </Box>
        <Box p={4} textAlign={"right"}>
          <Button onClick={logoutEighteen}>ログアウト</Button>
          {currentVersion && (
            <Text
              fontSize={"sm"}
              color={"gray.400"}
              mt={4}
            >
              Ver {currentVersion}
            </Text>
          )}
        </Box>
      </Box>
    </Layout>
  )
}

export default MypagePage
