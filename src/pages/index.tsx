import { useRecoilValue } from 'recoil'
import Layout from 'components/Layout'
import SongsTable from 'components/Tables/SongsTable'
import { userState } from 'atoms'
import { useEffect, useState } from 'react'
import { db } from 'lib/firebase'
import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Song } from 'models'
import { useCheckLogin } from 'hooks/useCheckLogin'

const IndexPage = () => {
  useCheckLogin()
  const [songs, setSongs] = useState<Song[]>([])
  const user = useRecoilValue(userState)
  if (user) {
    const [value, loading, error] = useCollectionData(collection(db, 'users', user.userId, 'songs'))
    console.log('vle', value, loading, error)
    useEffect(() => {
      if (!value) return
      const songs = value.map((doc) => {
        return {
          songId: doc.id,
          artist: doc.artist,
          bestScore: doc.bestScore,
          createdAt: doc.createdAt,
          key: doc.key,
          title: doc.title,
          updatedAt: doc.updatedAt
        }
      })
      setSongs(songs)
    }, [value])
    console.log('songs', user.userId, songs)
  }

  return (
    <Layout>
      <SongsTable songs={songs} />
    </Layout>
  )
}

export default IndexPage
