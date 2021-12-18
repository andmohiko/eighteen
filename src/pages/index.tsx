import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import Layout from 'components/Layout'
import SongsTable from 'components/Tables/SongsTable'
import { Button } from '@chakra-ui/button'
import { userState } from 'atoms'
import { useMemo } from 'react'
import SongRepository from 'db/SongRepository'
import { useCheckLogin } from 'hooks/useCheckLogin'

const IndexPage = ({ songsServer }) => {
  useCheckLogin()
  const user = useRecoilValue(userState)
  const songs = songsServer ?? []

  return (
    <Layout>
      <p>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </p>
      <p>user: { user ? user.username : 'no login'}</p>
      {/* 持ち曲一覧 */}
      {/* <p>{songsServer.length}</p> */}
      <SongsTable songs={songs} />
    </Layout>
  )
}

export default IndexPage

export async function getStaticProps() {
  const songRepository = new SongRepository()
  const userId = 'x8T7SlQ1AReWaR0zyFoyadlhAdd2'
  const songs = await songRepository.findAll(userId)
  const songsServer = JSON.parse(JSON.stringify(songs))
  return {
    props: {
      songsServer
    }
  }
}