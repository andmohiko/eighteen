import { Box } from '@chakra-ui/react'
import Layout from 'components/Layout'
import AddSong from 'components/Input/AddSong'
import AddTag from 'components/Input/AddTag'
import { useCheckLogin } from 'hooks/useCheckLogin'
import { useRecoilValue } from 'recoil'
import { userState } from 'atoms'
import { useTags } from 'hooks/useTags'
import { useMemo } from 'react'

const IndexPage = () => {
  useCheckLogin()
  const user = useRecoilValue(userState)
  const tags = useTags(user?.userId)
  const tagLabels = useMemo(() => {
    return tags.map(tag => tag.label)
  }, [tags])

  return (
    <Layout>
      {user && (
        <Box>
          <AddSong userId={user.userId} tags={tagLabels} />
          <AddTag userId={user.userId} tags={tagLabels} />
        </Box>
      )}
    </Layout>
  )
}

export default IndexPage
