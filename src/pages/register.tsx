import Link from 'next/link'
import { onAuthStateChanged } from 'firebase/auth'
import Layout from '../components/Layout'
import { Button, Box } from '@chakra-ui/react'
import { Login, Logout, auth } from 'lib/firebase'
import { atom, useRecoilState } from 'recoil'
import { userState } from 'atoms/index'
import { User } from 'models/index'
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
        <Button
          onClick={Login}
          label='ログイン'
        >
          ユーザー登録
        </Button>
        <Box mt={2} textAlign="center">
          <pre>
            {user
              ? user.userId + "でログイン中"
              : "not login"
            }
          </pre>
        </Box>
      </Box>
    </Layout>
  )
}

export default RegisterPage