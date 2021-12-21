import { useEffect } from 'react'
import { db } from 'lib/firebase'
import { collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Uid } from 'models'
import { useRecoilState } from 'recoil'
import { tagsState } from 'atoms'

export const useTags = (userId: Uid) => {
  const [tags, setTags] = useRecoilState(tagsState)
  if (!userId) {
    return tags
  }

  const [value, loading, error] = useCollection(collection(db, 'users', userId, 'tags'))
  useEffect(() => {
    if (!value) return
    const tags = value.docs.map((doc) => {
      const tag = doc.data()
      return {
        tagId: doc.id,
        createdAt: tag.createdAt,
        label: tag.label,
        updatedAt: tag.updatedAt
      }
    })
    setTags(tags)
  }, [value])
  return tags
}
