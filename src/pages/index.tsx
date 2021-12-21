import { useRecoilValue } from 'recoil'
import Layout from 'components/Layout'
import SongsTable from 'components/Tables/SongsTable'
import { userState } from 'atoms'
import { useEffect, useState } from 'react'
import { db } from 'lib/firebase'
import { collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Song } from 'models'
import { useCheckLogin } from 'hooks/useCheckLogin'

const IndexPage = () => {
  useCheckLogin()
  const [songs, setSongs] = useState<Song[]>([])
  const user = useRecoilValue(userState)
  if (user) {
    const [value, loading, error] = useCollection(collection(db, 'users', user.userId, 'songs'))
    useEffect(() => {
      if (!value) return
      const songs = value.docs.map((doc) => {
        const song = doc.data()
        return {
          songId: doc.id,
          artist: song.artist,
          bestScore: song.bestScore,
          createdAt: song.createdAt,
          key: song.key,
          title: song.title,
          updatedAt: song.updatedAt
        }
      })
      setSongs(songs)
    }, [value])
  }

  return (
    <Layout>
      <SongsTable songs={songs} />
    </Layout>
  )
}

export default IndexPage
