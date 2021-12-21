import Layout from 'components/Layout'
import AddSong from 'components/Input/AddSong'
import { useCheckLogin } from 'hooks/useCheckLogin'
import { useRecoilValue } from 'recoil'
import { userState } from 'atoms'

const IndexPage = () => {
  useCheckLogin()
  const user = useRecoilValue(userState)
  return (
    <Layout>
      {user && (
        <AddSong userId={user.userId} />
      )}
    </Layout>
  )
}

export default IndexPage
