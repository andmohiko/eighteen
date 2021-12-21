import { useState, useEffect } from 'react'
import { db } from 'lib/firebase'
import { collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Uid, Song } from 'models'

export const useSongs = (userId: Uid) => {
  const [songs, setSongs] = useState<Song[]>([])
  if (!userId) {
    return songs
  }
  const [value, loading, error] = useCollection(collection(db, 'users', userId, 'songs'))
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
  return songs
}
