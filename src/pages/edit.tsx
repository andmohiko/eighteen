import { Box } from '@chakra-ui/react'
import Layout from 'components/Layout'
import AddSong from 'components/Input/AddSong'
import AddTag from 'components/Input/AddTag'
import { useCheckLogin } from 'hooks/useCheckLogin'
import { useRecoilValue } from 'recoil'
import { userState } from 'atoms'
import { useTags } from 'hooks/useTags'

const IndexPage = () => {
  useCheckLogin()
  const user = useRecoilValue(userState)
  const tags = useTags(user?.userId)

  return (
    <Layout>
      {user && (
        <Box>
          <AddSong userId={user.userId} />
          <AddTag userId={user.userId} tags={tags} />
        </Box>
      )}
    </Layout>
  )
}

export default IndexPage
