import { useRecoilValue } from 'recoil'
import Layout from 'components/Layout'
import SongsTable from 'components/Tables/SongsTable'
import { userState } from 'atoms'
import { useCheckLogin } from 'hooks/useCheckLogin'
import { useSongs } from 'hooks/useSongs'

const IndexPage = () => {
  useCheckLogin()
  const user = useRecoilValue(userState)
  const songs = useSongs(user?.userId)

  return (
    <Layout>
      <SongsTable songs={songs} />
    </Layout>
  )
}

export default IndexPage
