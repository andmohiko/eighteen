import { onAuthStateChanged } from 'firebase/auth'
import Layout from '../components/Layout'
import { Button, Box, Text } from '@chakra-ui/react'
import { Login, Logout, auth } from 'lib/firebase'
import { atom, useRecoilState } from 'recoil'
import { userState } from 'atoms/index'
import UserRepository from 'db/UserRepository'
import { useEffect } from 'react'
import { serverTimestamp } from '@firebase/firestore'

const RegisterPage = () => {
  const userRepository = new UserRepository()
  const [user, setUser] = useRecoilState(userState)
  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('firebaseuser auth', auth.currentUser)
      if (!firebaseUser) {
        return
      }
      const userId = firebaseUser.uid
      console.log('userid', userId)
      let foundUser = await userRepository.findById(userId)
      if (!foundUser) {
        const newUser = {
          bestScore: [],
          createdAt: serverTimestamp(),
          repertory: 0,
          updatedAt: serverTimestamp(),
          username: auth.currentUser.displayName
        }
        console.log(newUser)
        await userRepository.create(userId, newUser)
        foundUser = await userRepository.findById(userId)
      }
      setUser(foundUser)
    })
  }, [])

  return (
    <Layout>
      <Box justifyContent="center" alignItems="center">
        <Box justifyContent="center" alignItems="center" textAlign="center">
          <Text>カラオケ持ち曲管理アプリ</Text>
          <Text fontSize="2xl">eighteen</Text>
        </Box>
        <Box mx={2} my={4} p={2} rounded='md' boxShadow='md' bg='white'>
          <Text fontSize="xl" pb={2}>できること👍</Text>
          <Text pb={1}>◎ カラオケで歌う曲とキーをメモ</Text>
          <Text pb={1}>◎ 登録した曲ジャンルごとに検索</Text>
          <Text pb={1}>◎ 過去の最高点を記録</Text>
        </Box>
        <Box mx={2} my={4} p={2} rounded='md' boxShadow='md' bg='white'>
          <Text fontSize="xl" pb={2}>こんな人におすすめ🙆</Text>
          <Text pb={1}>◎ カラオケで歌いたい曲がパッと出てこない</Text>
          <Text pb={1}>◎ それで帰りがけに思い出して悔しくなる</Text>
          <Text pb={1}>◎ よく歌う曲のキーをメモりたい人</Text>
        </Box>
        <Box mx={2} my={4} p={2} rounded='md' boxShadow='md' bg='white'>
          <Text fontSize="xl" pb={2}>今後追加される機能🚀</Text>
          <Text>◎ 歌うたびに点数を記録</Text>
          <Text>◎ 他の人の持ち曲を見る</Text>
        </Box>

        <Box textAlign="center">
          <Button
            onClick={Login}
            label='ログイン'
            mt={4}
          >
            Twitterでログイン
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export default RegisterPage