import { useRecoilState } from 'recoil'
import Layout from 'components/Layout'
import { Box, Button, Text } from '@chakra-ui/react'
import { userState } from 'atoms'
import { useCheckLogin } from 'hooks/useCheckLogin'
import { Logout } from 'lib/firebase'

const MypagePage = () => {
  const [user, setUser] = useRecoilState(userState)

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
          <Text
            fontSize={"sm"}
            color={"gray.400"}
            mt={4}
          >
            Ver 0.1.0
          </Text>
        </Box>
      </Box>
    </Layout>
  )
}

export default MypagePage
